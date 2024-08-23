import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';

/**
 * Middleware to log all incoming requests.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
export async function logRequest(
    req: Request,
    res: Response,
    next: NextFunction
) {
    logger.silly(`${req.method} ${req.originalUrl}`, { ...req.body });
    next();
}
