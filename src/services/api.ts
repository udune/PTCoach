import axios, { AxiosInstance, AxiosResponse } from "axios";

// Axios 인스턴스 생성
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (import.meta.env.DEV) {
      // 개발 환경에서 테스트용 토큰 (실제 환경에서는 제거)
      console.warn("⚠️ 개발 환경: 인증 토큰이 없습니다. 백엔드에서 테스트 토큰을 발급받으세요.");
    }
    return config;
  },
  (error) => {
    // Ensure the rejection reason is an Error
    const err = error instanceof Error ? error : new Error(String(error));
    return Promise.reject(err);
  }
);

// 응답
api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    console.error("API error:", error);
    const err =
      error instanceof Error
        ? error
        : new Error(
            error && error.message
              ? String(error.message)
              : typeof error === "string"
              ? error
              : JSON.stringify(error)
          );
    return Promise.reject(err);
  }
);

export default api;
