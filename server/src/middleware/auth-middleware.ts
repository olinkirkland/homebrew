import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { logger } from "../utils/logger";
import { ACCESS_TOKEN_SECRET } from "../utils/config";


export default function authenticate(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        logger.error('No token provided', { authHeader });
        return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, data: any) => {
        if (err) {
            logger.warn('Failed to authenticate token', {
                error: err.message,
                token
            });
            return res.status(StatusCodes.UNAUTHORIZED).send();
        }

        req.id = data.id;
        next();
    });
}
