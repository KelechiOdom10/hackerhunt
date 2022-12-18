import { Field, InputType, Int } from "type-graphql";

// Define the input arguments for filtering and pagination
@InputType()
export class FeedArgs {
  @Field(() => String, { nullable: true })
  filter?: string;

  @Field(() => String, { nullable: true })
  tag?: string;

  @Field(() => String, { nullable: true })
  orderBy?: "createdAt" | "votes" = "votes";

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  skip?: number = 0;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  take?: number = 10;
}
