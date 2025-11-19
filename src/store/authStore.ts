import { create } from "zustand";
import { User } from "@/types";
import { authService } from "@/services/authService";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  initAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  setToken: (token) => set({ token }),

  login: (user, token) => {
    authService.saveToken(token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    authService.logout();
    set({ user: null, token: null, isAuthenticated: false });
  },

  initAuth: () => {
    const token = authService.getToken();
    if (token) {
      set({ token, isAuthenticated: true });
    }
  },
}));

export default useAuthStore;
