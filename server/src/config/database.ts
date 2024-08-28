import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export async function connectToDatabase() {
    logger.info('Connecting to MongoDB');
    dotenv.config();
    const { DB_URI } = process.env;

    if (!DB_URI)
        throw new Error(
            'Please define the MONGO_URI and MONGO_DB_NAME environment variables inside .env'
        );

    await mongoose.connect(DB_URI);
    // await mongoose.connection.collection('users').deleteMany({});
    // await mongoose.connection.collection('users').dropIndex('email_1');

    logger.info('MongoDB connected', { address: DB_URI });
}
