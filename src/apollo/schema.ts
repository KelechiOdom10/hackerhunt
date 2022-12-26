import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  authTypeDef as AuthPayload,
  authResolver,
} from "./resolvers/auth.resolver";
import { userTypeDef as User, userResolver } from "./resolvers/user.resolver";
import { jobTypeDef as Job, jobResolver } from "./resolvers/job.resolver";
import { linkTypeDef as Link, linkResolver } from "./resolvers/link.resolver";
import { voteTypeDef as Vote, voteResolver } from "./resolvers/vote.resolver";
import {
  commentTypeDef as Comment,
  commentResolver,
} from "./resolvers/comment.resolver";
import { tagTypeDef as Tag, tagResolver } from "./resolvers/tag.resolver";
import { gql } from "graphql-tag";
import { merge } from "lodash";

const Query = gql`
  scalar DateTime
`;

export const schema = makeExecutableSchema({
  typeDefs: [Query, AuthPayload, User, Job, Link, Comment, Vote, Tag],
  resolvers: merge(
    authResolver,
    userResolver,
    jobResolver,
    linkResolver,
    voteResolver,
    commentResolver,
    tagResolver
  ),
});
