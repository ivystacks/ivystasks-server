/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvestmentDto } from './dto/investment-dto';
import { InvestmentDocument } from './models/investment.model';
import { UserDocument } from 'src/users/models/user.model';
import { Status } from './status-enum';
import { ApproveInvestmentDto } from './dto/approve-investment-dto';

@Injectable()
export class InvestmentsService {
  constructor(
    @Inject(REQUEST) private req: Request,
    @InjectModel('investment')
    private readonly investmentModel: Model<InvestmentDocument>,
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}
  async invest(investmentDto: InvestmentDto) {
    const { id } = this.req.user as UserDocument;
    const { amount, roi } = investmentDto;
    const findUser = await this.userModel.findById(id);
    const balance = findUser.walletBalance;
    if (amount > balance) {
      throw new UnauthorizedException('Low walletBalance please deposit');
    }
    const deductBalance = balance - amount;
    const updateBalance = await this.userModel.findByIdAndUpdate(id, {
      walletBalance: deductBalance,
    });
    const invest = new this.investmentModel({
      user_id: id,
      amount,
      roi,
      status: Status.inProgress,
    });
    const res = await invest.save();

    return 'Investment in Progress!';
  }

  async approveInvestment(id: any) {
    const findUserbyId = await this.investmentModel.findById(id);
    const userId = findUserbyId.user_id;
    const roi = findUserbyId.roi;
    const find = await this.investmentModel.findByIdAndUpdate(id, {
      status: Status.matured,
    });
    const addbalance = await this.userModel.updateOne(
      { user_id: userId },
      { $inc: { walletBalance: roi } },
    );
    return 'approved!';
  }
  async getAllInvestments() {
    return await this.investmentModel.find({});
  }
  async getInvestments(id: any) {
    return await this.investmentModel.find({
      user_id: id,
    });
  }
  async getNumberofInvestments(id: any) {
    const investment = this.investmentModel.find({
      user_id: id,
    });
    const number = investment.count();
    return number;
  }
}
