import {
  useToggleVoteMutation,
  FeedQuery,
  FeedDocument,
} from "~/apollo/generated/graphql";

export const useToggleVotePreview = (id: string) => {
  const [toggleVote] = useToggleVoteMutation({
    update(cache, { data: { toggleVote } }) {
      const { feed } = cache.readQuery<FeedQuery>({ query: FeedDocument });
      cache.writeQuery<FeedQuery>({
        query: FeedDocument,
        data: {
          feed: feed.map(link => (link.id === id ? toggleVote : link)),
        },
      });
    },
  });
  return toggleVote;
};
