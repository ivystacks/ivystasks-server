import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Status } from '../status-enum';

export type InvestmentDocument = Investment & Document;

@Schema()
export class Investment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: string;

  @Prop()
  amount: number;

  @Prop()
  roi: number;

  @Prop()
  status: Status;

  @Prop({ default: Date.now })
  date: Date;
}

export const InvestmentSchema = SchemaFactory.createForClass(Investment);
