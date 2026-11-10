import React from 'react';
import { Play, Pause, FastForward } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface TimeControlsProps {
  isPaused: boolean;
  onTogglePause: () => void;
  speedMultiplier: number;
  onChangeSpeed: (multiplier: number) => void;
}

export const TimeControls: React.FC<TimeControlsProps> = ({
  isPaused,
  onTogglePause,
  speedMultiplier,
  onChangeSpeed,
}) => {
  const speeds = [0.5, 1, 2, 5];

  return (
    <aside aria-label="Simulation Time Controls" className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 bg-black/60 border border-white/10 p-1.5 rounded-2xl backdrop-blur-xl shadow-xl">
      <button
        onClick={() => {
          onTogglePause();
          soundEngine.playHoverTone();
        }}
        title={isPaused ? 'Resume Simulation (Space)' : 'Pause Simulation (Space)'}
        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
          isPaused
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
      >
        {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
      </button>

      <div className="h-5 w-[1px] bg-white/10 mx-0.5" />

      {speeds.map((s) => (
        <button
          key={s}
          onClick={() => {
            onChangeSpeed(s);
            soundEngine.playHoverTone();
          }}
          className={`px-2.5 py-1.5 rounded-xl font-mono text-xs transition-all ${
            speedMultiplier === s
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
              : 'text-neutral-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {s}x
        </button>
      ))}

      <FastForward className="w-3.5 h-3.5 text-neutral-500 mx-1" />
    </aside>
  );
};
