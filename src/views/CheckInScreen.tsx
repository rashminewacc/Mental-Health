import React, { useState } from 'react';
import { CheckInEntry } from '../types.ts';
import { soundService } from '../services/soundService.ts';

interface CheckInScreenProps {
  onCheckInCompleted: (entry: CheckInEntry) => void;
  entries: CheckInEntry[];
}

export const CheckInScreen: React.FC<CheckInScreenProps> = ({
  onCheckInCompleted,
  entries,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedMood, setSelectedMood] = useState<{ label: string; emoji: string }>({
    label: 'Peaceful',
    emoji: '🌿',
  });
  const [energyLevel, setEnergyLevel] = useState<number>(3);
  const [tensionPoints, setTensionPoints] = useState<string[]>(['Shoulders']);
  const [journalNote, setJournalNote] = useState<string>('');
  const [isSaved, setIsSaved] = useState(false);

  const moodOptions = [
    { label: 'Peaceful', emoji: '🌿', color: 'bg-[#cbead8] text-[#052015]' },
    { label: 'Overwhelmed', emoji: '🍃', color: 'bg-[#ffdad6] text-[#93000a]' },
    { label: 'Anxious', emoji: '🌊', color: 'bg-[#e5deff] text-[#1c1834]' },
    { label: 'Tender / Low', emoji: '🕯️', color: 'bg-[#ffdbcd] text-[#753313]' },
    { label: 'Stuck', emoji: '⛅', color: 'bg-[#f5ece7] text-[#1e1b18]' },
    { label: 'Hopeful', emoji: '✨', color: 'bg-[#afcdbc] text-[#052015]' },
  ];

  const bodyAreas = [
    'Shoulders & Neck',
    'Chest / Heart space',
    'Jaw & Forehead',
    'Stomach / Solar plexus',
    'Hands & Arms',
    'Soft & Relaxed everywhere',
  ];

  const toggleTension = (area: string) => {
    if (area === 'Soft & Relaxed everywhere') {
      setTensionPoints(['Soft & Relaxed everywhere']);
      return;
    }
    const filtered = tensionPoints.filter((p) => p !== 'Soft & Relaxed everywhere');
    if (filtered.includes(area)) {
      setTensionPoints(filtered.filter((p) => p !== area));
    } else {
      setTensionPoints([...filtered, area]);
    }
  };

  const handleFinish = () => {
    soundService.playTibetanBowl(270);
    const newEntry: CheckInEntry = {
      id: `c-${Date.now()}`,
      date: `Today, ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`,
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      mood: selectedMood.label,
      moodEmoji: selectedMood.emoji,
      energyLevel,
      tensionPoints: tensionPoints.length > 0 ? tensionPoints : ['Soft & Unburdened'],
      note: journalNote.trim() || 'Taking a moment of sacred pause.',
      affirmation:
        selectedMood.label === 'Overwhelmed'
          ? 'You do not have to carry everything all at once.'
          : selectedMood.label === 'Anxious'
          ? 'Right here in this room, you are held and safe.'
          : 'May you treat your heart with deep gentleness.',
    };

    onCheckInCompleted(newEntry);
    setIsSaved(true);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setIsSaved(false);
    setJournalNote('');
    setTensionPoints(['Shoulders & Neck']);
  };

  return (
    <div className="flex flex-col w-full px-5 pb-24 gap-6 max-w-2xl mx-auto pt-4">
      {/* Top Banner */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[#934a28] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ffa178] animate-pulse" />
            Daily Pulse Sanctuary
          </span>
          <span className="text-[12px] text-[#424844] font-medium">
            Step {step} of 4
          </span>
        </div>
        <h1 className="text-[26px] font-semibold text-[#1e1b18] tracking-tight">
          Mindful Check-In
        </h1>
        <p className="text-[14px] text-[#424844]">
          Arrive as you are. No performances, no fixing required.
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-1.5 rounded-full transition-all flex-1 ${
              step >= s ? 'bg-[#466153]' : 'bg-[#efe6e2]'
            }`}
          />
        ))}
      </div>

      {/* STEP 1: Mood & Energy */}
      {step === 1 && (
        <div className="bg-[#f5ece7] rounded-[24px] p-6 flex flex-col gap-5 border border-[#efe6e2] shadow-xs">
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-semibold text-[#1e1b18]">
              What color does your emotion feel like right now?
            </h3>
            <p className="text-[13px] text-[#424844]">
              Select the emotional climate closest to your present state.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {moodOptions.map((opt) => {
              const active = selectedMood.label === opt.label;
              return (
                <button
                  key={opt.label}
                  onClick={() => {
                    setSelectedMood(opt);
                    soundService.playSoftChime();
                  }}
                  className={`p-3.5 rounded-[18px] flex items-center gap-2.5 transition-all text-left cursor-pointer border ${
                    active
                      ? 'bg-[#466153] text-white border-[#cbead8] shadow-sm scale-[1.02]'
                      : 'bg-[#fff8f5] text-[#1e1b18] border-[#efe6e2] hover:bg-[#efe6e2]'
                  }`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="text-[14px] font-medium">{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Energy Level Slider */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#efe6e2]">
            <div className="flex items-center justify-between text-[13px]">
              <span className="font-semibold text-[#1e1b18]">Inner Energy Reserve</span>
              <span className="text-[#466153] font-medium">
                {energyLevel === 1 && 'Drained / Whispering'}
                {energyLevel === 2 && 'Low / Gentle'}
                {energyLevel === 3 && 'Steady / Centered'}
                {energyLevel === 4 && 'Warm / Clear'}
                {energyLevel === 5 && 'Vibrant / Flowing'}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
              className="w-full accent-[#466153] h-2 bg-[#efe6e2] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#424844]">
              <span>Depleted</span>
              <span>Balanced</span>
              <span>Overflowing</span>
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full mt-2 py-3.5 rounded-full bg-[#466153] text-white text-[14px] font-semibold hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span>Next: Check Physical Tension</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      )}

      {/* STEP 2: Somatic Body Scan */}
      {step === 2 && (
        <div className="bg-[#f5ece7] rounded-[24px] p-6 flex flex-col gap-5 border border-[#efe6e2] shadow-xs">
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-semibold text-[#1e1b18]">
              Where is your body holding the day?
            </h3>
            <p className="text-[13px] text-[#424844]">
              Your body often whispers what the mind hasn't noticed yet.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {bodyAreas.map((area) => {
              const isChecked = tensionPoints.includes(area);
              return (
                <button
                  key={area}
                  onClick={() => toggleTension(area)}
                  className={`w-full p-3 rounded-[16px] flex items-center justify-between text-left transition-all border cursor-pointer ${
                    isChecked
                      ? 'bg-[#cbead8] text-[#052015] border-[#afcdbc] font-medium'
                      : 'bg-[#fff8f5] text-[#424844] border-[#efe6e2] hover:bg-[#efe6e2]'
                  }`}
                >
                  <span className="text-[14px]">{area}</span>
                  <span className="material-symbols-outlined text-[20px] text-[#466153]">
                    {isChecked ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setStep(1)}
              className="py-3 px-5 rounded-full bg-[#efe6e2] text-[#1e1b18] text-[13px] font-medium hover:bg-[#e9e1dc] cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-3.5 rounded-full bg-[#466153] text-white text-[14px] font-semibold hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Next: Unpack Thoughts</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Quiet Journal */}
      {step === 3 && (
        <div className="bg-[#f5ece7] rounded-[24px] p-6 flex flex-col gap-5 border border-[#efe6e2] shadow-xs">
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-semibold text-[#1e1b18]">
              Unpack your quiet thoughts without judgment
            </h3>
            <p className="text-[13px] text-[#424844]">
              Write whatever is resting on your chest. Even just two words is enough.
            </p>
          </div>

          <textarea
            value={journalNote}
            onChange={(e) => setJournalNote(e.target.value)}
            rows={5}
            placeholder="Right now, my mind is carrying... (Take your time, this is private to your device)"
            className="w-full p-4 rounded-[18px] bg-[#fff8f5] text-[#1e1b18] text-[15px] border border-[#efe6e2] focus:border-[#466153] focus:outline-none resize-none placeholder:text-[#424844]/60 leading-relaxed"
          />

          {/* Quick thought starters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              'I did the best I could',
              'Giving myself permission to pause',
              'Too much noise today',
              'Grateful for a quiet moment',
            ].map((starter) => (
              <button
                key={starter}
                onClick={() =>
                  setJournalNote((prev) => (prev ? `${prev}. ${starter}` : starter))
                }
                className="text-[11px] font-medium text-[#466153] bg-[#cbead8]/60 hover:bg-[#cbead8] px-3 py-1.5 rounded-full whitespace-nowrap cursor-pointer"
              >
                + “{starter}”
              </button>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setStep(2)}
              className="py-3 px-5 rounded-full bg-[#efe6e2] text-[#1e1b18] text-[13px] font-medium hover:bg-[#e9e1dc] cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleFinish}
              className="flex-1 py-3.5 rounded-full bg-[#934a28] text-white text-[14px] font-semibold hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">favorite</span>
              <span>Complete &amp; Seal Check-In</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Sanctuary Blessing & Confirmation */}
      {step === 4 && (
        <div className="bg-gradient-to-br from-[#cbead8]/50 to-[#ffdbcd]/40 rounded-[28px] p-6 sm:p-8 flex flex-col gap-6 items-center text-center border border-[#afcdbc] shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#466153] text-white flex items-center justify-center shadow-md animate-breathe">
            <span className="material-symbols-outlined text-[32px] fill-1">spa</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-semibold text-[#934a28] uppercase tracking-wider">
              Sanctuary Received
            </span>
            <h3 className="text-[22px] font-semibold text-[#1e1b18]">
              Your pulse has been welcomed
            </h3>
            <p className="text-[14px] text-[#424844] max-w-sm">
              Thank you for honoring how you feel today. You have set down your load, even for a moment.
            </p>
          </div>

          <div className="w-full bg-[#fff8f5] p-5 rounded-2xl shadow-xs border border-[#efe6e2] text-left flex flex-col gap-2">
            <div className="flex items-center justify-between text-[12px] text-[#424844]">
              <span className="font-semibold text-[#1e1b18]">Today's Reflection</span>
              <span>{selectedMood.emoji} {selectedMood.label}</span>
            </div>
            <p className="text-[15px] italic text-[#1e1b18] font-normal leading-relaxed border-l-2 border-[#934a28] pl-3 py-0.5">
              “{selectedMood.label === 'Overwhelmed'
                ? 'You don’t have to carry tomorrow’s burdens with today’s strength.'
                : 'Peace is not the absence of trouble, but the presence of kindness toward yourself.'}”
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-full bg-[#466153] text-white text-[13px] font-semibold hover:opacity-95 active:scale-95 transition-all cursor-pointer shadow-xs"
          >
            Check In Again Later
          </button>
        </div>
      )}

      {/* Past Entries Log */}
      <section className="flex flex-col gap-3 mt-4">
        <h3 className="text-[18px] font-semibold text-[#1e1b18]">
          Recent Pulses
        </h3>
        <div className="flex flex-col gap-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-[20px] bg-[#fff8f5] border border-[#efe6e2] flex flex-col gap-2 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{entry.moodEmoji}</span>
                  <span className="text-[14px] font-semibold text-[#1e1b18]">{entry.mood}</span>
                </div>
                <span className="text-[11px] text-[#424844] font-medium">{entry.date}</span>
              </div>
              <p className="text-[13px] text-[#424844] leading-relaxed">
                “{entry.note}”
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-[#efe6e2]/60 text-[11px] text-[#466153]">
                <span>Energy: Level {entry.energyLevel}/5</span>
                <span>{entry.tensionPoints.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
