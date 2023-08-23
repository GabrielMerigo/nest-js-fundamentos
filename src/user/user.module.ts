import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule], // aqui será modulos
  controllers: [UserController],
  providers: [UserService], // class ou funções que precisam ser injetaveis.
  exports: [],
})
export class UserModel {}
