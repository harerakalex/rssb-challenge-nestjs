import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const bearer_token = request.headers.authorization;
    if (!bearer_token) return false;

    const token = bearer_token.split(' ')[1];

    verify(token, process.env.JWT_SECRET_KEY, async (error: any) => {
      if (error) {
        return false;
      }
    });

    return true;
  }
}
