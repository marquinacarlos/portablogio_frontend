import api from "../lib/axios";
import type { LoginRequest, LoginResponse } from "../types";

export const authService = {
  /**
   * Log in with email and password
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    return response.data;
  },

  /**
   * Check if the current token is valid
   * (useful to verify the session when the app loads)
   */
  verifyToken: async (): Promise<boolean> => {
    try {
      // The backend should have an endpoint to verify the token
      // For now, we just check that the token hasn't expired locally
      const token = localStorage.getItem("auth_token");
      if (!token) return false;

      // Decode and check expiration
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      const exp = decoded.exp * 1000;

      return Date.now() < exp;
    } catch {
      return false;
    }
  },
};
