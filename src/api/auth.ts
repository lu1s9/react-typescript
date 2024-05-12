import axios from "./axios";

export const signupRequest = (user: { email: string; password: string }) =>
  axios.post(`/signup`, user);

export const loginRequest = (user: { email: string; password: string }) =>
  axios.post(`/login`, user);
