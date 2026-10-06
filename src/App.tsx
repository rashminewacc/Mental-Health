import { useState } from 'react';
import { TabType, MoodNeed, Story, CheckInEntry } from './types.ts';
import { INITIAL_CHECKINS, STORIES } from './data/sanctuaryData.ts';
import { Header } from './components/Header.tsx';
import { BottomNav } from './components/BottomNav.tsx';
import { CrisisModal } from './components/CrisisModal.tsx';
import { MicroExerciseModal } from './components/MicroExerciseModal.tsx';
import { StoryReaderModal } from './components/StoryReaderModal.tsx';
import { NameModal } from './components/NameModal.tsx';
import { HomeScreen } from './views/HomeScreen.tsx';
import { CheckInScreen } from './views/CheckInScreen.tsx';
import { StoriesScreen } from './views/StoriesScreen.tsx';
import { InsightsScreen } from './views/InsightsScreen.tsx';
import { ProfileScreen } from './views/ProfileScreen.tsx';
import { soundService } from './services/soundService.ts';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [entries, setEntries] = useState<CheckInEntry[]>(INITIAL_CHECKINS);
  const [beadsCount, setBeadsCount] = useState<number>(6);

  // User's preferred name - NO default name, empty by default
  const [userName, setUserName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nesta_user_name') || '';
    }
    return '';
  });

  // User's custom avatar - NO default picture, empty by default
  const [userAvatar, setUserAvatar] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nesta_user_avatar') || '';
    }
    return '';
  });

  // Automatically prompt for name on first visit if not yet set
  const [isNameModalOpen, setIsNameModalOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('nesta_user_name');
      return !stored || !stored.trim();
    }
    return true;
  });

  const handleSaveNameAndAvatar = (newName: string, newAvatar: string) => {
    setUserName(newName);
    setUserAvatar(newAvatar);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nesta_user_name', newName);
      localStorage.setItem('nesta_user_avatar', newAvatar);
    }
  };

  // Other modals state
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [activeMicroNeed, setActiveMicroNeed] = useState<MoodNeed | null>(null);
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  // Ambient sound state
  const [ambientRainPlaying, setAmbientRainPlaying] = useState(false);

  const toggleAmbientRain = () => {
    const isPlaying = soundService.toggleAmbientRain();
    setAmbientRainPlaying(isPlaying);
  };

  const handleCheckInCompleted = (newEntry: CheckInEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
    setBeadsCount((prev) => prev + 1);
  };

  const handleStoryCompleted = () => {
    setBeadsCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#1e1b18] flex flex-col font-sans relative selection:bg-[#cbead8] selection:text-[#052015]">
      {/* Top Fixed Header */}
      <Header
        userName={userName}
        userAvatar={userAvatar}
        onProfileClick={() => setCurrentTab('profile')}
        ambientRainPlaying={ambientRainPlaying}
        onToggleAmbientRain={toggleAmbientRain}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16 pb-24">
        {currentTab === 'home' && (
          <HomeScreen
            userName={userName}
            onOpenEditName={() => setIsNameModalOpen(true)}
            onStartCheckIn={() => setCurrentTab('check-in')}
            onOpenStory={(story) => setActiveStory(story || STORIES[0])}
            onOpenMicroExercise={(need) => setActiveMicroNeed(need)}
            onOpenCrisis={() => setIsCrisisModalOpen(true)}
          />
        )}

        {currentTab === 'check-in' && (
          <CheckInScreen
            onCheckInCompleted={handleCheckInCompleted}
            entries={entries}
          />
        )}

        {currentTab === 'stories' && (
          <StoriesScreen
            onSelectStory={(story) => setActiveStory(story)}
            ambientRainPlaying={ambientRainPlaying}
            onToggleAmbientRain={toggleAmbientRain}
          />
        )}

        {currentTab === 'insights' && (
          <InsightsScreen
            entries={entries}
            beadsCount={beadsCount}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileScreen
            userName={userName}
            userAvatar={userAvatar}
            onUpdateUserName={(name) => handleSaveNameAndAvatar(name, userAvatar)}
            onUpdateUserAvatar={(avatar) => handleSaveNameAndAvatar(userName, avatar)}
            onOpenNameModal={() => setIsNameModalOpen(true)}
            onOpenCrisis={() => setIsCrisisModalOpen(true)}
          />
        )}
      </main>

      {/* Pinned Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          soundService.playSoftChime();
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* User Name & Photo Capture Prompt Modal */}
      <NameModal
        isOpen={isNameModalOpen}
        currentName={userName}
        currentAvatar={userAvatar}
        isFirstTime={!userName}
        onSave={handleSaveNameAndAvatar}
        onClose={() => setIsNameModalOpen(false)}
      />

      {/* Crisis Support Bottom Sheet Modal */}
      <CrisisModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
      />

      {/* Micro-Exercise Guided Session Modal */}
      <MicroExerciseModal
        need={activeMicroNeed}
        isOpen={!!activeMicroNeed}
        onClose={() => setActiveMicroNeed(null)}
      />

      {/* Story Reader & Audio Narrative Modal */}
      <StoryReaderModal
        story={activeStory}
        isOpen={!!activeStory}
        onClose={() => setActiveStory(null)}
        onStoryCompleted={handleStoryCompleted}
      />
    </div>
  );
}
