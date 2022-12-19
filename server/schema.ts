import { GraphQLError } from "graphql";
import { validate } from "class-validator";
import {
  buildTypeDefsAndResolvers,
  ClassType,
  NonEmptyArray,
} from "type-graphql";
import * as tqResolvers from "./resolvers";
import { makeExecutableSchema } from "@graphql-tools/schema";

export const schema = async () => {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    emitSchemaFile: {
      path: "./src/apollo/schema.graphql",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolvers: Object.values(tqResolvers) as NonEmptyArray<ClassType<any>>,
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
  return makeExecutableSchema({ typeDefs, resolvers: resolvers });
};

// export const schema = buildSchemaSync({
//   emitSchemaFile: {
//     path: "./src/apollo/schema.graphql",
//   },
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   resolvers: Object.values(resolvers) as NonEmptyArray<ClassType<any>>,
//   validate: async argValue => {
//     const errors = await validate(argValue);
//     if (errors.length > 0) {
//       const message = Object.values(errors[0].constraints)[0];
//       throw new GraphQLError(message || "Argument Validation Error", {
//         extensions: {
//           code: "BAD_USER_INPUT",
//           validationErrors: errors,
//           message: "One or more fields are invalid",
//           http: {
//             status: 400,
//           },
//         },
//       });
//     }
//   },
// });
