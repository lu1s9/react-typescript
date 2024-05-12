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

export type AUTHACTIONTYPE =
  | { type: "LOGIN"; payload: string }
  | { type: "LOGOUT" };

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

export interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AUTHACTIONTYPE>;
}

export interface AuthState {
  token: string | null;
}

export interface IUser {
  __v: number;
  _id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  email: string;
  password: string;
}
