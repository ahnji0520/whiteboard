import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { ApiOkResponse, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiOkResponse({ type: ResponseUserDto })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @ApiOkResponse({ type: ResponseUserDto })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.userService.validateUser(loginUserDto);
      return user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      throw new UnauthorizedException('로그인 중 문제가 발생했습니다.');
    }
  }
}
