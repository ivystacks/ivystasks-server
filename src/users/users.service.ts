/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../auth/login-user.dto';
import { Payload } from 'src/auth/payload';
import { OtpDocument } from './models/otp.model';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Email } from './dto/verify-otp.dto';
// eslint-disable-next-line prettier/prettier, @typescript-eslint/no-var-requires
  const postmark = require("postmark");
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    @InjectModel('otp') private readonly otpModel: Model<OtpDocument>,
  ) {}

  async findById(id: any) {
    console.log('UserID', id);
    const user = await this.userModel.findOne({ id });
    return user;
  }
  async findByEmail(email: any) {
    const user = await this.userModel.findOne({ email });
    return await user.name;
  }
  async findIdByEmail(email: any) {
    const user = await this.userModel.findOne({ email });
    return await user._id;
  }
  //register a user
  // async findUser(email: string) {

  //   return this.userModel.findOne({email: email})
  // }

  async registerUser(createUserDto: CreateUserDto) {
    const success = 'Registration Successful';
    const UserExist = 'Email exists please Login';
    const alreadyExist = await this.userModel
      .findOne({
        email: createUserDto.email,
      })
      .exec();
    if (!alreadyExist) {
      const { name, email, password } = createUserDto;
      const newUser = new this.userModel(createUserDto);
      const saltRounds = 10;
      newUser.name = name;
      newUser.email = email;
      newUser.password = await bcrypt.hash(createUserDto.password, saltRounds);
      newUser.isAdmin = false;
      await newUser.save();
      return { success };
    } else {
      throw new UnauthorizedException('User exists please login');
    }
  }

  async loginUser(login: LoginUserDto) {
    const { email, password } = login;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('users doesnt exist');
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    return user;
  }
  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }

  async getUsers() {
    return await this.userModel.find({});
  }
  async getNumberOfUsers() {
    return await this.userModel.count();
  }

  async resetPassword(emailDto: Email) {
    const email = emailDto.email;
    console.log(email);
    const alreadyExist = await this.userModel.findOne({
      email: email,
    });
    console.log(alreadyExist);
    if (!alreadyExist) {
      throw new BadRequestException('Email does not exist please Register');
    }
    const name = await this.findByEmail(email);
    const generateOtp = Math.random().toString(12).substr(2, 6);
    const saveOtp = {
      email: email,
      otp: generateOtp,
    };
    const newOtp = new this.otpModel(saveOtp);
    await newOtp.save();
    const client = new postmark.ServerClient(
      '0b83675f-1a7c-42ec-8641-b45a18bf7128',
    );
    client.sendEmail({
      From: 'temtsen.gabriel@binghamuni.edu.ng',
      To: newOtp.email,
      Subject: 'Reset Password',
      TextBody: `Hi ${name}, Use ${newOtp.otp} as your OTP, Please don't share. Disregard this email if you did not request it`,
    });
    // await this.mailService.sendUserConfirmation(newOtp.email, newOtp.otp);
    return 'OTP sent';
  }
  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { otp, email } = verifyOtpDto;
    const invalidOtp = 'Invalid OTP/ OTP expired!';
    const success = 'OTP Correct!';
    const find = await this.otpModel.findOne({
      email: email,
      otp: otp,
    });
    if (find === null) {
      return { invalidOtp };
    }
    return { success };
  }
  async updatePassword(updateUserDto: UpdateUserDto) {
    const success = 'password changed successfully!';
    const { email, confirmPassword, password } = updateUserDto;
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not Match');
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      updateUserDto.password,
      saltRounds,
    );
    const id = await this.findIdByEmail(email);
    const find = await this.userModel.findByIdAndUpdate(id, {
      password: hashedPassword,
    });
    return { success };
  }
  async makeAdmin(payload: LoginUserDto) {
    const { email, password } = payload;
    if (password === 'QWERTY101') {
      const user = await this.userModel.findOneAndUpdate(
        { email },
        {
          isAdmin: true,
        },
      );
      return true;
    }
    return false;
  }
}
