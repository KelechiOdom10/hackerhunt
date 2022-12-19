import { AuthResolver } from "./auth.resolver";
import { UserResolver } from "./user.resolver";
import { LinkResolver } from "./link.resolver";
import { CommentResolver } from "./comment.resolver";
import { VoteResolver } from "./vote.resolver";
import { JobResolver } from "./job.resolver";

export const resolvers = [
  AuthResolver,
  UserResolver,
  LinkResolver,
  CommentResolver,
  VoteResolver,
  JobResolver,
] as const;
