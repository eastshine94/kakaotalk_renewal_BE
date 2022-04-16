import { IsString, IsEmail, MinLength } from 'class-validator';
export class SignUpInput {
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
