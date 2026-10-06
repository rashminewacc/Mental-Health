import React, { useState } from 'react';
import { NotificationItem } from '../types.ts';
import { NOTIFICATIONS } from '../data/sanctuaryData.ts';

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  onProfileClick: () => void;
  ambientRainPlaying: boolean;
  onToggleAmbientRain: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName = '',
  userAvatar = '',
  onProfileClick,
  ambientRainPlaying,
  onToggleAmbientRain,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <>
      <header className="fixed top-0 w-full z-40 bg-[#fff8f5]/90 backdrop-blur-xl shadow-[0_1px_12px_rgba(45,41,38,0.03)] border-b border-[#efe6e2]/50">
        <div className="max-w-2xl mx-auto h-16 px-5 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2">
            <img
              alt="Nesta Calming Bloom Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1WyghfQSJsQMco62fUTmKT1n5s5YninlLJfyUlNiMW90VCba9IOk9gIrjwWA0KHnG5EpNJtnBdYjFMZXcA9di8Vg5yZxF9FWZj7L-MAw2-iv3Vcq0_etfgJYrbJ1U156h-B-N9h72sI2L-tIOfRN-LoXaZ7m1Mqe_YIgop4V60VEFqE_D0tSQV7s4X8l2woq5u5CuVqcn0g4Y7MT3lNTGEPd9KJBeMsIYa-Lr1KYPHpmaRoY1djszpKFWU"
            />
            <span className="text-[18px] font-semibold text-[#1e1b18] tracking-tight">Nesta</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            {/* Ambient Nature Sound Toggle */}
            <button
              onClick={onToggleAmbientRain}
              title={ambientRainPlaying ? 'Mute ambient gentle rain' : 'Play ambient gentle rain'}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                ambientRainPlaying
                  ? 'bg-[#cbead8] text-[#052015] ring-2 ring-[#466153]/40'
                  : 'text-[#424844] hover:text-[#1e1b18] hover:bg-[#f5ece7]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {ambientRainPlaying ? 'water_drop' : 'rainy'}
              </span>
            </button>

            {/* Notifications Button */}
            <button
              aria-label="Notifications"
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications && unreadCount > 0) {
                  markAllAsRead();
                }
              }}
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#424844] hover:text-[#1e1b18] hover:bg-[#f5ece7] transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#934a28] animate-pulse" />
              )}
            </button>

            {/* Profile Avatar Button */}
            <button
              aria-label={userName ? `${userName}'s Profile` : 'Your Profile'}
              title={userName ? `${userName}'s Profile` : 'Your Profile'}
              onClick={onProfileClick}
              className="flex items-center justify-center rounded-full ml-1 active:scale-95 transition-transform cursor-pointer"
            >
              {userAvatar ? (
                <img
                  alt={userName ? `${userName}'s Profile` : 'Profile'}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#efe6e2] hover:ring-[#466153]"
                  src={userAvatar}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#efe6e2] border border-[#c2c8c2] flex items-center justify-center text-[#424844] hover:bg-[#e9e1dc] hover:text-[#1e1b18] transition-colors">
                  {userName ? (
                    <span className="text-[12px] font-semibold text-[#466153]">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-[18px]">person</span>
                  )}
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Notifications Drawer Dropdown */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-xs flex justify-end"
          onClick={() => setShowNotifications(false)}
        >
          <div
            className="w-full max-w-sm h-full bg-[#fff8f5] shadow-2xl p-5 flex flex-col gap-4 overflow-y-auto pt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#efe6e2] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#466153] text-[20px]">notifications</span>
                <h3 className="text-[17px] font-semibold text-[#1e1b18]">Sanctuary Whispers</h3>
              </div>
              <button
                onClick={() => setShowNotifications(false)}
                className="w-8 h-8 rounded-full bg-[#f5ece7] flex items-center justify-center text-[#424844] hover:bg-[#efe6e2]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-[#f5ece7] flex flex-col gap-1 transition-all hover:bg-[#efe6e2]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-[#1e1b18]">{item.title}</span>
                    <span className="text-[11px] text-[#424844]">{item.time}</span>
                  </div>
                  <p className="text-[13px] text-[#424844] leading-relaxed">{item.message}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-4 text-center">
              <p className="text-[12px] text-[#424844]/80 italic">
                “Breathe gently. All messages are gentle invitations, not urgent demands.”
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
