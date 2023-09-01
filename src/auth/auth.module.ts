import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '|f}Oc5lbtu3^?Xj#9>CPTJ}1;rfmQ?]!',
    }),
    forwardRef(() => UserModule),
    PrismaModule,
  ],
  providers: [UserService, AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
