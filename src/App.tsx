import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/member/Home";
import WorkoutLog from "./components/member/WorkoutLog";
import Login from "./components/auth/Login";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/member" replace />} />
        <Route path="/member" element={<Home />} />
        <Route
          path="/member/workout"
          element={<div className="placeholder-page">운동 페이지</div>}
        />
        <Route path="/member/log" element={<WorkoutLog />} />
        <Route
          path="/member/inbody"
          element={<div className="placeholder-page">인바디 페이지</div>}
        />
        <Route
          path="/member/profile"
          element={<div className="placeholder-page">프로필 페이지</div>}
        />
        <Route
          path="/trainer"
          element={<div className="placeholder-page">트레이너 페이지</div>}
        />
        <Route
          path="/trainer/members"
          element={<div className="placeholder-page">회원 관리</div>}
        />
        <Route
          path="/trainer/member/:id"
          element={<div className="placeholder-page">회원 상세</div>}
        />
        <Route
          path="*"
          element={<div className="placeholder-page">페이지를 찾을 수 없습니다</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}
