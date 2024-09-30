import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { connectToDatabase } from './config/database';
import { startScheduledTasks } from './config/schedule';
import { logRequest } from './middleware/request-logging-middleware';
import User from './models/User';
import { routes } from './routes/routes';
import { PORT } from './utils/config';
import { logger } from './utils/logger';

export const app = express();
const port = PORT || 3000;

async function startServer() {
    try {
        await connectToDatabase();
    } catch (error) {
        logger.error('Error connecting to the database', { error });
        process.exit(1);
    }

    try {
        await startScheduledTasks();
    } catch (error) {
        logger.error('Error starting scheduled jobs', { error });
        process.exit(1);
    }

    // Delete all users
    // await User.deleteMany({});

    const usersToPrint = await User.find().sort({ createdAt: -1 }).limit(10);
    console.table(
        usersToPrint.map((user) => {
            return {
                username: user.username,
                email: user.email,
                password: user.password.substring(0, 6) + '...',
                isGuest: user.isGuest
            };
        })
    );

    // Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(logRequest);

    // Cors
    const origin = [
        'http://localhost:5173',
        'http://87.186.23.128:5173',
        'https://onlineinthedark.com'
    ];

    logger.info('Allowed origins', { origins: origin });

    app.use(
        cors({
            origin,
            credentials: true
        })
    );

    // Routes
    app.use('/api', routes); // Assuming all routes are prefixed with '/api'

    // Start the server
    app.listen(port, () => {
        logger.info(`Server is running on port ${port}`, { port });
    });
}

startServer();
