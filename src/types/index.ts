// 사용자 타입
export interface User {
  id: number;
  name: string;
  email: string;
  level: number;
  role: "member" | "trainer";
}

// 인바디 데이터 타입
export interface InBodyData {
  id: number;
  userId: number;
  weight: number;
  bodyFat: number;
  muscleMass: number;
  bmi: number;
  measuredAt: string;
}

// 운동 루틴 타입
export interface WorkoutRoutine {
  id: number;
  name: string;
  sets: number;
  reps: number;
  completed: boolean;
}

// 운동 기록 타입
export interface WorkoutLog {
  id: number;
  userId: number;
  date: string;
  routines: WorkoutRoutine[];
  completionRate: number;
}

// AI 추천 운동
export interface AIRecommendation {
  id: number;
  userId: number;
  date: string;
  routines: WorkoutRoutine[];
  reason: string;
}

// 3D 능력치
export interface AbilityStats {
  userId: number;
  strength: number;
  metabolism: number;
  balance: number;
  flexibility: number;
}

// 회원 요약 정보 타입 (트레이너용)
export interface MemberSummary {
  id: number;
  name: string;
  riskLevel: "low" | "medium" | "high";
  lastWorkoutDate: string;
  WeeklyCompletionRate: number;
}
