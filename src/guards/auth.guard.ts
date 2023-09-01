import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const token = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );

      request.token = token;

      return true;
    } catch (err) {
      return false;
    }
  }
}
