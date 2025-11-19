import { User } from "@/types";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

interface HeaderProps {
  user: User;
  onNotificationClick: () => void;
}

export default function Header({ user, onNotificationClick }: HeaderProps) {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm px-4 sm:px-6 lg:px-8 py-3">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* 왼쪽: 회원 정보 */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm sm:text-base">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-900">{user.name}</h1>
            <p className="text-xs sm:text-sm text-gray-500">레벨 {user.level}</p>
          </div>
        </div>

        {/* 오른쪽: 알림 및 로그아웃 */}
        <div className="flex items-center gap-2">
          <button
            onClick={onNotificationClick}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 transition-colors"
            aria-label="알림"
          >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        <button
          onClick={handleLogout}
          className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="로그아웃"
        >
          로그아웃
        </button>
        </div>
      </div>
    </header>
  );
}
