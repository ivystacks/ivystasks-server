import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InvestmentsService } from './investments.service';
import { ApproveInvestmentDto } from './dto/approve-investment-dto';
import { InvestmentDto } from './dto/investment-dto';

@Controller('investment')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() investmentDto: InvestmentDto) {
    return this.investmentsService.invest(investmentDto);
  }

  @Post('approve/:id')
  approveInvestment(@Param('id') id: any) {
    return this.investmentsService.approveInvestment(id);
  }

  @Get('all')
  getAllInvestments() {
    return this.investmentsService.getAllInvestments();
  }
  @Get('user/:id')
  getInvestments(@Param('id') id: any) {
    return this.investmentsService.getInvestments(id);
  }
  @Get('total/:id')
  getNumberOfInvestments(@Param('id') id: any) {
    return this.investmentsService.getNumberofInvestments(id);
  }
}
