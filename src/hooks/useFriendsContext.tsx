import { FriendsContext } from "../context/FrienshipContext";
import { useContext } from "react";

export const useFriendsContext = () => {
  const context = useContext(FriendsContext);

  if (!context)
    throw new Error(
      "UseFriendsContext must be used inside a FriendsContextProvider"
    );

  return context;
};
