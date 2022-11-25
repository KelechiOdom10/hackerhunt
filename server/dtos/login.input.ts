import { Field, InputType } from "type-graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  password: string;
}
