import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export async function connectToDatabase() {
    dotenv.config();
    const { DB_URI } = process.env;

    if (!DB_URI)
        throw new Error(
            'Please define the MONGO_URI and MONGO_DB_NAME environment variables inside .env'
        );

    await mongoose.connect(DB_URI);
    logger.info('MongoDB connected successfully', { address: DB_URI });
}
