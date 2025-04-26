import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return newUser;
  }
}
