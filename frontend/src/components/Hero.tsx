import React from 'react';
import { motion } from 'motion/react';
import { Activity, ShieldCheck, Flame, Trophy } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Hero() {
  const { liveCounter, setCartOpen, setJoinModalOpen } = useApp();

  const handleScrollToShop = () => {
    const el = document.getElementById('pro-shop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden border-b border-[#222] bg-[#050505] bg-[radial-gradient(circle_at_top_left,_#1a1a1a_0%,_#050505_70%)] min-h-[85vh] flex flex-col justify-between scanlines">
      
      {/* Background Graphic Grid of Heavy Concrete texture & Athletic Silhouette */}
      <div className="absolute inset-0 z-0 opacity-45">
        <img 
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2000&auto=format&fit=crop" 
          alt="Athlete Gritty" 
          className="w-full h-full object-cover contrast-110 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
      </div>

      {/* Decorative vertical coordinates and system lines to denote industrial precision */}
      <div className="absolute left-6 top-1/4 hidden xl:block font-mono text-[9px] text-[#555] space-y-2 z-10 select-none">
        <div>COORDINATE RANGE // 40.7128° N, 74.0060° W</div>
        <div>STATION // DETROIT_FORGE_04</div>
        <div className="text-neon-orange">PRESSURE: FORCE // MECHANICAL_TENSILE_MAX</div>
      </div>

      <div className="absolute right-6 top-1/4 hidden xl:block font-mono text-[9px] text-[#555] text-right space-y-2 z-10 select-none">
        <div>BOUTIQUE EXCLUSIVE DROP // ONLINE STATUS</div>
        <div>TELEMETRY ACTIVE (100% SIGNAL)</div>
        <div className="text-zinc-400">UNCOMPROMISING MECHANICAL INTEGRITY</div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-8 flex-1 flex flex-col justify-center">
        
        <div className="max-w-3xl mt-12">
          {/* Header Tag */}
          <div className="inline-block px-3 py-1 bg-[#FF5500] text-black text-[10px] font-black uppercase tracking-widest mb-4">
            Drop 004 / Limited EXCLUSIVITY
          </div>

          {/* Core App Manifest Heading */}
          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tighter leading-[0.85] text-white uppercase italic drop-shadow-lg">
            PRESSURE <br/>
            <span className="text-neon-orange">CREATES</span> <br/>
            DIAMONDS.
          </h1>

          <p className="mt-6 text-xs sm:text-sm text-[#888] font-medium leading-relaxed max-w-xl">
            We build military-grade barbell hardware, heavy thermo-compression apparel, and clinical-grade muscular fuel. Formulated for the outer borders of performance. Designed for elite athletes who view exhaustion as currency.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap gap-4 text-xs font-mono font-bold tracking-widest">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleScrollToShop}
              className="bg-neon-orange text-black px-8 py-4 focus:outline-none flex items-center space-x-2 font-black uppercase tracking-widest hover:bg-white duration-150 transition-colors cursor-pointer"
            >
              <span>Shop The Drop</span>
              <span className="font-black">→</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setJoinModalOpen(true)}
              className="border border-[#C0C0C0] text-[#C0C0C0] px-8 py-4 focus:outline-none font-black uppercase tracking-widest hover:bg-[#FF5500] hover:text-black hover:border-[#FF5500] transition-colors cursor-pointer"
            >
              Join Elite Brotherhood
            </motion.button>
          </div>
        </div>

      </div>

      {/* Ticker / Live community member records */}
      <div className="relative z-10 border-t border-[#222] bg-[#050505] py-5 w-full">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#222]">
            
            {/* Live Ticker 1 */}
            <div className="pt-4 md:pt-0">
              <div className="font-mono text-[9px] text-[#555] font-bold uppercase tracking-widest">
                01 // ESTABLISHED STATIONS
              </div>
              <div className="font-display font-black text-xl sm:text-2xl text-white mt-1 leading-none italic">
                {liveCounter.toLocaleString()} <span className="text-neon-orange font-sans text-xs">●</span>
              </div>
              <div className="font-mono text-[9px] text-zinc-400 mt-1 uppercase tracking-tight">
                ACTIVE ATHLETES ONLINE
              </div>
            </div>

            {/* Live Ticker 2 */}
            <div className="pt-4 md:pt-0 pl-0 md:pl-4">
              <div className="font-mono text-[9px] text-[#555] font-bold uppercase tracking-widest">
                02 // RECENT TONNAGE MOVED
              </div>
              <div className="font-display font-black text-xl sm:text-2xl text-white mt-1 leading-none italic">
                14,832,912 <span className="text-neon-orange font-sans text-xs">LBS</span>
              </div>
              <div className="font-mono text-[9px] text-zinc-400 mt-1 uppercase tracking-tight">
                BY THE BROTHERHOOD TODAY
              </div>
            </div>

            {/* Live Ticker 3 */}
            <div className="pt-4 md:pt-0 pl-0 md:pl-4">
              <div className="font-mono text-[9px] text-[#555] font-bold uppercase tracking-widest">
                03 // BLUEPRINTS ACTIVE
              </div>
              <div className="font-display font-black text-xl sm:text-2xl text-white mt-1 leading-none italic">
                52,109 <span className="text-zinc-500 font-sans text-xs">UNLOCKED</span>
              </div>
              <div className="font-mono text-[9px] text-zinc-400 mt-1 uppercase tracking-tight">
                WORLDWIDE CURRICULUMS
              </div>
            </div>

            {/* Live Ticker 4 */}
            <div className="pt-4 md:pt-0 pl-0 md:pl-4">
              <div className="font-mono text-[9px] text-[#555] font-bold uppercase tracking-widest">
                04 // IRON POINTS RECLAIMED
              </div>
              <div className="font-display font-black text-xl sm:text-2xl text-neon-orange mt-1 leading-none italic">
                12,894,500 <span className="text-white font-sans text-xs">PTS</span>
              </div>
              <div className="font-mono text-[9px] text-zinc-400 mt-1 uppercase tracking-tight">
                CONVERTED INTO GEAR BLOCKS
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Infinite scrolling branding belt */}
      <div className="bg-[#FF5500] py-1.5 overflow-hidden select-none border-t border-b border-[#222]">
        <div className="animate-marquee whitespace-nowrap flex space-x-12">
          {Array(8).fill(null).map((_, i) => (
            <span key={i} className="font-mono text-[10px] font-black text-black tracking-widest uppercase">
              • IRONCLAD MECHANICAL INTENT • THE WEAK EXCLUDE THEMSELVE • SCIENTIFIC MUSCULAR DISRUPTION • 400MG CAFFEINE PUMP • FOR DISCIPLINED USE ONLY
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
