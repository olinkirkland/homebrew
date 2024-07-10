import { Request, Response } from 'express';
import * as authService from '../services/authService';

/**
 * Registers a new user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export async function register(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
        const result = await authService.register(username, password);
        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export function login(req: Request, res: Response) {
    /* ... */
}

export function logout(req: Request, res: Response) {
    /* ... */
}

export function verifyEmail(req: Request, res: Response) {
    /* ... */
}

export function resendVerification(req: Request, res: Response) {
    /* ... */
}

export function forgotPassword(req: Request, res: Response) {
    /* ... */
}

export function resetPassword(req: Request, res: Response) {
    /* ... */
}
