import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

const port = process.env.PORT || 5000;
try {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is required');
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => console.log(`Mystery Room API listening on ${port}`));
} catch (error) {
  console.error('Server startup failed:', error.message);
  process.exit(1);
}
