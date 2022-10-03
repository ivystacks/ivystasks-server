/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DepositDto } from './dto/deposit-dto';
import { DepositDocument } from './models/deposit.model';
import { UserDocument } from 'src/users/models/user.model';
import { Status } from './status-enum';
import { ApproveDepositDto } from './dto/approve-deposit-dto';

@Injectable()
export class DepositsService {
  constructor(
    @Inject(REQUEST) private req: Request,
    @InjectModel('deposit')
    private readonly depositModel: Model<DepositDocument>,
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}
  async deposit(depositDto: DepositDto) {
    const { id } = this.req.user as UserDocument;
    const { amount, image_url, currency } = depositDto;

    const deposit = new this.depositModel({
      user_id: id,
      amount,
      image_url,
      currency,
      status: Status.pending,
    });
    const res = await deposit.save();

    return 'Deposit submitted for review!';
  }
  async getNameById(id: any) {
    const getUser = await this.userModel.findById(id);
    const name = getUser.name;
    return name;
  }

  async getAllDeposits() {
    const allDeposits = await this.depositModel.find();
    return { allDeposits };
  }
  async getDeposits(id: any) {
    const getDeposits = await this.depositModel.find({
      user_id: id,
    });

    return { getDeposits };
  }
  async approveDeposit(approveDepositDto: ApproveDepositDto) {
    const { id, amount } = approveDepositDto;
    const findDepositbyId = await this.depositModel.findById(id);
    const userId = findDepositbyId.user_id;

    const findUser = await this.userModel.findById(userId);

    const balance = findUser.walletBalance;
    const add = balance + amount;

    const find = await this.depositModel.findByIdAndUpdate(id, {
      status: Status.success,
    });
    if (findDepositbyId.status !== Status.success) {
      const updateBalance = await this.userModel.findByIdAndUpdate(findUser, {
        walletBalance: add,
      });

      return `Approved Deposit `;
    }
    return 'this has been approved already';
  }
  async declineDeposit(id: any) {
    const find = await this.depositModel.findByIdAndUpdate(id, {
      status: Status.failed,
    });
  }
}
