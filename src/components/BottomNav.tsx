import React from 'react';
import { TabType } from '../types.ts';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'spa' },
    { id: 'check-in', label: 'Check In', icon: 'favorite' },
    { id: 'stories', label: 'Stories', icon: 'auto_stories' },
    { id: 'insights', label: 'Insights', icon: 'insights' },
    { id: 'profile', label: 'Profile', icon: 'shield_person' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 bg-[#fff8f5]/90 backdrop-blur-xl shadow-[0_-4px_20px_rgba(45,41,38,0.04)] border-t border-[#efe6e2]/50">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-20 px-2 pb-safe">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 transition-all group cursor-pointer ${
                isActive
                  ? 'text-[#5e7a6b] font-semibold'
                  : 'text-[#424844] hover:text-[#466153]'
              }`}
            >
              <div
                className={`flex items-center justify-center px-3.5 py-1 rounded-full transition-all ${
                  isActive ? 'bg-[#cbead8]/60 text-[#466153]' : 'group-hover:bg-[#f5ece7]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[22px] ${
                    isActive ? 'fill-1' : ''
                  }`}
                >
                  {tab.icon}
                </span>
              </div>
              <span className="text-[11px] font-medium mt-0.5 tracking-normal">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
