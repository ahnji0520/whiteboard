import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const existingUser = await this.userModel
      .findOne({ id: createUserDto.id })
      .exec();
    if (existingUser) {
      throw new ConflictException('이미 사용 중인 아이디입니다.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await createdUser.save();

    const { password, ...result } = savedUser.toObject();
    return result;
  }

  async findOne(id: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ id }).exec();
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<ResponseUserDto> {
    const user = await this.findOne(loginUserDto.id);

    if (!user) {
      throw new UnauthorizedException('존재하지 않는 아이디입니다.');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        '비밀번호가 틀렸습니다. 다시 시도해주세요.',
      );
    }

    const { password, ...result } = user.toObject();
    return result;
  }
}
