import { Field, ID, ObjectType } from "type-graphql";
import { Link } from "./link.model";
import { Vote } from "./vote.model";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => [Link], { nullable: "items" })
  links: Link[];

  @Field(() => [Comment], { nullable: "items" })
  comments: Comment[];

  @Field(() => [Vote], { nullable: "items" })
  votes: Vote[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
