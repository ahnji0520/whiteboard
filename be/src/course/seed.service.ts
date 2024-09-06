import { Injectable } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from './dto/course.dto';

@Injectable()
export class CourseSeedService {
  constructor(private readonly courseService: CourseService) {}

  async seed() {
    const courses: CourseDto[] = [
      {
        title: '딥러닝',
        courseId: 'COSE474',
        classification: 'major',
        department: '컴퓨터학과',
        professor: {
          id: 'sjbaek',
          name: '백승준',
        },
      },
      {
        title: '확률및랜덤과정',
        courseId: 'COSE382',
        classification: 'major',
        department: '컴퓨터학과',
        professor: {
          id: 'sjbaek',
          name: '백승준',
        },
      },
      {
        title: '프로그래밍언어',
        courseId: 'COSE212',
        classification: 'major',
        department: '컴퓨터학과',
        professor: {
          id: 'jhpark',
          name: '박지혁',
        },
      },
      {
        title: '데이터베이스',
        courseId: 'COSE371',
        classification: 'major',
        department: '컴퓨터학과',
        professor: {
          id: 'syjung',
          name: '정순영',
        },
      },
    ];

    const studentsData = {
      COSE474: [
        { id: 'heart', name: '하츄핑', studentId: '2022320001' },
        { id: 'correct', name: '바로핑', studentId: '2022320002' },
        { id: 'brave', name: '아자핑', studentId: '2022320003' },
      ],
      COSE382: [
        { id: 'heart', name: '하츄핑', studentId: '2022320001' },
        { id: 'correct', name: '바로핑', studentId: '2022320002' },
        { id: 'brave', name: '아자핑', studentId: '2022320003' },
        { id: 'hope', name: '희망핑', studentId: '2022320004' },
        { id: 'fun', name: '라라핑', studentId: '2022320005' },
        { id: 'happy', name: '해핑', studentId: '2022320006' },
      ],
      COSE212: [
        { id: 'heart', name: '하츄핑', studentId: '2022320001' },
        { id: 'correct', name: '바로핑', studentId: '2022320002' },
      ],
    };

    const postsData = {
      COSE474: [
        {
          title: '첫 번째 포스트',
          content: '수업 공지사항입니다.',
          timestamp: new Date(),
        },
        {
          title: '딥러닝 첫 공지',
          content: '과제에 대한 공지입니다.',
          timestamp: new Date(),
        },
        {
          title: '두번째 공지',
          content: '과제에 대한 공지입니다.',
          timestamp: new Date(),
        },
        {
          title: '추석 휴무 안내',
          content: '추석 당일 수업 없습니다',
          timestamp: new Date(),
        },
      ],
      CS102: [
        {
          title: '추석 휴무 안내',
          content: '추석 당일 수업 없습니다',
          timestamp: new Date(),
        },
        {
          title: 'OT 자료',
          content: 'OT 자료입니다',
          timestamp: new Date(),
        },
      ],
    };

    await Promise.all(
      courses.map(async (course) => {
        await this.courseService.createCourse(course);
        const newCourse = await this.courseService.findOne(course.courseId);

        if (newCourse) {
          newCourse.students = studentsData[course.courseId] || [];
          newCourse.posts = postsData[course.courseId] || [];
          await newCourse.save();
        }
      }),
    );
  }
}
