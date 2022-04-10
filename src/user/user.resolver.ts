import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { SignupInput } from './dto/create-user.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('signup')
  create(@Args('signupInput') signupInput: SignupInput) {
    return this.userService.signup(signupInput);
  }

  @Query('user')
  findOne(@Args('id') id: number) {
    return this.userService.user({ id });
  }
}
