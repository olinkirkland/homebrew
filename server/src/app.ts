import bodyParser from 'body-parser';
import express from 'express';
import { connectToDatabase } from './config/database';
import { routes } from './config/routes';
import { logger } from './utils/logger';

const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
    logger.info('Starting the server...');
    try {
        await connectToDatabase();
    } catch (error) {
        logger.error('Error connecting to the database', { error });
        process.exit(1);
    }

    // Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Routes
    app.use('/api', routes); // Assuming all routes are prefixed with '/api'

    // Start the server
    app.listen(port, () => {
        logger.info('Server is running', { port });
    });
}

startServer();
