import { IsString, IsEmail, MinLength } from 'class-validator';
export class SignupInput {
  @IsEmail()
  @MinLength(6)
  user_id: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(1)
  name: string;
}
