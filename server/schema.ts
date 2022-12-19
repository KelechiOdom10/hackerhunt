import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLError } from "graphql";
import { validate } from "class-validator";
import { buildTypeDefsAndResolversSync } from "type-graphql";
import {
  UserResolver,
  AuthResolver,
  CommentResolver,
  VoteResolver,
  LinkResolver,
  JobResolver,
} from "./resolvers";

const { typeDefs, resolvers } = buildTypeDefsAndResolversSync({
  resolvers: [
    UserResolver,
    AuthResolver,
    CommentResolver,
    VoteResolver,
    LinkResolver,
    JobResolver,
  ],
  emitSchemaFile: {
    path: "./src/apollo/schema.graphql",
  },
  validate: async argValue => {
    const errors = await validate(argValue);
    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints)[0];
      throw new GraphQLError(message || "Argument Validation Error", {
        extensions: {
          code: "BAD_USER_INPUT",
          validationErrors: errors,
          message: "One or more fields are invalid",
          http: {
            status: 400,
          },
        },
      });
    }
  },
  skipCheck: true, // allow for schema without queries
});

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
