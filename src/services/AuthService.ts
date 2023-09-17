import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface Token {
  sub: string;
}

export class AuthService {
  public static async hashPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public static async comparePassword(
    password: string,
    hashded: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashded);
  }

  public static generateToken(sub: string): string {
    return jwt.sign({ sub }, "YtVHUFXjBtCdUtp3OOGtF8h_ogr_ZoT73pI76HxxylQ", {
      expiresIn: 36000,
    });
  }

  public static decode(token: string): Token {
    return jwt.verify(
      token,
      "YtVHUFXjBtCdUtp3OOGtF8h_ogr_ZoT73pI76HxxylQ"
    ) as Token;
  }
}
