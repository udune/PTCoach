import api from "./api";
import { AIRecommendation, WorkoutLog } from "@/types";

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
};
