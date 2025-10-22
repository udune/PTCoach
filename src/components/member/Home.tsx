import { User, WorkoutRoutine } from "@/types";
import { useState } from "react";
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
  const [routines, setRoutines] = useState<WorkoutRoutine[]>(mockRoutines);

  const toggleComplete = (id: number) => {
    setRoutines((prev) =>
      prev.map((routine) =>
        routine.id === id
          ? { ...routine, completed: !routine.completed }
          : routine
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={mockUser} onNotificationClick={() => {}} />

      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {/* 3D 상태 요약 위젯 */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-6">
            <StatusGauge value={75} />
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                현재 대사 효율
              </h2>
              <p className="text-sm text-gray-600">좋음</p>
            </div>
          </div>
        </div>

        {/* 오늘의 AI 추천 운동 리스트 */}
        <WorkoutList routines={routines} onToggle={toggleComplete} />

        {/* AI 코치 플로팅 버튼 */}
        <button
          className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-200"
          aria-label="AI 코치"
        >
          <span className="text-3xl">💬</span>
        </button>
      </main>
    </div>
  );
}
