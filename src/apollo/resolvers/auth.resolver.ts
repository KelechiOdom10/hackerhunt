import { gql } from "@apollo/client";
import { UserInputError } from "apollo-server-micro";
import { compare, genSalt, hash } from "bcryptjs";
import { GraphQLError } from "graphql";
import { jwtGenerator } from "server/utils/jwtGenerator";
import { GraphQLContext } from "~/pages/api/graphql";
import { SignupInput, LoginInput } from "../generated/graphql";
import { isEmail } from "class-validator";

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
    signup: async (
      _parent,
      { input }: { input: SignupInput },
      ctx: GraphQLContext
    ) => {
      if (!input.email || !input.username || !input.password)
        throw new UserInputError("All fields are required");

      if (input.email && !isEmail(input.email)) {
        throw new UserInputError("Email is not in valid format");
      }

      const { email, password, username } = input;
      const userWithEmailPromise = ctx.prisma.user.findUnique({
        where: { email },
      });

      const userWithUsernamePromise = ctx.prisma.user.findUnique({
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

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...user } = await ctx.prisma.user.create({
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

    login: async (
      _parent,
      { input }: { input: LoginInput },
      ctx: GraphQLContext
    ) => {
      console.log(input);
      if (!input.email || !input.password)
        throw new UserInputError("Both fields are required");

      if (input.email && !isEmail(input.email)) {
        throw new UserInputError("Email is not in valid format");
      }

      const { email, password } = input;

      const existingUser = await ctx.prisma.user.findUnique({
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
      if (!validPassword)
        throw new GraphQLError("Invalid password", {
          extensions: { code: "BAD_USER_INPUT", http: { status: 401 } },
        });

      const token = jwtGenerator(user.id);

      return {
        token,
        user,
      };
    },
  },
};