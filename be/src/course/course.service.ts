import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post, Course, CourseDocument } from './schemas/course.schema';
import { CourseDto } from './dto/course.dto';
import { StudentDto } from './dto/student.dto';
import { PostDto } from './dto/post.dto';
import { RecentPostDto } from './dto/recent-post.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async createCourse(createCourseDto: CourseDto): Promise<Course> {
    const createCourse = new this.courseModel({
      ...createCourseDto,
      students: [],
      posts: [],
    });
    return createCourse.save();
  }

  async findOne(courseId: string): Promise<CourseDocument> {
    const course = await this.courseModel.findOne({ courseId }).exec();

    if (!course) {
      return;
    }

    return course;
  }

  async getCourses(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async getCoursesByProfessorId(professorId: string): Promise<Course[]> {
    return this.courseModel.find({ 'professor.id': professorId }).exec();
  }

  async getCoursesByStudentId(studentId: string): Promise<Course[]> {
    return this.courseModel
      .find({
        students: { $elemMatch: { id: studentId } },
      })
      .exec();
  }

  async addStudentToCourse(
    courseId: string,
    studentDto: StudentDto,
  ): Promise<Course> {
    const course = await this.courseModel.findOne({ courseId });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    course.students.push(studentDto);
    return course.save();
  }

  async getStudentsByCourseId(courseId: string): Promise<StudentDto[]> {
    const course = await this.courseModel.findOne({ courseId }).exec();

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course.students.map((student) => ({
      id: student.id,
      studentId: student.studentId,
      name: student.name,
    }));
  }

  async getPostsByCourseId(courseId: string): Promise<PostDto[]> {
    const course = await this.courseModel.findOne({ courseId }).exec();

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course.posts.map((post) => ({
      title: post.title,
      content: post.content,
      timestamp: post.timestamp,
      postId: post.postId,
    }));
  }

  async getCourseByCourseId(courseId: string): Promise<Course> {
    const course = await this.courseModel.findOne({ courseId }).exec();

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async getPostByPostId(courseId: string, postId: string): Promise<Post> {
    const course = await this.courseModel.findOne({ courseId }).exec();

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const objectId = new Types.ObjectId(postId);

    const post = course.posts.find((p) => p.postId.equals(objectId));

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async removeStudentFromCourse(
    courseId: string,
    studentId: string,
  ): Promise<Course> {
    const course = await this.courseModel.findOne({ courseId });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    course.students = course.students.filter(
      (student) => student.id !== studentId,
    );

    return course.save();
  }

  async addPostToCourse(courseId: string, postDto: PostDto): Promise<Course> {
    const course = await this.courseModel.findOne({ courseId }).exec();
    if (!course) {
      throw new NotFoundException(`Course not found`);
    }

    course.posts.push({
      ...postDto,
      postId: new Types.ObjectId(),
      timestamp: postDto.timestamp || new Date(),
    });

    return course.save();
  }

  async getPostsByDate(userId: string): Promise<RecentPostDto[]> {
    const courses = await this.courseModel.find().exec();
    const allPosts: RecentPostDto[] = [];

    courses.forEach((course) => {
      const isEnrolled = course.students.some(
        (student) => student.id.toString() === userId,
      );

      if (isEnrolled) {
        course.posts.forEach((post) => {
          allPosts.push({
            courseId: course.courseId,
            courseName: course.title,
            title: post.title,
            content: post.content,
            timestamp: post.timestamp,
            postId: post.postId.toString(),
          });
        });
      }
    });

    allPosts.sort((a, b) => {
      return dayjs(b.timestamp).diff(dayjs(a.timestamp));
    });

    return allPosts;
  }
}
