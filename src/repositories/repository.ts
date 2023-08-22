import { BaseRepository } from './index';


export abstract class Repository<T> implements BaseRepository<T> {
  public abstract create(data: T): Promise<T>;

  public abstract findOne(
    options: any
  ): Promise<T>;

  public abstract find(filter: any): Promise<T>;

  public abstract deleteAll(): Promise<T>;
}