import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken() {
    // return this.jwtService.sign();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async checkToken(_token: string) {
    // this.jwtService.verify(token);
  }

  async login(email: string, password: string) {
    const user = this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email or password incorrect.');
    }

    return user;
  }

  async forget(email: string) {
    const user = this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email is incorrect.');
    }

    // TO DO: Enviar o e-mail

    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async reset(password: string, token: string) {
    // TO DO: Validar o token

    const id = '0';

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }
}
