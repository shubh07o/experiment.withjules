import React from 'react';
import { Volume2, VolumeX, Sparkles, HelpCircle, Compass } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface NavigationHUDProps {
  selectedPlanetId: string | null;
  onSelectPlanet: (id: string | null) => void;
  onOpenShortcuts: () => void;
  onOpenEasterEggs: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  hoveredPlanet: string | null;
}

const PLANETS = [
  { id: 'mercury', name: 'Mercury', theme: 'speed', color: '#9e9e9e' },
  { id: 'venus', name: 'Venus', theme: 'art', color: '#e3bb76' },
  { id: 'earth', name: 'Earth', theme: 'life', color: '#00d2ff' },
  { id: 'mars', name: 'Mars', theme: 'innovation', color: '#ff5533' },
  { id: 'jupiter', name: 'Jupiter', theme: 'knowledge', color: '#f7c873' },
  { id: 'saturn', name: 'Saturn', theme: 'projects', color: '#e0c58d' },
  { id: 'neptune', name: 'Neptune', theme: 'future', color: '#3388ff' },
];

export const NavigationHUD: React.FC<NavigationHUDProps> = ({
  selectedPlanetId,
  onSelectPlanet,
  onOpenShortcuts,
  onOpenEasterEggs,
  isMuted,
  onToggleMute,
  hoveredPlanet,
}) => {
  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-40 pointer-events-none">
        <div className="flex items-center space-x-3 pointer-events-auto">
          <div className="w-9 h-9 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm shadow-cyan-500/20">
            <OrbitIcon className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-base font-bold tracking-widest text-white uppercase">ORBIT</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                SYSTEM V2.5
              </span>
            </div>
            <div className="text-[11px] font-mono text-neutral-400 tracking-wider">
              INTERACTIVE CELESTIAL ODYSSEY
            </div>
          </div>
        </div>

        {/* Top Controls */}
        <div className="flex items-center space-x-3 pointer-events-auto">
          <button
            onClick={onToggleMute}
            onMouseEnter={() => soundEngine.playHoverTone()}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-all backdrop-blur-md"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-neutral-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          <button
            onClick={onOpenEasterEggs}
            onMouseEnter={() => soundEngine.playHoverTone()}
            title="Cosmic Anomalies & Easter Eggs"
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-amber-300 hover:text-amber-200 transition-all backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenShortcuts}
            onMouseEnter={() => soundEngine.playHoverTone()}
            title="Keyboard Shortcuts"
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-all backdrop-blur-md"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Bottom Planet Dock */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] overflow-x-auto p-1.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center space-x-1.5 scrollbar-none">
        <button
          onClick={() => {
            onSelectPlanet(null);
            soundEngine.playHoverTone();
          }}
          className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center space-x-2 transition-all ${
            selectedPlanetId === null
              ? 'bg-white/20 text-white border border-white/30'
              : 'text-neutral-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Solar System</span>
        </button>

        <div className="h-5 w-[1px] bg-white/10 mx-1" />

        {PLANETS.map((planet) => {
          const isSelected = selectedPlanetId === planet.id;
          const isHovered = hoveredPlanet === planet.id;

          return (
            <button
              key={planet.id}
              onClick={() => {
                onSelectPlanet(planet.id);
                soundEngine.playSelectChime(planet.theme);
              }}
              onMouseEnter={() => soundEngine.playHoverTone()}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-2 whitespace-nowrap ${
                isSelected
                  ? 'bg-white/20 text-white border border-cyan-400/50 shadow-sm shadow-cyan-500/20'
                  : isHovered
                  ? 'bg-white/10 text-white'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: planet.color }} />
              <span className="font-semibold">{planet.name}</span>
              <span className="text-[10px] text-neutral-500 font-sans">{planet.theme}</span>
            </button>
          );
        })}
      </nav>

      {/* Instructions Overlay */}
      <div className="fixed bottom-6 left-6 z-30 hidden md:block pointer-events-none">
        <div className="text-[11px] font-mono text-neutral-500 space-y-1 bg-black/40 border border-white/5 px-3 py-2 rounded-xl backdrop-blur-md">
          <div>DRAG to rotate camera • WHEEL to zoom</div>
          <div>CLICK on any planet to focus & explore</div>
        </div>
      </div>
    </>
  );
};

const OrbitIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2a10 10 0 0 0-7.07 17.07" />
    <circle cx="5" cy="5" r="1" />
    <path d="M12 22a10 10 0 0 0 7.07-17.07" />
    <circle cx="19" cy="19" r="1" />
  </svg>
);
