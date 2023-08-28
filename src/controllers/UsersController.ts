import { Request, Response } from "express";
import { InternalError, UserNotExist } from "../utils/errors/userErrors";
import { UserMongoDBRepository } from "../repositories/usersRepository";
import { AuthService } from "../services/AuthService";


export class Users {
    private userService: UserMongoDBRepository
    constructor(userService: UserMongoDBRepository) {
        this.userService = userService
    }
    public async create(req: Request, res: Response): Promise<any> {
        const {name, surname, email, password, age, cpf, address, isCareviger} = req.body

        try {
            
            const user = await this.userService.create({name, surname, email, password, age, cpf, address, isCareviger})
    
            return res.status(200).send(user)
        } catch (err){
            throw new InternalError("Not found !!")           
            
        }
    }

    public async login(req: Request, res: Response) {
        const user = await this.userService.findOneByEmail(req.body.email)

        if(!user) {
            throw new UserNotExist("User not found")
        }

        if(!(await AuthService.comparePassword(req.body.password, user.password))) {
            throw new UserNotExist("Password does not match!")
        }

        const token = AuthService.generateToken(user.id)

        res.send({ ...user, ...{token}})
    }
}