import bodyParser from 'body-parser';
import express from 'express';
import { routes } from './config/routes';
import { connectToDatabase } from './config/database';
import { logger } from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
    logger.info('Starting the server...');
    try {
        await connectToDatabase();
    } catch (err) {
        logger.error('Error connecting to the database: ', err);
        process.exit(1);
    }

    // Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Routes
    app.use('/api', routes); // Assuming all routes are prefixed with '/api'

    // Start the server
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });
}

startServer();
