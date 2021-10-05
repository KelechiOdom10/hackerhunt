import { gql } from "apollo-server-micro";

export const typeDefs = gql`
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
  }

  type Link {
    id: ID!
    title: String!
    image: String
    description: String
    url: String!
    user: User
    comments: [Comment]
  }

  type Comment {
    id: ID!
    text: String!
    link: Link!
    user: User!
  }

  type Query {
    sayHello: String
    feed: [Link!]!
    link(id: ID!): Link!
    me: User!
    user(id: ID!): User!
  }

  input LinkInput {
    title: String!
    url: String!
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
    createLink(title: String!, url: String!): Link!
    toggleVote(id: ID!): Boolean!
    createComment(id: ID!, text: String!): Comment!
  }
`;
