import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

export class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { user } = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const token = await authenticateUserService.execute(user);

    //TODO: Return user
    return res.status(200).json(token);
  }
}
