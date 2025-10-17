import { User } from "@/types";

interface HeaderProps {
  user: User;
  onNotificationClick: () => void;
}

export default function Header({ user, onNotificationClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm px-4 py-3">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* 왼쪽: 회원 정보 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500">레벨 {user.level}</p>
          </div>
        </div>

        {/* 오른쪽: 알림 아이콘 */}
        <button
          onClick={onNotificationClick}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
          aria-label="알림"
        >
          <svg
            className="w-6 h-6 text-gray-600"
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
      </div>
    </header>
  );
}
