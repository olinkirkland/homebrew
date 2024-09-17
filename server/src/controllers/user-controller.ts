import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../models/User';
import * as userService from '../services/user-service';

export function getMe(req: Request, res: Response) {
    /* ... */
}

export function updateProfile(req: Request, res: Response) {
    /* ... */
}

export async function deleteUser(req: Request, res: Response) {
    const { user } = req as Request & { user: IUser };

    try {
        const result = await userService.deleteUser(user);
        if (result.success) {
            res.status(StatusCodes.OK).json(result);
        } else {
            res.status(StatusCodes.BAD_REQUEST).json(result);
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Server error while deleting user'
        });
    }
}
