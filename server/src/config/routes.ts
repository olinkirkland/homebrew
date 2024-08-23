import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import authRoutes from '../routes/auth-routes';
import userRoutes from '../routes/user-routes';

const router = Router();

// Authentication routes
router.use('/auth', authRoutes);

// User management routes
router.use('/user', userRoutes);

// API is running
router.get('/', (req, res) => {
    res.status(StatusCodes.OK).send('Hello, world!');
});

export { router as routes };
