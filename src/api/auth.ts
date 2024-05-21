import axios from "./axios";

export const signupRequest = (user: {
  email: string;
  name: string;
  password: string;
}) => axios.post(`/auth/signup`, user);

export const loginRequest = (user: { email: string; password: string }) =>
  axios.post(`/auth/login`, user);
