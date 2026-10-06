import React from 'react';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#34302c]/40 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#fff8f5] rounded-t-[28px] p-6 flex flex-col gap-4 shadow-2xl pb-10 border-t border-[#efe6e2]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab bar */}
        <div className="w-12 h-1.5 rounded-full bg-[#e9e1dc] mx-auto cursor-pointer" onClick={onClose} />

        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col pr-2">
            <h3 className="text-[20px] font-semibold text-[#1e1b18] tracking-tight">
              We are right here with you
            </h3>
            <p className="text-[13px] text-[#424844] mt-0.5">
              Free, confidential support is available 24/7 without judgment.
            </p>
          </div>
          <button
            aria-label="Close dialog"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f5ece7] flex items-center justify-center text-[#424844] hover:bg-[#efe6e2] transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Resource Links */}
        <div className="flex flex-col gap-2.5">
          {/* 988 Lifeline */}
          <a
            className="flex items-center justify-between p-3.5 rounded-[18px] bg-[#f5ece7] hover:bg-[#efe6e2] transition-colors group cursor-pointer"
            href="tel:988"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#ffdbcd] flex items-center justify-center text-[#360f00]">
                <span className="material-symbols-outlined text-[20px]">call</span>
              </span>
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-[#1e1b18]">
                  988 Suicide &amp; Crisis Lifeline
                </span>
                <span className="text-[12px] text-[#424844]">
                  Call or text anytime • Free &amp; private
                </span>
              </div>
            </div>
            <span className="text-[12px] font-semibold text-[#934a28] bg-[#fff8f5] px-3 py-1.5 rounded-full shadow-xs group-hover:bg-[#ffdbcd]">
              Dial 988
            </span>
          </a>

          {/* Crisis Text Line */}
          <a
            className="flex items-center justify-between p-3.5 rounded-[18px] bg-[#f5ece7] hover:bg-[#efe6e2] transition-colors group cursor-pointer"
            href="sms:741741"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#cbead8] flex items-center justify-center text-[#052015]">
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </span>
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-[#1e1b18]">
                  Crisis Text Line
                </span>
                <span className="text-[12px] text-[#424844]">
                  Text HOME to 741741 • Free 24/7 text
                </span>
              </div>
            </div>
            <span className="text-[12px] font-semibold text-[#466153] bg-[#fff8f5] px-3 py-1.5 rounded-full shadow-xs group-hover:bg-[#cbead8]">
              Text Support
            </span>
          </a>

          {/* International Resources */}
          <div className="p-3.5 rounded-[18px] bg-[#f5ece7]/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#e5deff] flex items-center justify-center text-[#1c1834]">
                <span className="material-symbols-outlined text-[20px]">public</span>
              </span>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#1e1b18]">
                  Outside the US &amp; Canada?
                </span>
                <span className="text-[11px] text-[#424844]">
                  Befrienders Worldwide &amp; IASP directory
                </span>
              </div>
            </div>
            <a
              href="https://findahelpline.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-semibold text-[#5c5778] hover:underline"
            >
              Find Hotline
            </a>
          </div>
        </div>

        <p className="text-[12px] text-center text-[#424844]/80 pt-1">
          If you are in acute medical danger, please reach out to local emergency services immediately.
        </p>
      </div>
    </div>
  );
};
