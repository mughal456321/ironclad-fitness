import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, FileText, ChevronRight, Download, Truck, Check, Grid, Sparkles, BookOpen, Clock, Activity, FileCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';


export default function UserDashboard() {
  const { user, programs, showToast } = useApp();
  const [activeBlueprintSpec, setActiveBlueprintSpec] = useState<string | null>(null);

  if (!user) return null;

  // Status tier calculations based on loyalty points
  const points = user.ironPoints;
  let statusRank = 'RAW IRON RECRUIT';
  let nextRank = 'BILLET STEEL PILOT';
  let pointsToNext = 1000 - points;
  let progressPercent = (points / 1000) * 100;

  if (points >= 1500) {
    statusRank = 'OBSIDIAN ELITE COMMISSARY';
    nextRank = 'MAXIMUM INTENSITY LEVEL';
    pointsToNext = 0;
    progressPercent = 100;
  } else if (points >= 1000) {
    statusRank = 'BILLET STEEL PILOT';
    nextRank = 'OBSIDIAN ELITE COMMISSARY';
    pointsToNext = 1500 - points;
    progressPercent = ((points - 1000) / 500) * 100;
  }

  // Pre-configured training blueprints guide manuals
  const MANUALS: Record<string, {
    split: string;
    weeks: string;
    schedule: { day: string; exercise: string; setsReps: string; rule: string }[];
  }> = {
    'p1': {
      split: '3-Day Hypertrophy Push-Pull-Legs Overload',
      weeks: '12 Weeks Intense Program',
      schedule: [
        { day: 'Day 01 // Upper Body Push Force', exercise: 'Incline Barbell Press (Diamond grip)', setsReps: '4 Sets x 8 Reps (3 sec negative)', rule: 'Overload chest with mechanical tension loading' },
        { day: 'Day 02 // Upper Body Pull Grip', exercise: 'Heavy Pendlay Row & Weighted Pull-ups', setsReps: '5 Sets x 6 Reps (Zero momentum)', rule: 'Force lat expansion with volcanic cement static hold' },
        { day: 'Day 03 // Lower Biomechanical Strain', exercise: 'Deep Barbell Squat (Below parallel)', setsReps: '4 Sets x 10 Reps (60 sec rests)', rule: 'Drive quadricep hypertrophy of deep tissue layers' }
      ]
    },
    'p2': {
      split: 'Depleted Glycogen High Metabolic Shred',
      weeks: '8 Weeks Tactical Cutting',
      schedule: [
        { day: 'Day 01 // Glycogen Depletion Complex', exercise: 'Dumbbell Thrusters & Kettlebell Swings', setsReps: '4 Sets x 20 Reps (No rest blocks)', rule: 'Eradicate glycogen buffers to mobilize fats' },
        { day: 'Day 02 // Anaerobic Lactate Circuit', exercise: 'Plyo-lunges & Deficit Press-ups', setsReps: '5 Rounds x 60 Seconds', rule: 'Spike core thermodynamic metabolic rate' }
      ]
    },
    'p3': {
      split: 'Oxygen Expansion Carbon Delivery Cadence',
      weeks: '6 Weeks VO2 Expansion',
      schedule: [
        { day: 'Day 01 // Intercostal Posture Hold', exercise: 'Weighted Vest Plank & Breathing Reflector', setsReps: '3 Sets x 3 Minutes Hold', rule: 'Squeeze back ribs to force air chamber ventilation' },
        { day: 'Day 02 // Lactate Capacity Sprinting', exercise: '400m Staggered Metabolic Intervals', setsReps: '8 Reps with 4-sec carbon breath loops', rule: 'Increase oxygen assimilation ratios under stress' }
      ]
    }
  };

  const handleSimulateDownload = (title: string) => {
    showToast(`"${title}" guidelines transmission complete.`, 'success');
  };

  return (
    <section id="user-dashboard" className="relative bg-[#080808] py-20 px-4 md:px-8 border-b border-[#222] metallic-grain font-sans">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#222]">
          <div>
            <div className="font-mono text-[10px] text-[#FF5500] font-black uppercase tracking-[0.3em] mb-2">
              06 // COMMAND CONTROL // CLIENT DOSSIER
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase italic tracking-tighter leading-none">
              ATHLETE CONTROL PANEL
            </h2>
            <p className="mt-2 text-xs text-[#888] font-mono tracking-tight uppercase">
              Loyalty registers, unlocked training blueprints, and logistics tracking links
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-2 font-mono text-[9px] text-[#888] border border-[#222] bg-black p-2 py-1">
            <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-ping" />
            <span className="uppercase font-black">STATUS: SYNCHRONIZED COMPLIANT</span>
          </div>
        </div>

        {/* Master Control Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Loyalty Iron Points & Ranks (4 Cols) */}
          <div className="lg:col-span-4 bg-[#121212] border border-[#222] p-6 space-y-6">
            
            <div className="border-b border-[#222] pb-4 text-left">
              <span className="font-mono text-[8px] text-[#888] font-bold uppercase tracking-widest block mb-1">
                MEMBERSHIP SECURED DATA:
              </span>
              <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">
                {user.name}
              </h3>
              <p className="font-mono text-[9px] text-zinc-400 tracking-tight leading-none mt-1 uppercase">
                {user.email}
              </p>
            </div>

            {/* Iron Points Counter Box */}
            <div className="bg-[#050505] p-4 border border-[#222] relative">
              <div className="absolute top-4 right-4 text-[10px] font-mono text-[#FF5500] bg-black px-2 py-0.5 border border-[#FF5500] font-black tracking-widest">
                ACTIVE
              </div>
              <span className="block font-mono text-[8.5px] text-[#888] font-bold uppercase tracking-widest text-left">
                CURRENT LOYALTY POWER RECLAIMED:
              </span>
              
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="font-display font-black text-4xl text-[#FF5500] leading-none">
                  {points.toLocaleString()}
                </span>
                <span className="font-mono text-xs font-bold text-white tracking-widest">
                  IRON POINTS
                </span>
              </div>

              {/* Progress gauge */}
              {pointsToNext > 0 ? (
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between font-mono text-[8px] text-[#888]">
                    <span>RANK PROGRESS:</span>
                    <span>MORE {pointsToNext} PTS TO {nextRank}</span>
                  </div>
                  <div className="w-full bg-[#121212] h-1.5 border border-[#222] p-0.5">
                    <div 
                      className="bg-[#FF5500] h-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-4 bg-orange-950/20 border border-orange-900/40 p-2 text-left font-mono text-[8.5px] text-orange-400">
                  ★ UNLOCKED THE ABSOLUTE MAXIMUM RANK AS OBSIDIAN ATHLETE.
                </div>
              )}
            </div>

            {/* Loyalty tier specifications */}
            <div className="space-y-3 font-mono text-[9px]" aria-label="Membership Tiers">
              <span className="block text-zinc-500 font-bold uppercase tracking-widest text-left">
                LOYALTY RANK SPECS:
              </span>

              <div className="space-y-1">
                <div className="flex justify-between p-2 border border-[#222] bg-[#050505] text-left">
                  <div className="flex items-center space-x-2">
                    <Award className="h-3.5 w-3.5 text-zinc-500" />
                    <span className="font-black text-zinc-400">RAW IRON RECRUIT (0-1K PTS)</span>
                  </div>
                  <span className="text-zinc-500">1.0x earn multiplier</span>
                </div>

                <div className={`flex justify-between p-2 border text-left ${statusRank === 'BILLET STEEL PILOT' ? 'border-[#FF5500] bg-[#FF5500]/10 text-white' : 'border-[#222] bg-[#050505] text-zinc-500'}`}>
                  <div className="flex items-center space-x-2">
                    <Award className="h-3.5 w-3.5 text-orange-400" />
                    <span className="font-black text-zinc-300">BILLET STEEL PILOT (1K+ PTS)</span>
                  </div>
                  <span className="text-zinc-400 font-bold">1.5x earn multiplier + early drop items</span>
                </div>

                <div className={`flex justify-between p-2 border text-left ${statusRank === 'OBSIDIAN ELITE COMMISSARY' ? 'border-[#FF5500] bg-[#FF5500]/10 text-white' : 'border-[#222] bg-[#050505] text-zinc-500'}`}>
                  <div className="flex items-center space-x-2">
                    <Award className="h-3.5 w-3.5 text-white animate-pulse" />
                    <span className="font-black text-white">OBSIDIAN COMMISSARY (1.5K+ PTS)</span>
                  </div>
                  <span className="text-[#FF5500] font-black">2.0x earns + custom apparel cuts</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Block: Order list and Unlocked files (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Unlocked digital manuals */}
            <div className="bg-[#121212] border border-[#222] p-6 text-left">
              <span className="font-mono text-[8px] text-[#FF5500] font-black uppercase tracking-[0.2em] block mb-1">
                AUTHORIZED ACADEMIC LICENSES:
              </span>
              <h3 className="font-display font-black text-lg text-white uppercase tracking-tight mb-4">
                UNLOCKED DIETARY & LIFTING BLUEPRINTS
              </h3>

              {user.unlockedPrograms.length === 0 ? (
                <div className="p-4 bg-[#050505] border border-[#222] text-center font-mono text-zinc-500 text-xs">
                  NO DIGITAL ASSETS SECURED. BUY INDIVIDUAL BLUEPRINTS FROM THE CURRICULUM SECTION TO ACCESS GUIDELINES.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.unlockedPrograms.map((pId) => {
                    const matchedP = programs.find(p => p.id === pId);
                    if (!matchedP) return null;

                    return (
                      <div 
                        key={pId}
                        className="bg-[#050505] border border-[#222] p-4 hover:border-[#FF5500] duration-150 flex flex-col justify-between"
                      >
                        <div className="text-left font-mono">
                          <div className="flex justify-between items-start">
                            <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">
                              01 // SECT: {matchedP.goal}
                            </span>
                            <span className="text-[10px] text-[#FF5500] font-black">
                              {matchedP.duration}
                            </span>
                          </div>
                          
                          <strong className="block font-display font-black text-sm text-white uppercase mt-1 leading-none">
                            {matchedP.name}
                          </strong>
                          
                          <p className="text-[10.5px] text-zinc-400 font-sans font-light mt-1.5 leading-snug">
                            {matchedP.description.slice(0, 100)}...
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#222] flex space-x-2">
                          <button
                            type="button"
                            onClick={() => setActiveBlueprintSpec(pId)}
                            className="flex-1 bg-transparent hover:bg-white hover:text-black hover:border-white text-white font-mono font-black text-[9px] py-2 tracking-widest uppercase text-center border border-[#444] cursor-pointer duration-150"
                          >
                            READ GUIDELINES
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => handleSimulateDownload(matchedP.name)}
                            className="bg-[#FF5500] hover:bg-orange-600 text-black p-2 cursor-pointer duration-150"
                            title="Download PDF instructions"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 2. Physical Logistics / Live orders history */}
            <div className="bg-[#121212] border border-[#222] p-6 text-left">
              <span className="font-mono text-[8px] text-[#888] font-bold uppercase tracking-widest block mb-1">
                LOGISTICS TELEMETRY DEPLOYMENT:
              </span>
              <h3 className="font-display font-black text-lg text-white uppercase tracking-tight mb-4">
                PHYSICAL CARGO LOGS
              </h3>

              <div className="space-y-3">
                {user.orders.length === 0 ? (
                  <div className="p-4 bg-[#050505] border border-[#222] text-center font-mono text-zinc-500 text-xs">
                    NO PHYSICAL CARGO LOGS FOUND. PLACE ORDERS FROM THE SHOP TO SEE YOUR DELIVERY HISTORY HERE.
                  </div>
                ) : (
                  user.orders.map((ord) => {
                  return (
                    <div 
                      key={ord.id}
                      className="bg-[#050505] border border-[#222] overflow-hidden text-left font-mono"
                    >
                      {/* Top Bar Order code and pricing */}
                      <div className="p-3 bg-[#121212] border-b border-[#222] flex flex-wrap items-center justify-between text-[10px] text-zinc-400 font-bold">
                        <div>
                          CODE: <strong className="text-white font-black">{ord.id}</strong>
                          <span className="text-zinc-600 ml-2">[{ord.date}]</span>
                        </div>
                        <div>
                          TOTAL CHARGED: <strong className="text-white font-black">${ord.total.toFixed(0)}</strong>
                        </div>
                      </div>

                      <div className="p-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Items list summary */}
                        <div className="flex-1 space-y-1.5">
                          {ord.items.map((item, idc) => (
                            <div key={idc} className="flex items-center space-x-2">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="h-6 w-6 object-cover border border-[#222]" 
                              />
                              <span className="text-[10px] text-zinc-200">
                                {item.quantity}x <strong className="text-white uppercase font-bold">{item.name}</strong>
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Actions and Logistics trackers */}
                        <div className="pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-[#222] pl-0 md:pl-4 text-left font-mono space-y-2">
                          <div className="flex items-center space-x-2 text-[9px]">
                            <span className="text-zinc-500">FREIGHT STATUS:</span>
                            <span className={`px-1.5 py-0.5 font-bold tracking-wider text-[8px] uppercase ${
                              ord.status === 'Completed' 
                                ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                                : 'bg-[#FF5500]/10 text-[#FF5500] border border-[#FF5500]/30 animate-pulse'
                            }`}>
                              {ord.status}
                            </span>
                          </div>

                          {ord.trackingNumber ? (
                            <button
                              type="button"
                              onClick={() => showToast(`Package ${ord.trackingNumber} — routed via US Freight Central Stations.`, 'info')}
                              className="inline-flex items-center space-x-1.5 text-zinc-400 hover:text-white transition-colors text-[9px] font-bold tracking-tight bg-transparent p-1 border border-[#444] hover:border-white outline-none cursor-pointer duration-150"
                            >
                              <Truck className="h-3 w-3 text-[#FF5500]" />
                              <span>TRACK COORDINATOR</span>
                            </button>
                          ) : (
                            <span className="text-[8px] text-zinc-600 block uppercase">
                              * DIGITAL CONSIGNMENTS RECORDED IMMEDIATELY
                            </span>
                          )}
                        </div>

                      </div>

                    </div>
                  );
                })
              )}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Embedded Blueprint Guidelines overlay modal */}
      <AnimatePresence>
        {activeBlueprintSpec && (() => {
          const matchedProg = programs.find(p => p.id === activeBlueprintSpec);
          const specsDetail = MANUALS[activeBlueprintSpec];
          if (!matchedProg || !specsDetail) return null;

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm font-sans">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-2xl bg-[#0c0c0c] border border-neutral-800 md:border-[#FF5500] p-6 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-start border-b border-[#222] pb-3 mb-4">
                  <div className="text-left font-mono">
                    <span className="text-[8px] text-[#FF5500] font-black block uppercase tracking-widest">
                      ACCREDITED INTEL MANUAL // {specsDetail.weeks}
                    </span>
                    <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                      {matchedProg.name}
                    </h3>
                  </div>
                  
                  <button 
                    onClick={() => setActiveBlueprintSpec(null)}
                    className="p-2 px-3 text-zinc-400 hover:text-[#FF5500] border border-[#444] hover:border-[#FF5500] bg-black font-mono text-[9px] font-bold cursor-pointer duration-150"
                  >
                    CLOSE [X]
                  </button>
                </div>

                <div className="bg-[#050505] border border-[#222] p-3 pt-2 text-left mb-4">
                  <div className="flex items-center space-x-1.5 text-neutral-400 font-mono text-[9px] font-bold uppercase tracking-wider mb-1.5">
                    <FileCheck className="h-3.5 w-3.5 text-[#FF5500]" />
                    <span>CURRICULUM SPEC: {specsDetail.split}</span>
                  </div>
                  <p className="font-sans text-xs text-[#888] font-light leading-relaxed">
                    This tactical syllabus describes structural mechanical overload drills. Strictly implement training weights relative to your biomechanical maximum, and ingest elite amino isolate 30 minutes post strain.
                  </p>
                </div>

                {/* Day splits */}
                <div className="space-y-3">
                  {specsDetail.schedule.map((sch, i) => (
                    <div 
                      key={i}
                      className="bg-black border border-[#222] p-3.5 text-left font-mono text-xs"
                    >
                      <div className="flex items-center justify-between text-[#FF5500] font-black text-[10px] uppercase border-b border-[#222] pb-1.5 mb-2 font-black">
                        <span>{sch.day}</span>
                        <span className="text-white bg-[#121212] px-1.5 py-0.5 text-[8px] tracking-wider rounded-none">ACTIVE LIFT</span>
                      </div>

                      <div className="space-y-1 text-zinc-300">
                        <div>
                          TACTICAL EXERCISE: <strong className="text-white uppercase font-black">{sch.exercise}</strong>
                        </div>
                        <div>
                          LOADING MODULIER: <span className="text-zinc-200">{sch.setsReps}</span>
                        </div>
                        <div className="text-zinc-500 text-[10px] mt-1 pt-1.5 border-t border-[#222] block italic">
                          ↳ RULE: {sch.rule}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-[#222] pt-4 flex justify-between items-center">
                  <span className="font-mono text-[8px] text-[#888] uppercase tracking-widest font-black">
                    APPROVED INTRA-WORKOUT SCHEMES
                  </span>
                  
                  <button
                    onClick={() => handleSimulateDownload(matchedProg.name)}
                    className="bg-[#FF5500] hover:bg-white text-black font-mono font-black text-[9px] py-2.5 px-4 uppercase tracking-widest cursor-pointer duration-150"
                  >
                    GENERATE STANDALONE ZIP Blueprints
                  </button>
                </div>

              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

    </section>
  );
}
