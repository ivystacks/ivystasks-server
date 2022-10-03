import { IsNotEmpty } from 'class-validator';
import { Status } from '../status-enum';

export class InvestmentDto {
  user_id: string;
  @IsNotEmpty()
  amount: number;
  roi: number;
}
