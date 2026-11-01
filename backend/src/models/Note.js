import mongoose from 'mongoose';
const schema = new mongoose.Schema({ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, mysteryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mystery' }, notes: { type: String, maxlength: 12000 } }, { timestamps: true });
schema.index({ userId: 1, mysteryId: 1 }, { unique: true });
export default mongoose.model('Note', schema);
