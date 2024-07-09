import { Request, Response } from 'express';
import User from '../models/User';

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        res.status(500).json({ message: 'Failed to fetch user' });
    }
};

// Update user by ID
export const updateUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error(`Error updating user with ID ${id}:`, error);
        res.status(500).json({ message: 'Failed to update user' });
    }
};

// Delete user by ID
export const deleteUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
};
