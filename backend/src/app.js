import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import mysteryRoutes from './routes/mysteries.js';
import dashboardRoutes from './routes/dashboard.js';
import { errorHandler } from './middleware/errors.js';

const app = express();
const allowedOrigins = new Set([
  'http://localhost:5173',
  'https://ai-mystery-room-5j8e.vercel.app',
  ...(process.env.CLIENT_URL || '').split(',').map((origin) => origin.trim()).filter(Boolean),
]);
export function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  if (!origin || !allowedOrigins.has(origin)) return;
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Vary', 'Origin');
}
app.use(helmet());
app.use(cors({ origin(origin, callback) {
  if (!origin || allowedOrigins.has(origin)) return callback(null, true);
  return callback(new Error('Origin is not allowed by CORS.'));
}, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 150, standardHeaders: true, legacyHeaders: false }));
app.get('/api/v1/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/mysteries', mysteryRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));
app.use(errorHandler);
export default app;
