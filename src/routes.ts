import { Router } from "express";
import { Users } from "./controllers/UsersController";
import { UserDBRepository } from "./repositories/usersDBRepository";

export const router = Router()


const createUsersControllers = new Users(new UserDBRepository())

router.get("/users", createUsersControllers.handle)