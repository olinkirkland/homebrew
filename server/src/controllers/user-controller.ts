import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUser, makeUserPreview } from '../models/User';
import * as userService from '../services/user-service';

export async function getUser(req: Request, res: Response) {
    // If it's the user's own profile, the user object will be attached to the request
    const { user } = req as Request & { user: IUser };
    const { targetUserId } = req.params;
    if (user.id === targetUserId) {
        res.status(StatusCodes.OK).json(user);
    }

    // Return a different user's profile
    try {
        const targetUser = await userService.getUserById(targetUserId);
        if (!targetUser) {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'User not found'
            });
        } else {
            res.status(StatusCodes.OK).json(makeUserPreview(targetUser));
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Server error while fetching user'
        });
    }
}

export async function getUsers(req: Request, res: Response) {
    const { user } = req as Request & { user: IUser };
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Invalid request body'
        });
    }

    // Get an array of user previews for the given IDs
    try {
        const users = await userService.getUsersByIds(ids);
        const userPreviews = users.map(makeUserPreview);
        res.status(StatusCodes.OK).json(userPreviews);
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Server error while fetching users'
        });
    }
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
