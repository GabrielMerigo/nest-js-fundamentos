import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const user = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );

      request.userToken = user;
      request.user = await this.userService.show(user.id);

      return true;
    } catch (err) {
      return false;
    }
  }
}
