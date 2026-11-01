import mongoose from 'mongoose';
const suspectSchema = new mongoose.Schema({ id: String, name: String, age: Number, occupation: String, description: String, relationship: String, motive: String, alibi: String, personality: String, background: String }, { _id: false });
const mysterySchema = new mongoose.Schema({ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, title: String, scenario: String, category: String, difficulty: String, status: { type: String, enum: ['active', 'completed'], default: 'active' }, location: String, incidentDate: String, incidentTime: String, background: String, suspects: [suspectSchema], timeline: [mongoose.Schema.Types.Mixed] }, { timestamps: true });
export default mongoose.model('Mystery', mysterySchema);
