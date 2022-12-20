import { GraphQLError } from "graphql";
import { validate } from "class-validator";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";

export const schema = await buildSchema({
  emitSchemaFile: {
    path: "./src/apollo/schema.graphql",
  },
  resolvers,
  validate: async argValue => {
    const errors = await validate(argValue!);
    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints!)[0];
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
});
