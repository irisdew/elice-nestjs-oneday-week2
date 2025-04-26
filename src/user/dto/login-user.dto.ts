import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'ycleardew@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password1234' })
  password: string;
}
