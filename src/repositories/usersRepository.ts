import { DefaultMongoDBRepository } from './defaultRepository';
import { User } from '../models/users';
import {  UserRepository } from './index';


export class UserMongoDBRepository
  extends DefaultMongoDBRepository<User>
  implements UserRepository
{
  constructor(userModel = User) {
    super(userModel);
  }

  async findOneById(id: string): Promise<any> {
    return await this.findOne({ _id: id });
  }

  async findOneByEmail(email: string): Promise<any> {
    return await this.findOne({ email });
  }
  
  async create(data: User): Promise<any> {
    return await this.create(data)
  }

  async findOne(options: any): Promise<any> {
    return await this.findOne(options)
  }

  async find(filter: any): Promise<any> {
    return await this.find(filter)
  }

  async deleteAll(): Promise<any> {
    return await this.deleteAll()
  }

}