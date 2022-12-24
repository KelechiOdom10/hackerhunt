import { IsArray, IsNotEmpty, IsUrl, Length } from "class-validator";

export class CreateLinkInput {
  @IsNotEmpty()
  @Length(2, 255)
  title: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsArray()
  tags: string[];
}
