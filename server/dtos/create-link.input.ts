import { Field, InputType } from "type-graphql";
import { IsArray, IsNotEmpty, IsUrl, Length } from "class-validator";

@InputType()
export class CreateLinkInput {
  @Field(() => String)
  @IsNotEmpty()
  @Length(2, 255)
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @Field(() => [String])
  @IsArray()
  tags: string[];
}
