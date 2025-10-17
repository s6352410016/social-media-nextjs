import { InfiniteData, QueryClient } from "@tanstack/react-query";
import { IFollower, IUser, UsersTemp } from "../types";

export function setQueryDataUsersStatus(queryClient: QueryClient, users: UsersTemp) {
  queryClient.setQueryData<
    InfiniteData<{
      users: (IUser & { followers: IFollower[]; active?: boolean })[];
      nextCursor: string | null;
    }>
  >(["usersSuggest"], (oldUsersSuggest) => {
    if (!oldUsersSuggest) {
      return undefined;
    }

    return {
      ...oldUsersSuggest,
      pages: oldUsersSuggest.pages.map((group) => ({
        ...group,
        users: group.users.map(
          (
            oldUserSuggest: IUser & {
              followers: IFollower[];
              active?: boolean;
            }
          ) => {
            const matchedUser = users.find(
              (user) => user.id === oldUserSuggest.id
            );
            return {
              ...oldUserSuggest,
              active: matchedUser ? matchedUser.active : false,
            };
          }
        ),
      })),
    };
  });
}
