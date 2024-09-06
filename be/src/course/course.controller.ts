import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from './dto/course.dto';
import { StudentDto } from './dto/student.dto';
import { PostDto } from './dto/post.dto';
import { RecentPostDto } from './dto/recent-post.dto';
import { Course } from './schemas/course.schema';
import { ApiOkResponse, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Post()
  async createCourse(@Body() createCourseDto: CourseDto): Promise<Course> {
    return this.courseService.createCourse(createCourseDto);
  }

  @ApiOkResponse({ status: 200, description: '성공', type: [CourseDto] })
  @Get()
  async getCourses(): Promise<CourseDto[]> {
    const courses: Course[] = await this.courseService.getCourses();
    return courses.map((course) => this.toCourseDto(course));
  }

  @ApiOkResponse({ status: 200, description: '성공', type: [CourseDto] })
  @Get('professor/:id')
  async getCoursesByProfessorId(
    @Param('id') professorId: string,
  ): Promise<CourseDto[]> {
    const courses: Course[] =
      await this.courseService.getCoursesByProfessorId(professorId);
    return courses.map((course) => this.toCourseDto(course));
  }

  @ApiOkResponse({ status: 200, description: '성공', type: [CourseDto] })
  @Get('student/:id')
  async getCoursesByStudentId(
    @Param('id') studentId: string,
  ): Promise<CourseDto[]> {
    const courses: Course[] =
      await this.courseService.getCoursesByStudentId(studentId);
    return courses.map((course) => this.toCourseDto(course));
  }

  private toCourseDto(course: Course): CourseDto {
    return {
      title: course.title,
      courseId: course.courseId,
      classification: course.classification,
      department: course.department,
      professor: {
        id: course.professor.id,
        name: course.professor.name,
      },
    } as CourseDto;
  }

  @ApiResponse({ status: 200, description: '성공', type: Course })
  @Post(':courseId/register')
  async addStudentToCourse(
    @Param('courseId') courseId: string,
    @Body() studentDto: StudentDto,
  ): Promise<Course> {
    return this.courseService.addStudentToCourse(courseId, studentDto);
  }

  @ApiOkResponse({ status: 200, description: '성공', type: [StudentDto] })
  @Get(':courseId/students')
  async getStudentsByCourseId(
    @Param('courseId') courseId: string,
  ): Promise<StudentDto[]> {
    const students = await this.courseService.getStudentsByCourseId(courseId);
    return students;
  }

  @ApiOkResponse({ status: 200, description: '성공', type: [PostDto] })
  @Get(':courseId/posts')
  async getPostsByCourseId(
    @Param('courseId') courseId: string,
  ): Promise<PostDto[]> {
    const posts = await this.courseService.getPostsByCourseId(courseId);
    return posts;
  }

  @ApiOkResponse({ status: 200, description: '성공', type: CourseDto })
  @Get(':courseId')
  async getCourseByCourseId(
    @Param('courseId') courseId: string,
  ): Promise<CourseDto> {
    const course = await this.courseService.getCourseByCourseId(courseId);
    return this.toCourseDto(course);
  }

  @ApiOkResponse({ status: 200, description: '성공', type: [RecentPostDto] })
  @Get('post/:studentId/recent')
  async getPostsByDate(
    @Param('studentId') studentId: string,
  ): Promise<RecentPostDto[]> {
    return this.courseService.getPostsByDate(studentId);
  }

  @ApiResponse({ status: 200, description: '성공', type: Course })
  @Post(':courseId/unregister')
  async removeStudentFromCourse(
    @Param('courseId') courseId: string,
    @Body('studentId') studentId: string,
  ): Promise<Course> {
    return this.courseService.removeStudentFromCourse(courseId, studentId);
  }

  @ApiResponse({ status: 201, description: '성공', type: Course })
  @Post(':courseId/posts')
  async addPostToCourse(
    @Param('courseId') courseId: string,
    @Body() postDto: PostDto,
  ): Promise<Course> {
    return this.courseService.addPostToCourse(courseId, postDto);
  }

  @ApiResponse({ status: 201, description: '성공', type: PostDto })
  @Get(':courseId/:postId')
  async getPostByPostId(
    @Param('courseId') courseId: string,
    @Param('postId') postId: string,
  ): Promise<PostDto> {
    return this.courseService.getPostByPostId(courseId, postId);
  }
}
