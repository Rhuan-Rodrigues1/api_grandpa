import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

export interface Token {
    sub: string
}

export class AuthService {
    public async hashPassword(password: string, salt = 10): Promise<string> {
        return await bcrypt.hash(password, salt)
    }

    public async comparePassword(password: string, hashded: string): Promise<boolean> {
        return bcrypt.compare(password, hashded)
    }

    public static generateToken(sub: string): string {
        return jwt.sign({ sub }, process.env.SECRET_KEY, {
            expiresIn: 36000
        })
    }

    public static decode(token: string): Token {
        return jwt.verify(token, process.env.SECRET_KEY) as Token
    }
}