import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Rocket, ChevronRight } from 'lucide-react';
import { LaunchConfig } from '../types';

interface LaunchConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DESTINATIONS = [
  { id: 'lunar', name: 'Lunar South Pole', distance: '384,400 km', duration: '3 Days' },
  { id: 'mars', name: 'Mars Jezero Crater', distance: '225,000,000 km', duration: '9 Months' },
  { id: 'leo', name: 'Low Earth Orbit (LEO)', distance: '400 km', duration: '45 Minutes' },
  { id: 'deep', name: 'Outer Solar System', distance: '1.2 Billion km', duration: '6 Years' },
];

const PAYLOADS = [
  { id: 'science', name: 'Scientific Research Lab', mass: '8,500 kg', desc: 'Sensing instruments for atmosphere & geology' },
  { id: 'telecom', name: 'High-Bandwidth Telecom array', mass: '4,200 kg', desc: 'Secure laser satellite communication array' },
  { id: 'cargo', name: 'Autonomous Resupply Pod', mass: '12,000 kg', desc: 'Pressurized sustenance & replacement batteries' },
];

export default function LaunchConfigModal({ isOpen, onClose }: LaunchConfigModalProps) {
  const [config, setConfig] = useState<LaunchConfig>({
    destination: 'lunar',
    payloadType: 'science',
    trajectoryMode: 'optimal',
    isSimulating: false,
    progress: 0,
    logs: [],
  });

  const activeDest = DESTINATIONS.find((d) => d.id === config.destination) || DESTINATIONS[0];
  const activePayload = PAYLOADS.find((p) => p.id === config.payloadType) || PAYLOADS[0];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (config.isSimulating) {
      interval = setInterval(() => {
        setConfig((prev) => {
          if (prev.progress >= 100) {
            clearInterval(interval);
            return {
              ...prev,
              isSimulating: false,
              progress: 100,
              logs: [...prev.logs, 'Mission accomplished: Spacecraft in stable target orbit.'],
            };
          }
          const nextProgress = prev.progress + 2;
          const nextLogs = [...prev.logs];
          
          if (nextProgress === 10 && !prev.logs.includes('Pre-launch verification completed.')) {
            nextLogs.push('Pre-launch verification completed.');
          } else if (nextProgress === 30 && !prev.logs.includes('First stage booster ignition initiated.')) {
            nextLogs.push('First stage booster ignition initiated.');
          } else if (nextProgress === 60 && !prev.logs.includes('Atmospheric exit achieved and payload fairing split.')) {
            nextLogs.push('Atmospheric exit achieved and payload fairing split.');
          } else if (nextProgress === 85 && !prev.logs.includes('Second stage cutoff. Coasting towards insertion burns.')) {
            nextLogs.push('Second stage cutoff. Coasting towards insertion burns.');
          }

          return {
            ...prev,
            progress: nextProgress,
            logs: nextLogs,
          };
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [config.isSimulating]);

  const handleStartSimulation = () => {
    setConfig((prev) => ({
      ...prev,
      isSimulating: true,
      progress: 0,
      logs: ['Initiating launch planner system...', 'Calculating delta-v constraints for target trajectory.'],
    }));
  };

  const handleReset = () => {
    setConfig((prev) => ({
      ...prev,
      isSimulating: false,
      progress: 0,
      logs: [],
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="launch-modal-wrapper" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="launch-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            id="launch-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-6 md:p-8"
          >
            {/* Close Button */}
            <button
              id="launch-modal-close"
              onClick={onClose}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div id="launch-modal-header" className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-brand-glow p-2 text-brand-blue">
                <Rocket className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-xl font-medium tracking-tight text-white md:text-2xl">
                  Launch Configuration Planner
                </h2>
                <p className="text-sm text-neutral-400">
                  Configure and calculate parameters for the Core Aerospace spacecraft deployment.
                </p>
              </div>
            </div>

            <div id="launch-modal-body" className="grid gap-6 md:grid-cols-2">
              {/* Controls Column */}
              <div className="flex flex-col gap-4">
                {/* Section 1: Target Destination */}
                <div>
                  <label className="mb-2 block font-display text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                    Target Destination
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {DESTINATIONS.map((dest) => (
                      <button
                        key={dest.id}
                        onClick={() => !config.isSimulating && setConfig(prev => ({ ...prev, destination: dest.id }))}
                        disabled={config.isSimulating}
                        className={`rounded-lg p-3 text-left transition-all ${
                          config.destination === dest.id
                            ? 'border border-brand-blue bg-brand-blue/5'
                            : 'border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                        } ${config.isSimulating ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="font-display text-xs font-medium text-white">{dest.name}</div>
                        <div className="mt-1 text-[10px] text-neutral-400">{dest.distance}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 2: Payload Selection */}
                <div>
                  <label className="mb-2 block font-display text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                    Payload Category
                  </label>
                  <div className="space-y-2">
                    {PAYLOADS.map((payload) => (
                      <button
                        key={payload.id}
                        onClick={() => !config.isSimulating && setConfig(prev => ({ ...prev, payloadType: payload.id }))}
                        disabled={config.isSimulating}
                        className={`flex w-full items-center justify-between rounded-lg p-3 text-left transition-all ${
                          config.payloadType === payload.id
                            ? 'border border-brand-blue bg-brand-blue/5'
                            : 'border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                        } ${config.isSimulating ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div>
                          <div className="font-display text-xs font-medium text-white">{payload.name}</div>
                          <div className="mt-0.5 text-[10px] text-neutral-400 max-w-[240px] truncate">{payload.desc}</div>
                        </div>
                        <div className="text-[10px] font-mono text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded">
                          {payload.mass}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status / Output Column */}
              <div className="flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/30 p-5">
                <div className="mb-4">
                  <h3 className="font-display text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                    Mission Operations Panel
                  </h3>
                  <div className="mt-3 flex items-center justify-between border-t border-neutral-800/60 pt-3">
                    <span className="text-xs text-neutral-400">Destination:</span>
                    <span className="text-xs font-medium text-white">{activeDest.name}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-neutral-400">Calculated Est. Time:</span>
                    <span className="text-xs font-medium text-white">{activeDest.duration}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-neutral-400">Payload Weight class:</span>
                    <span className="text-xs font-medium text-white">{activePayload.mass}</span>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mb-4">
                  <div className="mb-1.5 flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400">Launch Progress</span>
                    <span className="text-brand-blue font-semibold">{config.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
                    <motion.div
                      className="h-full bg-brand-blue"
                      animate={{ width: `${config.progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>

                {/* Operational log output */}
                <div className="flex-1 rounded-lg bg-black/40 p-3 font-mono text-[10px] text-neutral-400 space-y-1.5 h-36 overflow-y-auto">
                  {config.logs.length === 0 ? (
                    <div className="text-center text-neutral-600 mt-8">Configure variables and click Launch to observe.</div>
                  ) : (
                    config.logs.map((log, index) => (
                      <div key={index} className="flex gap-1.5 items-start">
                        <span className="text-brand-blue select-none">&gt;&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  {!config.isSimulating && config.progress === 0 && (
                    <button
                      onClick={handleStartSimulation}
                      className="flex-1 rounded-lg bg-brand-blue hover:bg-brand-blue/90 text-white font-display font-semibold py-2.5 px-4 text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Initialize Systems
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                  {config.isSimulating && (
                    <div className="flex-1 text-center py-2.5 text-xs text-neutral-400 animate-pulse font-display">
                      Flight calculation in progress...
                    </div>
                  )}
                  {config.progress > 0 && !config.isSimulating && (
                    <button
                      onClick={handleReset}
                      className="flex-1 rounded-lg border border-neutral-800 hover:bg-neutral-800 text-white font-display font-semibold py-2.5 px-4 text-xs tracking-wider uppercase transition-colors text-center cursor-pointer"
                    >
                      Reset Configuration
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
