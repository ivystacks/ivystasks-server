import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Status } from '../status-enum';

export type WithdrawalDocument = Withdrawal & Document;

@Schema()
export class Withdrawal {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: string;

  @Prop()
  amount: number;
  @Prop()
  address: string;
  @Prop()
  currency: string;

  @Prop()
  status: Status;

  @Prop({ default: Date.now })
  date: Date;
}

export const WithdrawalSchema = SchemaFactory.createForClass(Withdrawal);
