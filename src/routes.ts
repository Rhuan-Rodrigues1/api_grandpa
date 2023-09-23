import { Router, Request, Response, NextFunction } from "express";
import { Posts } from "./controllers/PostsController";
import { Users } from "./controllers/UsersController";
import { authMiddlewares } from "./middlewares/auth";
import { UserMongoDBRepository } from "./repositories/usersRepository";
import { PostMongoDBepository } from "./repositories/postsRepository";

export const router = Router();

const usersController = new Users(new UserMongoDBRepository());
const postController = new Posts(new PostMongoDBepository());

router.post("/users", async (req: Request, res: Response) => {
  await usersController.create(req, res);
});

router.post("/login", async (req: Request, res: Response) => {
  await usersController.login(req, res);
});

router.post(
  "/post",
  async (req: Request, res: Response, next: NextFunction) => {
    authMiddlewares(req, res, next);
    await postController.create(req, res);
  }
);

router.get(
  "/profile",
  async (req: Request, res: Response, next: NextFunction) => {
    authMiddlewares(req, res, next);
    await usersController.getProfile(req, res);
  }
);

router.put(
  "/profile",
  async (req: Request, res: Response, next: NextFunction) => {
    authMiddlewares(req, res, next);
    await usersController.putProfile(req, res);
  }
);
