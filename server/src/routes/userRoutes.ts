import { Router } from 'express';
import {
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
} from '../controllers/userController';

const router = Router();

// GET /api/users
router.get('/', getUsers);

// GET /api/users/:id
router.get('/:id', getUserById);

// PUT /api/users/:id
router.put('/:id', updateUserById);

// DELETE /api/users/:id
router.delete('/:id', deleteUserById);

export default router;
