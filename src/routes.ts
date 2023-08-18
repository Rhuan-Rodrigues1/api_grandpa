import { Router } from "express";
import { Users } from "./controllers/UsersController";

export const router = Router()


const createUsersControllers = new Users()

router.get("/users", createUsersControllers.handle)