import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';
const router = Router();
const credentials = z.object({ email: z.string().email().max(254), password: z.string().min(8).max(100) });
const secureCookies = process.env.NODE_ENV === 'production';
const cookieOptions = { httpOnly: true, sameSite: secureCookies ? 'none' : 'lax', secure: secureCookies, maxAge: 7 * 86400000 };
function setSession(user, res) { const token = jwt.sign({}, process.env.JWT_SECRET, { subject: String(user._id), expiresIn: '7d' }); res.cookie('token', token, cookieOptions); }
router.post('/register', async (req, res, next) => { try {
  const data = z.object({ name: z.string().trim().min(2).max(80), ...credentials.shape, confirmPassword: z.string() }).parse(req.body);
  if (data.password !== data.confirmPassword) return res.status(400).json({ message: 'Passwords do not match.' });
  const exists = await User.exists({ email: data.email.toLowerCase() }); if (exists) return res.status(409).json({ message: 'An account with this email already exists.' });
  const user = await User.create({ name: data.name, email: data.email, password: await bcrypt.hash(data.password, 12) }); setSession(user, res); res.status(201).json({ user: { id: user.id, name: user.name, email: user.email } });
} catch (e) { next(e); } });
router.post('/login', async (req, res, next) => { try { const data = credentials.parse(req.body); const user = await User.findOne({ email: data.email.toLowerCase() }); if (!user || !(await bcrypt.compare(data.password, user.password))) return res.status(401).json({ message: 'Email or password is incorrect.' }); setSession(user, res); res.json({ user: { id: user.id, name: user.name, email: user.email } }); } catch (e) { next(e); } });
router.get('/me', requireAuth, async (req, res, next) => { try { const user = await User.findById(req.userId).select('name email'); res.json({ user }); } catch (e) { next(e); } });
router.post('/logout', (_req, res) => { res.clearCookie('token', { httpOnly: true, sameSite: cookieOptions.sameSite, secure: cookieOptions.secure }); res.json({ message: 'Signed out.' }); });
export default router;
