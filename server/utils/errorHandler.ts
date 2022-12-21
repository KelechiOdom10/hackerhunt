import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { GraphQLError } from "graphql";

export const customValidate = async <T extends ClassConstructor<any>>(
  dto: T,
  obj: unknown
) => {
  // transform the literal object to class object
  const objInstance = plainToClass(dto, obj);
  // validating and check the errors, throw the errors if exist
  const errors = await validate(objInstance);
  // errors is an array of validation errors
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
};
