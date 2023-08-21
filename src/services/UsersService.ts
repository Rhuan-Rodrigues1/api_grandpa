
interface userDatas {
    name: String
    surname: String 
    email: String
    password: String 
    age: Number 
    cpf: String
    address: String 
    isCareviger: Boolean    
}

export interface Iusers {
    execute({name, surname, email, password, age, cpf, address, isCareviger}: userDatas): Promise<void>
}

class UsersService implements Iusers {
    public async execute({name, surname, email, password, age, cpf, address, isCareviger}: userDatas): Promise<void> {
  

    }
}