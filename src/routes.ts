import { Router, Request, Response } from "express";
import { Users } from "./controllers/UsersController";
import { UserMongoDBRepository } from "./repositories/usersRepository";

export const router = Router()

const usersController = new Users(new UserMongoDBRepository())

router.post('/users', async (req: Request, res: Response) => {
    await usersController.handle(req, res);
});