import bodyParser from 'body-parser';
import express from 'express';
import { connectToDatabase } from './config/database';
import { routes } from './config/routes';
import { startScheduledJobs } from './config/schedule';
import { logger } from './utils/logger';
import User from './models/User';
import { verifyEmail } from './services/auth-service';

const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectToDatabase();
    } catch (error) {
        logger.error('Error connecting to the database', { error });
        process.exit(1);
    }

    try {
        await startScheduledJobs();
    } catch (error) {
        logger.error('Error starting scheduled jobs', { error });
        process.exit(1);
    }

    const usersToPrint = await User.find().sort({ createdAt: -1 }).limit(10);
    console.table(
        usersToPrint.map((user) => {
            return {
                username: user.username,
                email: user.email,
                password: user.password.substring(0, 6) + '...',
                createdAt: new Date(user.createdAt).toLocaleString(),
                updatedAt: new Date(user.updatedAt).toLocaleString(),
                verifyEmailToken: user.verifyEmailToken,
                resetPasswordToken: user.resetPasswordToken
            };
        })
    );

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
