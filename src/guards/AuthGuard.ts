import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        let req: Request = context.switchToHttp().getRequest();
        let authHeader = req.headers['x-auth-user-id'];

        return !(!authHeader || authHeader == '' || authHeader === null);
    }
}