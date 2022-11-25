import { Field, ID, ObjectType } from "type-graphql";
import { Link } from "./link.model";
import { User } from "./user.model";

@ObjectType()
export class Vote {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  user: User;

  @Field(() => Link)
  link: Link;

  @Field(() => Date)
  createdAt: Date;
}
