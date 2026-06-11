import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { NavItem } from '../types';

interface HeaderProps {
  navItems: NavItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  onLaunchClick: () => void;
}

export default function Header({ navItems, activeTab, onTabChange, onLaunchClick }: HeaderProps) {
  return (
    <header id="app-header" className="relative z-40 w-full max-w-7xl mx-auto px-6 py-5 md:py-8 flex items-center justify-between">
      {/* Brand Logo Info */}
      <div id="brand-logo-container" className="flex items-center gap-2.5 select-none group cursor-pointer" onClick={() => onTabChange('home')}>
        <div className="relative flex h-8 w-8 items-center justify-center transition-transform duration-300 group-hover:scale-105">
          {/* Custom Futuristic 'N' Logo SVG in blue theme */}
          <svg className="h-5.5 w-5.5 text-brand-blue drop-shadow-[0_0_6px_rgba(59,130,246,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 18V6l12 12V6" />
          </svg>
        </div>
        <span className="font-display font-semibold text-[11px] tracking-[0.25em] text-white group-hover:text-brand-blue transition-colors duration-300">
          NEXORA
        </span>
      </div>

      {/* Navigation middle links */}
      <nav id="desktop-navbar" className="hidden md:flex items-center gap-8 lg:gap-10">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative py-1 text-[11px] font-semibold tracking-widest text-neutral-400 hover:text-white transition-colors uppercase cursor-pointer"
            >
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="active-dot"
                  className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-1 w-1 rounded-full bg-brand-blue"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Custom Launch Project Call To Action Header */}
      <button
        id="launch-project-btn"
        onClick={onLaunchClick}
        className="group relative flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-5 py-2 hover:border-brand-blue/40 transition-all cursor-pointer text-xs"
      >
        <span className="font-display font-medium text-[10px] tracking-widest text-neutral-300 group-hover:text-white transition-colors uppercase">
          Menu
        </span>
        <div className="flex gap-0.5 ml-1">
          <span className="h-1 w-1 rounded-full bg-neutral-400 group-hover:bg-brand-blue" />
          <span className="h-1 w-1 rounded-full bg-neutral-400 group-hover:bg-brand-blue" />
          <span className="h-1 w-1 rounded-full bg-neutral-400 group-hover:bg-brand-blue animate-pulse" />
        </div>
        <div className="absolute inset-0 rounded-full bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
      </button>
    </header>
  );
}
