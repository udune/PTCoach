import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { User } from "@/types";
import { workoutService } from "@/services/workoutService";
import useWorkoutStore from "@/store/workoutStore";
import Header from "../common/Header";

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

  const handleMonthChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (activeStartDate) {
      setCurrentMonth(activeStartDate);
    }
  };

  const getTileContent = ({ date }: { date: Date }) => {
    const dateStr = date.toISOString().split("T")[0];
    const log = monthlyLogs.find((log) => log.date === dateStr);

    if (!log) return null;

    const completionRate = log.completionRate;
    let colorClass = "bg-gray-200";
    if (completionRate === 100) colorClass = "bg-green-500";
    else if (completionRate >= 50) colorClass = "bg-yellow-500";
    else if (completionRate > 0) colorClass = "bg-red-500";

    return (
      <div className="flex flex-col items-center mt-1">
        <div className={`w-2 h-2 rounded-full ${colorClass}`}></div>
        <span className="text-xs text-gray-600">{completionRate}%</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={mockUser} onNotificationClick={() => {}} />

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">운동 기록</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 달력 */}
          <div className="bg-white rounded-lg shadow p-6">
            <Calendar
              onChange={handleDateClick}
              value={selectedDate}
              onActiveStartDateChange={handleMonthChange}
              tileContent={getTileContent}
              className="w-full border-none"
              locale="ko-KR"
            />
          </div>

          {/* 선택된 날짜의 상세 정보 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {selectedDate.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>

            {selectedDateLog ? (
              <div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">완료율</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {selectedDateLog.completionRate}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${selectedDateLog.completionRate}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">운동 목록</h3>
                  {selectedDateLog.routines.map((routine) => (
                    <div
                      key={routine.id}
                      className={`p-3 rounded-lg border ${
                        routine.completed
                          ? "bg-green-50 border-green-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {routine.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {routine.sets} 세트 × {routine.reps} 회
                          </p>
                        </div>
                        {routine.completed && (
                          <span className="text-green-600 text-xl">✓</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">운동 기록이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
