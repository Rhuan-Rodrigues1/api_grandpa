import { UserRepository } from "../repositories";

interface userDatas {
    name: string
    surname: string 
    email: string
    password: string 
    age: number 
    cpf: string
    address: string 
    isCareviger: boolean    
}

export interface Iusers {
    execute({name, surname, email, password, age, cpf, address, isCareviger}: userDatas): Promise<any>
}

class UsersService implements Iusers {
    private userRepository: UserRepository
    constructor(userRepository: UserRepository){
        this.userRepository = userRepository
    }
    public async execute({name, surname, email, password, age, cpf, address, isCareviger}: userDatas): Promise<any> {

        const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        
            if(!email) {
                throw new Error("Email obrigatorio")
            }

            if(!emailRegex.test(email)) {
                throw new Error("Email Invalido")
            }

            const user = await this.userRepository.create({name, surname, email, password, age, cpf, address, isCareviger})
            
            return user
    }
}