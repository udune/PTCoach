import { User, WorkoutRoutine } from "@/types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { workoutService } from "@/services/workoutService";
import Header from "../common/Header";
import StatusGauge from "./StatusGauge";
import WorkoutList from "./WorkoutList";

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
      console.log("전송할 데이터:", logData);
      const response = await workoutService.createLog(logData);
      console.log(`운동 기록 저장 완료:`, response);
    } catch (err: any) {
      console.error("운동 기록 저장 실패:", err);
      console.error("에러 응답:", err.response?.data);
      console.error("상태 코드:", err.response?.status);
      setRoutines(previousRoutines);
      const errorMessage = err.response?.data?.message || "운동 기록 저장에 실패했습니다.";
      setError(errorMessage);
    }
  };

  const handleAICoachClick = () => {
    navigate("/member/workout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={mockUser} onNotificationClick={() => {}} />

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 3D 상태 요약 위젯 */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <StatusGauge value={75} />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                현재 대사 효율
              </h2>
              <p className="text-sm text-gray-600">좋음</p>
            </div>
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-800">{error}</p>
          </div>
        )}

        {/* 로딩 상태 */}
        {isLoading ? (
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-20">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 text-sm">오늘의 운동을 불러오는 중...</p>
            </div>
          </div>
        ) : (
          /* 오늘의 AI 추천 운동 리스트 */
          <WorkoutList routines={routines} onToggle={toggleComplete} />
        )}

        {/* AI 코치 플로팅 버튼 */}
        <button
          onClick={handleAICoachClick}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-200 active:scale-95"
          aria-label="AI 코치"
        >
          <span className="text-2xl sm:text-3xl">💬</span>
        </button>
      </main>
    </div>
  );
}
