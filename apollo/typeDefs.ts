import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  scalar DateTime

  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    links: [Link!]!
    comments: [Comment!]!
    votes: [Vote!]!
    createdAt: DateTime!
  }

  type Link {
    id: ID!
    title: String!
    image: String
    description: String
    url: String!
    tags: [String]!
    user: User
    comments: [Comment!]!
    commentCount: Int!
    votes: [Vote!]!
    voteCount: Int!
    upVoted: Boolean!
    createdAt: DateTime!
  }

  type Vote {
    id: ID!
    link: Link!
    user: User!
  }

  type Comment {
    id: ID!
    text: String!
    link: Link!
    user: User!
    createdAt: DateTime!
  }

  type Query {
    sayHello: String
    feed: [Link!]!
    link(id: ID!): Link!
    me: User
    user(id: ID!): User!
  }

  input SignUpInput {
    username: String!
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input createLinkInput {
    title: String!
    url: String!
    tags: [String!]!
  }

  input createCommentInput {
    id: ID!
    text: String!
  }

  input idInput {
    id: ID!
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): AuthPayload!
    signIn(email: String!, password: String!): AuthPayload!
    createLink(title: String!, url: String!, tags: [String!]!): Link!
    toggleVote(id: ID!): Boolean!
    createComment(id: ID!, text: String!): Comment!
  }
`;
