import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class StudentDto {
  @ApiProperty({ example: 'gina0520' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: '2022320135' })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ example: '안지형' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
