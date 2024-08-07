import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Blacklist from '../models/Blacklist';
import User from '../models/User';
import { logger } from '../utils/logger';

/**
 * Registers a new user.
 * @param {string} username - The username of the new user.
 * @param {string} email - The email of the new user.
 * @param {string} password - The password of the new user.
 * @returns {Promise<{ success: boolean, message?: string }>} - A promise that resolves to an object indicating success or failure.
 */
export async function register(
    username: string,
    email: string,
    password: string
): Promise<{ success: boolean; message?: string }> {
    try {
        if (!username || !email || !password) {
            return { success: false, message: 'All fields are required' };
        }

        // Check if the username is already taken
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return { success: false, message: 'Username already taken' };
        }

        // Check if the email is already taken
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return { success: false, message: 'Email already taken' };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });

        // Save the user to the database
        await newUser.save();

        logger.info('User registered', { username, email });

        return { success: true, message: 'User registered successfully' };
    } catch (error) {
        console.error('Error registering user:', error);
        return {
            success: false,
            message: 'An error occurred while registering the user'
        };
    }
}

/**
 * Logs in a user.
 * @param {string} identifier - The username or email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<{ success: boolean, message?: string, token?: string }>} - A promise that resolves to an object indicating success or failure and a JWT token if successful.
 */
export async function login(
    identifier: string,
    password: string
): Promise<{ success: boolean; message?: string; token?: string }> {
    try {
        // Check if the user exists
        const user = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }]
        });
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { success: false, message: 'Invalid password' };
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
            expiresIn: '1h'
        });

        return { success: true, message: 'Login successful', token };
    } catch (error) {
        console.error('Error logging in user:', error);
        return {
            success: false,
            message: 'An error occurred while logging in'
        };
    }
}

/**
 * Logs out a user by invalidating their token.
 * @param {string} token - The token of the user to log out.
 * @returns {Promise<void>} - A promise that resolves when the user is logged out.
 */
export async function logout(
    token: string
): Promise<{ success: boolean; message?: string }> {
    try {
        // Decode the token to get the expiration time
        const decodedToken: any = jwt.decode(token);
        const expiresAt = new Date(decodedToken.exp * 1000);

        // Add the token to the blacklist
        const blacklistEntry = new Blacklist({ token, expiresAt });
        await blacklistEntry.save();

        return { success: true, message: 'Logout successful' };
    } catch (error) {
        console.error('Error logging out user:', error);
        return {
            success: false,
            message: 'An error occurred while logging out'
        };
    }
}

/**
 * Verifies a user's email using a token.
 * @param {string} token - The email verification token.
 * @returns {Promise<{ success: boolean, message?: string }>} - A promise that resolves to an object indicating success or failure.
 */
export async function verifyEmail(
    token: string
): Promise<{ success: boolean; message?: string }> {
    /* ... */
    return { success: false, message: 'Not implemented' };
}

/**
 * Resends the email verification link to the user.
 * @param {string} email - The email of the user to resend the verification link.
 * @returns {Promise<{ success: boolean, message?: string }>} - A promise that resolves to an object indicating success or failure.
 */
export async function resendVerification(
    email: string
): Promise<{ success: boolean; message?: string }> {
    /* ... */
    return { success: false, message: 'Not implemented' };
}

/**
 * Initiates the password recovery process by sending a reset link.
 * @param {string} email - The email of the user who forgot their password.
 * @returns {Promise<{ success: boolean, message?: string }>} - A promise that resolves to an object indicating success or failure.
 */
export async function forgotPassword(
    email: string
): Promise<{ success: boolean; message?: string }> {
    /* ... */
    return { success: false, message: 'Not implemented' };
}

/**
 * Resets a user's password using a token.
 * @param {string} token - The password reset token.
 * @param {string} newPassword - The new password for the user.
 * @returns {Promise<{ success: boolean, message?: string }>} - A promise that resolves to an object indicating success or failure.
 */
export async function resetPassword(
    token: string,
    newPassword: string
): Promise<{ success: boolean; message?: string }> {
    /* ... */
    return { success: false, message: 'Not implemented' };
}
