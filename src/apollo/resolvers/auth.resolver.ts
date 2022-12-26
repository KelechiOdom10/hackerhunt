import { gql } from "graphql-tag";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { compare, genSalt, hash } from "bcryptjs";
import { GraphQLError } from "graphql";
import { jwtGenerator } from "server/utils/jwtGenerator";
import { SignupInput, LoginInput } from "server/dtos";
import { customValidate } from "server/utils/errorHandler";
import prisma from "server/db";

export const authTypeDef = gql`
  type AuthPayload {
    token: String!
    user: User!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input SignupInput {
    email: String!
    password: String!
    username: String!
  }

  type Mutation {
    login(input: LoginInput!): AuthPayload!
    signup(input: SignupInput!): AuthPayload!
  }
`;

export const authResolver = {
  Mutation: {
    signup: async (_parent, { input }: { input: SignupInput }) => {
      await customValidate(SignupInput, input);

      const { email, password, username } = input;
      const userWithEmailPromise = prisma.user.findUnique({
        where: { email },
      });

      const userWithUsernamePromise = prisma.user.findUnique({
        where: { username },
      });

      const [userWithEmail, userWithUsername] = await Promise.all([
        userWithEmailPromise,
        userWithUsernamePromise,
      ]);

      if (userWithEmail) {
        throw new GraphQLError("User with email already exists", {
          extensions: {
            code: "ALREADY_EXISTS",
            http: { status: 409 },
          },
        });
      }

      if (userWithUsername) {
        throw new GraphQLError("User with username already exists", {
          extensions: {
            code: "ALREADY_EXISTS",
            http: { status: 409 },
          },
        });
      }

      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      const { password: _, ...user } = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      });

      const token = jwtGenerator(user.id);

      return {
        token,
        user,
      };
    },

    login: async (_parent, { input }: { input: LoginInput }) => {
      await customValidate(LoginInput, input);

      const { email, password } = input;
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!existingUser)
        throw new GraphQLError("User not found", {
          extensions: { code: "NOT_FOUND", http: { status: 404 } },
        });

      const { password: existingPassword, ...user } = existingUser;

      const validPassword = await compare(password, existingPassword);
      if (!validPassword) {
        throw new GraphQLError("Invalid password", {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            http: { status: 401 },
          },
        });
      }

      const token = jwtGenerator(user.id);

      return {
        token,
        user,
      };
    },
  },
};
