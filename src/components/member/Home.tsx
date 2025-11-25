import { User, WorkoutRoutine } from "@/types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { workoutService } from "@/services/workoutService";
import Header from "../common/Header";
import StatusGauge from "./StatusGauge";
import WorkoutList from "./WorkoutList";
import "./Home.css";

const mockUser: User = {
  id: 1,
  name: "홍길동",
  email: "hong@example.com",
  level: 3,
  role: "member",
};

const mockRoutines: WorkoutRoutine[] = [
  { id: 1, name: "푸쉬업", sets: 3, reps: 15, completed: false },
  { id: 2, name: "스쿼트", sets: 3, reps: 20, completed: false },
  { id: 3, name: "플랭크", sets: 3, reps: 60, completed: false },
  { id: 4, name: "버피", sets: 3, reps: 10, completed: false },
  { id: 5, name: "런지", sets: 3, reps: 12, completed: false },
];

export default function Home() {
  const navigate = useNavigate();
  const [routines, setRoutines] = useState<WorkoutRoutine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await workoutService.getTodayRecommendations(mockUser.id);
        setRoutines(data.routines);
      } catch (err) {
        console.error("API 호출 실패, Mock 데이터 사용:", err);
        setRoutines(mockRoutines);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const toggleComplete = async (id: number) => {
    const previousRoutines = [...routines];
    const routine = routines.find((r) => r.id === id);
    if (!routine) return;

    const updatedRoutines = routines.map((r) =>
      r.id === id ? { ...r, completed: !r.completed } : r
    );
    setRoutines(updatedRoutines);

    try {
      const logData = {
        userId: mockUser.id,
        exerciseId: routine.id,
        sets: routine.sets,
        reps: routine.reps,
        completed: !routine.completed,
        workoutDate: new Date().toISOString().split("T")[0],
      };
      const response = await workoutService.createLog(logData);
      console.log("운동 기록 저장 완료:", response);
    } catch (err: any) {
      console.error("운동 기록 저장 실패:", err);
      setRoutines(previousRoutines);
      const errorMessage = err.response?.data?.message || "운동 기록 저장에 실패했습니다.";
      setError(errorMessage);
    }
  };

  const handleAICoachClick = () => {
    navigate("/member/workout");
  };

  return (
    <div className="home-container">
      <Header user={mockUser} onNotificationClick={() => {}} />

      <main className="home-main">
        <div className="status-widget">
          <div className="status-content">
            <StatusGauge value={75} />
            <div className="status-info">
              <h2>현재 대사 효율</h2>
              <p>좋음</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="error-banner">
            <p>{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-content">
              <div className="loading-spinner"></div>
              <p className="loading-text">오늘의 운동을 불러오는 중...</p>
            </div>
          </div>
        ) : (
          <WorkoutList routines={routines} onToggle={toggleComplete} />
        )}

        <button
          onClick={handleAICoachClick}
          className="ai-coach-button"
          aria-label="AI 코치"
        >
          <span>💬</span>
        </button>
      </main>
    </div>
  );
}
