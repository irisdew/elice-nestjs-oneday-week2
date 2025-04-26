import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // id로 유저 찾기
  async getUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  // email로 유저 찾기
  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  // id 또는 email로 유저 찾기
  async getUserByIdOrEmail(key: 'id' | 'email', value: string) {
    const user = await this.userRepository.findOneBy({ [key]: value });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  // 유저를 생성하는 로직
  async createUser(userInput: CreateUserDto) {
    const newUser = await this.userRepository.create(userInput);
    await this.userRepository.save(newUser);
    return newUser;
  }
}
