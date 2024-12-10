import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

// Helper to decode JWT token
export const baseURL = "http://192.168.5.137:5002/";
const decodeToken = (token: string): { exp: number } | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

// Helper to check token expiration
const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime; // Check if the token is expired
};

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: baseURL, // Replace with your backend base URL
  timeout: 10000,
});
// Add request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const router = useRouter();
    const user = await AsyncStorage.getItem("user");
    const token = user ? JSON.parse(user)?.token : null;

    if (token) {
      if (isTokenExpired(token)) {
        await AsyncStorage.removeItem("user"); // Clear expired token
        router.push("/(auth)/signIn"); // Redirect to login
        throw new axios.Cancel("Token expired");
      }

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("user"); // Clear user data
      const router = useRouter();
      router.push("/(auth)/signIn"); // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
