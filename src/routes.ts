import { Router, Request, Response } from "express";
import { Users } from "./controllers/UsersController";
import { UserMongoDBRepository } from "./repositories/usersRepository";

export const router = Router()

const usersController = new Users(new UserMongoDBRepository())

router.post('/users', async (req: Request, res: Response) => {
    await usersController.create(req, res);
});


router.post('/login', async(req: Request, res: Response) => {
    await usersController.login(req, res)
})