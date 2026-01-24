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

// Helpers para localStorage
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

// Decodificar payload del JWT (sin verificar firma)
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

// Verificar si el token ha expirado
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    const exp = decoded.exp * 1000; // convertir a milliseconds
    return Date.now() >= exp;
  } catch {
    return true;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  // Inicializar desde localStorage (llamar al montar la app)
  initialize: () => {
    const token = getStoredToken();
    const user = getStoredUser();

    if (token && user && !isTokenExpired(token)) {
      set({ token, user, isAuthenticated: true });
    } else {
      // Token expirado o inválido, limpiar
      clearStoredAuth();
      set({ token: null, user: null, isAuthenticated: false });
    }
  },

  // Login: guardar token y usuario
  login: (token, user) => {
    setStoredAuth(token, user);
    set({ token, user, isAuthenticated: true });
  },

  // Logout: limpiar todo
  logout: () => {
    clearStoredAuth();
    set({ token: null, user: null, isAuthenticated: false });
  },
}));

// Exportar helpers para uso externo
export { decodeToken, isTokenExpired };
