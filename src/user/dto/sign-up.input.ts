import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';
export class SignUpInput {
  @IsEmail()
  user_id: string;

  @IsString()
  @MinLength(5)
  @MaxLength(15)
  password: string;

  @IsString()
  @MinLength(1)
  name: string;
}
