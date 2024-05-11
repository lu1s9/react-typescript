import { PostsContext } from "../context/PostContext";
import { useContext } from "react";

export const usePostsContext = () => {
  const context = useContext(PostsContext);

  if (!context)
    throw new Error(
      "UsePostsContext must be used inside a PostsContextProvider"
    );

  return context;
};
