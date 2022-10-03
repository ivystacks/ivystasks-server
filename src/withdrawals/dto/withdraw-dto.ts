import { IsNotEmpty } from 'class-validator';
import { Status } from '../status-enum';

export class WithdrawDto {
  user_id: string;
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  currency: string;
  @IsNotEmpty()
  address: string;
}
