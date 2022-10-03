import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DepositsService } from './deposits.service';
import { ApproveDepositDto } from './dto/approve-deposit-dto';
import { DepositDto } from './dto/deposit-dto';

@Controller('deposits')
export class DepositsController {
  constructor(private readonly depositsService: DepositsService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() depositDto: DepositDto) {
    return this.depositsService.deposit(depositDto);
  }

  @Post('approve')
  approveDepo(@Body() approveDeposit: ApproveDepositDto) {
    return this.depositsService.approveDeposit(approveDeposit);
  }
  @Post('decline/:id')
  declineDepo(@Param('id') id: any) {
    return this.depositsService.declineDeposit(id);
  }

  @Get()
  getAllDeposits() {
    return this.depositsService.getAllDeposits();
  }
  @Get('name/:id')
  getName(@Param('id') id: any) {
    return this.depositsService.getNameById(id);
  }
  @Get('user/:id')
  getDeposits(@Param('id') id: any) {
    return this.depositsService.getDeposits(id);
  }
}
