import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, ValidateIf } from 'class-validator';

// 회원가입용 DTO
export class CreateUserDto {
  @ApiProperty({ example: 'gina0520' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'gina0409!' })
  @IsString()
  @IsNotEmpty()
  password: string;

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
