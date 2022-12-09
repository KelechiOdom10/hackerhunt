import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { compare, genSalt, hash } from "bcryptjs";
import { SignupInput, LoginInput } from "../dtos";
import { GraphQLError } from "graphql";
import { jwtGenerator } from "server/utils/jwtGenerator";
import type { GraphQLContext } from "~/pages/api/graphql";
import { AuthPayload } from "server/models";

@Resolver(() => AuthPayload)
export class AuthResolver {
  @Mutation(() => AuthPayload)
  async signup(
    @Arg("input", () => SignupInput) input: SignupInput,
    @Ctx() ctx: GraphQLContext
  ) {
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

    const user = await ctx.prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    delete user.password;

    const token = jwtGenerator(user.id);

    return {
      token,
      user,
    };
  }

  @Mutation(() => AuthPayload)
  async login(
    @Arg("input", () => LoginInput) input: LoginInput,
    @Ctx() ctx: GraphQLContext
  ) {
    const { email, password } = input;

    const user = await ctx.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      throw new GraphQLError("User not found", {
        extensions: { code: "NOT_FOUND", http: { status: 404 } },
      });

    const validPassword = await compare(password, user.password);
    if (!validPassword)
      throw new GraphQLError("Invalid password", {
        extensions: { code: "BAD_USER_INPUT", http: { status: 401 } },
      });

    delete user.password;

    const token = jwtGenerator(user.id);

    return {
      token,
      user,
    };
  }
}
