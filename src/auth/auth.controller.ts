import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입
  @Post('/signup')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.registerUser(createUserDto);
  }

  // 로그인
  @Post('/login')
  async loggedInUser(@Body() loginUserDto: LoginUserDto) {}

  // 1. 유저 리소스 -> 유저 엔티티 -> 유저 모듈에 등록
  // 2. 유저서비스에 등록하는 로직, id/email을 기반으로 유저를 찾는 로직
  // 3. Auth 리소스를 생성
  // 4. 유저 모듈에서 유저 서비스를 Export -> Auth 모듈에서 유저 모듈을 import
  // 5. Auth Controller에 회원가입과 로그인 엔드포인트 만들기
}
