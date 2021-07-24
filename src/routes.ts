import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateUserController } from './controllers/CreateUserController';

// Controllers
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

const router = Router();

// Users Routes
router.post('/api/users', createUserController.handle);
router.post('/api/users/login', authenticateUserController.handle);

export { router };
