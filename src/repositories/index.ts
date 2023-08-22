import { User } from '../models/users';


export interface BaseRepository<T> {
  create(data: T): Promise<T>;
  findOne(options: T): Promise<T>;
  find(options: T): Promise<T>;
  deleteAll(): Promise<T>;
}


export interface UserRepository extends BaseRepository<User> {
  findOneById(id: string): Promise<void>;
  findOneByEmail(email: string): Promise<void>;
}