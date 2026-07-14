import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/authService';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (correo, password) => {
        const data = await authService.login(correo, password);
        set({
          user: data.user,
          token: data.token,
          isAuthenticated: true,
        });
        // Guardamos en localStorage automáticamente con persist
        return data;
      },

      register: async (userData) => {
        const data = await authService.register(userData);
        // No autentica automáticamente, solo devuelve éxito
        return data;
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      // Para restaurar sesión si el token expira
      checkAuth: async () => {
        const { token } = get();
        if (!token) return;
        try {
          const user = await authService.getProfile(token);
          set({ user, isAuthenticated: true });
        } catch {
          set({ user: null, token: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage', // nombre en localStorage
    }
  )
);