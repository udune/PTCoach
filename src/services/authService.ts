import api from "./api";
import { LoginRequest, TokenResponse } from "@/types";

export const authService = {
  // 로그인
  login: async (credentials: LoginRequest): Promise<TokenResponse> => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem("token");
  },

  // 토큰 저장
  saveToken: (token: string) => {
    localStorage.setItem("token", token);
  },

  // 토큰 조회
  getToken: (): string | null => {
    return localStorage.getItem("token");
  },
};
