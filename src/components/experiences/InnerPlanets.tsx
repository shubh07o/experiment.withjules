import React, { useState, useEffect, useRef } from 'react';
import { Zap, Activity, Cpu, Wind, Shield, Satellite, Layers, Flame } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

// MERCURY: Speed and Technology
export const MercuryExperience: React.FC = () => {
  const [warpActive, setWarpActive] = useState(false);
  const [warpLatency, setWarpLatency] = useState(1.42);
  const [dataThroughput, setDataThroughput] = useState(48.2);

  const triggerWarpTest = () => {
    setWarpActive(true);
    soundEngine.playWarpSound();
    setTimeout(() => {
      setWarpLatency(Number((0.15 + Math.random() * 0.4).toFixed(3)));
      setDataThroughput(Number((94.5 + Math.random() * 5.2).toFixed(1)));
      setWarpActive(false);
    }, 700);
  };

  return (
    <div className="space-y-6">
      <div className="border border-white/10 bg-white/[0.02] p-5 rounded-2xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-amber-400">
            <Zap className="w-5 h-5" />
            <h4 className="font-mono text-sm tracking-widest uppercase">Quantum Hyperdrive Benchmark</h4>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            SUB-ORBITAL ONLINE
          </span>
        </div>

        <p className="text-sm text-neutral-400 leading-relaxed mb-5">
          Mercury experiences the highest solar radiation flux and orbital velocities in the solar system. Calibrate the
          sub-atomic optical relay to benchmark transmission efficiency.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-black/40 border border-white/10 p-3.5 rounded-xl">
            <div className="text-xs text-neutral-500 mb-1 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Sub-Orbital Latency
            </div>
            <div className="text-2xl font-mono text-cyan-300">
              {warpLatency} <span className="text-xs text-neutral-500 font-sans">ms</span>
            </div>
          </div>
          <div className="bg-black/40 border border-white/10 p-3.5 rounded-xl">
            <div className="text-xs text-neutral-500 mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              Throughput Bus
            </div>
            <div className="text-2xl font-mono text-amber-300">
              {dataThroughput} <span className="text-xs text-neutral-500 font-sans">TB/s</span>
            </div>
          </div>
        </div>

        <button
          onClick={triggerWarpTest}
          disabled={warpActive}
          className={`w-full py-3 rounded-xl font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
            warpActive
              ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50 animate-pulse'
              : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-amber-400/50'
          }`}
        >
          {warpActive ? 'MEASURING TACHYON FLUX...' : 'ENGAGE HYPERDRIVE PING'}
        </button>
      </div>
    </div>
  );
};

// VENUS: Art and Creativity
export const VenusExperience: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [harmonyDensity, setHarmonyDensity] = useState(6);
  const [chromaShift, setChromaShift] = useState(42);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.015;
      ctx.fillStyle = 'rgba(10, 8, 12, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (let i = 0; i < harmonyDensity; i++) {
        const angle = (i * Math.PI * 2) / harmonyDensity + t * 0.4;
        const rad = 50 + Math.sin(t * 1.5 + i) * 35;
        const x = cx + Math.cos(angle) * rad;
        const y = cy + Math.sin(angle) * rad;

        const hue = (chromaShift + i * 25 + t * 20) % 360;
        ctx.beginPath();
        ctx.arc(x, y, 14 + Math.cos(t * 2 + i) * 6, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.65)`;
        ctx.shadowColor = `hsla(${hue}, 90%, 50%, 0.9)`;
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [harmonyDensity, chromaShift]);

  return (
    <div className="space-y-6">
      <div className="border border-white/10 bg-white/[0.02] p-5 rounded-2xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-amber-300">
            <Wind className="w-5 h-5" />
            <h4 className="font-mono text-sm tracking-widest uppercase">Atmospheric Generative Shader</h4>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            SUPER-ROTATION HARMONICS
          </span>
        </div>

        <p className="text-sm text-neutral-400 mb-4">
          Venus’s opaque sulfuric atmosphere generates perpetual cyclonic harmonics. Interact with the fluid density
          sliders to orchestrate generative flow patterns.
        </p>

        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/60 mb-5 flex items-center justify-center">
          <canvas ref={canvasRef} width={420} height={200} className="w-full h-44 object-cover" />
          <div className="absolute bottom-2 right-3 font-mono text-[10px] text-white/40 tracking-wider">
            FLUID REZ: 420x200 • REAL-TIME
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono text-neutral-400 mb-1.5">
              <span>HARMONIC DENSITY</span>
              <span className="text-amber-300">{harmonyDensity} NODES</span>
            </div>
            <input
              type="range"
              min="3"
              max="14"
              value={harmonyDensity}
              onChange={(e) => setHarmonyDensity(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-neutral-400 mb-1.5">
              <span>CHROMATIC SPECTRUM</span>
              <span className="text-amber-300">{chromaShift}° HUE</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={chromaShift}
              onChange={(e) => setChromaShift(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// EARTH: Life and Exploration
export const EarthExperience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'satellites' | 'biosphere' | 'aurora'>('satellites');

  return (
    <div className="space-y-6">
      <div className="border border-white/10 bg-white/[0.02] p-5 rounded-2xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Satellite className="w-5 h-5" />
            <h4 className="font-mono text-sm tracking-widest uppercase">Planetary Telemetry & Sanctuary</h4>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            BIOSPHERE ACTIVE
          </span>
        </div>

        <div className="flex space-x-2 mb-5">
          {(['satellites', 'biosphere', 'aurora'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                soundEngine.playHoverTone();
              }}
              className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all ${
                activeTab === tab
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                  : 'bg-white/5 text-neutral-400 hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'satellites' && (
          <div className="space-y-3">
            <div className="p-3 bg-black/40 border border-white/10 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-white">ISS (Zarya) Altitude</div>
                <div className="text-[11px] text-neutral-400">Low Earth Orbit • 51.6° Inclination</div>
              </div>
              <div className="text-right font-mono text-xs text-cyan-400">418.2 km • 7.66 km/s</div>
            </div>
            <div className="p-3 bg-black/40 border border-white/10 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-white">Hubble Space Telescope</div>
                <div className="text-[11px] text-neutral-400">Low Earth Orbit • 28.5° Inclination</div>
              </div>
              <div className="text-right font-mono text-xs text-cyan-400">535 km • Orbit 95m</div>
            </div>
            <div className="p-3 bg-black/40 border border-white/10 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-white">James Webb (L2 Point)</div>
                <div className="text-[11px] text-neutral-400">Deep Solar Halo Orbit</div>
              </div>
              <div className="text-right font-mono text-xs text-cyan-400">1.5M km from Earth</div>
            </div>
          </div>
        )}

        {activeTab === 'biosphere' && (
          <div className="space-y-3">
            <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Atmospheric O₂ Balance</span>
                <span className="text-xs font-mono text-emerald-300">20.95%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full w-[84%]" />
              </div>
            </div>
            <div className="p-4 bg-cyan-950/20 border border-cyan-500/20 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Hydrosphere Coverage</span>
                <span className="text-xs font-mono text-cyan-300">71.02%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full w-[71%]" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'aurora' && (
          <div className="p-4 bg-purple-950/20 border border-purple-500/20 rounded-xl space-y-2">
            <div className="flex items-center space-x-2 text-purple-300 mb-1">
              <Shield className="w-4 h-4" />
              <div className="text-xs font-mono uppercase tracking-wider">Magnetosphere Shield Status</div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Deflecting 450 km/s energetic solar protons. Ionospheric excitation generates aurora borealis displays across
              the magnetic polar cups.
            </p>
            <div className="text-xs font-mono text-purple-400 pt-2 flex justify-between">
              <span>FIELD STRENGTH: 0.5 GAUSS</span>
              <span>GEOMAGNETIC KP: 3 (STABLE)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// MARS: Innovation and Frontier
export const MarsExperience: React.FC = () => {
  const [habitatPressure, setHabitatPressure] = useState(101.3);
  const [moxieOutput, setMoxieOutput] = useState(12.4);
  const [isPressurizing, setIsPressurizing] = useState(false);

  const boostLifeSupport = () => {
    setIsPressurizing(true);
    soundEngine.playSelectChime('innovation');
    setTimeout(() => {
      setHabitatPressure((prev) => Number((prev + 0.8).toFixed(1)));
      setMoxieOutput((prev) => Number((prev + 1.2).toFixed(1)));
      setIsPressurizing(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="border border-white/10 bg-white/[0.02] p-5 rounded-2xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-rose-400">
            <Flame className="w-5 h-5" />
            <h4 className="font-mono text-sm tracking-widest uppercase">Subterranean Colony Habitat</h4>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
            OUTPOST ARES-1
          </span>
        </div>

        <p className="text-sm text-neutral-400 leading-relaxed mb-5">
          Shielded beneath 4 meters of basalt regolith inside the lava tubes of Olympus Mons. Habitat modules maintain
          autonomous synthetic atmosphere through in-situ oxygen cracking (MOXIE).
        </p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-black/40 border border-white/10 p-3.5 rounded-xl">
            <div className="text-xs text-neutral-500 mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-rose-400" />
              Dome Barometric
            </div>
            <div className="text-2xl font-mono text-rose-300">
              {habitatPressure} <span className="text-xs text-neutral-500 font-sans">kPa</span>
            </div>
          </div>
          <div className="bg-black/40 border border-white/10 p-3.5 rounded-xl">
            <div className="text-xs text-neutral-500 mb-1 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              MOXIE O₂ Yield
            </div>
            <div className="text-2xl font-mono text-emerald-300">
              {moxieOutput} <span className="text-xs text-neutral-500 font-sans">g/hr</span>
            </div>
          </div>
        </div>

        <button
          onClick={boostLifeSupport}
          disabled={isPressurizing}
          className="w-full py-3 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 rounded-xl font-mono text-xs uppercase tracking-widest transition-all"
        >
          {isPressurizing ? 'CRACKING CO₂ INTO O₂...' : 'CYCLE LIFE SUPPORT MATRIX'}
        </button>
      </div>
    </div>
  );
};
