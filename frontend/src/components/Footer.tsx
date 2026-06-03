import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, Flame, Scale, ShieldQuestion, HelpCircle, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmitNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast(`Registered for Early Drop Notifications.`, 'success');
  };

  const handleShowPolicy = (topic: string) => {
    showToast(`"${topic}" — Heavy gear returns accepted within 30 days. See dashboard for tracking.`, 'info');
  };

  return (
    <footer className="bg-[#050505] text-zinc-400 font-mono text-xs border-t border-[#222] pt-16 pb-8 px-4 md:px-8 scanlines">
      <div className="mx-auto max-w-7xl">
        
        {/* Retention Signup Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#222] items-center">
          
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center space-x-2 border border-[#FF5500]/20 bg-[#FF5500]/10 px-2 py-0.5 text-[8.5px] font-black tracking-widest text-[#FF5500] mb-3">
              <Flame className="h-3.5 w-3.5" />
              <span>INNER CIRCLE SYSTEM ACCESS</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tighter leading-none mb-2">
              JOIN THE INNER CIRCLE
            </h3>
            <p className="font-sans font-light text-xs text-zinc-400 max-w-md leading-relaxed tracking-tight">
              Register your communication channel for instantaneous early notifications regarding product drop exclusivity, biochemical formulations, and local community updates.
            </p>
          </div>

          {/* Electronic Mail Capture */}
          <div className="lg:col-span-5 w-full">
            <form onSubmit={handleSubmitNews} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ATHLETE.EMAIL@SECURE_HOST.COM"
                  className="w-full bg-[#050505] border border-[#222] hover:border-[#444] focus:border-[#FF5500] px-4 py-3 pl-10 text-white placeholder-zinc-600 text-xs uppercase focus:outline-none rounded-none tracking-widest font-bold font-mono"
                  disabled={subscribed}
                />
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
              </div>

              <button
                type="submit"
                disabled={subscribed}
                className="bg-[#FF5500] hover:bg-white disabled:bg-neutral-800 disabled:text-zinc-500 text-black font-black text-xs py-3.5 px-6 tracking-widest uppercase cursor-pointer rounded-none duration-150 flex items-center justify-center space-x-2"
              >
                {subscribed ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>SECURED Access</span>
                  </>
                ) : (
                  <span>RECEIVE EARLY ACCESS</span>
                )}
              </button>
            </form>
            <span className="block text-[8px] text-zinc-600 mt-2 text-left uppercase">
              * WE NEVER ENGAGE IN CORROSIVE SPAM. UNREGISTER WITH A SINGLE CLICK AT ANY STAGE.
            </span>
          </div>

        </div>

        {/* Informative Directory grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 text-left border-b border-[#222]">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-sm text-white tracking-tight uppercase">
              IRON<span className="text-[#FF5500]">CLAD</span> ELITE
            </h4>
            <p className="font-sans font-light text-xs text-zinc-400 leading-relaxed max-w-xs">
              A premium, uncompromising physical-goal developer. We manufacture raw barbell assets, high-GSM garments, and high-intensity cellular protein matrices.
            </p>
            <div className="flex items-center space-x-3 text-zinc-500 text-[10px]">
              <span className="hover:text-[#FF5500] cursor-pointer hover:underline" onClick={() => handleShowPolicy('SYSTEMS CHANNEL')}>TWITTER</span>
              <span>•</span>
              <span className="hover:text-[#FF5500] cursor-pointer hover:underline" onClick={() => handleShowPolicy('SYSTEMS CHANNEL')}>INSTAGRAM</span>
              <span>•</span>
              <span className="hover:text-[#FF5500] cursor-pointer hover:underline" onClick={() => handleShowPolicy('SYSTEMS CHANNEL')}>TIKTOK</span>
            </div>
          </div>

          {/* Col 2: Logistics Support Policy Links */}
          <div className="space-y-3">
            <div className="flex items-center space-x-1 font-bold text-white tracking-wider text-[10px] uppercase">
              <Scale className="h-3.5 w-3.5 text-[#FF5500]" />
              <span>FREIGHT LOGISTICS</span>
            </div>
            <ul className="space-y-1.5 text-zinc-400 text-[11px]">
              <li>
                <button type="button" onClick={() => handleShowPolicy('SHIPPING RATE AND SPECS')} className="hover:text-white hover:underline uppercase text-left">
                  → SHIPPING LOGISTICS RATES & SPECS
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleShowPolicy('HEAVY BARBELL RETRIEVAL')} className="hover:text-white hover:underline uppercase text-left">
                  → HEAVY BARBELL RETRIEVALS SECURING
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleShowPolicy('CUSTOMS FREIGHT STRESS')} className="hover:text-white hover:underline uppercase text-left">
                  → CUSTOMS FREIGHT BOND LIMITS
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Bio-Chemist & Mechanical Policy Links */}
          <div className="space-y-3">
            <div className="flex items-center space-x-1 font-bold text-white tracking-wider text-[10px] uppercase">
              <ShieldCheck className="h-3.5 w-3.5 text-[#FF5500]" />
              <span>LAB VALIDATION STATIONS</span>
            </div>
            <ul className="space-y-1.5 text-zinc-400 text-[11px]">
              <li>
                <button type="button" onClick={() => handleShowPolicy('BIO-CHEMIST MATRIX CERTIFICATION')} className="hover:text-white hover:underline uppercase text-left">
                  → CHEMICAL ANALYSIS DOSSIERS
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleShowPolicy('METABOLIC METRIC SYSTEM')} className="hover:text-white hover:underline uppercase text-left">
                  → METABOLIC METRIC SYSTEMS TESTING
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleShowPolicy('ATHLETE PERFORMANCE STACKS')} className="hover:text-white hover:underline uppercase text-left">
                  → APPROVED LAB COMBAT LOADOUTS
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Warehouse Locations */}
          <div className="space-y-3 font-mono">
            <div className="flex items-center space-x-1 font-bold text-white tracking-wider text-[10px] uppercase">
              <HelpCircle className="h-3.5 w-3.5 text-[#FF5500]" />
              <span>CONTACT SYSTEMS</span>
            </div>
            <div className="text-zinc-500 space-y-1 text-[11px]">
              <div className="text-zinc-300">DETROIT HQ STATION:</div>
              <div>894 KNURLED STEEL BLVD, DETROIT, MI</div>
              <div className="text-zinc-300 mt-2">SECURED INQUIRY:</div>
              <div>COMMITTEE@IRONCLAD-ELITE.COM</div>
              <div>PH-METRIC: +1 (313) 555-IRON</div>
            </div>
          </div>

        </div>

        {/* Bottom micro lines */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
          <div>
            © 2026 IRONCLAD ELITE SYSTEM INC. ALL TACTICAL RIGHTS SECURED.
          </div>
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <span className="text-white font-black">STRIKE-FORCE SHIELD VERIFIED v4.51</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
