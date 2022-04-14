import { IsString, IsEmail, MinLength } from 'class-validator';
export class SigninInput {
  @IsEmail()
  @MinLength(6)
  user_id: string;

  @IsString()
  @MinLength(8)
  password: string;
}
