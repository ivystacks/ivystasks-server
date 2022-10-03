/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from '../auth/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Payload } from 'src/auth/payload';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Email } from './dto/verify-otp.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.registerUser(createUserDto);
  }
  // @Post('login')
  // async loginUser(@Body() loginUserdto: LoginUserDto){
  //   const user = await this.usersService.loginUser(loginUserdto)
  //   //  this.userService.findByLogin(UserDTO);
  //     const payload = {
  //       email: user.email,
  //     };
  //     const token = await this.authService.signPayload(payload);
  //     return { user, token};
  // }

  @Get('')
  findAll() {
    return this.usersService.getUsers();
  }
  @Post('/admin/?id&email')
  admin(@Param() id: any, email: any) {
    return this.usersService.makeAdmin(id, email);
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
  @Post('/reset')
  resetUserPassword(@Body() email: Email) {
    return this.usersService.resetPassword(email);
  }
  @Post('/reset/verify')
  verifyResetPassword(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.usersService.verifyOtp(verifyOtpDto);
  }
  @Post('/reset/update')
  updateUserPassword(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updatePassword(updateUserDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
