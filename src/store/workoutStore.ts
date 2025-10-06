import { create } from "zustand";
import { WorkoutLog, AIRecommendation } from "@/types";

interface WorkoutState {
  todayRecommendations: AIRecommendation | null;
  workoutLogs: WorkoutLog[];
  setTodayRecommendations: (recommendations: AIRecommendation) => void;
  setWorkoutLogs: (logs: WorkoutLog[]) => void;
  completeRoutine: (routineId: string) => void;
}

const useWorkoutStore = create<WorkoutState>((set) => ({
  todayRecommendations: null,
  workoutLogs: [],

  setTodayRecommendations: (recommendations) =>
    set({ todayRecommendations: recommendations }),

  setWorkoutLogs: (logs) => set({ workoutLogs: logs }),

  completeRoutine: (routineId) =>
    set((state) => {
      if (!state.todayRecommendations) return state;

      const updatedRoutines = state.todayRecommendations.routines.map((r) =>
        r.id === Number(routineId) ? { ...r, completed: true } : r
      );

      return {
        todayRecommendations: {
          ...state.todayRecommendations,
          routines: updatedRoutines,
        },
      };
    }),
}));

export default useWorkoutStore;
