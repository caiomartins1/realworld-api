import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';

// Controllers
const createUserController = new CreateUserController();

const router = Router();

// Users Routes
router.post('/api/users', createUserController.handle);

export { router };
