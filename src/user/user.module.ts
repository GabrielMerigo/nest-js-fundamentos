import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserIdCheckMiddleware } from 'src/middlewares/user-id-check.middleware';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule], // aqui será modulos
  controllers: [UserController],
  providers: [UserService], // class ou funções que precisam ser injetaveis.
  exports: [],
})
export class UserModel implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });
  }
}
