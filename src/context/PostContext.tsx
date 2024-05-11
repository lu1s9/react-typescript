import { createContext, useReducer } from "react";
import {
  props,
  PostState,
  ACTIONTYPE,
  PostContextType,
} from "../interfaces/interfaces";

const initialState: PostState = {
  posts: [],
};

const postsReducer = (state: PostState, action: ACTIONTYPE): PostState => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        posts: action.payload,
      };
    case "CREATE_POST":
      return {
        posts: [action.payload, ...state.posts],
      };

    case "DELETE_POST":
      return {
        posts: state.posts.filter((p) => p._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const PostsContext = createContext<PostContextType>(
  {} as PostContextType
);

export const PostsContextProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  return (
    <PostsContext.Provider value={{ state, dispatch }}>
      {children}
    </PostsContext.Provider>
  );
};
