import mongoose from 'mongoose';
const schema = new mongoose.Schema({ mysteryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mystery', unique: true }, culpritId: String, motive: String, method: String, opportunity: String, timeline: [mongoose.Schema.Types.Mixed], reasoning: String, importantClues: [String] }, { timestamps: true });
export default mongoose.model('Solution', schema);
