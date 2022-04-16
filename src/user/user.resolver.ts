import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { SignUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('signUp')
  signup(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.userService.signUp(signUpInput);
  }

  @Mutation('signIn')
  signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.userService.signIn(signInInput);
  }

  @Query('user')
  findOne(@Args('user_id') user_id: string) {
    return this.userService.user({ user_id });
  }
}
