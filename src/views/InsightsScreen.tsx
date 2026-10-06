import React from 'react';
import { CheckInEntry } from '../types.ts';
import { soundService } from '../services/soundService.ts';

interface InsightsScreenProps {
  entries: CheckInEntry[];
  beadsCount: number;
}

export const InsightsScreen: React.FC<InsightsScreenProps> = ({
  entries,
  beadsCount,
}) => {
  const weeklyWeather = [
    { day: 'Wed', icon: 'filter_drama', label: 'Overwhelmed', color: 'bg-[#ffdad6] text-[#93000a]' },
    { day: 'Thu', icon: 'wb_sunny', label: 'Centered', color: 'bg-[#ffdbcd] text-[#753313]' },
    { day: 'Fri', icon: 'air', label: 'Restless', color: 'bg-[#efe6e2] text-[#424844]' },
    { day: 'Sat', icon: 'spa', label: 'Peaceful', color: 'bg-[#cbead8] text-[#052015]' },
    { day: 'Sun', icon: 'brightness_4', label: 'Reflective', color: 'bg-[#e5deff] text-[#1c1834]' },
    { day: 'Mon', icon: 'eco', label: 'Grounded', color: 'bg-[#cbead8] text-[#052015]' },
    { day: 'Tue', icon: 'rainy', label: 'Tender', color: 'bg-[#afcdbc] text-[#052015]', today: true },
  ];

  return (
    <div className="flex flex-col w-full px-5 pb-24 gap-6 max-w-2xl mx-auto pt-4">
      {/* Title */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[#934a28] uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] fill-1">insights</span>
            Mindful Rhythm
          </span>
          <span className="text-[11px] font-semibold text-[#052015] bg-[#cbead8] px-3 py-1 rounded-full">
            5-Day Presence Streak
          </span>
        </div>
        <h1 className="text-[26px] font-semibold text-[#1e1b18] tracking-tight">
          Emotional Climate
        </h1>
        <p className="text-[14px] text-[#424844]">
          Gentle observations over time. No streaks to break, only moments remembered.
        </p>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-[22px] bg-[#f5ece7] border border-[#efe6e2] flex flex-col items-center text-center">
          <span className="text-2xl font-semibold text-[#466153]">14</span>
          <span className="text-[11px] font-medium text-[#424844] mt-0.5">Check-Ins</span>
        </div>
        <div className="p-4 rounded-[22px] bg-[#f5ece7] border border-[#efe6e2] flex flex-col items-center text-center">
          <span className="text-2xl font-semibold text-[#934a28]">32m</span>
          <span className="text-[11px] font-medium text-[#424844] mt-0.5">Box Breathing</span>
        </div>
        <div className="p-4 rounded-[22px] bg-[#f5ece7] border border-[#efe6e2] flex flex-col items-center text-center">
          <span className="text-2xl font-semibold text-[#5c5778]">{beadsCount}</span>
          <span className="text-[11px] font-medium text-[#424844] mt-0.5">Gratitude Beads</span>
        </div>
      </div>

      {/* Weekly Emotional Weather Map */}
      <div className="p-5 sm:p-6 rounded-[24px] bg-[#f5ece7] border border-[#efe6e2] flex flex-col gap-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#466153] text-[20px]">cloud</span>
            <h3 className="text-[17px] font-semibold text-[#1e1b18]">7-Day Weather Map</h3>
          </div>
          <span className="text-[11px] text-[#424844]">Updated at Dawn</span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-1">
          {weeklyWeather.map((item) => (
            <div
              key={item.day}
              className={`flex flex-col items-center gap-2 p-2 rounded-2xl transition-all ${
                item.today ? 'bg-[#fff8f5] ring-2 ring-[#466153] shadow-xs' : 'bg-[#fff8f5]/60'
              }`}
            >
              <span className={`text-[11px] font-semibold ${item.today ? 'text-[#466153]' : 'text-[#424844]'}`}>
                {item.day}
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.color}`}>
                <span className="material-symbols-outlined text-[17px]">{item.icon}</span>
              </div>
              <span className="text-[10px] text-[#424844] truncate max-w-full font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tactile Gratitude Beads Box */}
      <div className="p-5 sm:p-6 rounded-[24px] bg-[#fbf2ed] border border-[#efe6e2] flex flex-col gap-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📿</span>
            <h3 className="text-[17px] font-semibold text-[#1e1b18]">Gratitude Beads</h3>
          </div>
          <button
            onClick={() => soundService.playTibetanBowl(360)}
            className="text-[11px] font-semibold text-[#934a28] hover:underline cursor-pointer"
          >
            Chime Beads
          </button>
        </div>

        <p className="text-[13px] text-[#424844] leading-relaxed">
          Each bead is polished with every completed mindful story or daily check-in. Tap any bead to release a soft resonance.
        </p>

        {/* Beads Row */}
        <div className="flex items-center gap-3 overflow-x-auto py-2 px-1 no-scrollbar">
          {Array.from({ length: Math.max(8, beadsCount) }).map((_, idx) => {
            const isFilled = idx < beadsCount;
            return (
              <button
                key={idx}
                onClick={() => soundService.playTibetanBowl(200 + idx * 25)}
                className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center shadow-xs transition-all cursor-pointer active:scale-90 ${
                  isFilled
                    ? 'bg-gradient-to-tr from-[#934a28] to-[#ffa178] text-white ring-2 ring-[#ffdbcd]'
                    : 'bg-[#efe6e2] text-[#424844]/40 border border-dashed border-[#c2c8c2]'
                }`}
                title={isFilled ? `Grounded Moment #${idx + 1}` : 'Upcoming bead'}
              >
                <span className="text-[12px] font-medium">{idx + 1}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mindful Journal Snippets */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[18px] font-semibold text-[#1e1b18]">
          Reflections &amp; Unburdened Thoughts
        </h3>
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="p-4 rounded-[20px] bg-[#fff8f5] border border-[#efe6e2] flex flex-col gap-2"
          >
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-semibold text-[#1e1b18]">
                {entry.moodEmoji} {entry.mood}
              </span>
              <span className="text-[#424844]">{entry.date}</span>
            </div>
            <p className="text-[14px] text-[#1e1b18] italic leading-relaxed">
              “{entry.note}”
            </p>
            <div className="text-[11px] text-[#466153] bg-[#cbead8]/40 px-3 py-1.5 rounded-xl border border-[#afcdbc]/50">
              Affirmation: {entry.affirmation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
