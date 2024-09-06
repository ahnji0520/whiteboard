import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeedService } from './user/seed.service';
import { CourseSeedService } from './course/seed.service';

import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/whiteboard'),
    UserModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private readonly seedService: SeedService,
    private readonly courseSeedService: CourseSeedService,
  ) {
    // 두 시드 서비스 실행
    this.seedService.seed();
    this.courseSeedService.seed();
  }
}
