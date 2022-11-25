import { Field, ID, ObjectType } from "type-graphql";
import { Link } from "./link.model";
import { User } from "./user.model";

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  text: string;

  @Field(() => User)
  user: User;

  @Field(() => Link)
  link: User;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
