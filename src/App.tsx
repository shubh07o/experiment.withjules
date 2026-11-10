import { useState, useEffect, useCallback } from 'react';
import { SolarSystemCanvas } from './components/canvas/SolarSystemCanvas';
import { NavigationHUD } from './components/hud/NavigationHUD';
import { TimeControls } from './components/hud/TimeControls';
import { CustomCursor } from './components/hud/CustomCursor';
import { PlanetDetailModal } from './components/modals/PlanetDetailModal';
import { EasterEggsModal } from './components/modals/EasterEggsModal';
import { ShortcutsModal } from './components/modals/ShortcutsModal';
import { soundEngine } from './audio/soundEngine';

const PLANET_KEYS = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'neptune'];

export function App() {
  const [selectedPlanetId, setSelectedPlanetId] = useState<string | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showEasterEggs, setShowEasterEggs] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initial cinematic entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleMute = useCallback(() => {
    const nextMute = soundEngine.toggleMute();
    setIsMuted(nextMute);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      } else if (e.key === '0' || e.key === 'Escape') {
        setSelectedPlanetId(null);
        setShowShortcuts(false);
        setShowEasterEggs(false);
      } else if (e.key >= '1' && e.key <= '7') {
        const idx = parseInt(e.key, 10) - 1;
        const planetId = PLANET_KEYS[idx];
        if (planetId) {
          setSelectedPlanetId(planetId);
          soundEngine.playSelectChime();
        }
      } else if (e.key.toLowerCase() === 'm') {
        handleToggleMute();
      } else if (e.key.toLowerCase() === 'h') {
        setShowEasterEggs((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleToggleMute]);

  return (
    <div className="relative w-screen h-screen bg-[#030712] overflow-hidden select-none font-sans text-white">
      {/* Custom Inertia Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-[#030712] flex flex-col items-center justify-center space-y-4 transition-opacity duration-700 pointer-events-none">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
          <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 animate-pulse">
            INITIALIZING CELESTIAL COORDINATES...
          </div>
        </div>
      )}

      {/* Three.js 3D Canvas */}
      <main className="absolute inset-0">
        <SolarSystemCanvas
          selectedPlanetId={selectedPlanetId}
          onSelectPlanet={(id) => setSelectedPlanetId(id)}
          speedMultiplier={speedMultiplier}
          isPaused={isPaused}
          onHoverPlanet={(id) => setHoveredPlanet(id)}
        />
      </main>

      {/* HUD Navigation */}
      <NavigationHUD
        selectedPlanetId={selectedPlanetId}
        onSelectPlanet={(id) => setSelectedPlanetId(id)}
        onOpenShortcuts={() => setShowShortcuts(true)}
        onOpenEasterEggs={() => setShowEasterEggs(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        hoveredPlanet={hoveredPlanet}
      />

      {/* Simulation Time Warp Controls */}
      <TimeControls
        isPaused={isPaused}
        onTogglePause={() => setIsPaused((prev) => !prev)}
        speedMultiplier={speedMultiplier}
        onChangeSpeed={(mult) => setSpeedMultiplier(mult)}
      />

      {/* Planet Detail & Explore Modal */}
      <PlanetDetailModal planetId={selectedPlanetId} onClose={() => setSelectedPlanetId(null)} />

      {/* Modals */}
      <ShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
      <EasterEggsModal isOpen={showEasterEggs} onClose={() => setShowEasterEggs(false)} />
    </div>
  );
}

export default App;
