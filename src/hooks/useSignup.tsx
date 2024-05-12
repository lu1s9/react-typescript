import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { signupRequest } from "../api/auth";
import { User } from "../interfaces/interfaces";
import axios from "axios";

export const useSignup = () => {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (user: User) => {
    setErrors([]);
    setIsLoading(true);

    try {
      const res = await signupRequest(user);
      dispatch({ type: "LOGIN", payload: res.data });
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoading(false);
        setErrors(error.response?.data);
      }
    }
  };

  return { signup, isLoading, errors };
};
