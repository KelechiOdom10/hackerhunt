import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

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
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  token: Scalars["String"];
  user: User;
};

export type Comment = {
  __typename?: "Comment";
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  link: Link;
  text: Scalars["String"];
  user: User;
};

export type Link = {
  __typename?: "Link";
  commentCount: Scalars["Int"];
  comments: Array<Comment>;
  createdAt: Scalars["DateTime"];
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  image?: Maybe<Scalars["String"]>;
  tags: Array<Maybe<Scalars["String"]>>;
  title: Scalars["String"];
  upVoted: Scalars["Boolean"];
  url: Scalars["String"];
  user?: Maybe<User>;
  voteCount: Scalars["Int"];
  votes: Array<Vote>;
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
  tags: Array<Scalars["String"]>;
  title: Scalars["String"];
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
  me?: Maybe<User>;
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
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  id: Scalars["ID"];
  links: Array<Link>;
  username: Scalars["String"];
  votes: Array<Vote>;
};

export type Vote = {
  __typename?: "Vote";
  id: Scalars["ID"];
  link: Link;
  user: User;
};

export type CreateCommentInput = {
  id: Scalars["ID"];
  text: Scalars["String"];
};

export type CreateLinkInput = {
  tags: Array<Scalars["String"]>;
  title: Scalars["String"];
  url: Scalars["String"];
};

export type IdInput = {
  id: Scalars["ID"];
};

export type LinkDetailsFragment = {
  __typename?: "Link";
  id: string;
  title: string;
  image?: string | null | undefined;
  url: string;
  tags: Array<string | null | undefined>;
  commentCount: number;
  voteCount: number;
  upVoted: boolean;
  createdAt: any;
};

export type RegularUserFragment = {
  __typename?: "User";
  id: string;
  username: string;
};

export type SignInMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type SignInMutation = {
  __typename?: "Mutation";
  signIn: {
    __typename?: "AuthPayload";
    token: string;
    user: { __typename?: "User"; id: string; username: string };
  };
};

export type SignUpMutationVariables = Exact<{
  username: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type SignUpMutation = {
  __typename?: "Mutation";
  signUp: {
    __typename?: "AuthPayload";
    token: string;
    user: { __typename?: "User"; id: string; username: string };
  };
};

export type FeedQueryVariables = Exact<{ [key: string]: never }>;

export type FeedQuery = {
  __typename?: "Query";
  feed: Array<{
    __typename?: "Link";
    id: string;
    title: string;
    image?: string | null | undefined;
    url: string;
    tags: Array<string | null | undefined>;
    commentCount: number;
    voteCount: number;
    upVoted: boolean;
    createdAt: any;
    user?:
      | { __typename?: "User"; id: string; username: string }
      | null
      | undefined;
  }>;
};

export type LinkQueryVariables = Exact<{
  linkId: Scalars["ID"];
}>;

export type LinkQuery = {
  __typename?: "Query";
  link: {
    __typename?: "Link";
    id: string;
    title: string;
    image?: string | null | undefined;
    url: string;
    tags: Array<string | null | undefined>;
    commentCount: number;
    voteCount: number;
    upVoted: boolean;
    createdAt: any;
    user?:
      | { __typename?: "User"; id: string; username: string }
      | null
      | undefined;
    comments: Array<{
      __typename?: "Comment";
      id: string;
      createdAt: any;
      text: string;
      user: { __typename?: "User"; id: string; username: string };
    }>;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: { __typename?: "User"; id: string; username: string } | null | undefined;
};

export type UserQueryVariables = Exact<{
  userId: Scalars["ID"];
}>;

export type UserQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    email: string;
    id: string;
    username: string;
    links: Array<{
      __typename?: "Link";
      id: string;
      title: string;
      image?: string | null | undefined;
      url: string;
      tags: Array<string | null | undefined>;
      commentCount: number;
      voteCount: number;
      upVoted: boolean;
      createdAt: any;
    }>;
    votes: Array<{
      __typename?: "Vote";
      link: {
        __typename?: "Link";
        id: string;
        title: string;
        image?: string | null | undefined;
        url: string;
        tags: Array<string | null | undefined>;
        commentCount: number;
        voteCount: number;
        upVoted: boolean;
        createdAt: any;
        user?:
          | { __typename?: "User"; id: string; username: string }
          | null
          | undefined;
      };
    }>;
    comments: Array<{
      __typename?: "Comment";
      id: string;
      text: string;
      link: { __typename?: "Link"; id: string };
    }>;
  };
};

export const LinkDetailsFragmentDoc = gql`
  fragment LinkDetails on Link {
    id
    title
    image
    url
    tags
    commentCount
    voteCount
    upVoted
    createdAt
  }
`;
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    username
  }
`;
export const SignInDocument = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        ...RegularUser
      }
      token
    }
  }
  ${RegularUserFragmentDoc}
`;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    options
  );
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
export const SignUpDocument = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      user {
        ...RegularUser
      }
      token
    }
  }
  ${RegularUserFragmentDoc}
`;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    options
  );
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
>;
export const FeedDocument = gql`
  query Feed {
    feed {
      ...LinkDetails
      user {
        ...RegularUser
      }
    }
  }
  ${LinkDetailsFragmentDoc}
  ${RegularUserFragmentDoc}
`;

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
 *   },
 * });
 */
export function useFeedQuery(
  baseOptions?: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
}
export function useFeedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(
    FeedDocument,
    options
  );
}
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>;
export const LinkDocument = gql`
  query Link($linkId: ID!) {
    link(id: $linkId) {
      ...LinkDetails
      user {
        ...RegularUser
      }
      comments {
        id
        createdAt
        text
        user {
          ...RegularUser
        }
      }
    }
  }
  ${LinkDetailsFragmentDoc}
  ${RegularUserFragmentDoc}
`;

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
export function useLinkQuery(
  baseOptions: Apollo.QueryHookOptions<LinkQuery, LinkQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LinkQuery, LinkQueryVariables>(LinkDocument, options);
}
export function useLinkLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<LinkQuery, LinkQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LinkQuery, LinkQueryVariables>(
    LinkDocument,
    options
  );
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
  ${RegularUserFragmentDoc}
`;

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
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserDocument = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      ...RegularUser
      email
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
        id
        text
        link {
          id
        }
      }
    }
  }
  ${RegularUserFragmentDoc}
  ${LinkDetailsFragmentDoc}
`;

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
export function useUserQuery(
  baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    options
  );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
