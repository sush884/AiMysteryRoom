import mongoose from 'mongoose';
import app from '../src/app.js';

let connectionPromise;

export default async function handler(req, res) {
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
    return res.status(503).json({ message: 'Database is unavailable. Please try again.' });
  }
}
