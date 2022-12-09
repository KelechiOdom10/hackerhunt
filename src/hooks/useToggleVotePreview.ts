import {
  useToggleVoteMutation,
  LinkQuery,
  LinkDocument,
  LinkQueryVariables,
} from "~/apollo/generated/graphql";

export const useToggleVotePreview = (id: string) => {
  const [toggleVote] = useToggleVoteMutation({
    update(cache, { data: { toggleVote } }) {
      cache.writeQuery<LinkQuery, LinkQueryVariables>({
        query: LinkDocument,
        variables: { linkId: id },
        data: {
          link: {
            ...toggleVote,
          },
        },
      });
    },
  });
  return toggleVote;
};
