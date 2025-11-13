import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/member/Home";
import WorkoutLog from "./components/member/WorkoutLog";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 */}
        <Route path="/" element={<Navigate to="/member" replace />} />

        {/* 회원 */}
        <Route path="/member" element={<Home />} />
        <Route
          path="/member/workout"
          element={<div className="p-4">운동 페이지</div>}
        />
        <Route path="/member/log" element={<WorkoutLog />} />
        <Route
          path="/member/inbody"
          element={<div className="p-4">인바디 페이지</div>}
        />
        <Route
          path="/member/profile"
          element={<div className="p-4">프로필 페이지</div>}
        />

        {/* 트레이너 */}
        <Route
          path="/trainer"
          element={<div className="p-4">트레이너 페이지</div>}
        />
        <Route
          path="/trainer/members"
          element={<div className="p-4">회원 관리</div>}
        />
        <Route
          path="/trainer/member/:id"
          element={<div className="p-4">회원 상세</div>}
        />

        {/* 공통 */}
        <Route
          path="*"
          element={<div className="p-4">페이지를 찾을 수 없습니다</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}
