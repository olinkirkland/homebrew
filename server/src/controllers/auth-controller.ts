import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { IUser, makeGuestUser } from '../models/User';
import * as authService from '../services/auth-service';
import { REFRESH_TOKEN_EXPIRATION, REFRESH_TOKEN_SECRET } from '../utils/config';
import { makeAccessToken, makeRefreshToken, verifyRefreshToken } from '../utils/token-util';

/**
 * Creates a new guest user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export async function createNewGuest(req: Request, res: Response) {
    const guestUser = await makeGuestUser();

    try {
        const refreshToken = makeRefreshToken(guestUser.id);
        const accessToken = makeAccessToken(guestUser.id);
        res.status(StatusCodes.CREATED).json({ success: true, refreshToken, accessToken });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Server error'
        });
    }
}

/**
 * Logs in a user.
 * If there's no email/username provided, a new guest user is created and logged in.
 * A token is returned in the response if the login is successful.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export async function login(req: Request, res: Response) {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Email/username and password are required'
        });
    }

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
 * Fetches a new token for the user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export async function fetchToken(req: Request, res: Response) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            success: false, message: 'No refresh token provided'
        });
    }

    try {
        const result = await verifyRefreshToken(refreshToken);
        if (!result)
            return res.status(StatusCodes.UNAUTHORIZED).json(result);
        const accessToken = makeAccessToken(result.id);

        return res.status(StatusCodes.OK).json({ success: true, token: accessToken });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Server error'
        });
    }
}

/**
 * Registers a logged-in user with a provided email and password.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export async function register(req: Request, res: Response) {
    const { user } = req as Request & { user: IUser };
    const { email, password } = req.body;

    try {
        const result = await authService.register(user, email, password);
        if (result.success) {
            res.status(StatusCodes.OK).json(result);
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
 * Logs out a user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export function logout(req: Request, res: Response) {
    const { token } = req as Request & { token: string };

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

/**
 * Sends a password reset email to the user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export async function forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    try {
        const result = await authService.forgotPassword(email);
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
 * Resets a user's password.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export async function resetPassword(req: Request, res: Response) {
    const { resetPasswordToken, newPassword } = req.body;

    try {
        const result = await authService.resetPassword(
            resetPasswordToken,
            newPassword
        );
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

export function verifyEmail(req: Request, res: Response) {
    /* ... */
}

export function resendVerification(req: Request, res: Response) {
    /* ... */
}
