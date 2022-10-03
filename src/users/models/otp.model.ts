import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtpDocument = Otp & Document;

@Schema()
export class Otp {
  @Prop()
  email: string;

  @Prop()
  otp: string;

  @Prop({ default: Date.now, expires: 1000 })
  createdAt: Date;
}
// createdAt: { type: Date, expires: 3600, default: Date.now }
export const OtpSchema = SchemaFactory.createForClass(Otp);
