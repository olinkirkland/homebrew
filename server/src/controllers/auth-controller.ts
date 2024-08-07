import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as authService from '../services/auth-service';

/**
 * Registers a new user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export async function register(req: Request, res: Response) {
    const { username, email, password } = req.body;

    try {
        const result = await authService.register(username, email, password);
        if (result.success) {
            res.status(StatusCodes.CREATED).json(result);
        } else {
            res.status(StatusCodes.BAD_REQUEST).json(result);
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Server error'
        });
    }
}

/**
 * Logs in a user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export async function login(req: Request, res: Response) {
    const { identifier, password } = req.body;

    try {
        const result = await authService.login(identifier, password);
        if (result.success) {
            res.status(StatusCodes.OK).json(result);
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json(result);
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Server error'
        });
    }
}

/**
 * Logs out a user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export function logout(req: Request, res: Response) {
    // Get the token from the request
    const token = req.headers.authorization;
    if (!token)
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'No token provided'
        });

    try {
        authService.logout(token);
        res.status(StatusCodes.OK).json({ success: true });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Server error'
        });
    }
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
