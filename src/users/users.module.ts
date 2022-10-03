import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from './models/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { OtpSchema } from './models/otp.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'user', schema: UserSchema },
      { name: 'otp', schema: OtpSchema },
    ]),
  ],
  controllers: [UsersController],

  providers: [UsersService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
