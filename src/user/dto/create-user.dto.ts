import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'ycleardew@gmail.com' })
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty({ example: 'elice' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password1234' })
  password: string;
}
