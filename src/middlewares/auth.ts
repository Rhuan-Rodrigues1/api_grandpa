import { Request,Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";


export function authMiddlewares(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers?.['x-access-token'];

    try {
        const decode = AuthService.decode(token as string);
        req.context = {userId: decode.sub};

    } catch (error) {
        console.log(error);
        
    }
}