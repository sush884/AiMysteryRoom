import mongoose from 'mongoose';
const schema = new mongoose.Schema({ mysteryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mystery', index: true }, type: String, title: String, description: String, content: String, timestamp: String, relatedSuspects: [String] }, { timestamps: true });
export default mongoose.model('Evidence', schema);
