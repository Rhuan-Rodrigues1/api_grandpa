import mongoose, { Document } from 'mongoose';
import { BaseModel } from './index'

export interface User extends BaseModel {
    name: string
    surname: string 
    email: string
    password: string 
    age: number 
    cpf: string
    address: string 
    isCareviger: boolean

}

export interface ExistingUser extends User {
  id: string
}

export enum CUSTOM_VALIDATION {
  DUPLICATED = 'DUPLICATED',
}

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: {type: String, required: false },
    email: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    age: {type: Number, required: false},
    cpf: {type: String, required: false},
    address: {type: String, required: false}, 
    isCareviger: {type: Boolean, required: false}
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id.toString()
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);


schema.path('email').validate(
  async (email: string) => {
    const emailCount = await mongoose.models.User.countDocuments({ email });
    return !emailCount;
  },
  'already exists in the database.',
  CUSTOM_VALIDATION.DUPLICATED
);


export const User = mongoose.model<User>('User', schema)