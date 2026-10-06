import React, { useState, useEffect } from 'react';
import { MoodNeed } from '../types.ts';
import { soundService } from '../services/soundService.ts';

interface MicroExerciseModalProps {
  need: MoodNeed | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MicroExerciseModal: React.FC<MicroExerciseModalProps> = ({
  need,
  isOpen,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(90);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (isOpen && need) {
      setCurrentStepIndex(0);
      setSecondsRemaining(need.exerciseDuration.includes('90') ? 90 : 120);
      setIsRunning(true);
      soundService.playTibetanBowl(240);
    }
  }, [isOpen, need]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && isRunning && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, isRunning, secondsRemaining]);

  if (!isOpen || !need) return null;

  const steps = need.exerciseSteps;
  const progressPercent = ((steps.length - 1 - (steps.length - 1 - currentStepIndex)) / (steps.length - 1)) * 100;
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const timeFormatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      soundService.playSoftChime();
    } else {
      soundService.playTibetanBowl(288);
      onClose();
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#34302c]/50 backdrop-blur-md p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#fff8f5] rounded-[28px] p-6 sm:p-8 flex flex-col gap-6 shadow-2xl relative border border-[#efe6e2]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title and Close */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{need.emoji}</span>
            <div>
              <span className="text-[11px] font-semibold text-[#934a28] uppercase tracking-wider">
                Micro-Relief • {need.exerciseDuration}
              </span>
              <h3 className="text-[19px] font-semibold text-[#1e1b18] leading-tight">
                {need.recommendationTitle}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f5ece7] flex items-center justify-center text-[#424844] hover:bg-[#efe6e2]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Ambient Pulsing Orb */}
        <div className="relative flex items-center justify-center py-4">
          <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#afcdbc]/40 to-[#ffdbcd]/50 blur-xl animate-breathe absolute" />
          <div className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-br from-[#466153] to-[#5e7a6b] text-white flex flex-col items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-[28px]">air</span>
            <span className="text-[14px] font-medium tracking-wider mt-1">{timeFormatted}</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[100px] flex flex-col justify-center text-center px-2">
          <span className="text-[12px] font-medium text-[#466153] mb-1.5">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
          <p className="text-[16px] text-[#1e1b18] font-normal leading-relaxed">
            {steps[currentStepIndex]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#efe6e2] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#466153] h-full transition-all duration-300"
            style={{ width: `${Math.max(10, progressPercent)}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-1.5 text-[13px] text-[#424844] hover:text-[#1e1b18] px-3 py-2 rounded-full hover:bg-[#f5ece7]"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isRunning ? 'pause' : 'play_arrow'}
            </span>
            <span>{isRunning ? 'Pause' : 'Resume'}</span>
          </button>

          <div className="flex items-center gap-2">
            {currentStepIndex > 0 && (
              <button
                onClick={handlePrevStep}
                className="px-4 py-2.5 rounded-full bg-[#f5ece7] text-[#1e1b18] text-[13px] font-medium hover:bg-[#efe6e2]"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNextStep}
              className="px-5 py-2.5 rounded-full bg-[#466153] text-white text-[13px] font-semibold shadow-sm hover:opacity-95 active:scale-95 transition-all flex items-center gap-1"
            >
              <span>{currentStepIndex === steps.length - 1 ? 'Complete' : 'Continue'}</span>
              <span className="material-symbols-outlined text-[16px]">
                {currentStepIndex === steps.length - 1 ? 'check' : 'arrow_forward'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
