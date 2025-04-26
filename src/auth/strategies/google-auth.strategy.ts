import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth2';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { config } from 'rxjs';
import { VerifiedCallback } from 'passport-jwt';

@Injectable()
export class googleAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_AUTH_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_AUTH_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_AUTH_CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifiedCallback,
  ) {
    console.log(profile);

    return profile;
    // 이메일 있으면 로그인,
    // 이메일 없으면 회원가입 후 유저 리턴 (with JWT 생성)
  }
}
