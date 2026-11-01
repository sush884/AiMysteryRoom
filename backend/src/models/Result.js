import mongoose from 'mongoose';
const schema = new mongoose.Schema({ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, mysteryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mystery' }, selectedSuspectId: String, isCorrect: Boolean, status: String, submittedAt: { type: Date, default: Date.now } });
schema.index({ userId: 1, mysteryId: 1 }, { unique: true });
export default mongoose.model('Result', schema);
