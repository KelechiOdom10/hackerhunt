import { IsEmail, IsNotEmpty, Length, MinLength } from "class-validator";

export class SignupInput {
  @IsNotEmpty()
  @IsEmail({}, { message: "Invalid Email" })
  email: string;

  @IsNotEmpty()
  @Length(2, 15)
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
