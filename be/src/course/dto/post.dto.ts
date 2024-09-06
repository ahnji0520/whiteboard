import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class PostDto {
  @ApiProperty({ example: '중간고사 공지' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '중간고사는 10월 20일에 진행됩니다.' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: '2023-10-15T10:00:00Z' })
  timestamp: Date;
}
