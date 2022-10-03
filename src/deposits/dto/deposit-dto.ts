import { IsNotEmpty } from 'class-validator';
import { Status } from '../status-enum';

export class DepositDto {
  user_id: string;
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  currency: string;
  @IsNotEmpty()
  image_url: string;
}
