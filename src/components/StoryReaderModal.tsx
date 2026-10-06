import React, { useState, useEffect } from 'react';
import { Story } from '../types.ts';
import { soundService } from '../services/soundService.ts';

interface StoryReaderModalProps {
  story: Story | null;
  isOpen: boolean;
  onClose: () => void;
  onStoryCompleted?: (storyTitle: string) => void;
}

export const StoryReaderModal: React.FC<StoryReaderModalProps> = ({
  story,
  isOpen,
  onClose,
  onStoryCompleted,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [progressSeconds, setProgressSeconds] = useState(0);
  const [ambientEnabled, setAmbientEnabled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProgressSeconds(0);
      setIsPlayingAudio(false);
      soundService.playTibetanBowl(192);
    } else {
      if (ambientEnabled) {
        soundService.stopAmbientRain();
        setAmbientEnabled(false);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && isPlayingAudio && story) {
      const maxSeconds = story.audioMinutes * 60;
      interval = setInterval(() => {
        setProgressSeconds((prev) => {
          if (prev >= maxSeconds) {
            setIsPlayingAudio(false);
            return maxSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlayingAudio, story]);

  if (!isOpen || !story) return null;

  const totalSeconds = story.audioMinutes * 60;
  const currentMins = Math.floor(progressSeconds / 60);
  const currentSecs = progressSeconds % 60;
  const totalMins = Math.floor(totalSeconds / 60);
  const totalSecs = totalSeconds % 60;

  const toggleAudio = () => {
    const nextState = !isPlayingAudio;
    setIsPlayingAudio(nextState);
    if (nextState) {
      soundService.playSoftChime();
    }
  };

  const toggleAmbientSound = () => {
    const isNowPlaying = soundService.toggleAmbientRain();
    setAmbientEnabled(isNowPlaying);
  };

  const handleFinish = () => {
    soundService.playTibetanBowl(256);
    if (onStoryCompleted) {
      onStoryCompleted(story.title);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1e1b18]/60 backdrop-blur-md p-3 sm:p-5 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[92vh] bg-[#fff8f5] rounded-[32px] overflow-hidden flex flex-col shadow-2xl relative border border-[#efe6e2]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Control Bar */}
        <div className="sticky top-0 z-20 bg-[#fff8f5]/95 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-[#efe6e2]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#934a28] text-[20px] fill-1">
              auto_stories
            </span>
            <span className="text-[13px] font-semibold text-[#934a28] uppercase tracking-wider">
              {story.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleAmbientSound}
              title="Toggle calming rain backdrop"
              className={`flex items-center gap-1 text-[12px] font-medium px-3 py-1.5 rounded-full transition-all ${
                ambientEnabled
                  ? 'bg-[#cbead8] text-[#052015] ring-1 ring-[#466153]'
                  : 'bg-[#f5ece7] text-[#424844] hover:bg-[#efe6e2]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">water_drop</span>
              <span className="hidden sm:inline">Rain Sound</span>
            </button>

            {/* Font Size Toggle */}
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className="w-8 h-8 rounded-full bg-[#f5ece7] flex items-center justify-center text-[#424844] hover:bg-[#efe6e2] text-[13px] font-semibold"
              title="Adjust font size"
            >
              {fontSize === 'normal' ? 'A+' : 'A-'}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#f5ece7] flex items-center justify-center text-[#424844] hover:bg-[#efe6e2]"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Story Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-6 flex flex-col gap-6">
          {/* Hero Image */}
          <div className="relative w-full h-56 sm:h-64 rounded-[22px] overflow-hidden shadow-sm">
            <img
              src={story.imageUrl}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <span className="text-[12px] font-medium px-3 py-1 rounded-full bg-[#466153]/80 backdrop-blur-md">
                Forest Sanctuary
              </span>
              <span className="text-[12px] font-medium bg-black/50 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">record_voice_over</span>
                <span>Narrated by {story.narrator}</span>
              </span>
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[12px] text-[#424844]">
              <span className="w-2 h-2 rounded-full bg-[#934a28]" />
              <span>{story.tag}</span>
              <span>•</span>
              <span>{story.duration}</span>
            </div>
            <h2 className="text-[26px] sm:text-[30px] font-semibold text-[#1e1b18] tracking-tight leading-tight">
              {story.title}
            </h2>
          </div>

          {/* Blockquote */}
          <blockquote className="p-4 rounded-2xl bg-[#f5ece7] border-l-4 border-[#934a28] text-[#1e1b18] italic text-[16px] leading-relaxed">
            {story.quote}
          </blockquote>

          {/* Paragraphs */}
          <div
            className={`flex flex-col gap-4 text-[#1e1b18] ${
              fontSize === 'normal'
                ? 'text-[16px] leading-[28px]'
                : 'text-[18px] leading-[32px]'
            }`}
          >
            {story.content.map((p, idx) => (
              <p key={idx} className="font-normal text-[#1e1b18]/90">
                {p}
              </p>
            ))}
          </div>

          {/* Completion Card */}
          <div className="mt-4 p-5 rounded-[22px] bg-[#cbead8]/40 border border-[#afcdbc] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#466153] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">spa</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-[#052015]">
                  Carry this calm forward
                </span>
                <span className="text-[12px] text-[#324c3f]">
                  You have rested your mind. Take one deep breath before returning.
                </span>
              </div>
            </div>
            <button
              onClick={handleFinish}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#466153] text-white text-[13px] font-semibold shadow-sm hover:opacity-95 active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              Collect Gratitude Bead &amp; Close
            </button>
          </div>
        </div>

        {/* Persistent Floating Audio Bar */}
        <div className="sticky bottom-0 z-20 bg-[#f5ece7]/95 backdrop-blur-md px-6 py-3.5 border-t border-[#efe6e2] flex items-center gap-4">
          <button
            onClick={toggleAudio}
            className="w-11 h-11 rounded-full bg-[#934a28] text-white flex items-center justify-center hover:opacity-95 active:scale-90 transition-all shrink-0 shadow-sm"
          >
            <span className="material-symbols-outlined text-[24px]">
              {isPlayingAudio ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <div className="flex-1 flex flex-col gap-1 min-w-0">
            <div className="flex items-center justify-between text-[11px] font-medium text-[#424844]">
              <span className="truncate">
                {isPlayingAudio ? `Listening with ${story.narrator}...` : `Audio Narrative (${story.duration})`}
              </span>
              <span>
                {String(currentMins).padStart(2, '0')}:{String(currentSecs).padStart(2, '0')} /{' '}
                {String(totalMins).padStart(2, '0')}:{String(totalSecs).padStart(2, '0')}
              </span>
            </div>
            {/* Scrubber track */}
            <div className="w-full bg-[#e9e1dc] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#934a28] h-full transition-all duration-300"
                style={{
                  width: `${(progressSeconds / Math.max(1, totalSeconds)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
