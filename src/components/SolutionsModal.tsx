import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Globe, Award, Target, Flame } from 'lucide-react';
import { SolutionItem } from '../types';

interface SolutionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SOLUTIONS: SolutionItem[] = [
  {
    id: 'leo-delivery',
    title: 'Precision Orbital Delivery',
    description: 'Autonomous deployment of heavy communications arrays, research facilities, and remote-sensing instruments directly into sun-synchronous or low inclination orbits with sub-meter insertion precision.',
    specs: [
      { label: 'Payload Capacity', value: '18,500 kg (LEO)' },
      { label: 'Fairing Diameter', value: '5.2 Meters' },
      { label: 'Propellant Mixture', value: 'LOX & Liquid Hydrogen' },
      { label: 'Reliability metrics', value: '99.98% Orbit Insertion' },
    ],
  },
  {
    id: 'deep-space',
    title: 'Inter-planetary Deep Exploration',
    description: 'Providing propulsion infrastructure and atmospheric entry shield configurations specifically engineered to safely navigate Martian, Jovian, and Saturnian atmospheric transfers.',
    specs: [
      { label: 'Payload Capacity', value: '8,200 kg (TMI)' },
      { label: 'Engine Type', value: 'Vela Ion Thrusters (Gen IV)' },
      { label: 'Power Source', value: 'Next-Gen Multi-Mission RTG' },
      { label: 'Thermal Shielding', value: 'PICA-X Layered Compound' },
    ],
  },
  {
    id: 'cargo-shuttle',
    title: 'Autonomous Lunar Logistics',
    description: 'Fully automated, clean, cold-gas reaction and hypergolic landing modules built for bulk commodity transportation between Lunar orbit station and surface base-camps.',
    specs: [
      { label: 'Landing Payload', value: '12,000 kg (Lunar)' },
      { label: 'Landing Accuracy', value: 'Within 5 Meters radius' },
      { label: 'Reusability Range', value: 'Up to 24 consecutive runs' },
      { label: 'Fuel System', value: 'Self-pressurizing Methalox' },
    ],
  },
];

export default function SolutionsModal({ isOpen, onClose }: SolutionsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div id="solutions-modal-wrapper" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="solutions-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            id="solutions-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-6 md:p-8"
          >
            {/* Close Button */}
            <button
              id="solutions-modal-close"
              onClick={onClose}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div id="solutions-modal-header" className="mb-8">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-blue">
                ASTRONAUTICAL OPERATIONS
              </span>
              <h2 className="mt-1 font-display text-2xl font-medium tracking-tight text-white md:text-3xl">
                Core Aerospace Flight Solutions & Architecture
              </h2>
              <p className="mt-2 text-sm text-neutral-400 max-w-2xl">
                Explore our modular launch infrastructure, planetary insertion technologies, and precision cargo transport capsules.
              </p>
            </div>

            {/* Solutions List */}
            <div id="solutions-grid" className="grid gap-6 md:grid-cols-3">
              {SOLUTIONS.map((solution, index) => (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col rounded-xl border border-neutral-800/80 bg-neutral-900/20 p-5 hover:border-brand-blue/45 hover:bg-neutral-900/40 transition-all duration-300"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-glow text-brand-blue mb-4">
                    {index === 0 && <Globe className="h-5 w-5" />}
                    {index === 1 && <Flame className="h-5 w-5" />}
                    {index === 2 && <Target className="h-5 w-5" />}
                  </div>

                  <h3 className="font-display text-base font-semibold text-white mb-2">
                    {solution.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-6 flex-1">
                    {solution.description}
                  </p>

                  <div className="border-t border-neutral-800/80 pt-4 space-y-2 mt-auto">
                    {solution.specs.map((spec, specIdx) => (
                      <div key={specIdx} className="flex justify-between items-center text-[10px]">
                        <span className="text-neutral-500 font-mono">{spec.label}</span>
                        <span className="text-neutral-300 font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA action bottom */}
            <div id="solutions-modal-footer" className="mt-8 flex justify-end border-t border-neutral-800/60 pt-6">
              <button
                onClick={onClose}
                className="rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-white font-display text-xs font-semibold py-2 px-5 tracking-wide transition-colors cursor-pointer"
              >
                Dismiss Overview
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
