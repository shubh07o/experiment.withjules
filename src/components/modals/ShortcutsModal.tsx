import React from 'react';
import { X, Command, Compass, Volume2, Sparkles, FastForward } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Space', desc: 'Pause / Resume orbital simulation', icon: <FastForward className="w-3.5 h-3.5" /> },
    { key: '1 - 7', desc: 'Directly focus planet (Mercury to Neptune)', icon: <Compass className="w-3.5 h-3.5" /> },
    { key: '0 / Esc', desc: 'Reset camera back to full solar system view', icon: <Compass className="w-3.5 h-3.5" /> },
    { key: 'M', desc: 'Toggle ambient spatial audio synth', icon: <Volume2 className="w-3.5 h-3.5" /> },
    { key: 'H', desc: 'Open cosmic anomalies & easter eggs', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { key: 'Drag / Wheel', desc: 'Free orbit camera rotation & zoom', icon: <Command className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-neutral-950 border border-white/10 rounded-2xl p-6 shadow-2xl relative">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center space-x-2.5">
            <Command className="w-5 h-5 text-cyan-400" />
            <h3 className="font-mono text-base font-bold text-white uppercase tracking-wider">Keyboard Navigation</h3>
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

        <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
          Navigate the solar system with precision using these hotkeys.
        </p>

        <div className="space-y-2.5 mb-6">
          {shortcuts.map((s) => (
            <div
              key={s.key}
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/10"
            >
              <div className="flex items-center space-x-3 text-xs text-neutral-300">
                <span className="text-neutral-500">{s.icon}</span>
                <span>{s.desc}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-white/10 font-mono text-xs text-white border border-white/15">
                {s.key}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-500/30 font-mono text-xs uppercase tracking-wider transition-all"
        >
          Got It
        </button>
      </div>
    </div>
  );
};
