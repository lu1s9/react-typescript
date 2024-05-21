import { createContext, useReducer, Dispatch } from "react";

export interface props {
  children: JSX.Element | JSX.Element[];
}

export interface UserState {
  users: IUser[];
}

export interface UserContextType {
  state: UserState;
  dispatch: Dispatch<USERACTIONTYPE>;
}

export interface IUser extends User {
  __v: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  email: string;
  password: string;
  name: string;
}

export type USERACTIONTYPE =
  | { type: "SET_USERS"; payload: IUser[] }
  | { type: "CREATE_USER"; payload: IUser }
  | { type: "DELETE_USER"; payload: IUser };

const initialState: UserState = {
  users: [],
};

const usersReducer = (state: UserState, action: USERACTIONTYPE): UserState => {
  switch (action.type) {
    case "SET_USERS":
      return {
        users: action.payload,
      };
    case "CREATE_USER":
      return {
        users: [action.payload, ...state.users],
      };

    case "DELETE_USER":
      return {
        users: state.users.filter((p) => p._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export const UsersContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UsersContextProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};
