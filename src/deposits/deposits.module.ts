import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/models/user.model';
import { UsersModule } from 'src/users/users.module';
import { DepositsController } from './deposits.controller';
import { DepositsService } from './deposits.service';
import { DepositSchema } from './models/deposit.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'deposit', schema: DepositSchema },
      { name: 'user', schema: UserSchema },
    ]),
    UsersModule,
  ],
  controllers: [DepositsController],
  providers: [DepositsService],
})
export class DepositsModule {}
