import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    required: function (this: UserDocument) {
      return this.role === 'student';
      // role이 'student'일 때만 필수항목이 됨
    },
  })
  studentId: string;

  @Prop({ required: true })
  role: string;
  // 'professor' 또는 'student'
}

export const UserSchema = SchemaFactory.createForClass(User);
