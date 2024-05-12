import { createContext, useEffect, useReducer } from "react";
import {
  AuthContextType,
  AuthState,
  props,
  AUTHACTIONTYPE,
} from "../interfaces/interfaces";
import Cookies from "js-cookie";

const initialState: AuthState = {
  token: null,
};

export const AuthContext = createContext<AuthContextType | null>(
  {} as AuthContextType
);

const authReducer = (state: AuthState, action: AUTHACTIONTYPE): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        token: action.payload,
      };
    case "LOGOUT":
      return {
        token: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      dispatch({ type: "LOGIN", payload: token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
