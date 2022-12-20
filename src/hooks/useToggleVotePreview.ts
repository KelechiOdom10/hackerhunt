import {
  useToggleVoteMutation,
  LinkQuery,
  LinkDocument,
  LinkQueryVariables,
} from "~/apollo/generated/graphql";

export const useToggleVotePreview = (id: string) => {
  const [toggleVote] = useToggleVoteMutation({
    update(cache, { data: { toggleVote } }) {
      console.log({ cache, toggleVote });
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
    onError: e => {
      console.log(e);
    },
  });
  return toggleVote;
};
