import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WithdrawalsService } from './withdrawals.service';
import { ApproveWithdrawalDto } from './dto/approve-withdrawal-dto';
import { WithdrawDto } from './dto/withdraw-dto';

@Controller('withdraw')
export class WithdrawalsController {
  constructor(private readonly withdrawalsService: WithdrawalsService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() withdrawDto: WithdrawDto) {
    return this.withdrawalsService.withdraw(withdrawDto);
  }

  @Post('approve/:id')
  approveWithdrawal(@Param('id') id: any) {
    return this.withdrawalsService.approveWithdrawal(id);
  }

  @Get()
  getAllWithdrawals() {
    return this.withdrawalsService.getAllWithdrawals();
  }
  @Get('user/:id')
  getWithdrawals(@Param('id') id: any) {
    return this.withdrawalsService.getWithdrawals(id);
  }
}
