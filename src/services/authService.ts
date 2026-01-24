import api from "../lib/axios";
import type { LoginRequest, LoginResponse } from "../types";

export const authService = {
  /**
   * Iniciar sesión con email y contraseña
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    return response.data;
  },

  /**
   * Verificar si el token actual es válido
   * (útil para verificar sesión al cargar la app)
   */
  verifyToken: async (): Promise<boolean> => {
    try {
      // El backend debería tener un endpoint para verificar el token
      // Por ahora, simplemente verificamos que el token no haya expirado localmente
      const token = localStorage.getItem("auth_token");
      if (!token) return false;

      // Decodificar y verificar expiración
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      const exp = decoded.exp * 1000;

      return Date.now() < exp;
    } catch {
      return false;
    }
  },
};
