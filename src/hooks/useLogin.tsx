import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { loginRequest } from "../api/auth";
import { User } from "../interfaces/interfaces";
import axios from "axios";

export const useLogin = () => {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (user: User) => {
    setErrors([]);
    setIsLoading(true);

    try {
      const res = await loginRequest(user);
      dispatch({ type: "LOGIN", payload: res.data });
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoading(false);
        setErrors(error.response?.data);
      }
    }
  };

  return { login, isLoading, errors };
};
