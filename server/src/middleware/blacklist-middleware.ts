import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Blacklist from '../models/Blacklist';

/**
 * Middleware checks if the token is blacklisted.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
export async function checkTokenBlacklist(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        // Extract the token from the Authorization header
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(StatusCodes.UNAUTHORIZED).send({
                success: false,
                message: 'Authorization header missing'
            });
        }

        const token = authHeader.replace('Bearer ', '');

        // Check if the token is in the blacklist
        const blacklistEntry = await Blacklist.findOne({ token });
        if (blacklistEntry) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .send({ success: false, message: 'Token is blacklisted' });
        }

        // Token is not blacklisted, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error checking blacklist:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: 'Internal server error'
        });
    }
}
