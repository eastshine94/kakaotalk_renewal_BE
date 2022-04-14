import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { SALT_ROUNDS } from 'src/config';
import { SignupInput } from './dto/signup.input';
import { SigninInput } from './dto/signin.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async signup(data: SignupInput): Promise<User> {
    const { user_id, password, name } = data;
    const hashedPw = await bcrypt.hash(password, SALT_ROUNDS);

    return this.prisma.user.create({
      data: {
        user_id,
        password: hashedPw,
        name,
      },
    });
  }

  async signin(data: SigninInput) {
    const { user_id, password } = data;
    const findUser = await this.prisma.user.findUnique({ where: { user_id } });
    if (!findUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          payload: { msg: '존재하지 않는 아이디입니다.' },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const isVaild = await bcrypt.compare(password, findUser.password);
      if (!isVaild) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            payload: { msg: '비밀번호가 올바르지 않습니다.' },
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return findUser;
  }
}
