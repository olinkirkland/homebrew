import { StatusCodes } from "http-status-codes";
import User, { IUser } from "../models/User";
import { logger } from "../utils/logger";


export default async function identifyUser(req: any, res: any, next: any) {
    const { id } = req;
    let user: IUser | null = null;
    try {
        user = await User.findOne({ _id: id });
    } catch {
        logger.error('Error identifying user', { id });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }

    if (!user) {
        logger.error('User not found', { id });
        return res.status(StatusCodes.NOT_FOUND).send();
    }

    req.user = user;
    next();
}