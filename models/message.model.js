import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    discordId: { type: String, required: true },
    question: { type: String, required: true },
    response: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Message', messageSchema);
