import { createContext, useReducer, Dispatch } from "react";

export interface props {
  children: JSX.Element | JSX.Element[];
}

export interface IFriendship {
  _id: string;
  user1_id: string;
  user2_id: string;
  status: string;
}

const initialState: FriendshipState = {
  friends: [],
};

export interface FriendshipState {
  friends: IFriendship[];
}

export type FACTIONTYPE =
  | { type: "SET_FRIENDS"; payload: IFriendship[] }
  | { type: "ADD_FRIEND"; payload: IFriendship }
  | { type: "REMOVE_FRIEND"; payload: IFriendship }
  | { type: "ACCEPT_FRIEND"; payload: IFriendship };

export interface FriendshipContextType {
  state: FriendshipState;
  dispatch: Dispatch<FACTIONTYPE>;
}

const friendsReducer = (
  state: FriendshipState,
  action: FACTIONTYPE
): FriendshipState => {
  switch (action.type) {
    case "SET_FRIENDS":
      return {
        friends: action.payload,
      };
    case "ADD_FRIEND":
      return {
        // friends: [action.payload, ...state.friends],
        friends: state.friends.filter((p) => p._id !== action.payload._id),
      };

    case "REMOVE_FRIEND":
      return {
        friends: state.friends.filter((p) => p._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const FriendsContext = createContext<FriendshipContextType>(
  {} as FriendshipContextType
);

export const FriendsContextProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(friendsReducer, initialState);
  return (
    <FriendsContext.Provider value={{ state, dispatch }}>
      {children}
    </FriendsContext.Provider>
  );
};
