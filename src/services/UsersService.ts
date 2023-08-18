export interface Iusers {
    execute(name: String, surname: String, age: Number, cpf: String, address: String, isCareviger: Boolean): Promise<void>
}

class UsersService implements Iusers {
    constructor(){}


    public async execute(name: String, surname: String, age: Number, cpf: String, address: String, isCareviger: Boolean): Promise<void> {
        
    }
}