import { Field, InputType } from "type-graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  @IsNotEmpty()
  linkId: string;

  @Field(() => String)
  @IsNotEmpty()
  text: string;
}
