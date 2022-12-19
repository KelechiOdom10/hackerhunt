import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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
  tag?: InputMaybe<Scalars['String']>;
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
  tags: Array<Scalars['String']>;
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
  popularTags: Array<Scalars['String']>;
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


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type SignupInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
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

export type LinkDetailsFragment = { __typename?: 'Link', id: string, title: string, description?: string | null, image?: string | null, url: string, tags: Array<string>, commentCount: number, voteCount: number, createdAt: any, votes: Array<{ __typename?: 'Vote', link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }>, user: { __typename?: 'User', id: string, username: string, createdAt: any }, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> };

export type RegularUserFragment = { __typename?: 'User', id: string, username: string, createdAt: any };

export type VoteResponseFragment = { __typename?: 'Vote', link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } } };

export type CreateLinkMutationVariables = Exact<{
  input: CreateLinkInput;
}>;


export type CreateLinkMutation = { __typename?: 'Mutation', createLink: { __typename?: 'Link', id: string, title: string, description?: string | null, image?: string | null, url: string, tags: Array<string>, commentCount: number, voteCount: number, createdAt: any, user: { __typename?: 'User', id: string, username: string, createdAt: any }, votes: Array<{ __typename?: 'Vote', link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }>, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> } };

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


export type ToggleVoteMutation = { __typename?: 'Mutation', toggleVote?: { __typename?: 'Link', id: string, title: string, description?: string | null, image?: string | null, url: string, tags: Array<string>, commentCount: number, voteCount: number, createdAt: any, votes: Array<{ __typename?: 'Vote', link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }>, user: { __typename?: 'User', id: string, username: string, createdAt: any }, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> } | null };

export type CommentsQueryVariables = Exact<{
  linkId: Scalars['String'];
}>;


export type CommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> };

export type FeedQueryVariables = Exact<{
  args: FeedArgs;
}>;


export type FeedQuery = { __typename?: 'Query', feed: { __typename?: 'Feed', id: string, count: number, links: Array<{ __typename?: 'Link', id: string, title: string, description?: string | null, image?: string | null, url: string, tags: Array<string>, commentCount: number, voteCount: number, createdAt: any, user: { __typename?: 'User', id: string, username: string, createdAt: any }, votes: Array<{ __typename?: 'Vote', link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }>, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> }> } };

export type JobsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type JobsQuery = { __typename?: 'Query', jobs: Array<{ __typename?: 'Job', id: string, name: string, location: string, description: string, categories: Array<string>, level: string, landingPage: string, publicationDate: string, company: { __typename?: 'Company', id: string, image: string, name: string, location: string, description: string } }> };

export type LinkQueryVariables = Exact<{
  linkId: Scalars['ID'];
}>;


export type LinkQuery = { __typename?: 'Query', link: { __typename?: 'Link', id: string, title: string, description?: string | null, image?: string | null, url: string, tags: Array<string>, commentCount: number, voteCount: number, createdAt: any, votes: Array<{ __typename?: 'Vote', link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }>, user: { __typename?: 'User', id: string, username: string, createdAt: any }, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, createdAt: any } | null };

export type PopularTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type PopularTagsQuery = { __typename?: 'Query', popularTags: Array<string> };

export type TopLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type TopLinksQuery = { __typename?: 'Query', topLinks: Array<{ __typename?: 'Link', id: string, title: string, description?: string | null, image?: string | null, url: string, tags: Array<string>, commentCount: number, voteCount: number, createdAt: any, votes: Array<{ __typename?: 'Vote', link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }>, user: { __typename?: 'User', id: string, username: string, createdAt: any }, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> }> };

export type TotalLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type TotalLinksQuery = { __typename?: 'Query', totalLinks: number };

export type UserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, username: string, createdAt: any, links: Array<{ __typename?: 'Link', id: string, title: string, description?: string | null, image?: string | null, url: string, tags: Array<string>, commentCount: number, voteCount: number, createdAt: any, votes: Array<{ __typename?: 'Vote', link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }>, user: { __typename?: 'User', id: string, username: string, createdAt: any }, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> } | null>, votes: Array<{ __typename?: 'Vote', link: { __typename?: 'Link', id: string, title: string, description?: string | null, image?: string | null, url: string, tags: Array<string>, commentCount: number, voteCount: number, createdAt: any, user: { __typename?: 'User', id: string, username: string, createdAt: any }, votes: Array<{ __typename?: 'Vote', link: { __typename?: 'Link', id: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }>, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } }> } } | null>, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, link: { __typename?: 'Link', id: string, title: string }, user: { __typename?: 'User', id: string, username: string, createdAt: any } } | null> } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, username: string, createdAt: any } | null> };

export const CompanyDetailsFragmentDoc = gql`
    fragment CompanyDetails on Company {
  id
  image
  name
  location
  description
}
    `;
export const JobDetailsFragmentDoc = gql`
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
    ${CompanyDetailsFragmentDoc}`;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  createdAt
}
    `;
export const VoteResponseFragmentDoc = gql`
    fragment VoteResponse on Vote {
  link {
    id
  }
  user {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const CommentDetailsFragmentDoc = gql`
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
    ${RegularUserFragmentDoc}`;
export const LinkDetailsFragmentDoc = gql`
    fragment LinkDetails on Link {
  id
  title
  description
  image
  url
  tags
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
    ${VoteResponseFragmentDoc}
${RegularUserFragmentDoc}
${CommentDetailsFragmentDoc}`;
export const CreateCommentDocument = gql`
    mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    ...CommentDetails
  }
}
    ${CommentDetailsFragmentDoc}`;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateLinkDocument = gql`
    mutation CreateLink($input: CreateLinkInput!) {
  createLink(input: $input) {
    ...LinkDetails
    user {
      ...RegularUser
    }
  }
}
    ${LinkDetailsFragmentDoc}
${RegularUserFragmentDoc}`;

/**
 * __useCreateLinkMutation__
 *
 * To run a mutation, you first call `useCreateLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLinkMutation, { data, loading, error }] = useCreateLinkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateLinkMutation, CreateLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLinkMutation, CreateLinkMutationVariables>(CreateLinkDocument, options);
      }
export type CreateLinkMutationHookResult = ReturnType<typeof useCreateLinkMutation>;
export type CreateLinkMutationResult = Apollo.MutationResult<CreateLinkMutation>;
export type CreateLinkMutationOptions = Apollo.BaseMutationOptions<CreateLinkMutation, CreateLinkMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    user {
      ...RegularUser
    }
    token
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($input: SignupInput!) {
  signup(input: $input) {
    user {
      ...RegularUser
    }
    token
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const ToggleVoteDocument = gql`
    mutation ToggleVote($linkId: String!) {
  toggleVote(linkId: $linkId) {
    ...LinkDetails
  }
}
    ${LinkDetailsFragmentDoc}`;

/**
 * __useToggleVoteMutation__
 *
 * To run a mutation, you first call `useToggleVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleVoteMutation, { data, loading, error }] = useToggleVoteMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *   },
 * });
 */
export function useToggleVoteMutation(baseOptions?: Apollo.MutationHookOptions<ToggleVoteMutation, ToggleVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleVoteMutation, ToggleVoteMutationVariables>(ToggleVoteDocument, options);
      }
export type ToggleVoteMutationHookResult = ReturnType<typeof useToggleVoteMutation>;
export type ToggleVoteMutationResult = Apollo.MutationResult<ToggleVoteMutation>;
export type ToggleVoteMutationOptions = Apollo.BaseMutationOptions<ToggleVoteMutation, ToggleVoteMutationVariables>;
export const CommentsDocument = gql`
    query Comments($linkId: String!) {
  comments(linkId: $linkId) {
    ...CommentDetails
  }
}
    ${CommentDetailsFragmentDoc}`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      linkId: // value for 'linkId'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const FeedDocument = gql`
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
${RegularUserFragmentDoc}`;

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useFeedQuery(baseOptions: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
      }
export function useFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
        }
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>;
export const JobsDocument = gql`
    query Jobs($limit: Float) {
  jobs(limit: $limit) {
    ...JobDetails
  }
}
    ${JobDetailsFragmentDoc}`;

/**
 * __useJobsQuery__
 *
 * To run a query within a React component, call `useJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useJobsQuery(baseOptions?: Apollo.QueryHookOptions<JobsQuery, JobsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JobsQuery, JobsQueryVariables>(JobsDocument, options);
      }
export function useJobsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JobsQuery, JobsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JobsQuery, JobsQueryVariables>(JobsDocument, options);
        }
export type JobsQueryHookResult = ReturnType<typeof useJobsQuery>;
export type JobsLazyQueryHookResult = ReturnType<typeof useJobsLazyQuery>;
export type JobsQueryResult = Apollo.QueryResult<JobsQuery, JobsQueryVariables>;
export const LinkDocument = gql`
    query Link($linkId: ID!) {
  link(id: $linkId) {
    ...LinkDetails
  }
}
    ${LinkDetailsFragmentDoc}`;

/**
 * __useLinkQuery__
 *
 * To run a query within a React component, call `useLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLinkQuery({
 *   variables: {
 *      linkId: // value for 'linkId'
 *   },
 * });
 */
export function useLinkQuery(baseOptions: Apollo.QueryHookOptions<LinkQuery, LinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LinkQuery, LinkQueryVariables>(LinkDocument, options);
      }
export function useLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinkQuery, LinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LinkQuery, LinkQueryVariables>(LinkDocument, options);
        }
export type LinkQueryHookResult = ReturnType<typeof useLinkQuery>;
export type LinkLazyQueryHookResult = ReturnType<typeof useLinkLazyQuery>;
export type LinkQueryResult = Apollo.QueryResult<LinkQuery, LinkQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PopularTagsDocument = gql`
    query PopularTags {
  popularTags
}
    `;

/**
 * __usePopularTagsQuery__
 *
 * To run a query within a React component, call `usePopularTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePopularTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePopularTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePopularTagsQuery(baseOptions?: Apollo.QueryHookOptions<PopularTagsQuery, PopularTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PopularTagsQuery, PopularTagsQueryVariables>(PopularTagsDocument, options);
      }
export function usePopularTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PopularTagsQuery, PopularTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PopularTagsQuery, PopularTagsQueryVariables>(PopularTagsDocument, options);
        }
export type PopularTagsQueryHookResult = ReturnType<typeof usePopularTagsQuery>;
export type PopularTagsLazyQueryHookResult = ReturnType<typeof usePopularTagsLazyQuery>;
export type PopularTagsQueryResult = Apollo.QueryResult<PopularTagsQuery, PopularTagsQueryVariables>;
export const TopLinksDocument = gql`
    query TopLinks {
  topLinks {
    ...LinkDetails
  }
}
    ${LinkDetailsFragmentDoc}`;

/**
 * __useTopLinksQuery__
 *
 * To run a query within a React component, call `useTopLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopLinksQuery({
 *   variables: {
 *   },
 * });
 */
export function useTopLinksQuery(baseOptions?: Apollo.QueryHookOptions<TopLinksQuery, TopLinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopLinksQuery, TopLinksQueryVariables>(TopLinksDocument, options);
      }
export function useTopLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopLinksQuery, TopLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopLinksQuery, TopLinksQueryVariables>(TopLinksDocument, options);
        }
export type TopLinksQueryHookResult = ReturnType<typeof useTopLinksQuery>;
export type TopLinksLazyQueryHookResult = ReturnType<typeof useTopLinksLazyQuery>;
export type TopLinksQueryResult = Apollo.QueryResult<TopLinksQuery, TopLinksQueryVariables>;
export const TotalLinksDocument = gql`
    query TotalLinks {
  totalLinks
}
    `;

/**
 * __useTotalLinksQuery__
 *
 * To run a query within a React component, call `useTotalLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTotalLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalLinksQuery({
 *   variables: {
 *   },
 * });
 */
export function useTotalLinksQuery(baseOptions?: Apollo.QueryHookOptions<TotalLinksQuery, TotalLinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TotalLinksQuery, TotalLinksQueryVariables>(TotalLinksDocument, options);
      }
export function useTotalLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TotalLinksQuery, TotalLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TotalLinksQuery, TotalLinksQueryVariables>(TotalLinksDocument, options);
        }
export type TotalLinksQueryHookResult = ReturnType<typeof useTotalLinksQuery>;
export type TotalLinksLazyQueryHookResult = ReturnType<typeof useTotalLinksLazyQuery>;
export type TotalLinksQueryResult = Apollo.QueryResult<TotalLinksQuery, TotalLinksQueryVariables>;
export const UserDocument = gql`
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
${CommentDetailsFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;