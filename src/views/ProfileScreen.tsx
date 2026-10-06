import React, { useState } from 'react';
import { soundService } from '../services/soundService.ts';

interface ProfileScreenProps {
  userName: string;
  userAvatar: string;
  onUpdateUserName: (name: string) => void;
  onUpdateUserAvatar: (avatar: string) => void;
  onOpenNameModal: () => void;
  onOpenCrisis: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userName,
  userAvatar,
  onUpdateUserName: _onUpdateUserName,
  onUpdateUserAvatar: _onUpdateUserAvatar,
  onOpenNameModal,
  onOpenCrisis,
}) => {
  const [dawnTime, setDawnTime] = useState('08:00');
  const [duskTime, setDuskTime] = useState('21:30');
  const [hapticChimes, setHapticChimes] = useState(true);
  const [ambientRainDefault, setAmbientRainDefault] = useState(true);
  const [savedBanner, setSavedBanner] = useState(false);

  const handleSave = () => {
    soundService.playTibetanBowl(280);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  return (
    <div className="flex flex-col w-full px-5 pb-24 gap-6 max-w-2xl mx-auto pt-4">
      {/* Profile Card */}
      <div className="p-6 rounded-[28px] bg-gradient-to-br from-[#f5ece7] to-[#efe6e2] border border-[#efe6e2] flex items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative shrink-0">
            {userAvatar ? (
              <img
                alt={userName || 'Profile'}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-[#fff8f5] shadow-sm shrink-0"
                src={userAvatar}
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#efe6e2] border-2 border-dashed border-[#c2c8c2] flex flex-col items-center justify-center text-[#424844] shadow-xs">
                {userName ? (
                  <span className="text-[20px] font-bold text-[#466153]">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-[28px] text-[#727974]">
                    person
                  </span>
                )}
              </div>
            )}
            <button
              onClick={onOpenNameModal}
              title="Change picture or name"
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#466153] text-white flex items-center justify-center shadow-xs hover:scale-105 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">photo_camera</span>
            </button>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-[20px] font-semibold text-[#1e1b18] truncate">
                {userName || 'Anonymous Seeker'}
              </h2>
              <span className="text-[10px] font-semibold bg-[#cbead8] text-[#052015] px-2 py-0.5 rounded-full">
                Sanctuary Member
              </span>
            </div>
            <p className="text-[13px] text-[#424844]">Member of Dawn Sanctuary</p>
            <span className="text-[11px] text-[#934a28] mt-0.5">Gentle presence since today</span>
          </div>
        </div>
        <button
          onClick={onOpenNameModal}
          className="px-3.5 py-1.5 rounded-full bg-[#fff8f5] border border-[#efe6e2] hover:bg-[#cbead8] text-[12px] font-medium text-[#1e1b18] hover:text-[#052015] shrink-0 transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[15px]">edit</span>
          <span>Edit Profile</span>
        </button>
      </div>

      {savedBanner && (
        <div className="p-3.5 rounded-2xl bg-[#cbead8] text-[#052015] text-[13px] font-medium flex items-center gap-2 animate-fadeIn">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>Your sanctuary preferences have been gently saved.</span>
        </div>
      )}

      {/* Sanctuary Timers */}
      <div className="p-6 rounded-[24px] bg-[#fff8f5] border border-[#efe6e2] flex flex-col gap-4 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#466153] text-[20px]">notifications_active</span>
          <h3 className="text-[17px] font-semibold text-[#1e1b18]">Sanctuary Whispers</h3>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-[#efe6e2]">
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold text-[#1e1b18]">Dawn Sanctuary Alert</span>
            <span className="text-[12px] text-[#424844]">Morning gentle breath &amp; personalized story</span>
          </div>
          <input
            type="time"
            value={dawnTime}
            onChange={(e) => setDawnTime(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#f5ece7] border border-[#efe6e2] text-[13px] text-[#1e1b18] font-medium focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold text-[#1e1b18]">Dusk Sanctuary Unwind</span>
            <span className="text-[12px] text-[#424844]">Evening release &amp; bedtime narrative</span>
          </div>
          <input
            type="time"
            value={duskTime}
            onChange={(e) => setDuskTime(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#f5ece7] border border-[#efe6e2] text-[13px] text-[#1e1b18] font-medium focus:outline-none"
          />
        </div>
      </div>

      {/* Audio & Haptic Sanctuary Preferences */}
      <div className="p-6 rounded-[24px] bg-[#fff8f5] border border-[#efe6e2] flex flex-col gap-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#934a28] text-[20px]">graphic_eq</span>
            <h3 className="text-[17px] font-semibold text-[#1e1b18]">Sound &amp; Resonance</h3>
          </div>
          <button
            onClick={() => soundService.playTibetanBowl(216)}
            className="text-[11px] font-semibold text-[#934a28] hover:underline cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">volume_up</span>
            <span>Test Chime</span>
          </button>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-[#efe6e2]">
          <div className="flex flex-col pr-4">
            <span className="text-[14px] font-semibold text-[#1e1b18]">Tibetan Singing Bowl Chimes</span>
            <span className="text-[12px] text-[#424844]">Acoustic harmonic bells on box breathing transitions</span>
          </div>
          <button
            onClick={() => setHapticChimes(!hapticChimes)}
            className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
              hapticChimes ? 'bg-[#466153]' : 'bg-[#efe6e2]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                hapticChimes ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex flex-col pr-4">
            <span className="text-[14px] font-semibold text-[#1e1b18]">Rain Backdrop in Stories</span>
            <span className="text-[12px] text-[#424844]">Auto-enable soft forest rainfall when reading</span>
          </div>
          <button
            onClick={() => setAmbientRainDefault(!ambientRainDefault)}
            className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
              ambientRainDefault ? 'bg-[#466153]' : 'bg-[#efe6e2]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                ambientRainDefault ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Immediate Care Resources Section */}
      <div className="p-6 rounded-[24px] bg-[#fbf2ed] border border-[#ffdbcd] flex flex-col gap-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#934a28] text-[20px]">favorite</span>
            <h3 className="text-[17px] font-semibold text-[#1e1b18]">Gentle Crisis &amp; Warm Lines</h3>
          </div>
          <button
            onClick={onOpenCrisis}
            className="text-[12px] font-semibold text-[#934a28] bg-[#fff8f5] px-3 py-1 rounded-full border border-[#ffdbcd] hover:bg-[#ffdbcd] transition-colors cursor-pointer"
          >
            Open Card
          </button>
        </div>
        <p className="text-[13px] text-[#424844] leading-relaxed">
          Quick access to 988 Lifeline, Crisis Text Line 741741, and international compassionate listeners. Free, confidential, anytime.
        </p>
      </div>

      {/* Save Settings Button */}
      <button
        onClick={handleSave}
        className="w-full py-3.5 rounded-full bg-[#466153] text-white text-[14px] font-semibold hover:opacity-95 active:scale-95 transition-all shadow-xs cursor-pointer"
      >
        Save Sanctuary Preferences
      </button>
    </div>
  );
};
