import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { RequestWithUser } from './interfaces/requestWithUser.interface';
import { ApiBody } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guards';

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
    console.log('passport ver login');
    return req.user;
    // return await this.authService.loggedInUser(loginUserDto);
    // 이렇게 하는걸 보안적으로 nestJS에서 권장하지 안음
  }

  // 2. 유저서비스에 등록하는 로직, id/email을 기반으로 유저를 찾는 로직
  // 3. Auth 리소스를 생성
  // 4. 유저 모듈에서 유저 서비스를 Export -> Auth 모듈에서 유저 모듈을 import
  // 5. Auth Controller에 회원가입과 로그인 엔드포인트 만들기
}
