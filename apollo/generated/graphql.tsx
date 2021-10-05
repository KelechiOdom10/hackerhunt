export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  token: Scalars["String"];
  user: User;
};

export type Comment = {
  __typename?: "Comment";
  id: Scalars["ID"];
  link: Link;
  text: Scalars["String"];
  user: User;
};

export type Link = {
  __typename?: "Link";
  comments?: Maybe<Array<Maybe<Comment>>>;
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  image?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  url: Scalars["String"];
  user?: Maybe<User>;
};

export type LinkInput = {
  title: Scalars["String"];
  url: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createComment: Comment;
  createLink: Link;
  signIn: AuthPayload;
  signUp: AuthPayload;
  toggleVote: Scalars["Boolean"];
};

export type MutationCreateCommentArgs = {
  id: Scalars["ID"];
  text: Scalars["String"];
};

export type MutationCreateLinkArgs = {
  description: Scalars["String"];
  url: Scalars["String"];
};

export type MutationSignInArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationSignUpArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type MutationToggleVoteArgs = {
  id: Scalars["ID"];
};

export type Query = {
  __typename?: "Query";
  feed: Array<Link>;
  link: Link;
  me: User;
  sayHello?: Maybe<Scalars["String"]>;
  user: User;
};

export type QueryLinkArgs = {
  id: Scalars["ID"];
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type SignInInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type SignUpInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type User = {
  __typename?: "User";
  comments: Array<Comment>;
  email: Scalars["String"];
  id: Scalars["ID"];
  links: Array<Link>;
  username: Scalars["String"];
};

export type CreateCommentInput = {
  id: Scalars["ID"];
  text: Scalars["String"];
};

export type CreateLinkInput = {
  title: Scalars["String"];
  url: Scalars["String"];
};

export type IdInput = {
  id: Scalars["ID"];
};
