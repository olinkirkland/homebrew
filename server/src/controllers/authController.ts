import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating JWT tokens
import User from '../models/User'; // User model

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Register a new user
export async function register(req: Request, res: Response) {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        let existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({ username, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        // Save user to database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in registration:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
}

// Login
export async function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create and return JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Login failed' });
    }
}

// Logout (optional depending on your implementation)

// Example of a logout function
export async function logout(req: Request, res: Response) {
    try {
        // Implement your logout logic here
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error in logout:', error);
        res.status(500).json({ message: 'Logout failed' });
    }
}

// Other authentication-related functions (e.g., password reset, token verification) can be added as needed
