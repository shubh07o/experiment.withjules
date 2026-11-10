import React, { useState } from 'react';
import { BookOpen, Disc, Radio, RadioReceiver } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

// JUPITER: Knowledge and Synthesis
export const JupiterExperience: React.FC = () => {
  const [lensingDistortion, setLensingDistortion] = useState(1.8);
  const [radioFreq, setRadioFreq] = useState(20.1);

  return (
    <div className="space-y-6">
      <div className="border border-white/10 bg-white/[0.02] p-5 rounded-2xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-amber-300">
            <BookOpen className="w-5 h-5" />
            <h4 className="font-mono text-sm tracking-widest uppercase">Gravitational Archive & Lensing</h4>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            SYNTHESIS MATRIX
          </span>
        </div>

        <p className="text-sm text-neutral-400 leading-relaxed mb-5">
          Jupiter’s massive gravity well bends space-time, generating relativistic gravitational lensing for deep space
          observation. Tune the Einstein deflection ring and decametric radio emissions.
        </p>

        {/* Gravitational Visualizer */}
        <div className="relative h-32 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center overflow-hidden mb-5">
          <div
            className="absolute rounded-full border border-amber-400/60 transition-all duration-300 pointer-events-none"
            style={{
              width: `${lensingDistortion * 45}px`,
              height: `${lensingDistortion * 45}px`,
              boxShadow: `0 0 ${lensingDistortion * 15}px rgba(245, 158, 11, 0.4)`,
            }}
          />
          <div className="text-center font-mono text-xs text-amber-200/90 z-10">
            EINSTEIN RADIUS: {(lensingDistortion * 2.4).toFixed(2)} ARCSEC
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono text-neutral-400 mb-1.5">
              <span>GRAVITATIONAL DEFLECTION</span>
              <span className="text-amber-300">{lensingDistortion.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.5"
              step="0.1"
              value={lensingDistortion}
              onChange={(e) => setLensingDistortion(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-neutral-400 mb-1.5">
              <span>DECAMETRIC RADIO RECEIVER</span>
              <span className="text-amber-300">{radioFreq.toFixed(1)} MHz</span>
            </div>
            <input
              type="range"
              min="15.0"
              max="32.0"
              step="0.2"
              value={radioFreq}
              onChange={(e) => setRadioFreq(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// SATURN: Projects and Engineering
export const SaturnExperience: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(0);

  const projects = [
    {
      title: 'Orbital Ring Accelerator',
      category: 'Megastructure Engineering',
      desc: 'Superconducting electromagnetic rings encircling the planet to launch interstellar probes at 0.12c.',
      status: 'Active Simulation',
      stats: '116,000 km Span • 24 GW Peak Power',
    },
    {
      title: 'Enceladus Cryo-Explorer',
      category: 'Astrobiology Submersible',
      desc: 'Autonomous micro-submarine exploring sub-surface oceans for geothermal vent ecosystems.',
      status: 'Telemetry Linked',
      stats: '800m Ice Penetration • 100% Autonomous',
    },
    {
      title: 'Titan Methane Refinery',
      category: 'Hydrocarbon Logistics',
      desc: 'Cryogenic hydrocarbon collection and synthesis for deep space refueling depots.',
      status: 'Operational Outpost',
      stats: '94K Operating Temp • 450 Ton/Month',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border border-white/10 bg-white/[0.02] p-5 rounded-2xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-amber-200">
            <Disc className="w-5 h-5" />
            <h4 className="font-mono text-sm tracking-widest uppercase">Orbital Project Showcase</h4>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
            3 ACTIVE NODES
          </span>
        </div>

        <p className="text-sm text-neutral-400 mb-4">
          Saturn’s rings provide the orbital scaffolding for humankind’s most ambitious deep-system engineering
          initiatives.
        </p>

        <div className="space-y-2.5 mb-5">
          {projects.map((p, idx) => (
            <div
              key={p.title}
              onClick={() => {
                setSelectedProject(idx);
                soundEngine.playHoverTone();
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedProject === idx
                  ? 'bg-amber-500/15 border-amber-500/40 text-white'
                  : 'bg-black/30 border-white/10 hover:border-white/20 text-neutral-300'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="font-mono text-xs font-semibold">{p.title}</div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-amber-300">
                  {p.status}
                </span>
              </div>
              <div className="text-xs text-neutral-400 mb-2">{p.desc}</div>
              <div className="text-[11px] font-mono text-amber-400/80">{p.stats}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// NEPTUNE: Future
export const NeptuneExperience: React.FC = () => {
  const [incomingSignal, setIncomingSignal] = useState(false);
  const [decodedMessage, setDecodedMessage] = useState<string | null>(null);

  const decodeInterstellarSignal = () => {
    setIncomingSignal(true);
    soundEngine.playSelectChime('future');
    setTimeout(() => {
      setDecodedMessage('TACHYON BEACON DETECTED: VOYAGER ARCHIVE MERGED WITH PROXIMA CENTAURI RELAY.');
      setIncomingSignal(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="border border-white/10 bg-white/[0.02] p-5 rounded-2xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-sky-400">
            <Radio className="w-5 h-5" />
            <h4 className="font-mono text-sm tracking-widest uppercase">Horizon Deep Space Decoder</h4>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
            VOYAGER REACH
          </span>
        </div>

        <p className="text-sm text-neutral-400 leading-relaxed mb-5">
          Neptune stands sentinel over the interstellar abyss. The deep listening array continuously decodes incoming
          deep-space transmissions from humanity’s future horizon.
        </p>

        <div className="p-4 bg-black/60 border border-sky-500/20 rounded-xl font-mono text-xs text-sky-300 mb-5 min-h-[70px] flex items-center justify-center text-center">
          {incomingSignal ? (
            <div className="flex items-center space-x-2 animate-pulse">
              <RadioReceiver className="w-4 h-4 text-sky-400 animate-spin" />
              <span>SYNCHRONIZING DEEP SPACE TACHYONS...</span>
            </div>
          ) : decodedMessage ? (
            <span className="text-emerald-400">{decodedMessage}</span>
          ) : (
            <span className="text-neutral-500">LISTENING TO VOID EMISSIONS (FREQUENCY 1420.405 MHz)...</span>
          )}
        </div>

        <button
          onClick={decodeInterstellarSignal}
          disabled={incomingSignal}
          className="w-full py-3 bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-500/40 rounded-xl font-mono text-xs uppercase tracking-widest transition-all"
        >
          {incomingSignal ? 'DECODING HORIZON PACKET...' : 'DECODE INTERSTELLAR SIGNAL'}
        </button>

        {/* Future Horizon Timeline */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <h5 className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-3">Civilization Trajectory</h5>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs p-2.5 bg-black/30 rounded-lg">
              <span className="font-mono text-sky-400">2050</span>
              <span className="text-neutral-300">Permanent Outposts on Mars & Moon</span>
            </div>
            <div className="flex items-center justify-between text-xs p-2.5 bg-black/30 rounded-lg">
              <span className="font-mono text-sky-400">2150</span>
              <span className="text-neutral-300">Titan Atmosphere Extraction & Fusion Grid</span>
            </div>
            <div className="flex items-center justify-between text-xs p-2.5 bg-black/30 rounded-lg">
              <span className="font-mono text-sky-400">2300</span>
              <span className="text-neutral-300">First Interstellar Generation Ship to Alpha Centauri</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
