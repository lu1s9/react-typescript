import { useAuthContext } from "./useAuthContext";
import { usePostsContext } from "./usePostsContext";

import Cookies from "js-cookie";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: postsDispatch } = usePostsContext();
  const logout = () => {
    Cookies.remove("token");

    dispatch({ type: "LOGOUT" });
    postsDispatch({ type: "SET_POSTS", payload: [] });
  };

  return { logout };
};
