import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    discordId: { type: String, required: true, unique: true },
    username: String,
    totalMessages: { type: Number, default: 0 },
    lastUsedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
