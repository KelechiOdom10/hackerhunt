import { IsNotEmpty } from "class-validator";

export class CreateCommentInput {
  @IsNotEmpty()
  linkId: string;

  @IsNotEmpty()
  text: string;
}
