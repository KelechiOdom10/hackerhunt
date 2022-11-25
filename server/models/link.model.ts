import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./user.model";

@ObjectType()
export class Link {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => String)
  url: string;

  @Field(() => User)
  user: Promise<User>;

  @Field(() => [String])
  tags: string[];

  @Field(() => [Comment])
  comments: Comment[];

  @Field(() => Number)
  commentCount: number;

  @Field(() => Number)
  voteCount: number;

  @Field(() => Date)
  createdAt: Date;
}

interface BaseType {
  mediaType: string;
  contentType: string;
  favicons: string[];
  url: string;
  error: unknown;
}

export interface HTMLResponse extends BaseType {
  title: string;
  siteName: string;
  description: string;
  images: string[];
  videos: string[];
  contentType: `text/html${string}`;
}
