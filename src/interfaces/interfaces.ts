import { Dispatch } from "react";

export interface props {
  children: JSX.Element | JSX.Element[];
}

export interface IPost {
  __v: number;
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostState {
  posts: IPost[];
}

export type ACTIONTYPE =
  | { type: "SET_POSTS"; payload: IPost[] }
  | { type: "CREATE_POST"; payload: IPost }
  | { type: "DELETE_POST"; payload: IPost };

export interface PostContextType {
  state: PostState;
  dispatch: Dispatch<ACTIONTYPE>;
}

export type PostType = {
  __v: number;
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};
