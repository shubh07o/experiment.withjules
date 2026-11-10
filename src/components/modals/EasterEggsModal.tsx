import React, { useState } from 'react';
import { X, Sparkles, Flame, Orbit, Radio, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../audio/soundEngine';

interface EasterEggsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggsModal: React.FC<EasterEggsModalProps> = ({ isOpen, onClose }) => {
  const [anomalyStatus, setAnomalyStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerSupernova = () => {
    soundEngine.playWarpSound();
    setAnomalyStatus('SUPERNOVA TRIGGERED: SYNTHETIC PHOTON BLAST');

    // Confetti burst with space colors
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#00ffff', '#ff5533', '#ffd700', '#ffffff', '#9933ff'],
    });

    setTimeout(() => setAnomalyStatus(null), 3000);
  };

  const triggerSingularity = () => {
    soundEngine.playSelectChime('future');
    setAnomalyStatus('SINGULARITY COLLAPSE: EVENT HORIZON DISTORTION STABILIZED');
    setTimeout(() => setAnomalyStatus(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-neutral-950 border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-between items-center mb-5 relative">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-mono text-base font-bold text-white uppercase tracking-wider">Cosmic Anomalies</h3>
          </div>
          <button
            onClick={() => {
              onClose();
              soundEngine.playHoverTone();
            }}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-neutral-400 leading-relaxed mb-5">
          Secret experiments and celestial easter eggs hidden within the ORBIT physics engine.
        </p>

        {anomalyStatus && (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 font-mono text-xs text-amber-300 text-center animate-pulse">
            {anomalyStatus}
          </div>
        )}

        <div className="space-y-3 mb-6">
          <div
            onClick={triggerSupernova}
            className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/5 cursor-pointer transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
                <Flame className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <div className="text-xs font-mono font-semibold text-white">Supernova Confetti Detonation</div>
                <div className="text-[11px] text-neutral-400">Triggers chromatic stellar particle blast</div>
              </div>
            </div>
            <Zap className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 transition-colors" />
          </div>

          <div
            onClick={triggerSingularity}
            className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/5 cursor-pointer transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Orbit className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
              </div>
              <div>
                <div className="text-xs font-mono font-semibold text-white">Singularity Micro-Collapse</div>
                <div className="text-[11px] text-neutral-400">Simulate gravitational vacuum anomaly</div>
              </div>
            </div>
            <Radio className="w-4 h-4 text-neutral-500 group-hover:text-cyan-400 transition-colors" />
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all"
        >
          Dismiss Anomalies
        </button>
      </div>
    </div>
  );
};
