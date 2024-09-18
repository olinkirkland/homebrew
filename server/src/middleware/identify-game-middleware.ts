import { StatusCodes } from "http-status-codes";
import Game, { IGame } from "../models/Game";
import { logger } from "../utils/logger";


export default async function identifyGame(req: any, res: any, next: any) {
    const { id } = req;
    let game: IGame | null = null;
    try {
        game = await Game.findOne({ _id: id });
    } catch {
        logger.error('Error identifying game', { id });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }

    if (!game) {
        logger.error('Game not found', { id });
        return res.status(StatusCodes.NOT_FOUND).send();
    }

    req.game = game;
    next();
}