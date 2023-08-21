import { User } from "../models/users";

export type FilterOptions = Record<string, unknown>

export type WithId<T> = {id: string } & T 

export interface BaseRepository<T> {
    create(data: T): Promise<WithId<T>>;
    findOne(options: FilterOptions): Promise<WithId<T> | undefined>;
    find(options: FilterOptions): Promise<WithId<T>[]>;
    deleteAll(): Promise<void>;
}

export interface UserRepository extends BaseRepository<User> {
    findOneById(id: string): Promise<WithId<User> | undefined>;
    findOneByEmail(email: string): Promise<WithId<User> | undefined>;
  }