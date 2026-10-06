import React, { useState, useEffect, useRef } from 'react';
import { soundService } from '../services/soundService.ts';

interface NameModalProps {
  isOpen: boolean;
  currentName: string;
  currentAvatar: string;
  isFirstTime?: boolean;
  onSave: (name: string, avatar: string) => void;
  onClose: () => void;
}

export const NameModal: React.FC<NameModalProps> = ({
  isOpen,
  currentName,
  currentAvatar,
  isFirstTime = false,
  onSave,
  onClose,
}) => {
  const [nameInput, setNameInput] = useState(currentName);
  const [avatarPreview, setAvatarPreview] = useState(currentAvatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setNameInput(currentName);
      setAvatarPreview(currentAvatar);
    }
  }, [isOpen, currentName, currentAvatar]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (trimmed) {
      soundService.playTibetanBowl(240);
      onSave(trimmed, avatarPreview);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#34302c]/55 backdrop-blur-md p-4 animate-fadeIn"
      onClick={isFirstTime ? undefined : onClose}
    >
      <div
        className="w-full max-w-md bg-[#fff8f5] rounded-[32px] p-6 sm:p-8 flex flex-col gap-6 shadow-2xl border border-[#efe6e2] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button only if not first time requirement */}
        {!isFirstTime && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f5ece7] flex items-center justify-center text-[#424844] hover:bg-[#efe6e2] cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}

        {/* Header Icon & Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#cbead8] text-[#466153] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[26px] fill-1">spa</span>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#934a28] uppercase tracking-wider">
              {isFirstTime ? 'Welcome to Nesta' : 'Sanctuary Profile'}
            </span>
            <h3 className="text-[20px] font-semibold text-[#1e1b18] leading-tight">
              {isFirstTime ? 'Enter your name to begin' : 'Personalize your sanctuary'}
            </h3>
          </div>
        </div>

        <p className="text-[14px] text-[#424844] leading-relaxed">
          {isFirstTime
            ? 'Before entering the Dawn Sanctuary, tell us what to call you. You may also add a personal picture or leave it blank.'
            : 'Update your name and profile picture anytime to personalize your daily grounding.'}
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Avatar Upload / Blank Section */}
          <div className="flex items-center gap-4 p-3.5 rounded-[22px] bg-[#f5ece7] border border-[#efe6e2]">
            {/* Visual Avatar Container */}
            <div className="relative group shrink-0">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Your preview"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[#466153]"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#efe6e2] border-2 border-dashed border-[#c2c8c2] flex flex-col items-center justify-center text-[#424844]">
                  <span className="material-symbols-outlined text-[24px]">add_a_photo</span>
                  <span className="text-[9px] font-medium text-[#727974] mt-0.5">Empty</span>
                </div>
              )}
            </div>

            {/* Actions for picture */}
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <span className="text-[13px] font-semibold text-[#1e1b18]">
                {avatarPreview ? 'Profile Picture' : 'Add Picture (Optional)'}
              </span>
              <p className="text-[11px] text-[#424844]">
                {avatarPreview
                  ? 'Tap to change or remove'
                  : 'Leave empty or upload from your device'}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="avatar-file-upload"
                />
                <label
                  htmlFor="avatar-file-upload"
                  className="px-3 py-1 rounded-full bg-[#fff8f5] text-[11px] font-semibold text-[#466153] border border-[#afcdbc] hover:bg-[#cbead8] cursor-pointer shadow-xs transition-colors"
                >
                  {avatarPreview ? 'Change Photo' : 'Upload Photo'}
                </label>
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="text-[11px] text-[#ba1a1a] hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Name Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name-input" className="text-[13px] font-semibold text-[#1e1b18]">
              Your Name <span className="text-[#934a28]">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-[#424844] text-[20px]">
                badge
              </span>
              <input
                id="name-input"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your name"
                autoFocus
                maxLength={30}
                required
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#f5ece7] text-[#1e1b18] text-[15px] font-medium border border-[#efe6e2] focus:border-[#466153] focus:bg-white focus:outline-none transition-all placeholder:text-[#424844]/60"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            {!isFirstTime && (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-[#f5ece7] text-[#1e1b18] text-[13px] font-medium hover:bg-[#efe6e2] cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={!nameInput.trim()}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#466153] text-white text-[14px] font-semibold hover:opacity-95 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
            >
              <span>{isFirstTime ? 'Enter Sanctuary' : 'Save Details'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
