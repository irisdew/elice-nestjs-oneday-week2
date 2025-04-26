import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalAuthStrategy } from './strategies/local.auth.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { googleAuthStrategy } from './strategies/google-auth.strategy';

@Module({
  imports: [UserModule, ConfigModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalAuthStrategy,
    JwtAuthStrategy,
    googleAuthStrategy,
  ],
})
export class AuthModule {}
