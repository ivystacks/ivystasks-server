/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WithdrawDto } from './dto/withdraw-dto';
import { WithdrawalDocument } from './models/withdrawal.model';
import { UserDocument } from 'src/users/models/user.model';
import { Status } from './status-enum';
import { ApproveWithdrawalDto } from './dto/approve-withdrawal-dto';

@Injectable()
export class WithdrawalsService {
  constructor(
    @Inject(REQUEST) private req: Request,
    @InjectModel('withdrawal')
    private readonly withdrawalModel: Model<WithdrawalDocument>,
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}
  async withdraw(withdrawDto: WithdrawDto) {
    const { id } = this.req.user as UserDocument;
    const { amount, address, currency } = withdrawDto;

    const lowBalance = 'Low walletBalance please deposit';
    const minimumWithdrawal = 'sorry minimum withdrawais $50';
    const success = 'Withdrawal in progress!';

    const findUser = await this.userModel.findById(id);
    const balance = findUser.walletBalance;
    if (amount > balance) {
      throw new UnauthorizedException('Low walletBalance please deposit');
    }
    if (amount < 50) {
      throw new UnauthorizedException('sorry minimum withdrawais $50');
    }
    const deductBalance = balance - amount;
    const updateBalance = await this.userModel.findByIdAndUpdate(id, {
      walletBalance: deductBalance,
    });

    const withdraw = new this.withdrawalModel({
      user_id: id,
      amount,
      address,
      currency,
      status: Status.pending,
    });
    const res = await withdraw.save();

    return { success };
  }

  async approveWithdrawal(id: any) {
    const findUserbyId = await this.withdrawalModel.findById(id);
    const userId = findUserbyId.user_id;
    const find = await this.withdrawalModel.findByIdAndUpdate(id, {
      status: Status.paid,
    });
    return 'approved!';
  }
  async getAllWithdrawals() {
    return await this.withdrawalModel.find({});
  }
  async getWithdrawals(id: any) {
    return await this.withdrawalModel.find({
      user_id: id,
    });
  }
}
