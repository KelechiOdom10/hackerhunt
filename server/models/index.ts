import { Field, ID, ObjectType } from "type-graphql";

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

@ObjectType()
export class AuthPayload {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;
}

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
  user: User;

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
