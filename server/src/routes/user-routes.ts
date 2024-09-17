import { Router } from 'express';
import {
    deleteUser,
    getUser,
    updateProfile
} from '../controllers/user-controller';

const router = Router();

router.get('/user/:id', getUser);
router.put('/update-profile', updateProfile);
router.delete('/delete', deleteUser);

export default router;
