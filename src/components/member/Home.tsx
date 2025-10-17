import { User, WorkoutRoutine } from "@/types";
import { useState } from "react";
import Header from "../common/Header";

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
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">75%</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                현재 대사 효율
              </h2>
              <p className="text-sm text-gray-600">좋음</p>
            </div>
          </div>
        </div>

        {/* 오늘의 AI 루틴 */}
        <div className="bg-white rounded-lg shadow p-6 mb-20">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            오늘의 AI 추천 운동
          </h2>
          <div className="space-y-3">
            {routines.map((routine) => (
              <div
                key={routine.id}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={routine.completed}
                  onChange={() => toggleComplete(routine.id)}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {routine.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {routine.sets}세트 × {routine.reps}회
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI 코치 플로팅 버튼 */}
        <button
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700"
          aria-label="AI 코치"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      </main>
    </div>
  );
}
