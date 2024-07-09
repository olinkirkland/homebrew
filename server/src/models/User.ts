import mongoose, { Document, Schema } from 'mongoose';

// Define interface for User document (optional but recommended)
interface IUser extends Document {
    username: string;
    password: string;
    createdAt: Date;
}

// Define schema for User model
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Create and export User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
