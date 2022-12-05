import { GraphQLError } from "graphql";
import { validate } from "class-validator";
import { buildSchemaSync, ClassType, NonEmptyArray } from "type-graphql";
import * as resolvers from "./resolvers";

export const schema = buildSchemaSync({
  emitSchemaFile: {
    path: "./src/apollo/schema.graphql",
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolvers: Object.values(resolvers) as NonEmptyArray<ClassType<any>>,
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
});
