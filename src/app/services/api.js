"use client";
import axios from "axios";
import {
  useMutation,
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const API_BASE_URL = "http://localhost:5145";

const queryClient = new QueryClient();

const saveUserData = (data) => {
  localStorage.setItem("authData", data);
};
const removeUserData = () => {
  localStorage.removeItem("authData");
};

const registerUser = async (userDto) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/Users/Register`,
    userDto
  );
  return response.data;
};

const loginUser = async (userLoginDto) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/Users/Login`,
      userLoginDto
    );

    const { userData } = response.data;
    saveUserData(userData);

    return response.data;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Login failed:", error);
    throw error;
  }
};

const getUserData = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authData");
  }
  return null;
};
const authHeaders = {
  Authorization: `Bearer ${getUserData()}`,
};

const useUserData = () => {
  return useQuery("userData", getUserData);
};

const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation(registerUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("userData");
    },
  });
};

const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation(loginUser, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("userData");
      saveUserData(response.data);
    },
  });
};

export {
  useUserData,
  useRegisterUser,
  useLoginUser,
  removeUserData,
  getUserData,
  API_BASE_URL,
};

// Provider to manage state
export const ApiProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
