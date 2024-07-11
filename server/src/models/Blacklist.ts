import mongoose, { Document, Schema } from 'mongoose';

// Define interface for Blacklist document
interface IBlacklist extends Document {
    token: string;
    expiresAt: Date;
}

// Define schema for Blacklist model
const blacklistSchema = new Schema({
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }
});

// Create and export Blacklist model
const Blacklist = mongoose.model<IBlacklist>('Blacklist', blacklistSchema);

export default Blacklist;
