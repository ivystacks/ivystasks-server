import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UtilityModule } from './utility/utility.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DepositsModule } from './deposits/deposits.module';
import { WithdrawalsModule } from './withdrawals/withdrawals.module';
import { InvestmentsModule } from './investments/investments.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://ivystacks:QWERTY101@cluster0.vdq8jeo.mongodb.net/?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    UtilityModule,
    DepositsModule,
    WithdrawalsModule,
    InvestmentsModule,
  ],
})
export class AppModule {}
