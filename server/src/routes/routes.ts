import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import authenticate from '../middleware/auth-middleware';
import identifyUser from '../middleware/identify-user-middleware';
import authRoutes from './auth-routes';
import gameRoutes from './game-routes';
import userRoutes from './user-routes';

const router = Router();

// Authentication routes
router.use('/auth', authRoutes);

// User management routes
router.use('/user', authenticate, identifyUser, userRoutes);

// Game routes
router.use('/game', authenticate, identifyUser, gameRoutes);

// API is running
router.get('/', (req, res) => {
    res.status(StatusCodes.OK).send('Hello, world!');
});

export { router as routes };