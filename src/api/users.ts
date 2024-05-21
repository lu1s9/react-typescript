import axios from "./axios";

export const getUsers = () => axios.get("/users");

export const addFriend = (user1_ID: string, user2_ID: string) =>
  axios.post("/friends", { user1_ID, user2_ID });

export const getFriends = () => axios.get("/friends");
