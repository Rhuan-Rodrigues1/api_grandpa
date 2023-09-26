import mongoose, { Document } from "mongoose";
import { AuthService } from "../services/AuthService";
import { BaseModel } from "./index";

export interface User extends BaseModel {
  name: string;
  surname: string;
  email: string;
  password: string;
  age: number;
  cpf: string;
  address: string;
  isCareviger: boolean;
}

export interface ExistingUser extends User {
  id: string;
}

export enum CUSTOM_VALIDATION {
  DUPLICATED = "DUPLICATED",
}

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: false },
    email: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    age: { type: Number, required: false },
    cpf: { type: String, required: false },
    address: { type: String, required: false },
    isCareviger: { type: Boolean, required: false },
  },
  {
    toJSON: {
      transform: (_, ret: any): void => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

schema.path("email").validate(
  async (email: string) => {
    const emailCount = await mongoose.models.User.countDocuments({ email });
    return !emailCount;
  },
  "already exists in the database.",
  CUSTOM_VALIDATION.DUPLICATED
);

schema.pre<User & Document>("save", async function (): Promise<void> {
  if (!this.password || !this.isModified("password")) {
    return;
  }

  try {
    const hashdedPassword = await AuthService.hashPassword(this.password);
    this.password = hashdedPassword;
  } catch (err) {
    console.log(err);
  }
});

export const User = mongoose.model<User>("User", schema);
