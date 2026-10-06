export type TabType = 'home' | 'check-in' | 'stories' | 'insights' | 'profile';

export type MoodNeedKey = 'encouragement' | 'anxious' | 'overwhelmed' | 'lonely' | 'stuck' | 'hopeful';

export interface MoodNeed {
  key: MoodNeedKey;
  emoji: string;
  label: string;
  recommendationTitle: string;
  recommendationDesc: string;
  exerciseDuration: string;
  exerciseSteps: string[];
}

export interface Story {
  id: string;
  title: string;
  category: string;
  duration: string;
  type: string;
  tag: string;
  narrator: string;
  quote: string;
  imageUrl: string;
  excerpt: string;
  content: string[];
  audioMinutes: number;
}

export interface CheckInEntry {
  id: string;
  date: string;
  time: string;
  mood: string;
  moodEmoji: string;
  energyLevel: number; // 1-5
  tensionPoints: string[];
  note: string;
  affirmation: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'dawn' | 'dusk' | 'story' | 'insight';
}
