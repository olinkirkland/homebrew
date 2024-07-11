import mongoose, { Document, Schema } from 'mongoose';
import { makeReadableToken } from '../utils/helpers';

// Define interface for User document (optional but recommended)
export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    isEmailVerified: boolean;
    verifyEmailToken: string;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
    profilePicture: string;
}

// Define schema for User model
const userSchema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        isEmailVerified: { type: Boolean, default: false },
        verifyEmailToken: { type: String, default: null },
        resetPasswordToken: { type: String, default: null },
        resetPasswordExpires: { type: Date, default: null },
        profilePicture: { type: String, default: null }
    },
    {
        timestamps: true
    }
);

// Define virtual properties for User model
userSchema.virtual('id').get(function (this: IUser) {
    return (this._id as unknown as string).toString();
});

userSchema.virtual('profileUrl').get(function (this: IUser) {
    return `/users/${this.id}`;
});

// Helper function to create a default user object
export function makeDefaultUser(): Partial<IUser> {
    return {
        isEmailVerified: false,
        verifyEmailToken: makeReadableToken(),
        resetPasswordToken: makeReadableToken(),
        resetPasswordExpires: new Date(),
        profilePicture: 'anon'
    };
}

// Create and export User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
