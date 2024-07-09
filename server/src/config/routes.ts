import { Router } from 'express';
import authRoutes from '../routes/authRoutes';
import userRoutes from '../routes/userRoutes';

const router = Router();

// Authentication routes
router.use('/auth', authRoutes);

// User management routes
router.use('/users', userRoutes);

export { router as routes };
