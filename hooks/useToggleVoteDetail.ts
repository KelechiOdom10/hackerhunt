import {
  LinkDocument,
  LinkQuery,
  useToggleVoteMutation,
} from "../apollo/generated/graphql";

export const useToggleVoteDetail = (id: string) => {
  const [toggleVote] = useToggleVoteMutation({
    update(cache, { data: { toggleVote } }) {
      //   const { link } = cache.readQuery<LinkQuery>({
      //     query: LinkDocument,
      //     variables: { linkId: id },
      //   });
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
