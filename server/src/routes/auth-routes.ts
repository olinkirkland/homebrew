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
import identifyUser from '../middleware/identify-user-middleware';

const router = Router();

router.post('/guest', createNewGuest);
router.post('/login', login);
router.get('/token', fetchToken);
router.post('/register', authenticate, identifyUser, register);
router.post('/logout', authenticate, logout);
router.post('/forgot-password', forgotPassword); // todo
router.post('/reset-password', resetPassword); // todo
router.post('/verify-email', verifyEmail); // todo
router.post('/resend-verification', resendVerification); // todo

export default router;
