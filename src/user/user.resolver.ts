import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { SignupInput } from './dto/signup.input';
import { SigninInput } from './dto/signin.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('signup')
  signup(@Args('signupInput') signupInput: SignupInput) {
    return this.userService.signup(signupInput);
  }

  @Mutation('signin')
  signin(@Args('signinInput') signinInput: SigninInput) {
    return this.userService.signin(signinInput);
  }

  @Query('user')
  findOne(@Args('id') id: number) {
    return this.userService.user({ id });
  }
}
