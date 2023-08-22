
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
    execute({name, surname, email, password, age, cpf, address, isCareviger}: userDatas): Promise<void>
}

class UsersService implements Iusers {
    public async execute({name, surname, email, password, age, cpf, address, isCareviger}: userDatas): Promise<void> {
  

    }
}