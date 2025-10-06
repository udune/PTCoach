import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/member" replace />} />
        <Route
          path="/member/*"
          element={<div className="p-4">회원 페이지</div>}
        />
        <Route
          path="/trainer/*"
          element={<div className="p-4">트레이너 페이지</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}
