import { Router } from 'express';
import {
    getMe,
    updateProfile,
    changePassword,
    deleteUser,
} from '../controllers/userController';

const router = Router();

router.get('/me', getMe);
router.put('/update-profile', updateProfile);
router.put('/change-password', changePassword);
router.delete('/delete', deleteUser);

export default router;
