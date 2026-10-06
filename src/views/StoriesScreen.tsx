import React, { useState } from 'react';
import { Story } from '../types.ts';
import { STORIES } from '../data/sanctuaryData.ts';

interface StoriesScreenProps {
  onSelectStory: (story: Story) => void;
  ambientRainPlaying: boolean;
  onToggleAmbientRain: () => void;
}

export const StoriesScreen: React.FC<StoriesScreenProps> = ({
  onSelectStory,
  ambientRainPlaying,
  onToggleAmbientRain,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Dawn' | 'Grounding' | 'Evening'>('All');

  const filteredStories = STORIES.filter((s) => {
    if (selectedFilter === 'Dawn') return s.category.includes('Dawn');
    if (selectedFilter === 'Grounding') return s.category.includes('Grounding');
    if (selectedFilter === 'Evening') return s.category.includes('Evening');
    return true;
  });

  return (
    <div className="flex flex-col w-full px-5 pb-24 gap-6 max-w-2xl mx-auto pt-4">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[#934a28] uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] fill-1">auto_stories</span>
            Personalised Library
          </span>
          <span className="text-[12px] text-[#424844] bg-[#efe6e2] px-3 py-1 rounded-full font-medium">
            3 Editions
          </span>
        </div>
        <h1 className="text-[26px] font-semibold text-[#1e1b18] tracking-tight">
          Grounding Stories
        </h1>
        <p className="text-[14px] text-[#424844]">
          Immersive audio &amp; text narratives tailored for quiet minds.
        </p>
      </div>

      {/* Ambient Soundscape Bar */}
      <div className="p-4 rounded-[22px] bg-gradient-to-r from-[#cbead8]/60 to-[#f5ece7] border border-[#afcdbc]/60 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleAmbientRain}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              ambientRainPlaying
                ? 'bg-[#466153] text-white ring-2 ring-[#cbead8]'
                : 'bg-[#fff8f5] text-[#466153]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {ambientRainPlaying ? 'volume_up' : 'water_drop'}
            </span>
          </button>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-[#1e1b18]">
              {ambientRainPlaying ? 'Calming Rain is Playing' : 'Calming Forest Rain'}
            </span>
            <span className="text-[11px] text-[#424844]">
              {ambientRainPlaying ? 'Gentle acoustic pink noise' : 'Tap to play background rain audio'}
            </span>
          </div>
        </div>
        <button
          onClick={onToggleAmbientRain}
          className="text-[12px] font-semibold text-[#466153] bg-[#fff8f5] px-3.5 py-1.5 rounded-full border border-[#afcdbc] hover:bg-[#cbead8] transition-colors cursor-pointer"
        >
          {ambientRainPlaying ? 'Mute' : 'Play'}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {(['All', 'Dawn', 'Grounding', 'Evening'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer ${
              selectedFilter === filter
                ? 'bg-[#466153] text-white shadow-xs'
                : 'bg-[#f5ece7] text-[#424844] hover:bg-[#efe6e2]'
            }`}
          >
            {filter === 'All' ? 'All Stories' : filter}
          </button>
        ))}
      </div>

      {/* Story Cards List */}
      <div className="flex flex-col gap-5">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            onClick={() => onSelectStory(story)}
            className="group overflow-hidden rounded-[24px] bg-[#f5ece7] p-5 sm:p-6 flex flex-col gap-4 shadow-xs border border-[#efe6e2] hover:shadow-md hover:border-[#afcdbc] transition-all cursor-pointer"
          >
            {/* Image banner */}
            <div className="relative w-full h-44 sm:h-48 rounded-[18px] overflow-hidden">
              <img
                src={story.imageUrl}
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#34302c]/75 via-[#34302c]/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[#fff8f5]">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#496456]/80 backdrop-blur-md">
                  {story.category}
                </span>
                <span className="text-[11px] font-semibold bg-[#34302c]/60 backdrop-blur-md px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">headphones</span>
                  <span>Audio &amp; Text</span>
                </span>
              </div>
            </div>

            {/* Story Details */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#424844]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#934a28]" />
                <span>{story.tag}</span>
                <span>•</span>
                <span>{story.duration}</span>
              </div>
              <h3 className="text-[19px] font-semibold text-[#1e1b18] group-hover:text-[#466153] transition-colors">
                {story.title}
              </h3>
              <p className="text-[13px] text-[#424844] italic line-clamp-2 leading-relaxed">
                {story.quote}
              </p>
            </div>

            {/* Footer with Narrator & CTA */}
            <div className="flex items-center justify-between pt-1 border-t border-[#efe6e2]">
              <span className="text-[12px] text-[#424844]">
                Narrated by <strong className="font-semibold text-[#1e1b18]">{story.narrator}</strong>
              </span>
              <span className="flex items-center gap-1 text-[13px] font-semibold text-[#934a28] group-hover:translate-x-0.5 transition-transform">
                <span>Read &amp; Listen</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
