import { Injectable, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ApolloError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { SALT_ROUNDS } from 'src/config';
import { SignUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    const foundUser = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    if (!foundUser) {
      throw new ApolloError('아이디가 존재하지 않습니다.', 'ID_NOT_FIND');
    }
    return foundUser;
  }

  async signUp(data: SignUpInput) {
    const { user_id, password, name } = data;
    try {
      const findUser = await this.prisma.user.findUnique({
        where: { user_id },
      });
      if (findUser) {
        throw new ApolloError('해당 계정이 이미 존재합니다.', 'ID_EXIST');
      }
      const hashedPw = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await this.prisma.user.create({
        data: {
          user_id,
          password: hashedPw,
          name,
        },
      });
      return {
        status: HttpStatus.OK,
        message: '계정이 생성되었습니다.',
        user_id: user.user_id,
      };
    } catch (err) {
      throw new ApolloError(
        '처리 중 에러가 발생했습니다!',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async signIn(data: SignInInput) {
    const { user_id, password } = data;
    const findUser = await this.prisma.user.findUnique({ where: { user_id } });

    if (!findUser) {
      throw new ApolloError('아이디가 존재하지 않습니다.', 'ID_NOT_FIND');
    } else {
      const isVaild = await bcrypt.compare(password, findUser.password);
      if (!isVaild) {
        throw new ApolloError(
          '비밀번호가 정확하지 않습니다.',
          'PASSWORD_INVALID',
        );
      }
    }

    return findUser;
  }
}
