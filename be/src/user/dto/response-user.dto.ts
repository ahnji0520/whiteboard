import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, ValidateIf } from 'class-validator';

// 로그인/회원가입 시 반환
export class ResponseUserDto {
  @ApiProperty({ example: 'gina0520' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: '안지형' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2022320135' })
  @ValidateIf((o) => o.role === 'student')
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ example: 'student' })
  @IsString()
  @IsNotEmpty()
  role: string;
}
