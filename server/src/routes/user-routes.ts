import { Router } from 'express';
import {
    deleteUser,
    getMe,
    updateProfile
} from '../controllers/user-controller';

const router = Router();

router.get('/me', getMe);
router.put('/update-profile', updateProfile);
router.delete('/delete', deleteUser);

export default router;
