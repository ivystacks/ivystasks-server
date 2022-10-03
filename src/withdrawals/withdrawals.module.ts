import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepositSchema } from 'src/deposits/models/deposit.model';
import { UserSchema } from 'src/users/models/user.model';
import { UsersModule } from 'src/users/users.module';
import { WithdrawalSchema } from './models/withdrawal.model';
import { WithdrawalsController } from './withdrawals.controller';
import { WithdrawalsService } from './withdrawals.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'withdrawal', schema: WithdrawalSchema },
      { name: 'user', schema: UserSchema },
    ]),
    UsersModule,
  ],
  controllers: [WithdrawalsController],
  providers: [WithdrawalsService],
})
export class WithdrawalsModule {}
