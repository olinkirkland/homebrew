import { Router } from 'express';
import {
    createNewGuest,
    fetchToken,
    forgotPassword,
    login,
    logout,
    register,
    resendVerification,
    resetPassword,
    verifyEmail,
} from '../controllers/auth-controller';
import authenticate from '../middleware/auth-middleware';
import identifyUser from '../middleware/identify-middleware';

const router = Router();

router.post('/guest', createNewGuest);
router.post('/login', login);
router.get('/token', fetchToken);
router.post('/register', authenticate, identifyUser, register);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerification);

export default router;
