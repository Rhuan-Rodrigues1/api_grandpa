import { Request, Response } from "express";
import { UserMongoDBRepository } from "../repositories/usersRepository";


export class Users {
    private userService: UserMongoDBRepository
    constructor(userService: UserMongoDBRepository) {
        this.userService = userService
    }
    async handle(req: Request, res: Response): Promise<any> {
        const {name, surname, email, password, age, cpf, address, isCareviger} = req.body

        try {
            
            const user = await this.userService.create({name, surname, email, password, age, cpf, address, isCareviger})
    
            return res.status(200).send(user)
        } catch (err){
            console.log(err);
            
        }
    }
}