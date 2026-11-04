import axios from "axios";
import { API_URL } from "../config/api";

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: add token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de response: manejar errores de auth
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si recibimos 401 o 403, limpiar auth
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");

      // Redirect to login if we're not already there
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
