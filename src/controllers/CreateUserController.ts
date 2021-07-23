import { Request, Response } from 'express';

import { CreateUserService } from '../services/CreateUserService';

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { user } = req.body;

    const createUserService = new CreateUserService();

    try {
      const createdUser = await createUserService.execute(user);
      return res.status(201).json(createdUser);
    } catch (error) {
      return res.status(400).json({
        erros: {
          body: [error.message],
        },
      });
    }
  }
}
