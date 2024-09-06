import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CourseDto {
  @ApiProperty({ example: '딥러닝' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'COSE474' })
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty({ example: 'major' })
  @IsString()
  @IsNotEmpty()
  classification: string;

  @ApiProperty({ example: '컴퓨터학과' })
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({ example: { id: 'alex4242', name: '이현서' } })
  @IsObject()
  @IsNotEmpty()
  professor: {
    id: string;
    name: string;
  };
}
