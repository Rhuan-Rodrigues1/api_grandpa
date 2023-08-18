import { Request, Response } from "express";
import { Iusers } from "../services/UsersService";



export class Users {
    private userService: Iusers
    constructor(userService: Iusers) {
        this.userService = userService
    }
    async handle(req: Request, res: Response): Promise<void> {
        res.send("Teste")
    }
}