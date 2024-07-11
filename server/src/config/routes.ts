import { Router } from 'express';
import authRoutes from '../routes/auth-routes';
import userRoutes from '../routes/user-routes';

const router = Router();

// Authentication routes
router.use('/auth', authRoutes);

// User management routes
router.use('/user', userRoutes);

export { router as routes };
