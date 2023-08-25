import { UserRepository } from "../repositories";
import { EmailUserError, NameUserError, InvalidEmailError } from "../utils/errors/userErrors";

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
                throw new EmailUserError("Already exists in the database.")
            }

            if(!emailRegex.test(email)) {
                throw new InvalidEmailError("Invalid email")
            }

            if(!name) {
                throw new EmailUserError("Path `name` is required.")
            }

            if(await this.userRepository.findOneByEmail(email)){
                throw new NameUserError("User validation failed: email: already exists in the database.")
            }

            const user = await this.userRepository.create({name, surname, email, password, age, cpf, address, isCareviger})
            
            return user
    }
}