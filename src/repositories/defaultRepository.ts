import { BaseModel } from '../models/index';
import { Model } from 'mongoose';


export abstract class DefaultMongoDBRepository<
  T extends BaseModel
> {
  constructor(private model: Model<T>) {
  }

  async create(data: T) {
    try {
      const model = new this.model(data);
      const createdData = await model.save();
      return createdData.toJSON();
    } catch (error) {
      console.log(error);
      
    }
  }

  async findOne(options: any) {
    try {
      const data = await this.model.findOne(options);
      return data?.toJSON();
    } catch (error) {
      console.log(error);
      
    }
  }

  async find(filter: any) {
    try {
      const data = await this.model.find(filter);
      return data.map((d) => d.toJSON());
    } catch (error) {
      console.log(error);
      
    }
  }

  async deleteAll() {
    await this.model.deleteMany({});
  }

}