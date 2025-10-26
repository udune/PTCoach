import api from "./api";
import { AIRecommendation, WorkoutLog, CreateLogRequest, LogResponse } from "@/types";

export const workoutService = {
  // 오늘의 AI 추천 운동 조회
  getTodayRecommendations: async (
    userId: number
  ): Promise<AIRecommendation> => {
    return api.get(`/workouts/recommendations/${userId}`);
  },

  // 운동 완료 처리
  completeWorkout: async (logId: number, routineId: string): Promise<void> => {
    return api.post(`/workouts/logs/${logId}/complete`, { routineId });
  },

  // 기간별 운동 기록 조회
  getWorkoutLogs: async (
    userId: number,
    startDate: string,
    endDate: string
  ): Promise<WorkoutLog[]> => {
    return api.get(`/workouts/logs/${userId}`, {
      params: {
        startDate,
        endDate,
      },
    });
  },

  // 운동 기록 생성
  createLog: async (logData: CreateLogRequest): Promise<LogResponse> => {
    return api.post("/logs", logData);
  },

  // 특정 운동 기록 조회
  getLog: async (id: number): Promise<LogResponse> => {
    return api.get(`/logs/${id}`);
  },

  // 사용자별 운동 기록 조회
  getUserLogs: async (userId: number): Promise<LogResponse[]> => {
    return api.get(`/logs/user/${userId}`);
  },

  // 헬스 체크
  healthCheck: async (): Promise<{ status: string }> => {
    return api.get("/health");
  },
};
