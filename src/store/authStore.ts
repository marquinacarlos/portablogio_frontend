import { create } from "zustand";
import type { AuthUser } from "../types";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  initialize: () => void;
}

// localStorage helpers
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

const getStoredToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

const getStoredUser = (): AuthUser | null => {
  try {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const setStoredAuth = (token: string, user: AuthUser): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    // localStorage no disponible
  }
};

const clearStoredAuth = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {
    // localStorage no disponible
  }
};

// Decode the JWT payload (without verifying the signature)
const decodeToken = (token: string): AuthUser | null => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return {
      id: decoded.id,
      username: decoded.username,
    };
  } catch {
    return null;
  }
};

// Check if the token has expired
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    const exp = decoded.exp * 1000; // convert to milliseconds
    return Date.now() >= exp;
  } catch {
    return true;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  // Initialize from localStorage (call when the app mounts)
  initialize: () => {
    const token = getStoredToken();
    const user = getStoredUser();

    if (token && user && !isTokenExpired(token)) {
      set({ token, user, isAuthenticated: true });
    } else {
      // Expired or invalid token, clear it
      clearStoredAuth();
      set({ token: null, user: null, isAuthenticated: false });
    }
  },

  // Login: save token and user
  login: (token, user) => {
    setStoredAuth(token, user);
    set({ token, user, isAuthenticated: true });
  },

  // Logout: clear everything
  logout: () => {
    clearStoredAuth();
    set({ token: null, user: null, isAuthenticated: false });
  },
}));

// Export helpers for external use
export { decodeToken, isTokenExpired };
