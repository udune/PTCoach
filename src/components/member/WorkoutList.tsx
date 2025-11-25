import { WorkoutRoutine } from "@/types";
import "./WorkoutList.css";

interface WorkoutListProps {
  routines: WorkoutRoutine[];
  onToggle: (id: number) => void;
}

export default function WorkoutList({ routines, onToggle }: WorkoutListProps) {
  return (
    <div className="workout-list-container">
      <h2 className="workout-list-title">
        오늘의 AI 추천 운동
      </h2>

      <div className="workout-items">
        {routines.map((routine) => (
          <div
            key={routine.id}
            className={`workout-item ${routine.completed ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              checked={routine.completed}
              onChange={() => onToggle(routine.id)}
              className="workout-checkbox"
            />

            <div className="workout-info">
              <div className="workout-details">
                <span className={`workout-name ${routine.completed ? "completed" : ""}`}>
                  {routine.name}
                </span>
                <span className="workout-sets">
                  {routine.sets}세트 × {routine.reps}회
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
