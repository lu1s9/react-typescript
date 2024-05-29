import { createContext, useReducer } from "react";
import { Dispatch } from "react";

export interface props {
  children: JSX.Element | JSX.Element[];
}

const initialState: PostState = {
  posts: [],
};

export interface IPost {
  __v: number;
  _id: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  likes: string[];
  comments: [string];
}

export interface ILike {
  _id: string;
  likes: string[];
}

export interface PostState {
  posts: IPost[];
}

export type ACTIONTYPE =
  | { type: "SET_POSTS"; payload: IPost[] }
  | { type: "CREATE_POST"; payload: IPost }
  | { type: "DELETE_POST"; payload: IPost }
  | { type: "TOGGLE_LIKE"; payload: ILike };

export interface PostContextType {
  state: PostState;
  dispatch: Dispatch<ACTIONTYPE>;
}

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
    case "TOGGLE_LIKE":
      return {
        posts: state.posts.map((post) =>
          post._id === action.payload._id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
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
