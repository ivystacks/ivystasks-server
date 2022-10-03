import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepositSchema } from 'src/deposits/models/deposit.model';
import { UserSchema } from 'src/users/models/user.model';
import { UsersModule } from 'src/users/users.module';
import { InvestmentsController } from './investments.controller';
import { InvestmentsService } from './investments.service';
import { InvestmentSchema } from './models/investment.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'investment', schema: InvestmentSchema },
      { name: 'user', schema: UserSchema },
    ]),
    UsersModule,
  ],
  controllers: [InvestmentsController],
  providers: [InvestmentsService],
})
export class InvestmentsModule {}
