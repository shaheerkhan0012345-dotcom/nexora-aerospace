import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SCENES = [
  {
    id: 1,
    time: 'T +00:02:45',
    title: 'Aerodynamic Fairing Separation',
    description: 'High-altitude pyro-latches safely separate the lightweight protective composite fairings, exposing the satellite configuration to thermal space vacuum.',
    phase: 'FIRST STAGE MECO',
    velocity: '2,820 m/s',
    altitude: '112 km',
  },
  {
    id: 2,
    time: 'T +00:11:12',
    title: 'Trans-Lunar Injection Burn (TLI)',
    description: 'Cryogenic second-stage engine generates precise high-impulse ignition, increasing velocity payload beyond escape metrics towards the lunar transfer orbit.',
    phase: 'STAGED INJECTION BURNS',
    velocity: '10,950 m/s',
    altitude: '420 km',
  },
  {
    id: 3,
    time: 'Day 3 - 04:22:10',
    title: 'Deceleration and Retrograde Insertion',
    description: 'Sub-thruster loops align the main engine nozzle towards the path vector, firing auxiliary attitude thrust caps to securely slip the ship into permanent lunar capture.',
    phase: 'LUNAR SOUTH ORBIT TRANSFER',
    velocity: '1,680 m/s',
    altitude: 'Lunar Orbit (75 km)',
  },
];

export default function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timelineSecs, setTimelineSecs] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const scene = SCENES[activeIdx];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimelineSecs((prev) => {
          if (prev >= 100) {
            // transition to next scene
            setActiveIdx((prevIdx) => (prevIdx + 1) % SCENES.length);
            return 0;
          }
          return prev + 1;
        });
      }, 80);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeIdx]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % SCENES.length);
    setTimelineSecs(0);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + SCENES.length) % SCENES.length);
    setTimelineSecs(0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="showreel-modal-wrapper" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="showreel-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            id="showreel-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-6 md:p-8"
          >
            {/* Close button */}
            <button
              id="showreel-modal-close"
              onClick={onClose}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div id="showreel-header" className="mb-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-blue">
                MISSION FOOTAGE ARCHIVE
              </span>
              <h2 className="mt-0.5 font-display text-2xl font-medium tracking-tight text-white">
                Spacecraft Operational Showreel
              </h2>
            </div>

            {/* Main Interactive Playback Panel */}
            <div id="playback-panel" className="relative flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-black/60 p-5 md:p-8 aspect-video justify-between">
              {/* Outer Minimal visual mock (Stars or flight grid style) */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(44,100,247,0.08)_0%,transparent_80%)] grid grid-cols-6 grid-rows-4">
                {Array.from({ length: 24 }).map((_, idx) => (
                  <div key={idx} className="border-[0.5px] border-neutral-800/40" />
                ))}
              </div>

              {/* HUD Header overlay info */}
              <div className="relative z-10 flex justify-between items-start">
                <div className="font-mono text-[10px] text-neutral-500 space-y-0.5 leading-none">
                  <div>RECORDING: LUN-CAM-08</div>
                  <div>FPS: 60.00 FPS</div>
                </div>
                <div className="rounded border border-brand-blue/20 bg-brand-blue/5 px-2 py-0.5 font-mono text-[9px] text-brand-blue tracking-widest uppercase animate-pulse">
                  {isPlaying ? 'RECORD PLAYBACK' : 'LIVE PAUSE'}
                </div>
              </div>

              {/* Main Visual placeholder styled elegantly */}
              <div className="relative z-10 my-4 text-center max-w-lg mx-auto py-4">
                <motion.div
                  key={scene.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="font-mono text-xs text-brand-blue tracking-widest">{scene.time}</span>
                  <h3 className="mt-1 font-display text-lg font-medium text-white md:text-xl">
                    {scene.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-400 leading-relaxed text-center px-4 md:px-8">
                    {scene.description}
                  </p>
                </motion.div>
              </div>

              {/* HUD Footer status metrics overlay */}
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-neutral-800/40 pt-4 mt-auto">
                <div className="font-mono">
                  <div className="text-[9px] text-neutral-500 uppercase">Phase Directive</div>
                  <div className="text-[10px] font-semibold text-white tracking-wide truncate">{scene.phase}</div>
                </div>
                <div className="font-mono">
                  <div className="text-[9px] text-neutral-500 uppercase">Spacecraft Velocity</div>
                  <div className="text-[10px] font-semibold text-white">{scene.velocity}</div>
                </div>
                <div className="font-mono">
                  <div className="text-[9px] text-neutral-500 uppercase">Altitude Range</div>
                  <div className="text-[10px] font-semibold text-white">{scene.altitude}</div>
                </div>
                <div className="font-mono flex flex-col justify-end items-end md:items-start">
                  <div className="text-[9px] text-neutral-500 uppercase">Scene Index</div>
                  <div className="text-[10px] font-semibold text-brand-blue">
                    {scene.id} of {SCENES.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Interactive Player Controls Bar */}
            <div id="playback-controls-container" className="mt-5 flex flex-col gap-4 border-t border-neutral-800/30 pt-4">
              {/* Timeline scrubber slider */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] text-neutral-500">0:00</span>
                <div className="flex-1 h-1.5 bg-neutral-900 rounded-full overflow-hidden relative group/timeline cursor-pointer">
                  <div 
                    className="absolute top-0 bottom-0 left-0 bg-brand-blue transition-all duration-300"
                    style={{ width: `${timelineSecs}%` }}
                  />
                </div>
                <span className="font-mono text-[9px] text-neutral-500">1:20</span>
              </div>

              {/* Control buttons row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    className="rounded-full p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="rounded-full bg-brand-blue text-white p-2.5 hover:scale-105 transition-transform flex items-center justify-center cursor-pointer"
                  >
                    {isPlaying ? <Pause className="h-4 w-4 fill-current text-white" /> : <Play className="h-4 w-4 fill-current translate-x-0.5 text-white" />}
                  </button>
                  <button
                    onClick={handleNext}
                    className="rounded-full p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="rounded-lg border border-neutral-800 p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  <span className="font-mono text-[10px] text-neutral-500">Stereo Audio Matrix</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
