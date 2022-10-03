import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Status } from '../status-enum';

export type DepositDocument = Deposit & Document;

@Schema()
export class Deposit {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: string;

  @Prop()
  amount: number;

  @Prop()
  image_url: string;

  @Prop()
  currency: string;

  @Prop()
  status: Status;

  @Prop({ default: Date.now })
  date: Date;
}

export const DepositSchema = SchemaFactory.createForClass(Deposit);
