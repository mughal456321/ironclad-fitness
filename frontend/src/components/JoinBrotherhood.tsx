import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Award, Flame, X, ChevronRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function JoinBrotherhood() {
  const { isJoinModalOpen, setJoinModalOpen, user, setDashboardOpen, updateUserProfile } = useApp();
  const [step, setStep] = useState<'intro' | 'form' | 'confirm'>('intro');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleJoin = async () => {
    const activationEmail = email || `${name.toLowerCase().replace(/\s+/g, '.')}@ironclad-elite.com`;
    await updateUserProfile(name, activationEmail);
    setStep('confirm');
    setTimeout(() => {
      setJoinModalOpen(false);
      setStep('intro');
      setSelectedTier(null);
      setDashboardOpen(true);
    }, 2000);
  };

  const handleClose = () => {
    setJoinModalOpen(false);
    setStep('intro');
    setSelectedTier(null);
  };

  return (
    <AnimatePresence>
      {isJoinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative w-full max-w-lg bg-[#0c0c0c] border border-neutral-800 md:border-[#FF5500] max-h-[90vh] overflow-y-auto"
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 px-3 text-zinc-400 hover:text-[#FF5500] border border-[#444] hover:border-[#FF5500] bg-black font-mono text-[9px] font-bold cursor-pointer z-10 transition-colors duration-150"
            >
              CLOSE [X]
            </button>

            {step === 'intro' && (
              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8 border-b border-[#222] pb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF5500] mb-4">
                    <ShieldCheck className="h-8 w-8 text-black" />
                  </div>
                  <div className="font-mono text-[9px] text-[#FF5500] font-black uppercase tracking-[0.3em] mb-2">
                    ELITE MILITARY-GRADE MEMBERSHIP
                  </div>
                  <h2 className="font-display font-black text-3xl text-white uppercase italic tracking-tighter leading-none">
                    JOIN THE <span className="text-[#FF5500]">BROTHERHOOD</span>
                  </h2>
                  <p className="mt-3 text-xs text-[#888] font-mono tracking-tight max-w-md mx-auto">
                    Unlock exclusive access to limited batch hardware, early drops, and a global network of elite performance athletes.
                  </p>
                </div>

                {/* Tier Showcase */}
                <div className="space-y-3 mb-8">
                  <span className="block font-mono text-[8px] text-zinc-500 font-bold uppercase tracking-widest text-center">
                    SELECT MEMBERSHIP TIER
                  </span>

                  <button
                    onClick={() => setSelectedTier('RAW IRON RECRUIT')}
                    className={`w-full text-left bg-[#050505] border p-4 flex items-center space-x-3 transition-colors duration-150 cursor-pointer ${
                      selectedTier === 'RAW IRON RECRUIT'
                        ? 'border-[#FF5500] bg-[#FF5500]/10'
                        : 'border-[#222] hover:border-zinc-500'
                    }`}
                  >
                    <Award className={`h-6 w-6 shrink-0 ${selectedTier === 'RAW IRON RECRUIT' ? 'text-[#FF5500]' : 'text-zinc-500'}`} />
                    <div className="text-left">
                      <span className="block font-display font-black text-sm text-zinc-300 uppercase">RAW IRON RECRUIT</span>
                      <span className="block font-mono text-[8px] text-zinc-500">0-1,000 IRON POINTS • 1.0x earn multiplier • Standard access</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedTier('BILLET STEEL PILOT')}
                    className={`w-full text-left bg-[#050505] border p-4 flex items-center space-x-3 transition-colors duration-150 cursor-pointer ${
                      selectedTier === 'BILLET STEEL PILOT'
                        ? 'border-[#FF5500] bg-[#FF5500]/10'
                        : 'border-[#222] hover:border-zinc-500'
                    }`}
                  >
                    <Award className={`h-6 w-6 shrink-0 ${selectedTier === 'BILLET STEEL PILOT' ? 'text-[#FF5500]' : 'text-orange-400'}`} />
                    <div className="text-left">
                      <span className="block font-display font-black text-sm text-zinc-300 uppercase">BILLET STEEL PILOT</span>
                      <span className="block font-mono text-[8px] text-zinc-500">1,000+ POINTS • 1.5x earn multiplier • Early drop items</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedTier('OBSIDIAN ELITE COMMISSARY')}
                    className={`w-full text-left bg-[#050505] border p-4 flex items-center space-x-3 transition-colors duration-150 cursor-pointer ${
                      selectedTier === 'OBSIDIAN ELITE COMMISSARY'
                        ? 'border-[#FF5500] bg-[#FF5500]/10'
                        : 'border-[#222] hover:border-zinc-500'
                    }`}
                  >
                    <Flame className={`h-6 w-6 shrink-0 ${selectedTier === 'OBSIDIAN ELITE COMMISSARY' ? 'text-[#FF5500]' : 'text-[#FF5500]'}`} />
                    <div className="text-left">
                      <span className="block font-display font-black text-sm text-white uppercase">OBSIDIAN ELITE COMMISSARY</span>
                      <span className="block font-mono text-[8px] text-zinc-400">1,500+ POINTS • 2.0x earn multiplier • Custom apparel cuts</span>
                    </div>
                  </button>
                </div>

                {/* CTA */}
                <button
                  onClick={() => setStep('form')}
                  disabled={!selectedTier}
                  className="w-full bg-[#FF5500] hover:bg-white disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-black font-mono font-black text-xs py-4 tracking-widest uppercase flex items-center justify-center space-x-2 transition-colors duration-150 cursor-pointer"
                >
                  <span>ACTIVATE MEMBERSHIP</span>
                  <ChevronRight className="h-4 w-4" />
                </button>

                {/* Skip */}
                <div className="mt-3 text-center">
                  <button
                    onClick={handleClose}
                    className="font-mono text-[9px] text-zinc-600 hover:text-zinc-400 tracking-wider underline underline-offset-2 cursor-pointer transition-colors duration-150"
                  >
                    NO THANKS, SKIP TO SITE
                  </button>
                </div>

                <p className="mt-3 text-center font-mono text-[8px] text-zinc-600 tracking-wider">
                  BY PROCEEDING YOU AGREE TO THE IRONCLAD TERMS OF USE AND PRIVACY PROTOCOL
                </p>
              </div>
            )}

            {step === 'form' && (
              <div className="p-8">
                <div className="text-center mb-6 border-b border-[#222] pb-6">
                  <div className="font-mono text-[9px] text-[#FF5500] font-black uppercase tracking-[0.3em] mb-2">
                    INITIATE CLEARANCE PROTOCOL
                  </div>
                  <h2 className="font-display font-black text-2xl text-white uppercase italic tracking-tighter">
                    DEPLOY IDENTIFICATION
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-1.5 text-left">
                      FULL DESIGNATION / NAME
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. GARRISON SHROUD"
                      className="w-full bg-[#050505] border border-[#222] px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#FF5500] placeholder-zinc-700 uppercase tracking-wider transition-colors duration-150"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-1.5 text-left">
                      COMMS / EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={user?.email || "e.g. operator@ironclad-elite.com"}
                      className="w-full bg-[#050505] border border-[#222] px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#FF5500] placeholder-zinc-700 tracking-wider transition-colors duration-150"
                    />
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <button
                      onClick={() => setAgree(!agree)}
                      className={`mt-0.5 h-4 w-4 border flex items-center justify-center shrink-0 transition-colors duration-150 cursor-pointer ${agree ? 'bg-[#FF5500] border-[#FF5500]' : 'bg-[#050505] border-[#222]'}`}
                    >
                      {agree && <Check className="h-3 w-3 text-black" />}
                    </button>
                    <span className="font-mono text-[8px] text-zinc-500 leading-tight">
                      I ACKNOWLEDGE THE IRONCLAD STANDARDS — THIS IS A HIGH-PERFORMANCE COMMUNITY. WEAK EXCUSES ARE NOT TOLERATED. BY SUBSCRIBING, I CONSENT TO RECEIVE TACTICAL COMMUNICATIONS AND EARLY DROP INTEL.
                    </span>
                  </div>

                  <button
                    onClick={handleJoin}
                    disabled={!name || !email || !agree}
                    className="w-full bg-[#FF5500] hover:bg-white disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-black font-mono font-black text-xs py-4 tracking-widest uppercase flex items-center justify-center space-x-2 transition-colors duration-150 cursor-pointer mt-4"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>SECURE ACTIVATION</span>
                  </button>
                </div>
              </div>
            )}

            {step === 'confirm' && (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FF5500] rounded-none mb-6">
                  <Check className="h-10 w-10 text-black" />
                </div>
                <h2 className="font-display font-black text-2xl text-white uppercase italic tracking-tighter mb-2">
                  MEMBERSHIP <span className="text-[#FF5500]">ACTIVATED</span>
                </h2>
                <p className="font-mono text-xs text-zinc-400 tracking-wide">
                  WELCOME TO THE BROTHERHOOD. YOUR CLEARANCE HAS BEEN APPROVED.
                </p>
                <div className="mt-6 mx-auto max-w-xs bg-[#050505] border border-[#FF5500]/30 p-4 text-left space-y-1.5">
                  <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Designation</div>
                  <div className="font-mono text-xs text-white font-bold uppercase">{name}</div>
                  <div className="mt-3 font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Comms Channel</div>
                  <div className="font-mono text-xs text-zinc-300">{email}</div>
                  <div className="mt-3 font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Assigned Tier</div>
                  <div className="font-mono text-xs text-[#FF5500] font-bold uppercase">{selectedTier || 'RAW IRON RECRUIT'}</div>
                </div>
                <div className="mt-6 font-mono text-[9px] text-[#FF5500] animate-pulse">
                  REDIRECTING TO COMMAND PANEL...
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
