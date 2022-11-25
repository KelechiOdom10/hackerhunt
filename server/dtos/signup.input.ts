import { InputType, Field } from "type-graphql";
import { IsEmail, IsNotEmpty, Length, MinLength } from "class-validator";

@InputType()
export class SignupInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail({}, { message: "Invalid Email" })
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @Length(2, 15)
  username: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
