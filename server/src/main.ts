import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import { connectToDatabase } from './config/database';
import { routes } from './config/routes';
import { startScheduledTasks } from './config/schedule';
import { logRequest } from './middleware/request-logging-middleware';
import User from './models/User';
import { logger } from './utils/logger';

dotenv.config();

export const app = express();
const port = process.env.PORT || 3000;

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
                verifyEmailToken: user.verifyEmailToken,
                resetPasswordToken: user.resetPasswordToken,
                resetPasswordExpires: user.resetPasswordExpires
                    ? user.resetPasswordExpires.toISOString()
                    : null
            };
        })
    );

    // Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(logRequest);

    // Routes
    app.use('/api', routes); // Assuming all routes are prefixed with '/api'

    // Start the server
    app.listen(port, () => {
        logger.info(`Server is running on port ${port}`, { port });
    });
}

startServer();
