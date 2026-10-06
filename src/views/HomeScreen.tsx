import React, { useState, useEffect } from 'react';
import { MoodNeed, MoodNeedKey, Story } from '../types.ts';
import { MOOD_NEEDS, STORIES } from '../data/sanctuaryData.ts';
import { soundService } from '../services/soundService.ts';

interface HomeScreenProps {
  userName: string;
  onOpenEditName: () => void;
  onStartCheckIn: () => void;
  onOpenStory: (story: Story) => void;
  onOpenMicroExercise: (need: MoodNeed) => void;
  onOpenCrisis: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName,
  onOpenEditName,
  onStartCheckIn,
  onOpenStory,
  onOpenMicroExercise,
  onOpenCrisis,
}) => {
  const [selectedNeedKey, setSelectedNeedKey] = useState<MoodNeedKey>('overwhelmed');

  // Real-time local clock
  const [currentDate, setCurrentDate] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const hour = currentDate.getHours();

  // Dynamic sanctuary time phase and message based on local time
  let periodName = 'Dawn Sanctuary';
  let periodPulseColor = 'bg-[#ffa178]';
  let periodTagColor = 'text-[#934a28]';
  let greetingPrefix = 'Good morning';
  let subMessage = 'Take a gentle breath. You are here.';
  let heroQuestion = 'How are you feeling today?';
  let heroSubtext = 'Unpack your quiet thoughts without judgment. No right answers, just your rhythm.';
  let groundingQuote = '“You don\'t have to carry tomorrow\'s burdens with today\'s strength.”';

  if (hour >= 12 && hour < 17) {
    periodName = 'Solar Sanctuary';
    periodPulseColor = 'bg-[#e5b358]';
    periodTagColor = 'text-[#753313]';
    greetingPrefix = 'Good afternoon';
    subMessage = 'Take a peaceful pause. Release midday tension and find center.';
    heroQuestion = 'How is your day unfolding?';
    heroSubtext = 'Check in with your body and breath as the midday hours pass.';
    groundingQuote = '“In the middle of a full day, a single breath brings you back to center.”';
  } else if (hour >= 17 && hour < 21) {
    periodName = 'Dusk Sanctuary';
    periodPulseColor = 'bg-[#c9c2e8]';
    periodTagColor = 'text-[#5c5778]';
    greetingPrefix = 'Good evening';
    subMessage = 'Unspool the day. You have carried enough.';
    heroQuestion = 'How are you transitioning into evening?';
    heroSubtext = 'Let go of what is done and what is left undone. You are safe here.';
    groundingQuote = '“The sunset asks nothing of the trees; it simply rests softly upon them.”';
  } else if (hour >= 21 || hour < 5) {
    periodName = 'Nocturne Sanctuary';
    periodPulseColor = 'bg-[#757092]';
    periodTagColor = 'text-[#484362]';
    greetingPrefix = 'Peaceful night';
    subMessage = 'The world is quiet now. Safe shelter for your weary mind.';
    heroQuestion = 'Ready to unwind your quiet thoughts?';
    heroSubtext = 'Release the echoes of today into the stillness. Rest is sacred.';
    groundingQuote = '“Let the night take care of the dark; your only work is to rest.”';
  }

  const formattedDate = currentDate.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  // Breathing Box State
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathSeconds, setBreathSeconds] = useState(60);
  const [breathPhaseIndex, setBreathPhaseIndex] = useState(0);

  const breathPhases = [
    'Breathe in gently...',
    'Hold softly...',
    'Exhale slowly...',
    'Rest empty...'
  ];

  const currentNeed = MOOD_NEEDS.find((n) => n.key === selectedNeedKey) || MOOD_NEEDS[2];
  const featuredStory = STORIES[0]; // The Forest After the Rain

  // Box Breathing cycle effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathSeconds((prev) => {
          if (prev <= 1) {
            setBreathingActive(false);
            soundService.playTibetanBowl(320);
            return 60;
          }
          const nextVal = prev - 1;
          // Change phase every 4 seconds for 4-4-4-4 pacing
          if ((60 - nextVal) % 4 === 0) {
            setBreathPhaseIndex((p) => {
              const nextPhase = (p + 1) % breathPhases.length;
              if (nextPhase === 0) {
                // Inhale phase chime
                soundService.playSoftChime();
              }
              return nextPhase;
            });
          }
          return nextVal;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingActive]);

  const toggleBreathing = () => {
    if (!breathingActive) {
      setBreathingActive(true);
      setBreathSeconds(60);
      setBreathPhaseIndex(0);
      soundService.playTibetanBowl(216);
    } else {
      setBreathingActive(false);
    }
  };

  const breathMins = Math.floor(breathSeconds / 60);
  const breathSecs = breathSeconds % 60;
  const timerDisplay = `${String(breathMins).padStart(2, '0')}:${String(breathSecs).padStart(2, '0')}`;

  return (
    <div className="flex flex-col w-full px-5 pb-8 gap-7 max-w-2xl mx-auto pt-3">
      {/* Greeting Header */}
      <section className="flex flex-col gap-1 mt-1">
        <div className="flex items-center justify-between">
          <span className={`text-[13px] font-medium uppercase tracking-wider flex items-center gap-1.5 ${periodTagColor}`}>
            <span className={`inline-block w-2 h-2 rounded-full ${periodPulseColor} animate-pulse`} />
            {periodName}
          </span>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#424844] bg-[#efe6e2] px-3 py-1 rounded-full shadow-2xs">
            <span>{formattedDate}</span>
            <span className="w-1 h-1 rounded-full bg-[#727974]" />
            <span className="text-[#1e1b18]">{formattedTime}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 group">
          <h1 className="text-[28px] font-semibold text-[#1e1b18] tracking-tight">
            {userName ? `${greetingPrefix}, ${userName}` : greetingPrefix}
          </h1>
          <button
            onClick={onOpenEditName}
            title={userName ? "Edit your sanctuary name" : "Set your sanctuary name"}
            className="w-7 h-7 rounded-full bg-[#f5ece7] text-[#424844] hover:text-[#1e1b18] hover:bg-[#efe6e2] flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-xs"
            aria-label="Edit preferred name"
          >
            <span className="material-symbols-outlined text-[15px]">edit</span>
          </button>
        </div>
        <p className="text-[15px] text-[#424844]">
          {subMessage}
        </p>
      </section>

      {/* Hero Card: Daily Check-In Launcher */}
      <section className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#5e7a6b] via-[#466153] to-[#496456] p-6 text-white shadow-[0_12px_32px_-8px_rgba(70,97,83,0.28)]">
        {/* Decorative Ambient Glow & Organic Shapes */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#cbead8]/20 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-12 w-44 h-44 rounded-full bg-[#ffa178]/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#cbead8]/20 backdrop-blur-sm text-white text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[15px] fill-1">spa</span>
              <span>Daily Pulse</span>
            </div>
            <div className="flex items-center gap-1 text-[#f0fff4]/90 text-[13px] font-medium bg-[#34302c]/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span>2 min</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-[22px] font-semibold text-white tracking-tight leading-snug">
              {heroQuestion}
            </h2>
            <p className="text-[13px] text-white/85 leading-relaxed">
              {heroSubtext}
            </p>
          </div>

          {/* Quick Mood Preview Button */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={onStartCheckIn}
              className="w-full flex items-center justify-between bg-[#fff8f5] text-[#1e1b18] px-6 py-3.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.06)] active:scale-[0.98] transition-all group cursor-pointer hover:bg-white"
              id="start-checkin-btn"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#cbead8] text-[#466153] shadow-xs group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[18px] fill-1">favorite</span>
                </span>
                <span className="text-[15px] text-[#1e1b18] font-semibold">
                  Start Daily Check-In
                </span>
              </div>
              <span className="material-symbols-outlined text-[20px] text-[#466153] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Horizontal Mood Needs Selector */}
      <section className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <h3 className="text-[18px] font-semibold text-[#1e1b18] tracking-tight">
            What do you need right now?
          </h3>
          <span className="text-[11px] font-semibold text-[#424844]">Tap to ground</span>
        </div>

        {/* Scrollable Chips Container */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 -mx-5 px-5 no-scrollbar"
          id="needs-chip-list"
        >
          {MOOD_NEEDS.map((item) => {
            const isSelected = selectedNeedKey === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  setSelectedNeedKey(item.key);
                  soundService.playSoftChime();
                }}
                className={`flex-shrink-0 flex items-center gap-2 h-11 px-4 rounded-full text-[13px] font-medium transition-all active:scale-95 shadow-xs cursor-pointer ${
                  isSelected
                    ? 'bg-[#466153] text-white ring-2 ring-[#cbead8]/60 shadow-sm'
                    : 'bg-[#f5ece7] text-[#424844] hover:bg-[#efe6e2]'
                }`}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Micro-Response Drawer / Suggestion */}
        <div
          className="flex items-center justify-between p-3.5 rounded-[20px] bg-[#fbf2ed] border border-[#efe6e2]/80 transition-all hover:border-[#466153]/30"
          id="chip-recommendation"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#ffdbcd] flex items-center justify-center text-[#934a28] flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">air</span>
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-[13px] text-[#1e1b18] font-semibold truncate">
                {currentNeed.recommendationTitle}
              </p>
              <p className="text-[12px] text-[#424844] truncate">
                {currentNeed.recommendationDesc}
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenMicroExercise(currentNeed)}
            className="flex items-center gap-1 bg-[#fff8f5] text-[#934a28] font-semibold text-[11px] px-3.5 py-1.5 rounded-full shadow-xs flex-shrink-0 hover:bg-[#efe6e2] active:scale-95 transition-all cursor-pointer border border-[#ffdbcd]"
          >
            <span>Begin</span>
            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
          </button>
        </div>
      </section>

      {/* Today's Personalised Story Feature Card */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#934a28] text-[20px] fill-1">
              auto_stories
            </span>
            <h3 className="text-[18px] font-semibold text-[#1e1b18] tracking-tight">
              Today's Personalised Story
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-[#934a28]">New Edition</span>
        </div>

        <div className="relative overflow-hidden rounded-[24px] bg-[#f5ece7] p-5 sm:p-6 flex flex-col gap-4 shadow-[0_8px_24px_-4px_rgba(45,41,38,0.04)] border border-[#efe6e2]">
          {/* Story Editorial Header Image */}
          <div className="relative w-full h-44 sm:h-48 rounded-[18px] overflow-hidden group">
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="An ethereal, peaceful misty woodland glade just after rainfall."
              src={featuredStory.imageUrl}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#34302c]/70 via-[#34302c]/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[#fff8f5]">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#496456]/80 backdrop-blur-md">
                Forest Immersion
              </span>
              <div className="flex items-center gap-1 text-[11px] font-semibold bg-[#34302c]/60 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-[15px]">headphones</span>
                <span>Audio &amp; Text</span>
              </div>
            </div>
          </div>

          {/* Story Metadata & Excerpt */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#424844]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#934a28]" />
              <span>{featuredStory.tag}</span>
              <span>•</span>
              <span>{featuredStory.duration}</span>
            </div>
            <h4 className="text-[20px] font-semibold text-[#1e1b18] tracking-tight">
              {featuredStory.title}
            </h4>
            <p className="text-[14px] text-[#424844] italic leading-relaxed">
              {featuredStory.quote}
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center -space-x-1.5">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#cbead8] text-[#052015] text-[13px]">
                🌾
              </span>
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#ffdbcd] text-[#360f00] text-[13px]">
                🌧️
              </span>
              <span className="text-[12px] text-[#424844] pl-3">
                Narrated by {featuredStory.narrator}
              </span>
            </div>
            <button
              onClick={() => onOpenStory(featuredStory)}
              className="flex items-center gap-2 bg-[#934a28] text-white text-[13px] font-semibold px-5 py-2.5 rounded-full shadow-xs hover:opacity-95 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">headphones</span>
              <span>Read Story</span>
            </button>
          </div>
        </div>
      </section>

      {/* Daily Reflection & 1-Minute Box Breathing Card */}
      <section className="relative overflow-hidden rounded-[24px] bg-[#fbf2ed] p-5 sm:p-6 flex flex-col gap-4 shadow-[0_6px_20px_-4px_rgba(45,41,38,0.03)] border border-[#efe6e2]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[#934a28] uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] fill-1">format_quote</span>
            Daily Grounding
          </span>
          <span className="text-[11px] font-semibold text-[#424844]">Reflection</span>
        </div>

        {/* Delicate Affirmation */}
        <blockquote className="text-[18px] text-[#1e1b18] font-normal leading-relaxed tracking-tight">
          {groundingQuote}
        </blockquote>

        {/* 1-Minute Box Breathing Widget */}
        <div className="flex items-center justify-between p-3 rounded-[20px] bg-[#fff8f5] shadow-xs border border-[#efe6e2]">
          <div className="flex items-center gap-3">
            <button
              aria-label="Play 1-minute box breathing chime"
              onClick={toggleBreathing}
              className={`w-11 h-11 rounded-full flex items-center justify-center active:scale-90 transition-all cursor-pointer shadow-xs ${
                breathingActive
                  ? 'bg-[#466153] text-white ring-2 ring-[#cbead8]'
                  : 'bg-[#cbead8] text-[#052015] hover:bg-[#afcdbc]'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">
                {breathingActive ? 'pause' : 'notifications_active'}
              </span>
            </button>
            <div className="flex flex-col">
              <span className="text-[13px] text-[#1e1b18] font-semibold">
                1-Minute Box Breathing
              </span>
              <span className="text-[12px] text-[#424844]">
                {breathingActive
                  ? breathPhases[breathPhaseIndex]
                  : 'Soft Tibetan bowl pacing • 4-4-4-4'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#f5ece7] text-[12px] font-semibold text-[#424844]">
            <span className="material-symbols-outlined text-[16px] text-[#466153]">timer</span>
            <span>{timerDisplay}</span>
          </div>
        </div>
      </section>

      {/* Discreet Gentle Crisis Support Footer */}
      <footer className="mt-1">
        <div className="rounded-[20px] bg-[#efe6e2]/70 p-4 flex items-center justify-between gap-3 text-[#424844]">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#fff8f5] flex items-center justify-center text-[#5e7a6b] shadow-xs">
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
            </span>
            <div className="flex flex-col min-w-0">
              <p className="text-[13px] font-medium text-[#1e1b18]">
                Having a difficult time? You're not alone.
              </p>
              <button
                onClick={onOpenCrisis}
                className="text-left text-[11px] font-semibold text-[#934a28] hover:underline underline-offset-2 transition-colors cursor-pointer"
              >
                Tap for immediate, gentle care resources
              </button>
            </div>
          </div>
          <button
            onClick={onOpenCrisis}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#f5ece7] text-[#424844] cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
