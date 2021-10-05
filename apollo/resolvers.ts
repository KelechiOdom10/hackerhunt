import {
  UserInputError,
  ValidationError,
  AuthenticationError,
} from "apollo-server-micro";
import * as bcrypt from "bcryptjs";
import { getLinkPreview } from "link-preview-js";
import { GraphQLContext } from "../pages/api/graphql";
import { jwtGenerator } from "../utils/jwtGenerator";
import { getUserId } from "../utils/auth";
import {
  CreateCommentInput,
  CreateLinkInput,
  IdInput,
  SignInInput,
  SignUpInput,
} from "./generated/graphql";
import { HTMLResponse } from "../components/post/PostPreview";

export const resolvers = {
  Query: {
    sayHello() {
      return "Hello World!";
    },

    feed: async (_parent, _args, ctx: GraphQLContext) => {
      const links = await ctx.prisma.link.findMany({
        include: {
          _count: true,
          user: true,
        },
      });
      return links;
    },

    me: async (_parent, _args, ctx: GraphQLContext) => {
      const userId = getUserId(ctx);
      if (!userId)
        throw new AuthenticationError("You need to be authenticated");

      const user = await ctx.prisma.user.findFirst({ where: { id: userId } });
      return user;
    },

    user: async (_parent, args: IdInput, ctx: GraphQLContext) => {
      const user = await ctx.prisma.user.findFirst({
        where: { id: args.id },
        include: {
          links: true,
          comments: true,
        },
      });

      if (!user) throw new Error("User not found");

      return user;
    },

    link: async (_parent, args: IdInput, ctx: GraphQLContext) => {
      const link = await ctx.prisma.link.findFirst({
        where: { id: args.id },
        include: {
          user: true,
          comments: true,
        },
      });

      if (!link) {
        throw new Error("Link doesn't exist or has been deleted");
      }

      return link;
    },
  },
  Mutation: {
    signUp: async (_parent, args: SignUpInput, ctx: GraphQLContext) => {
      if (!args.email || !args.username || !args.password)
        throw new UserInputError("All fields are required");

      const existingUser = await ctx.prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });

      if (existingUser) throw new Error("User Already exists");

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(args.password, salt);

      const user = await ctx.prisma.user.create({
        data: {
          email: args.email,
          password,
          username: args.username,
        },
      });

      const token = jwtGenerator(user.id);

      return {
        user,
        token,
      };
    },

    signIn: async (_parent, args: SignInInput, ctx: GraphQLContext) => {
      if (!args.email || !args.password)
        throw new UserInputError("Both fields are required");

      const user = await ctx.prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });

      if (!user) throw new ValidationError("User does not exist");

      const validPassword = await bcrypt.compare(args.password, user.password);
      if (!validPassword) throw new ValidationError("Invalid password");

      const token = jwtGenerator(user.id);

      return {
        user,
        token,
      };
    },

    createLink: async (_parent, args: CreateLinkInput, ctx: GraphQLContext) => {
      const userId = getUserId(ctx);
      if (!userId) throw new AuthenticationError("Not Authenticated");

      if (!args.title || !args.url)
        throw new UserInputError("Both fields are required");

      const urlData = (await getLinkPreview(args.url)) as HTMLResponse;

      const link = await ctx.prisma.link.create({
        data: {
          title: args.title,
          description: urlData?.description,
          image: urlData?.images ? urlData?.images[0] : "",
          url: args.url,
          user: { connect: { id: userId } },
        },
        include: {
          user: true,
        },
      });

      return link;
    },

    toggleVote: async (_parent, args: IdInput, ctx: GraphQLContext) => {
      const userId = getUserId(ctx);
      const user = await ctx.prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      if (!user) throw new AuthenticationError("Not Authenticated");

      // check if the like already exists, if exists remove it
      const vote = await ctx.prisma.vote.findFirst({
        where: {
          AND: [{ linkId: args.id }, { userId }],
        },
      });

      if (vote) {
        await ctx.prisma.vote.delete({ where: { id: vote.id } });
        return true;
      }

      if (!vote) {
        await ctx.prisma.vote.create({
          data: {
            user: { connect: { id: userId } },
            link: { connect: { id: args.id } },
          },
        });
        return true;
      }

      return false;
    },

    createComment: async (
      _parent,
      args: CreateCommentInput,
      ctx: GraphQLContext
    ) => {
      const userId = getUserId(ctx);
      const user = await ctx.prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      if (!user) throw new AuthenticationError("Not Authenticated");

      const comment = await ctx.prisma.comment.create({
        data: {
          user: { connect: { id: userId } },
          link: { connect: { id: args.id } },
          text: args.text,
        },
        include: { link: true, user: true },
      });

      return comment;
    },
  },
};
