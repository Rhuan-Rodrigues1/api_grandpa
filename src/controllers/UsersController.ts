import { Request, Response } from "express";



export class Users {
    constructor (){}
    async handle(req: Request, res: Response): Promise<void> {
        res.send("Teste")
    }
}