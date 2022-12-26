import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { customFetcher } from '../../utils/fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  link: Link;
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Company = {
  __typename?: 'Company';
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  industries: Array<Scalars['String']>;
  jobsPage: Scalars['String'];
  landingPage: Scalars['String'];
  location: Scalars['String'];
  name: Scalars['String'];
  publicationDate: Scalars['String'];
};

export type CreateCommentInput = {
  linkId: Scalars['String'];
  text: Scalars['String'];
};

export type CreateLinkInput = {
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
  url: Scalars['String'];
};

export type Feed = {
  __typename?: 'Feed';
  count: Scalars['Float'];
  id: Scalars['ID'];
  links: Array<Link>;
};

export type FeedArgs = {
  filter?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type Job = {
  __typename?: 'Job';
  categories: Array<Scalars['String']>;
  company: Company;
  companyId: Scalars['Float'];
  description: Scalars['String'];
  id: Scalars['ID'];
  landingPage: Scalars['String'];
  level: Scalars['String'];
  location: Scalars['String'];
  name: Scalars['String'];
  publicationDate: Scalars['String'];
};

export type Link = {
  __typename?: 'Link';
  commentCount: Scalars['Float'];
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  tags: Array<Tag>;
  title: Scalars['String'];
  url: Scalars['String'];
  user: User;
  voteCount: Scalars['Float'];
  votes: Array<Vote>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createLink: Link;
  login: AuthPayload;
  signup: AuthPayload;
  toggleVote?: Maybe<Link>;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateLinkArgs = {
  input: CreateLinkInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationToggleVoteArgs = {
  linkId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  feed: Feed;
  jobs: Array<Job>;
  link: Link;
  me?: Maybe<User>;
  popularTags: Array<Tag>;
  randomLinks: Array<Link>;
  tag: Tag;
  topLinks: Array<Link>;
  totalLinks: Scalars['Float'];
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
};


export type QueryCommentsArgs = {
  linkId: Scalars['String'];
};


export type QueryFeedArgs = {
  args?: InputMaybe<FeedArgs>;
};


export type QueryJobsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
};


export type QueryLinkArgs = {
  id: Scalars['ID'];
};


export type QueryTagArgs = {
  name: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type SignupInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  links: Array<Link>;
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  comments: Array<Maybe<Comment>>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  links: Array<Maybe<Link>>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  votes: Array<Maybe<Vote>>;
};

export type Vote = {
  __typename?: 'Vote';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  link: Link;
  user: User;
};

export type CommentDetailsFragment = { __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } };

export type CompanyDetailsFragment = { __typename?: 'Company', id: string, image: string, name: string, location: string, description: string };

export type JobDetailsFragment = { __typename?: 'Job', id: string, name: string, location: string, description: string, categories: Array<string>, level: string, landingPage: string, publicationDate: string, company: { __typename?: 'Company', id: string, image: string, name: string, location: string, description: string } };

export type LinkDetailsFragment = { __typename?: 'Link', id: string, title: string, description?: string | null, image?: string | null, url: string, commentCount: number, voteCount: number, createdAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, votes: Array<{ __typename?: 'Vote', id: string, link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }>, user: { __typename?: 'User', id: string, username: string, createdAt: any }, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> };

export type TagPreviewFragment = { __typename?: 'Tag', id: string, name: string };

export type RegularUserFragment = { __typename?: 'User', id: string, username: string, createdAt: any };

export type VoteResponseFragment = { __typename?: 'Vote', id: string, link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } } };

export type CreateLinkMutationVariables = Exact<{
  input: CreateLinkInput;
}>;


export type CreateLinkMutation = { __typename?: 'Mutation', createLink: { __typename?: 'Link', id: string, title: string, description?: string | null, image?: string | null, url: string, commentCount: number, voteCount: number, createdAt: any, user: { __typename?: 'User', id: string, username: string, createdAt: any }, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, votes: Array<{ __typename?: 'Vote', id: string, link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }>, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, username: string, createdAt: any } } };

export type SignupMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, username: string, createdAt: any } } };

export type ToggleVoteMutationVariables = Exact<{
  linkId: Scalars['String'];
}>;


export type ToggleVoteMutation = { __typename?: 'Mutation', toggleVote?: { __typename?: 'Link', id: string, title: string, description?: string | null, image?: string | null, url: string, commentCount: number, voteCount: number, createdAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, votes: Array<{ __typename?: 'Vote', id: string, link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }>, user: { __typename?: 'User', id: string, username: string, createdAt: any }, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> } | null };

export type CommentsQueryVariables = Exact<{
  linkId: Scalars['String'];
}>;


export type CommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> };

export type FeedQueryVariables = Exact<{
  args: FeedArgs;
}>;


export type FeedQuery = { __typename?: 'Query', feed: { __typename?: 'Feed', id: string, count: number, links: Array<{ __typename?: 'Link', id: string, title: string, description?: string | null, image?: string | null, url: string, commentCount: number, voteCount: number, createdAt: any, user: { __typename?: 'User', id: string, username: string, createdAt: any }, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, votes: Array<{ __typename?: 'Vote', id: string, link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }>, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> }> } };

export type JobsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type JobsQuery = { __typename?: 'Query', jobs: Array<{ __typename?: 'Job', id: string, name: string, location: string, description: string, categories: Array<string>, level: string, landingPage: string, publicationDate: string, company: { __typename?: 'Company', id: string, image: string, name: string, location: string, description: string } }> };

export type LinkQueryVariables = Exact<{
  linkId: Scalars['ID'];
}>;


export type LinkQuery = { __typename?: 'Query', link: { __typename?: 'Link', id: string, title: string, description?: string | null, image?: string | null, url: string, commentCount: number, voteCount: number, createdAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, votes: Array<{ __typename?: 'Vote', id: string, link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }>, user: { __typename?: 'User', id: string, username: string, createdAt: any }, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, createdAt: any } | null };

export type PopularTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type PopularTagsQuery = { __typename?: 'Query', popularTags: Array<{ __typename?: 'Tag', id: string, name: string }> };

export type RandomLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type RandomLinksQuery = { __typename?: 'Query', randomLinks: Array<{ __typename?: 'Link', id: string, title: string, description?: string | null, image?: string | null, url: string, commentCount: number, voteCount: number, createdAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, votes: Array<{ __typename?: 'Vote', id: string, link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }>, user: { __typename?: 'User', id: string, username: string, createdAt: any }, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> }> };

export type TagQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type TagQuery = { __typename?: 'Query', tag: { __typename?: 'Tag', id: string, name: string, links: Array<{ __typename?: 'Link', id: string, title: string, description?: string | null, image?: string | null, url: string, commentCount: number, voteCount: number, createdAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, votes: Array<{ __typename?: 'Vote', id: string, link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }>, user: { __typename?: 'User', id: string, username: string, createdAt: any }, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> }> } };

export type TopLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type TopLinksQuery = { __typename?: 'Query', topLinks: Array<{ __typename?: 'Link', id: string, title: string, description?: string | null, image?: string | null, url: string, commentCount: number, voteCount: number, createdAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, votes: Array<{ __typename?: 'Vote', id: string, link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }>, user: { __typename?: 'User', id: string, username: string, createdAt: any }, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> }> };

export type TotalLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type TotalLinksQuery = { __typename?: 'Query', totalLinks: number };

export type UserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, username: string, createdAt: any, links: Array<{ __typename?: 'Link', id: string, title: string, description?: string | null, image?: string | null, url: string, commentCount: number, voteCount: number, createdAt: any, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, votes: Array<{ __typename?: 'Vote', id: string, link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }>, user: { __typename?: 'User', id: string, username: string, createdAt: any }, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> } | null>, votes: Array<{ __typename?: 'Vote', link: { __typename?: 'Link', id: string, title: string, description?: string | null, image?: string | null, url: string, commentCount: number, voteCount: number, createdAt: any, user: { __typename?: 'User', id: string, username: string, createdAt: any }, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, votes: Array<{ __typename?: 'Vote', id: string, link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }>, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> } } | null>, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } } | null> } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, username: string, createdAt: any } | null> };

export const CompanyDetailsFragmentDoc = /*#__PURE__*/ `
    fragment CompanyDetails on Company {
  id
  image
  name
  location
  description
}
    `;
export const JobDetailsFragmentDoc = /*#__PURE__*/ `
    fragment JobDetails on Job {
  id
  name
  location
  description
  categories
  level
  landingPage
  publicationDate
  company {
    ...CompanyDetails
  }
}
    `;
export const TagPreviewFragmentDoc = /*#__PURE__*/ `
    fragment TagPreview on Tag {
  id
  name
}
    `;
export const RegularUserFragmentDoc = /*#__PURE__*/ `
    fragment RegularUser on User {
  id
  username
  createdAt
}
    `;
export const VoteResponseFragmentDoc = /*#__PURE__*/ `
    fragment VoteResponse on Vote {
  id
  link {
    id
  }
  user {
    ...RegularUser
  }
}
    `;
export const CommentDetailsFragmentDoc = /*#__PURE__*/ `
    fragment CommentDetails on Comment {
  id
  text
  link {
    id
    title
  }
  user {
    ...RegularUser
  }
  createdAt
}
    `;
export const LinkDetailsFragmentDoc = /*#__PURE__*/ `
    fragment LinkDetails on Link {
  id
  title
  description
  image
  url
  tags {
    ...TagPreview
  }
  commentCount
  voteCount
  votes {
    ...VoteResponse
  }
  user {
    ...RegularUser
  }
  comments {
    ...CommentDetails
  }
  createdAt
}
    `;
export const CreateCommentDocument = /*#__PURE__*/ `
    mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    ...CommentDetails
  }
}
    ${CommentDetailsFragmentDoc}
${RegularUserFragmentDoc}`;
export const useCreateCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>) =>
    useMutation<CreateCommentMutation, TError, CreateCommentMutationVariables, TContext>(
      ['CreateComment'],
      (variables?: CreateCommentMutationVariables) => customFetcher<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, variables)(),
      options
    );
useCreateCommentMutation.fetcher = (variables: CreateCommentMutationVariables, options?: RequestInit['headers']) => customFetcher<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, variables, options);
export const CreateLinkDocument = /*#__PURE__*/ `
    mutation CreateLink($input: CreateLinkInput!) {
  createLink(input: $input) {
    ...LinkDetails
    user {
      ...RegularUser
    }
  }
}
    ${LinkDetailsFragmentDoc}
${TagPreviewFragmentDoc}
${VoteResponseFragmentDoc}
${RegularUserFragmentDoc}
${CommentDetailsFragmentDoc}`;
export const useCreateLinkMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateLinkMutation, TError, CreateLinkMutationVariables, TContext>) =>
    useMutation<CreateLinkMutation, TError, CreateLinkMutationVariables, TContext>(
      ['CreateLink'],
      (variables?: CreateLinkMutationVariables) => customFetcher<CreateLinkMutation, CreateLinkMutationVariables>(CreateLinkDocument, variables)(),
      options
    );
useCreateLinkMutation.fetcher = (variables: CreateLinkMutationVariables, options?: RequestInit['headers']) => customFetcher<CreateLinkMutation, CreateLinkMutationVariables>(CreateLinkDocument, variables, options);
export const LoginDocument = /*#__PURE__*/ `
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    user {
      ...RegularUser
    }
    token
  }
}
    ${RegularUserFragmentDoc}`;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['Login'],
      (variables?: LoginMutationVariables) => customFetcher<LoginMutation, LoginMutationVariables>(LoginDocument, variables)(),
      options
    );
useLoginMutation.fetcher = (variables: LoginMutationVariables, options?: RequestInit['headers']) => customFetcher<LoginMutation, LoginMutationVariables>(LoginDocument, variables, options);
export const SignupDocument = /*#__PURE__*/ `
    mutation Signup($input: SignupInput!) {
  signup(input: $input) {
    user {
      ...RegularUser
    }
    token
  }
}
    ${RegularUserFragmentDoc}`;
export const useSignupMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SignupMutation, TError, SignupMutationVariables, TContext>) =>
    useMutation<SignupMutation, TError, SignupMutationVariables, TContext>(
      ['Signup'],
      (variables?: SignupMutationVariables) => customFetcher<SignupMutation, SignupMutationVariables>(SignupDocument, variables)(),
      options
    );
useSignupMutation.fetcher = (variables: SignupMutationVariables, options?: RequestInit['headers']) => customFetcher<SignupMutation, SignupMutationVariables>(SignupDocument, variables, options);
export const ToggleVoteDocument = /*#__PURE__*/ `
    mutation ToggleVote($linkId: String!) {
  toggleVote(linkId: $linkId) {
    ...LinkDetails
  }
}
    ${LinkDetailsFragmentDoc}
${TagPreviewFragmentDoc}
${VoteResponseFragmentDoc}
${RegularUserFragmentDoc}
${CommentDetailsFragmentDoc}`;
export const useToggleVoteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ToggleVoteMutation, TError, ToggleVoteMutationVariables, TContext>) =>
    useMutation<ToggleVoteMutation, TError, ToggleVoteMutationVariables, TContext>(
      ['ToggleVote'],
      (variables?: ToggleVoteMutationVariables) => customFetcher<ToggleVoteMutation, ToggleVoteMutationVariables>(ToggleVoteDocument, variables)(),
      options
    );
useToggleVoteMutation.fetcher = (variables: ToggleVoteMutationVariables, options?: RequestInit['headers']) => customFetcher<ToggleVoteMutation, ToggleVoteMutationVariables>(ToggleVoteDocument, variables, options);
export const CommentsDocument = /*#__PURE__*/ `
    query Comments($linkId: String!) {
  comments(linkId: $linkId) {
    ...CommentDetails
  }
}
    ${CommentDetailsFragmentDoc}
${RegularUserFragmentDoc}`;
export const useCommentsQuery = <
      TData = CommentsQuery,
      TError = unknown
    >(
      variables: CommentsQueryVariables,
      options?: UseQueryOptions<CommentsQuery, TError, TData>
    ) =>
    useQuery<CommentsQuery, TError, TData>(
      ['Comments', variables],
      customFetcher<CommentsQuery, CommentsQueryVariables>(CommentsDocument, variables),
      options
    );
useCommentsQuery.document = CommentsDocument;


useCommentsQuery.getKey = (variables: CommentsQueryVariables) => ['Comments', variables];
;

useCommentsQuery.fetcher = (variables: CommentsQueryVariables, options?: RequestInit['headers']) => customFetcher<CommentsQuery, CommentsQueryVariables>(CommentsDocument, variables, options);
export const FeedDocument = /*#__PURE__*/ `
    query Feed($args: FeedArgs!) {
  feed(args: $args) {
    id
    count
    links {
      ...LinkDetails
      user {
        ...RegularUser
      }
    }
  }
}
    ${LinkDetailsFragmentDoc}
${TagPreviewFragmentDoc}
${VoteResponseFragmentDoc}
${RegularUserFragmentDoc}
${CommentDetailsFragmentDoc}`;
export const useFeedQuery = <
      TData = FeedQuery,
      TError = unknown
    >(
      variables: FeedQueryVariables,
      options?: UseQueryOptions<FeedQuery, TError, TData>
    ) =>
    useQuery<FeedQuery, TError, TData>(
      ['Feed', variables],
      customFetcher<FeedQuery, FeedQueryVariables>(FeedDocument, variables),
      options
    );
useFeedQuery.document = FeedDocument;


useFeedQuery.getKey = (variables: FeedQueryVariables) => ['Feed', variables];
;

useFeedQuery.fetcher = (variables: FeedQueryVariables, options?: RequestInit['headers']) => customFetcher<FeedQuery, FeedQueryVariables>(FeedDocument, variables, options);
export const JobsDocument = /*#__PURE__*/ `
    query Jobs($limit: Float) {
  jobs(limit: $limit) {
    ...JobDetails
  }
}
    ${JobDetailsFragmentDoc}
${CompanyDetailsFragmentDoc}`;
export const useJobsQuery = <
      TData = JobsQuery,
      TError = unknown
    >(
      variables?: JobsQueryVariables,
      options?: UseQueryOptions<JobsQuery, TError, TData>
    ) =>
    useQuery<JobsQuery, TError, TData>(
      variables === undefined ? ['Jobs'] : ['Jobs', variables],
      customFetcher<JobsQuery, JobsQueryVariables>(JobsDocument, variables),
      options
    );
useJobsQuery.document = JobsDocument;


useJobsQuery.getKey = (variables?: JobsQueryVariables) => variables === undefined ? ['Jobs'] : ['Jobs', variables];
;

useJobsQuery.fetcher = (variables?: JobsQueryVariables, options?: RequestInit['headers']) => customFetcher<JobsQuery, JobsQueryVariables>(JobsDocument, variables, options);
export const LinkDocument = /*#__PURE__*/ `
    query Link($linkId: ID!) {
  link(id: $linkId) {
    ...LinkDetails
  }
}
    ${LinkDetailsFragmentDoc}
${TagPreviewFragmentDoc}
${VoteResponseFragmentDoc}
${RegularUserFragmentDoc}
${CommentDetailsFragmentDoc}`;
export const useLinkQuery = <
      TData = LinkQuery,
      TError = unknown
    >(
      variables: LinkQueryVariables,
      options?: UseQueryOptions<LinkQuery, TError, TData>
    ) =>
    useQuery<LinkQuery, TError, TData>(
      ['Link', variables],
      customFetcher<LinkQuery, LinkQueryVariables>(LinkDocument, variables),
      options
    );
useLinkQuery.document = LinkDocument;


useLinkQuery.getKey = (variables: LinkQueryVariables) => ['Link', variables];
;

useLinkQuery.fetcher = (variables: LinkQueryVariables, options?: RequestInit['headers']) => customFetcher<LinkQuery, LinkQueryVariables>(LinkDocument, variables, options);
export const MeDocument = /*#__PURE__*/ `
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      variables?: MeQueryVariables,
      options?: UseQueryOptions<MeQuery, TError, TData>
    ) =>
    useQuery<MeQuery, TError, TData>(
      variables === undefined ? ['Me'] : ['Me', variables],
      customFetcher<MeQuery, MeQueryVariables>(MeDocument, variables),
      options
    );
useMeQuery.document = MeDocument;


useMeQuery.getKey = (variables?: MeQueryVariables) => variables === undefined ? ['Me'] : ['Me', variables];
;

useMeQuery.fetcher = (variables?: MeQueryVariables, options?: RequestInit['headers']) => customFetcher<MeQuery, MeQueryVariables>(MeDocument, variables, options);
export const PopularTagsDocument = /*#__PURE__*/ `
    query PopularTags {
  popularTags {
    ...TagPreview
  }
}
    ${TagPreviewFragmentDoc}`;
export const usePopularTagsQuery = <
      TData = PopularTagsQuery,
      TError = unknown
    >(
      variables?: PopularTagsQueryVariables,
      options?: UseQueryOptions<PopularTagsQuery, TError, TData>
    ) =>
    useQuery<PopularTagsQuery, TError, TData>(
      variables === undefined ? ['PopularTags'] : ['PopularTags', variables],
      customFetcher<PopularTagsQuery, PopularTagsQueryVariables>(PopularTagsDocument, variables),
      options
    );
usePopularTagsQuery.document = PopularTagsDocument;


usePopularTagsQuery.getKey = (variables?: PopularTagsQueryVariables) => variables === undefined ? ['PopularTags'] : ['PopularTags', variables];
;

usePopularTagsQuery.fetcher = (variables?: PopularTagsQueryVariables, options?: RequestInit['headers']) => customFetcher<PopularTagsQuery, PopularTagsQueryVariables>(PopularTagsDocument, variables, options);
export const RandomLinksDocument = /*#__PURE__*/ `
    query RandomLinks {
  randomLinks {
    ...LinkDetails
  }
}
    ${LinkDetailsFragmentDoc}
${TagPreviewFragmentDoc}
${VoteResponseFragmentDoc}
${RegularUserFragmentDoc}
${CommentDetailsFragmentDoc}`;
export const useRandomLinksQuery = <
      TData = RandomLinksQuery,
      TError = unknown
    >(
      variables?: RandomLinksQueryVariables,
      options?: UseQueryOptions<RandomLinksQuery, TError, TData>
    ) =>
    useQuery<RandomLinksQuery, TError, TData>(
      variables === undefined ? ['RandomLinks'] : ['RandomLinks', variables],
      customFetcher<RandomLinksQuery, RandomLinksQueryVariables>(RandomLinksDocument, variables),
      options
    );
useRandomLinksQuery.document = RandomLinksDocument;


useRandomLinksQuery.getKey = (variables?: RandomLinksQueryVariables) => variables === undefined ? ['RandomLinks'] : ['RandomLinks', variables];
;

useRandomLinksQuery.fetcher = (variables?: RandomLinksQueryVariables, options?: RequestInit['headers']) => customFetcher<RandomLinksQuery, RandomLinksQueryVariables>(RandomLinksDocument, variables, options);
export const TagDocument = /*#__PURE__*/ `
    query Tag($name: String!) {
  tag(name: $name) {
    ...TagPreview
    links {
      ...LinkDetails
    }
  }
}
    ${TagPreviewFragmentDoc}
${LinkDetailsFragmentDoc}
${VoteResponseFragmentDoc}
${RegularUserFragmentDoc}
${CommentDetailsFragmentDoc}`;
export const useTagQuery = <
      TData = TagQuery,
      TError = unknown
    >(
      variables: TagQueryVariables,
      options?: UseQueryOptions<TagQuery, TError, TData>
    ) =>
    useQuery<TagQuery, TError, TData>(
      ['Tag', variables],
      customFetcher<TagQuery, TagQueryVariables>(TagDocument, variables),
      options
    );
useTagQuery.document = TagDocument;


useTagQuery.getKey = (variables: TagQueryVariables) => ['Tag', variables];
;

useTagQuery.fetcher = (variables: TagQueryVariables, options?: RequestInit['headers']) => customFetcher<TagQuery, TagQueryVariables>(TagDocument, variables, options);
export const TopLinksDocument = /*#__PURE__*/ `
    query TopLinks {
  topLinks {
    ...LinkDetails
  }
}
    ${LinkDetailsFragmentDoc}
${TagPreviewFragmentDoc}
${VoteResponseFragmentDoc}
${RegularUserFragmentDoc}
${CommentDetailsFragmentDoc}`;
export const useTopLinksQuery = <
      TData = TopLinksQuery,
      TError = unknown
    >(
      variables?: TopLinksQueryVariables,
      options?: UseQueryOptions<TopLinksQuery, TError, TData>
    ) =>
    useQuery<TopLinksQuery, TError, TData>(
      variables === undefined ? ['TopLinks'] : ['TopLinks', variables],
      customFetcher<TopLinksQuery, TopLinksQueryVariables>(TopLinksDocument, variables),
      options
    );
useTopLinksQuery.document = TopLinksDocument;


useTopLinksQuery.getKey = (variables?: TopLinksQueryVariables) => variables === undefined ? ['TopLinks'] : ['TopLinks', variables];
;

useTopLinksQuery.fetcher = (variables?: TopLinksQueryVariables, options?: RequestInit['headers']) => customFetcher<TopLinksQuery, TopLinksQueryVariables>(TopLinksDocument, variables, options);
export const TotalLinksDocument = /*#__PURE__*/ `
    query TotalLinks {
  totalLinks
}
    `;
export const useTotalLinksQuery = <
      TData = TotalLinksQuery,
      TError = unknown
    >(
      variables?: TotalLinksQueryVariables,
      options?: UseQueryOptions<TotalLinksQuery, TError, TData>
    ) =>
    useQuery<TotalLinksQuery, TError, TData>(
      variables === undefined ? ['TotalLinks'] : ['TotalLinks', variables],
      customFetcher<TotalLinksQuery, TotalLinksQueryVariables>(TotalLinksDocument, variables),
      options
    );
useTotalLinksQuery.document = TotalLinksDocument;


useTotalLinksQuery.getKey = (variables?: TotalLinksQueryVariables) => variables === undefined ? ['TotalLinks'] : ['TotalLinks', variables];
;

useTotalLinksQuery.fetcher = (variables?: TotalLinksQueryVariables, options?: RequestInit['headers']) => customFetcher<TotalLinksQuery, TotalLinksQueryVariables>(TotalLinksDocument, variables, options);
export const UserDocument = /*#__PURE__*/ `
    query User($userId: ID!) {
  user(id: $userId) {
    ...RegularUser
    links {
      ...LinkDetails
    }
    votes {
      link {
        ...LinkDetails
        user {
          ...RegularUser
        }
      }
    }
    comments {
      ...CommentDetails
    }
  }
}
    ${RegularUserFragmentDoc}
${LinkDetailsFragmentDoc}
${TagPreviewFragmentDoc}
${VoteResponseFragmentDoc}
${CommentDetailsFragmentDoc}`;
export const useUserQuery = <
      TData = UserQuery,
      TError = unknown
    >(
      variables: UserQueryVariables,
      options?: UseQueryOptions<UserQuery, TError, TData>
    ) =>
    useQuery<UserQuery, TError, TData>(
      ['User', variables],
      customFetcher<UserQuery, UserQueryVariables>(UserDocument, variables),
      options
    );
useUserQuery.document = UserDocument;


useUserQuery.getKey = (variables: UserQueryVariables) => ['User', variables];
;

useUserQuery.fetcher = (variables: UserQueryVariables, options?: RequestInit['headers']) => customFetcher<UserQuery, UserQueryVariables>(UserDocument, variables, options);
export const UsersDocument = /*#__PURE__*/ `
    query Users {
  users {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const useUsersQuery = <
      TData = UsersQuery,
      TError = unknown
    >(
      variables?: UsersQueryVariables,
      options?: UseQueryOptions<UsersQuery, TError, TData>
    ) =>
    useQuery<UsersQuery, TError, TData>(
      variables === undefined ? ['Users'] : ['Users', variables],
      customFetcher<UsersQuery, UsersQueryVariables>(UsersDocument, variables),
      options
    );
useUsersQuery.document = UsersDocument;


useUsersQuery.getKey = (variables?: UsersQueryVariables) => variables === undefined ? ['Users'] : ['Users', variables];
;

useUsersQuery.fetcher = (variables?: UsersQueryVariables, options?: RequestInit['headers']) => customFetcher<UsersQuery, UsersQueryVariables>(UsersDocument, variables, options);