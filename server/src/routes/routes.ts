import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import authenticate from '../middleware/auth-middleware';
import identifyUser from '../middleware/identify-middleware';
import authRoutes from './auth-routes';
import userRoutes from './user-routes';

const router = Router();

// Authentication routes
router.use('/auth', authRoutes);

// User management routes
router.use('/user', authenticate, identifyUser, userRoutes);

// API is running
router.get('/', (req, res) => {
    res.status(StatusCodes.OK).send('Hello, world!');
});

export { router as routes };

