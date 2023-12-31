import { BaseModel } from "../models/index";
import { CUSTOM_VALIDATION } from "../models/users";
import { Error, Model } from "mongoose";
import { FilterOptions, WithId } from ".";
import {
  DatabaseInternalError,
  DatabaseUnknownClientError,
  DatabaseValidationError,
  Repository,
} from "./repository";

export abstract class DefaultMongoDBRepository<
  T extends BaseModel
> extends Repository<T> {
  constructor(private model: Model<T>) {
    super();
  }

  async create(data: T): Promise<any> {
    try {
      const model = new this.model(data);
      const createdData = await model.save();
      return createdData.toJSON<WithId<T>>();
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: T, data: T): Promise<any> {
    try {
      const dataModel = await this.model.findByIdAndUpdate(id, data);
      return dataModel?.toJSON<WithId<T>>();
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(options: FilterOptions): Promise<any> {
    try {
      const data = await this.model.findOne(options);
      return data?.toJSON<WithId<T>>();
    } catch (error) {
      this.handleError(error);
    }
  }

  async find(filter: FilterOptions): Promise<any> {
    try {
      const data = await this.model.find(filter);
      return data.map((d) => d.toJSON<WithId<T>>());
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteAll() {
    await this.model.deleteMany({});
  }

  async delete(id: T) {
    await this.model.findByIdAndDelete(id);
  }

  protected handleError(error: unknown): never {
    if (error instanceof Error.ValidationError) {
      const duplicatedKindErrors = Object.values(error.errors).filter(
        (err) =>
          err.name === "ValidatorError" &&
          err.kind === CUSTOM_VALIDATION.DUPLICATED
      );
      if (duplicatedKindErrors.length) {
        throw new DatabaseValidationError(error.message);
      }
      throw new DatabaseUnknownClientError(error.message);
    }
    throw new DatabaseInternalError(
      "Something unexpected happened to the database"
    );
  }
}
