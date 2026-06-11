import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, Compass, Shield, Rocket, Globe, ChevronRight, Check, Send } from 'lucide-react';
import Header from './components/Header';
import AnimatedCounter from './components/AnimatedCounter';
import Starfield from './components/Starfield';
import CustomCursor from './components/CustomCursor';
import useGsapSmoothScroll from './hooks/useGsapSmoothScroll';
import { CardStack, CardStackItem } from './components/ui/card-stack';
import LaunchConfigModal from './components/LaunchConfigModal';
import SolutionsModal from './components/SolutionsModal';
import ShowreelModal from './components/ShowreelModal';
import HoverFooter from './components/HoverFooter';
import AutomatizationSection from './components/AutomatizationSection';
import ScrollingUfo from './components/ScrollingUfo';
import { NavItem } from './types';

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'HOME' },
  { id: 'vehicles', label: 'VEHICLES' },
  { id: 'missions', label: 'MISSIONS' },
  { id: 'technology', label: 'TECHNOLOGY' },
];

const PARTNERS = [
  { name: 'NASA', color: 'bg-blue-500' },
  { name: 'SPACEX', color: 'bg-emerald-500' },
  { name: 'ESA', color: 'bg-indigo-500' },
  { name: 'JAXA', color: 'bg-cyan-500' },
];

const CARD_STACK_ITEMS: CardStackItem[] = [
  {
    id: 1,
    title: "Luxury Deep Space Travel",
    description: "Experience the thrill of ultra-premium orbital cruise ships with absolute comfort and interstellar guidance.",
    imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    href: "https://www.ruixen.com/",
  },
  {
    id: 2,
    title: "Elegant Cosmic Fleet",
    description: "Where aesthetic aerodynamics pair seamlessly with elite carbon-reinforced hull components.",
    imageSrc: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&q=80&w=800",
    href: "https://www.ruixen.com/",
  },
  {
    id: 3,
    title: "Lightspeed Propulsion",
    description: "Unleash the full speed of Nexora quantum tachyon core technologies across standard space tracks.",
    imageSrc: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=800",
    href: "https://www.ruixen.com/",
  },
  {
    id: 4,
    title: "Timeless Nebula Drifts",
    description: "Artisan celestial pods built with structural craftsmanship, engineered for extreme nebula atmospheric pressure.",
    imageSrc: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800",
    href: "https://www.ruixen.com/",
  },
  {
    id: 5,
    title: "Future Off-World Colonies",
    description: "Sophisticated bio-domes designed with integrated smart shielding ecosystems to secure clean energy.",
    imageSrc: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=800",
    href: "https://www.ruixen.com/",
  },
];

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.05,
    },
  },
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function App() {
  useGsapSmoothScroll();
  const [activeTab, setActiveTab] = useState('home');
  const [isLaunchOpen, setIsLaunchOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  // States for secondary interactive sections
  const [contactResult, setContactResult] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setContactResult(true);
      setTimeout(() => {
        setContactResult(false);
        setEmailInput('');
      }, 4000);
    }
  };

  return (
    <div id="spaceflight-root" className="relative w-full bg-black text-white selection:bg-brand-blue/30 selection:text-white scroll-smooth overflow-x-hidden">
      <CustomCursor />
      <ScrollingUfo />
      {/* SECTION 1: HERO CONTAINER (Video Background / Navigation / Top-level overview) */}
      <section id="hero-section" className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* Absolute Video Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <video
            src="https://res.cloudinary.com/dkpv0eax8/video/upload/v1781115837/now_genrate_this_video_202606101123_1_phdedc.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90"
          />
          {/* Subtle vignette/overlay to ensure high contrast for text without obscuring the background video */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />
        </div>

        {/* Absolute Header Ambient Top Light Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent" />
        
        {/* Primary Navigation bar */}
        <Header
          navItems={NAV_ITEMS}
          activeTab={activeTab}
          onTabChange={(tabId) => {
            if (tabId === 'vehicles') {
              setIsSolutionsOpen(true);
            } else if (tabId === 'missions') {
              setIsShowreelOpen(true);
            } else {
              setActiveTab(tabId);
            }
          }}
          onLaunchClick={() => setIsLaunchOpen(true)}
        />

        {/* Main Content Area */}
        <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8 md:py-16">
          {/* Left Side: Structural Text and CTA Overlays Container */}
          <div id="hero-details-column" className="lg:col-span-7 flex flex-col gap-6 md:gap-8 items-start justify-center h-full">
            {/* Tagline / Pre-headline styling */}
            <motion.div
              id="badge-wrapper"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex items-center gap-2 select-none"
            >
              <span className="h-[2px] w-6 bg-brand-blue" />
              <span className="font-display text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-brand-blue uppercase">
                NEXORA SYSTEMS ENG.
              </span>
            </motion.div>

            {/* Heading stacked with custom keyframes to match the visual font pairs and italic accent */}
            <div id="hero-heading-stack" className="flex flex-col select-none">
              <h1 className="font-display font-medium text-4xl sm:text-6xl lg:text-[72px] leading-[1.1] tracking-tight text-white">
                <motion.span
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                  className="block"
                >
                  Building <span className="font-serif italic font-light tracking-wide text-white lowercase">spacecraft</span> that
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
                  className="block"
                >
                  venture beyond
                </motion.span>
              </h1>
            </div>

            {/* Under-title brief paragraph description */}
            <motion.p
              id="hero-body-paragraph"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
              className="text-sm md:text-base text-neutral-200 font-sans max-w-lg leading-relaxed font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              Advanced engineering team designing high-performance orbital spacecraft, heavy payload boosters, and reliable fuel delivery systems.
            </motion.p>

            {/* Core Call-to-action Action buttons */}
            <motion.div
              id="hero-cta-btn-group"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.55 }}
              className="flex flex-wrap gap-4 items-center"
            >
              {/* START ESTIMATOR: Solid royal blue tech button */}
              <button
                id="cta-start-estimator"
                onClick={() => setIsLaunchOpen(true)}
                className="group relative flex items-center gap-2.5 rounded-lg bg-brand-blue text-white px-6 py-3.5 hover:bg-brand-blue/90 font-display text-[11px] font-bold tracking-wider transition-all duration-300 transform active:scale-98 cursor-pointer shadow-lg shadow-brand-blue/10"
              >
                <Rocket className="h-4 w-4" />
                <span>START ESTIMATOR</span>
              </button>

              {/* EXPLORE FLEET >: Outlined discrete tech button */}
              <button
                id="cta-explore-fleet"
                onClick={() => setIsSolutionsOpen(true)}
                className="group flex items-center gap-2 rounded-lg border border-neutral-800 bg-transparent px-6 py-3.5 text-neutral-300 hover:text-white hover:border-neutral-600 font-display text-[11px] font-bold tracking-wider transition-colors duration-300 cursor-pointer"
              >
                <span>EXPLORE FLEET</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 duration-300" />
              </button>
            </motion.div>

            {/* Aerospace Fight Partners Section - Below CTA Buttons */}
            <motion.div
              id="partners-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-4 pt-6 border-t border-neutral-900 w-full max-w-md"
            >
              <div className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase mb-2">
                OUR STRATEGIC FLIGHT PARTNERS:
              </div>
              <div className="flex flex-wrap gap-4">
                {PARTNERS.map((partner) => (
                  <div key={partner.name} className="flex items-center gap-2 text-neutral-400 text-[10px] font-mono select-none">
                    <span className={`h-1.2 w-1.2 rounded-full ${partner.color}`} />
                    <span>{partner.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side: Bento metric cards (or interactive configs based on active header items) */}
          <div id="interactive-details-column" className="lg:col-span-5 w-full flex flex-col justify-end lg:self-end lg:pb-6">
            <AnimatePresence mode="wait">
              {activeTab === 'home' && (
                <motion.div
                  key="home-stats-bento"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-2 gap-3.5 w-full"
                >
                  {/* Metric Card 1: TOTAL FLIGHTS */}
                  <div className="rounded-xl border border-white/15 bg-white/[0.07] backdrop-blur-lg p-4 flex items-start gap-3.5 hover:border-white/35 hover:bg-white/[0.12] transition-all duration-300 select-none min-h-[90px]">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 border border-white/15 text-brand-blue mt-1">
                      <Rocket className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="block font-mono text-[9px] tracking-widest text-white/50 uppercase leading-none">
                        TOTAL FLIGHTS
                      </span>
                      <span className="block font-display text-2xl font-bold text-white mt-1 leading-none">
                        <AnimatedCounter target={400} startFrom={0} duration={1500} suffix="+" />
                      </span>
                      <span className="block text-[10px] text-white/70 mt-1 font-light leading-none">
                        Core Deliveries
                      </span>
                    </div>
                  </div>

                  {/* Metric Card 2: ACTIVE ORBITS */}
                  <div className="rounded-xl border border-white/15 bg-white/[0.07] backdrop-blur-lg p-4 flex items-start gap-3.5 hover:border-white/35 hover:bg-white/[0.12] transition-all duration-300 select-none min-h-[90px]">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 border border-white/15 text-brand-blue mt-1">
                      <Globe className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="block font-mono text-[9px] tracking-widest text-white/50 uppercase leading-none">
                        ACTIVE ORBITS
                      </span>
                      <span className="block font-display text-2xl font-bold text-white mt-1 leading-none">
                        <AnimatedCounter target={230} startFrom={0} duration={1500} suffix="+" />
                      </span>
                      <span className="block text-[10px] text-white/70 mt-1 font-light leading-none">
                        Active Satellites
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'technology' && (
                <motion.div
                  key="tech-section"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="w-full rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-lg p-6 flex flex-col gap-4 shadow-lg"
                >
                  <div>
                    <span className="font-mono text-[10px] text-brand-blue font-semibold uppercase tracking-wider">
                      TECHNOLOGY PLATFORM
                    </span>
                    <h3 className="font-display text-lg font-medium text-white mt-1">
                      Cryo-Reaction & Propulsion
                    </h3>
                    <p className="text-xs text-white/70 mt-2 leading-relaxed">
                      Our high-impulse liquid methalox core stage engines integrated with lightweight carbon carbon composites optimize launch-to-mass ratios by up to 34%.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                    <div className="rounded-lg bg-white/5 p-3 border border-white/10">
                      <Compass className="h-4 w-4 text-brand-blue mb-1.5" />
                      <div className="text-[10px] uppercase font-mono text-white/50">Telemetry</div>
                      <div className="text-sm font-semibold text-white mt-0.5">Real-time sync</div>
                    </div>
                    <div className="rounded-lg bg-white/5 p-3 border border-white/10">
                      <Shield className="h-4 w-4 text-brand-blue mb-1.5" />
                      <div className="text-[10px] uppercase font-mono text-white/50">Security</div>
                      <div className="text-sm font-semibold text-white mt-0.5">Triple redundancy</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsLaunchOpen(true)}
                    className="w-full text-center py-2.5 rounded-lg bg-white text-black font-display text-[10px] font-semibold tracking-wider uppercase hover:bg-neutral-100 transition-colors"
                  >
                    Configure Test Mission
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </section>

      {/* SECTION 2: ASTEROIDS EXPLORATION VIEW (Pure black background, styled exactly like the reference image layout with blue highlights) */}
      <section id="asteroids-section" className="relative min-h-[90vh] w-full bg-black text-white py-16 md:py-24 px-6 md:px-12 flex flex-col justify-between overflow-hidden border-t border-neutral-900/60">
        {/* Absolute Smooth Loop Video Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <video
            src="https://res.cloudinary.com/dkpv0eax8/video/upload/v1781117797/Generate_smooth_loop_video_202606101156_i6mtnu.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          />
          {/* Subtle gradient overlay to keep elements readable */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Dynamic Starfield Overlay */}
        <Starfield count={60} />

        {/* 1. Centered Header Row - Section Label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainerVariants}
          className="relative z-10 flex items-center justify-center gap-1.5 font-sans text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-neutral-400 mb-12 select-none"
        >
          <motion.span variants={staggerItemVariants} className="text-brand-blue font-bold text-xs select-none">✦</motion.span>
          <motion.span variants={staggerItemVariants}>Asteroids Exploration (Urgency)</motion.span>
        </motion.div>

        {/* 2. Grid Content - Description Left, Metrics Right */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainerVariants}
          className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center flex-1 max-w-7xl mx-auto w-full my-auto"
        >
          {/* Left Block: Description with bullet accent */}
          <motion.div
            variants={staggerItemVariants}
            className="lg:col-span-6 flex flex-col justify-center h-full relative"
          >
            {/* Scroll Target 1 for the UFO Flight Path - just above the main paragraph */}
            <div id="ufo-target-1" className="absolute -top-20 left-[15%] w-1 h-1 opacity-0 pointer-events-none" />
            <div className="max-w-lg space-y-4">
              <p className="font-sans text-sm sm:text-base md:text-lg text-neutral-200 leading-relaxed font-light">
                Asteroids are a chance to redistribute the load on Earth, preserving its ecosystem and ensuring the sustainable development of civilization. These investments are about the future.
              </p>
            </div>
          </motion.div>

          {/* Right Block: Side-by-Side Metric Cards with blue dots */}
          <motion.div
            variants={staggerItemVariants}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full max-w-2xl lg:ml-auto"
          >
            {/* Stat Card 1 */}
            <div className="group relative p-6 md:p-8 rounded-xl border border-neutral-800/60 bg-neutral-950/20 hover:border-brand-blue/30 hover:bg-neutral-950/50 transition-all duration-300 min-h-[140px] flex flex-col justify-between">
              {/* Top right indicator dot - Blue */}
              <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-brand-blue shadow-[0_0_6px_rgba(44,100,247,0.8)]" />
              <div>
                <span className="block font-display text-4xl md:text-[42px] font-bold text-white tracking-tight leading-none">
                  <AnimatedCounter target={16000} startFrom={12000} duration={2500} />
                </span>
                <span className="block font-sans text-xs md:text-[13px] text-neutral-400 mt-4 leading-relaxed font-light">
                  asteroids are within Earth's technical reach
                </span>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="group relative p-6 md:p-8 rounded-xl border border-neutral-800/60 bg-neutral-950/20 hover:border-brand-blue/30 hover:bg-neutral-950/50 transition-all duration-300 min-h-[140px] flex flex-col justify-between">
              {/* Top right indicator dot - Blue */}
              <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-brand-blue shadow-[0_0_6px_rgba(44,100,247,0.8)]" />
              <div>
                <span className="block font-display text-4xl md:text-[42px] font-bold text-white tracking-tight leading-none">
                  <AnimatedCounter target={10000} startFrom={7500} duration={2500} />
                </span>
                <span className="block font-sans text-xs md:text-[13px] text-neutral-400 mt-4 leading-relaxed font-light">
                  potentially dangerous asteroids cross Earth
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 3. Bottom Row: Left Missions with horizontal line, Right Slogan with blue highlight */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainerVariants}
          className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end max-w-7xl mx-auto w-full mt-12 md:mt-20"
        >
          {/* Bottom Left: MISSIONS horizontal array directly styled like the image */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-6 w-full flex flex-col gap-3 pb-2">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-neutral-400 font-semibold">
              Missions
            </span>
            <div className="relative flex items-center justify-between w-full border-t border-neutral-800/80 pt-4.5 group">
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer">
                <span className="h-1 w-1 rounded-full bg-brand-blue" />
                <span>NASA Psyche</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer">
                <span className="h-1 w-1 rounded-full bg-brand-blue" />
                <span>ESA Hera</span>
              </div>
              <div id="ufo-target-2" className="flex items-center gap-2 font-mono text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer relative">
                <span className="h-1 w-1 rounded-full bg-brand-blue" />
                <span>JAXA Hayabusa2</span>
              </div>
            </div>
          </motion.div>

          {/* Bottom Right: Big typography slogan with blue highlight */}
          <motion.div variants={staggerItemVariants} className="lg:col-span-6 lg:text-right pb-1">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase leading-[1.1]">
              <span className="text-brand-blue font-black tracking-tight drop-shadow-[0_0_10px_rgba(44,100,247,0.4)]">A NEW SOURCE</span> OF ENERGY <br />
              <span className="text-white">FOR EARTH</span>
            </h2>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 3: ORBITAL FLEET SLIDER (Sophisticated black background, card stack layout with interactive controls) */}
      <section id="fleet-section" className="relative min-h-[85vh] w-full bg-black text-white py-16 md:py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden border-t border-neutral-900/60">
        {/* Dynamic Starfield Overlay */}
        <Starfield count={80} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainerVariants}
          className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center"
        >
          {/* Section Indicator */}
          <motion.div 
            variants={staggerItemVariants}
            className="flex items-center gap-1.5 font-sans text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-neutral-400 mb-4 select-none"
          >
            <span className="text-brand-blue font-bold text-xs select-none">✦</span>
            <span>COSMIC PORTFOLIO</span>
          </motion.div>

          {/* Section Heading */}
          <motion.h2 
            variants={staggerItemVariants}
            className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase text-center max-w-3xl mb-4"
          >
            Next-Generation <span className="text-brand-blue drop-shadow-[0_0_8px_rgba(44,100,247,0.4)]">Deep Space Solutions</span>
          </motion.h2>
          
          <motion.p 
            variants={staggerItemVariants}
            className="font-sans text-neutral-400 text-sm md:text-base text-center max-w-xl mb-12 font-light relative"
          >
            <span id="ufo-target-3" className="absolute left-[85%] top-1/2 -translate-y-1/2 w-1 h-1 opacity-0 pointer-events-none" />
            Slide or drag the cards below to preview our ultra-refined exploration capsules, off-world extraction habitats, and advanced lightspeed propulsion fleets.
          </motion.p>

          {/* Interactive CardStack Container */}
          <motion.div 
            variants={staggerItemVariants}
            className="w-full flex justify-center items-center"
          >
            <CardStack
              items={CARD_STACK_ITEMS}
              initialIndex={0}
              autoAdvance={false}
              showDots
            />
          </motion.div>
        </motion.div>
      </section>

      {/* AUTOMATIZATION SECTION */}
      <AutomatizationSection />

      {/* FOOTER SECTION */}
      <HoverFooter />

      {/* Modals & Dialog overlays */}
      <LaunchConfigModal
        isOpen={isLaunchOpen}
        onClose={() => setIsLaunchOpen(false)}
      />

      <SolutionsModal
        isOpen={isSolutionsOpen}
        onClose={() => setIsSolutionsOpen(false)}
      />

      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />
    </div>
  );
}
