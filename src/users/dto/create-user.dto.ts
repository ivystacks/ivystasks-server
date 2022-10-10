import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  @IsNotEmpty()
  @IsString()
  password: string;
  isAdmin: boolean;
}
