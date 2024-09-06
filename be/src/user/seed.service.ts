import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class SeedService {
  constructor(private readonly userService: UserService) {}

  async seed() {
    const students: CreateUserDto[] = [
      {
        id: 'heart',
        password: '1111',
        name: '하츄핑',
        role: 'student',
        studentId: '2022320001',
      },
      {
        id: 'correct',
        password: '1111',
        name: '바로핑',
        role: 'student',
        studentId: '2022320002',
      },
      {
        id: 'brave',
        password: '1111',
        name: '아자핑',
        role: 'student',
        studentId: '2022320003',
      },
      {
        id: 'hope',
        password: '1111',
        name: '희망핑',
        role: 'student',
        studentId: '2022320004',
      },
      {
        id: 'fun',
        password: '1111',
        name: '라라핑',
        role: 'student',
        studentId: '2022320005',
      },
      {
        id: 'happy',
        password: '1111',
        name: '해핑',
        role: 'student',
        studentId: '2022320006',
      },
    ];

    const professors: CreateUserDto[] = [
      {
        id: 'sjbaek',
        password: '1111',
        name: '백승준',
        role: 'professor',
        studentId: null,
      },
      {
        id: 'syjung',
        password: '1111',
        name: '정순영',
        role: 'professor',
        studentId: null,
      },
      {
        id: 'jhpark',
        password: '1111',
        name: '박지혁',
        role: 'professor',
        studentId: null,
      },
    ];

    await Promise.all(
      [...students, ...professors].map(async (user) => {
        const existingUser = await this.userService.findOne(user.id);
        if (!existingUser) {
          await this.userService.createUser(user);
        } else {
          console.log('Skip');
        }
      }),
    );
  }
}
