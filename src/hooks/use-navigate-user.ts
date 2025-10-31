import { useCallback } from "react";
import { navigate } from "../utils/helpers/router";
import { IUser } from "../utils/types";

export function useNavigateUser(user: IUser | null) {
  return useCallback(() => {
    navigate(`/profile/${user?.id}`);
  }, [navigate, user?.id]);
}
