import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { RequestWithUser } from './interfaces/requestWithUser.interface';
import { ApiBody } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { JwtAuthGuards } from './guards/jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입
  @Post('/signup')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.registerUser(createUserDto);
  }

  // 로그인
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({ type: LoginUserDto })
  async loggedInUser(@Req() req: RequestWithUser) {
    const { user } = req;
    const accessToken = await this.authService.generateAccessToken(user.id);

    return { user, accessToken };
  }

  // 로그인 후 유저정보 가져오는 API
  @UseGuards(JwtAuthGuards)
  @Get()
  async getUserInfo(@Req() req: RequestWithUser) {
    return req.user;
  }
}
