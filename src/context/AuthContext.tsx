import { createContext, useEffect, useReducer } from "react";
import { Dispatch } from "react";
import Cookies from "js-cookie";

export interface props {
  children: JSX.Element | JSX.Element[];
}

export interface IUser extends User {
  __v: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
}

export type AUTHACTIONTYPE =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" };

export interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AUTHACTIONTYPE>;
}
export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const AuthContext = createContext<AuthContextType | null>(
  {} as AuthContextType
);

const authReducer = (state: AuthState, action: AUTHACTIONTYPE): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = Cookies.get("token");
    if (token) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
