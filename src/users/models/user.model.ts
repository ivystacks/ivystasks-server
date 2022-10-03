import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  isAdmin: boolean;

  @Prop({ default: 0 })
  walletBalance: number;

  // @Prop({ default: Date.now })
  // date_registered: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
