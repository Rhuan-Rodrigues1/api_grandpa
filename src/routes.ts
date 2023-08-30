import { Router, Request, Response } from "express";
import { Users } from "./controllers/UsersController";
import { UserMongoDBRepository } from "./repositories/usersRepository";
import { PostMongoDBepository } from "./repositories/postsRepository";
import { Posts } from "./controllers/PostsController";

export const router = Router();

const usersController = new Users(new UserMongoDBRepository());
const postController = new Posts(new PostMongoDBepository());


router.post('/users', async (req: Request, res: Response) => {
    await usersController.create(req, res);
});


router.post('/login', async(req: Request, res: Response) => {
    await usersController.login(req, res);
})

router.post('/post', async(req: Request, res: Response) => {
    await postController.create(req, res);
})