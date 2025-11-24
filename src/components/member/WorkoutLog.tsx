import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { User } from "@/types";
import { workoutService } from "@/services/workoutService";
import useWorkoutStore from "@/store/workoutStore";
import Header from "../common/Header";
import "./WorkoutLog.css";

const mockUser: User = {
  id: 1,
  name: "홍길동",
  email: "hong@example.com",
  level: 3,
  role: "member",
};

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function WorkoutLog() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const { monthlyLogs, selectedDateLog, setMonthlyLogs, setSelectedDateLog } =
    useWorkoutStore();

  useEffect(() => {
    fetchMonthlyLogs(currentMonth);
  }, [currentMonth]);

  const fetchMonthlyLogs = async (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDate = new Date(year, month, 1).toISOString().split("T")[0];
    const endDate = new Date(year, month + 1, 0).toISOString().split("T")[0];

    try {
      const logs = await workoutService.getWorkoutLogs(
        mockUser.id,
        startDate,
        endDate
      );
      setMonthlyLogs(logs);
    } catch (error) {
      console.error("월별 운동 기록 조회 실패:", error);
      setMonthlyLogs([]);
    }
  };

  const handleDateClick = (value: Value) => {
    if (!value || Array.isArray(value)) return;
    setSelectedDate(value);

    const dateStr = value.toISOString().split("T")[0];
    const log = monthlyLogs.find((log) => log.date === dateStr);
    setSelectedDateLog(log || null);
  };

  const handleMonthChange = ({
    activeStartDate,
  }: {
    activeStartDate: Date | null;
  }) => {
    if (activeStartDate) {
      setCurrentMonth(activeStartDate);
    }
  };

  const getTileContent = ({ date }: { date: Date }) => {
    const dateStr = date.toISOString().split("T")[0];
    const log = monthlyLogs.find((log) => log.date === dateStr);

    if (!log) return null;

    const completionRate = log.completionRate;
    let colorClass = "";
    if (completionRate === 100) colorClass = "full";
    else if (completionRate >= 50) colorClass = "half";
    else if (completionRate > 0) colorClass = "low";

    return (
      <div className="tile-content">
        <div className={`tile-dot ${colorClass}`}></div>
        <span className="tile-percent">{completionRate}%</span>
      </div>
    );
  };

  return (
    <div className="workout-log-container">
      <Header user={mockUser} onNotificationClick={() => {}} />

      <main className="workout-log-main">
        <h1 className="workout-log-title">운동 기록</h1>

        <div className="workout-log-grid">
          <div className="calendar-card">
            <Calendar
              onChange={handleDateClick}
              value={selectedDate}
              onActiveStartDateChange={handleMonthChange}
              tileContent={getTileContent}
              locale="ko-KR"
            />
          </div>

          <div className="detail-card">
            <h2>
              {selectedDate.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>

            {selectedDateLog ? (
              <div>
                <div className="completion-section">
                  <div className="completion-header">
                    <span>완료율</span>
                    <span className="completion-rate">
                      {selectedDateLog.completionRate}%
                    </span>
                  </div>
                  <div className="completion-bar">
                    <div
                      className="completion-progress"
                      style={{ width: `${selectedDateLog.completionRate}%` }}
                    ></div>
                  </div>
                </div>

                <div className="routine-list">
                  <h3>운동 목록</h3>
                  {selectedDateLog.routines.map((routine) => (
                    <div
                      key={routine.id}
                      className={`routine-item ${routine.completed ? "completed" : ""}`}
                    >
                      <div className="routine-content">
                        <div className="routine-info">
                          <p>{routine.name}</p>
                          <p className="routine-details">
                            {routine.sets} 세트 × {routine.reps} 회
                          </p>
                        </div>
                        {routine.completed && (
                          <span className="routine-check">✓</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="no-log">
                <p>운동 기록이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
