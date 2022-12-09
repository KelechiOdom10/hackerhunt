import {
  useToggleVoteMutation,
  LinkQuery,
  LinkDocument,
} from "~/apollo/generated/graphql";

export const useToggleVoteDetail = (id: string) => {
  const [toggleVote] = useToggleVoteMutation({
    update(cache, { data: { toggleVote } }) {
      cache.writeQuery<LinkQuery>({
        query: LinkDocument,
        data: {
          link: toggleVote,
        },
        variables: { linkId: id },
      });
    },
  });
  return toggleVote;
};
