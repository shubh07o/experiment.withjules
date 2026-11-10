import React, { useState } from 'react';
import { X } from 'lucide-react';
import { PLANETS_DATA } from '../../data/planetsData';
import { MercuryExperience, VenusExperience, EarthExperience, MarsExperience } from '../experiences/InnerPlanets';
import { JupiterExperience, SaturnExperience, NeptuneExperience } from '../experiences/OuterPlanets';
import { soundEngine } from '../../audio/soundEngine';

interface PlanetDetailModalProps {
  planetId: string | null;
  onClose: () => void;
}

export const PlanetDetailModal: React.FC<PlanetDetailModalProps> = ({ planetId, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'experience'>('profile');

  if (!planetId) return null;
  const planet = PLANETS_DATA[planetId];
  if (!planet) return null;

  const renderExperience = () => {
    switch (planet.id) {
      case 'mercury':
        return <MercuryExperience />;
      case 'venus':
        return <VenusExperience />;
      case 'earth':
        return <EarthExperience />;
      case 'mars':
        return <MarsExperience />;
      case 'jupiter':
        return <JupiterExperience />;
      case 'saturn':
        return <SaturnExperience />;
      case 'neptune':
        return <NeptuneExperience />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:max-w-xl z-50 bg-black/85 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col animate-slide-left overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-start justify-between relative">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: planet.accentColor }} />
            <span>{planet.themeLabel}</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">{planet.name}</h2>
          <div className="text-sm text-neutral-400">{planet.subtitle}</div>
        </div>

        <button
          onClick={() => {
            onClose();
            soundEngine.playHoverTone();
          }}
          className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 px-6 pt-3">
        <button
          onClick={() => {
            setActiveTab('profile');
            soundEngine.playHoverTone();
          }}
          className={`pb-3 font-mono text-xs uppercase tracking-wider transition-all border-b-2 mr-6 ${
            activeTab === 'profile'
              ? 'border-cyan-400 text-white font-semibold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Planetary Profile
        </button>
        <button
          onClick={() => {
            setActiveTab('experience');
            soundEngine.playSelectChime(planet.theme);
          }}
          className={`pb-3 font-mono text-xs uppercase tracking-wider transition-all border-b-2 flex items-center space-x-2 ${
            activeTab === 'experience'
              ? 'border-cyan-400 text-cyan-300 font-semibold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Explore {planet.themeLabel}</span>
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {activeTab === 'profile' ? (
          <>
            {/* Tagline */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <p className="text-sm text-neutral-200 leading-relaxed italic">"{planet.tagline}"</p>
            </div>

            {/* Planet Specs Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="text-xs font-mono text-neutral-500 mb-1">ORBITAL PERIOD</div>
                <div className="text-xl font-mono text-white">
                  {planet.orbitalPeriodDays} <span className="text-xs text-neutral-400 font-sans">Earth days</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="text-xs font-mono text-neutral-500 mb-1">EQUATORIAL DIAMETER</div>
                <div className="text-xl font-mono text-white">
                  {planet.diameterKm.toLocaleString()} <span className="text-xs text-neutral-400 font-sans">km</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="text-xs font-mono text-neutral-500 mb-1">DISTANCE FROM SUN</div>
                <div className="text-xl font-mono text-white">
                  {planet.distanceFromSunMillionKm} <span className="text-xs text-neutral-400 font-sans">M km</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="text-xs font-mono text-neutral-500 mb-1">SURFACE GRAVITY</div>
                <div className="text-xl font-mono text-white">
                  {planet.gravityMps2} <span className="text-xs text-neutral-400 font-sans">m/s²</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400">Scientific Overview</h4>
              <p className="text-sm text-neutral-300 leading-relaxed">{planet.description}</p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400">Pinnacle Technologies</h4>
              <ul className="space-y-2">
                {planet.keyFeatures.map((feat) => (
                  <li
                    key={feat}
                    className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-center space-x-3 text-xs text-neutral-200"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div>
            <div className="mb-4">
              <h3 className="text-base font-semibold text-white mb-1">Global {planet.themeLabel} Matrix</h3>
              <p className="text-xs text-neutral-400">
                Live interactive telemetry, sensory controls, and simulated parameters.
              </p>
            </div>
            {renderExperience()}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-white/10 flex justify-between items-center bg-black/40">
        <span className="text-xs font-mono text-neutral-500">ORBIT DIGITAL UNIVERSE</span>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-all"
        >
          Close Profile
        </button>
      </div>
    </div>
  );
};
