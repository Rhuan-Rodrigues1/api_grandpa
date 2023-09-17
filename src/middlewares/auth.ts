import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";

export function authMiddlewares(
  req: Partial<Request>,
  res: Partial<Response>,
  next: NextFunction
): void {
  const token = req.headers?.["x-access-token"];

  try {
    const decoded = AuthService.decode(token as string);
    req.context = { userId: decoded.sub };
  } catch (error) {
    console.log(error);
  }
}
