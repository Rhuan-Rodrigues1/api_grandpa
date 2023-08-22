import { Router } from "express";
import { Users } from "./controllers/UsersController";
import { UserMongoDBRepository } from "../src/repositories/usersRepository";

export const router = Router()

const usersController = new Users(new UserMongoDBRepository())

router.get("/users", usersController.handle)