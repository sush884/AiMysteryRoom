import mongoose from 'mongoose';
import app, { setCorsHeaders } from './app.js';

let connectionPromise;

export default async function handler(req, res) {
  const requestPath = req.url?.split('?')[0];
  if (req.method === 'OPTIONS' || requestPath === '/api/v1/health') {
    return app(req, res);
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      connectionPromise ??= mongoose.connect(process.env.MONGO_URI).catch((error) => {
        connectionPromise = undefined;
        throw error;
      });
      await connectionPromise;
    }
    return app(req, res);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    setCorsHeaders(req, res);
    return res.status(503).json({ message: 'Database is unavailable. Please try again.' });
  }
}
