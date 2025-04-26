import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async sendEmail(email: string) {
    return await this.emailService.sendEmail({
      to: email,
      subject: 'Welcome to Elicelab - Oneday NestJS Class',
      text: '메일 인증 본문입니다.',
    });
  }

  async registerUser(createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);

    return newUser;
  }

  async loggedInUser(loginUserDto: LoginUserDto) {
    // 1.email 유무 체크 -> 2.패스워드 매칭(with decoding) -> 3.return JWT

    const { email, password } = loginUserDto;

    // 1.
    const user = await this.userService.getUserByIdOrEmail('email', email);

    // 2.
    const isPasswordMatched = await user.checkPassword(password);
    if (!isPasswordMatched) {
      throw new HttpException("Password dosen't match", HttpStatus.BAD_REQUEST);
    }

    // password 를 response에 안보여주기 위해서
    user.password = undefined;

    // 3

    return user;
  }

  public generateAccessToken(userId: string) {
    const payload: any = { userId };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('ACCESSTOKEN_SECRET'),
      expiresIn: this.configService.get<string>('ACCESSTOKEN_EXPIRATION_TIME'),
    });

    return accessToken;
  }
}
