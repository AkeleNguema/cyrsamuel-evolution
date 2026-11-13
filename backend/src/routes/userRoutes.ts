import { Router } from 'express';
import { createPlayer, getPlayer, levelUpPlayer } from '../controllers/userController';

const router = Router();

// Route POST : http://localhost:5000/api/users/register
router.post('/register', createPlayer);

// Route GET : http://localhost:5000/api/users/:id
router.get('/:id', getPlayer);

// Route PUT : http://localhost:5000/api/users/:id/level-up (et alias /:id/levelup)
router.put('/:id/level-up', levelUpPlayer);
router.put('/:id/levelup', levelUpPlayer);

export default router;
