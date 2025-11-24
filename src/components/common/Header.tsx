import { User } from "@/types";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import "./Header.css";

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
    <header className="header">
      <div className="header-content">
        <div className="header-user">
          <div className="header-avatar">
            {user.name.charAt(0)}
          </div>
          <div className="header-user-info">
            <h1>{user.name}</h1>
            <p>레벨 {user.level}</p>
          </div>
        </div>

        <div className="header-actions">
          <button
            onClick={onNotificationClick}
            className="notification-button"
            aria-label="알림"
          >
            <svg
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
            className="logout-button"
            aria-label="로그아웃"
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}
