import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

// 로그인용 DTO
export class LoginUserDto {
  @ApiProperty({ example: 'gina0520' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'gina0409!' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
