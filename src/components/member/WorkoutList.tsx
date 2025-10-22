import { WorkoutRoutine } from "@/types";

interface WorkoutListProps {
  routines: WorkoutRoutine[];
  onToggle: (id: number) => void;
}

export default function WorkoutList({ routines, onToggle }: WorkoutListProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-20">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        오늘의 AI 추천 운동
      </h2>

      <div className="space-y-2">
        {routines.map((routine) => (
          <div
            key={routine.id}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {/* 체크박스 */}
            <input
              type="checkbox"
              checked={routine.completed}
              onChange={() => onToggle(routine.id)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />

            {/* 운동 정보 */}
            <div className="flex-1">
              <span
                className={`font-medium ${
                  routine.completed
                    ? "text-gray-400 line-through"
                    : "text-gray-900"
                }`}
              >
                {routine.name}
              </span>
              <span className="ml-3 text-sm text-gray-500">
                {routine.sets}세트 × {routine.reps}회
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
