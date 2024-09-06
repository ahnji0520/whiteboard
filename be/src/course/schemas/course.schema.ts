import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Student {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  studentId: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  postId: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);

@Schema()
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  courseId: string;

  @Prop({ required: true })
  classification: string; // 'major' 또는 'liberal-arts'

  @Prop({ required: true })
  department: string;

  @Prop({
    required: true,
    type: {
      id: { type: String, required: true },
      name: { type: String, required: true },
    },
  })
  professor: {
    id: string;
    name: string;
  };

  @Prop({ type: [StudentSchema], default: [] })
  students: Student[];

  @Prop({ type: [PostSchema], default: [] })
  posts: Post[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
