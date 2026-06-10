import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Star, 
  Award, 
  Download, 
  CheckCircle, 
  Flame, 
  Activity, 
  Cpu, 
  ShoppingCart,
  Zap,
  TrendingUp,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DIGITAL_PROGRAMS, ATHLETES, PRODUCTS } from '../data';
import ImageWithFallback from './ImageWithFallback';
import Header from './Header';
import Footer from './Footer';
import JoinBrotherhood from './JoinBrotherhood';
import Toast from './Toast';
import MiniCart from './MiniCart';

export default function CurriculumDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    programs, 
    addToCart, 
    user, 
    claimDigitalBlueprint, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'telemetry' | 'curriculum'>('telemetry');

  // Ensure scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Find program from context, fallback to static seed data if context is still loading
  const program = programs.find(p => p.id === id) || DIGITAL_PROGRAMS.find(p => p.id === id);

  if (!program) {
    return (
      <div className="relative min-h-screen bg-[#050505] concrete-texture text-[#E0E0E0] font-sans flex flex-col justify-between border-0 md:border-[16px] border-[#121212] overflow-hidden">
        <Header />
        <main className="flex-1 pt-14 flex items-center justify-center">
          <div className="text-center font-mono">
            <div className="text-4xl font-black text-[#FF5500] mb-4">404</div>
            <div className="text-zinc-400 text-xs tracking-widest uppercase mb-6">Program Directive Not Found</div>
            <button
              onClick={() => navigate('/')}
              className="border border-[#333] px-6 py-2 text-xs tracking-widest uppercase font-bold text-white hover:bg-white hover:text-black duration-150 cursor-pointer"
            >
              Return to Control Base
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const athlete = ATHLETES.find(a => a.id === program.instructorId);
  
  // Find related products based on instructor's favorite products or program's goal
  const relatedProducts = PRODUCTS.filter(p => {
    if (athlete && athlete.favoriteProductIds.includes(p.id)) return true;
    return p.goal === program.goal;
  }).slice(0, 3);

  const isUnlocked = user?.unlockedPrograms.includes(program.id);
  const pointCost = Math.floor(program.price * 10);

  const handleRedeemWithPoints = () => {
    if (user && user.ironPoints >= pointCost) {
      claimDigitalBlueprint(program.id);
    } else {
      showToast(`Insufficient points. Need ${pointCost}, have ${user?.ironPoints || 0}.`, 'error');
    }
  };

  // Define clinical telemetry custom indicators based on the program
  const getTelemetryData = () => {
    switch (program.id) {
      case 'p1': // Hypertrophy Project
        return {
          title: "SKELETAL OVERLOAD TELEMETRY",
          cnsStrain: 88,
          stimulus: 9.4,
          recovery: "48-72 Hours",
          biometrics: [
            { label: "Myofibrillar Protein Synthesis Rate", value: "+185%", delta: "24h Peak" },
            { label: "Tension Acceleration Target", value: "4:1:2 TUT", delta: "Controlled Eccentric" },
            { label: "Intracellular Hydration Index", value: "9.2/10", delta: "High Glycogen" },
            { label: "Cardiac Target Window", value: "125-145 BPM", delta: "Aerobic Buffering" }
          ],
          telemetryGraph: "M 0 15 Q 10 5, 20 25 T 40 10 T 60 20 T 80 5 T 100 15"
        };
      case 'p2': // Shred Protocol
        return {
          title: "METABOLIC SEIZURE & LIPOLYSIS",
          cnsStrain: 78,
          stimulus: 8.9,
          recovery: "24-36 Hours",
          biometrics: [
            { label: "Resting Metabolic Delta (EPOC)", value: "+22%", delta: "38h Elevation" },
            { label: "Fasting Glycogen Clear Cycle", value: "16:8 Hours", delta: "Beta-Oxidation" },
            { label: "Staggered Cardio Load", value: "15m Peak VO2", delta: "High Lactate" },
            { label: "Cardiac Target Window", value: "145-175 BPM", delta: "Metabolic Peak" }
          ],
          telemetryGraph: "M 0 20 L 15 5 L 30 25 L 45 10 L 60 15 L 75 5 L 90 25 L 100 10"
        };
      case 'p3': // Carbon Breathing
      default:
        return {
          title: "HYPOXIC ENDURANCE TELEMETRY",
          cnsStrain: 82,
          stimulus: 9.1,
          recovery: "36-48 Hours",
          biometrics: [
            { label: "Oxygen Intake Efficiency", value: "+12.5% VO2", delta: "6 Weeks Target" },
            { label: "Lactate Threshold Buffer", value: "16.8 km/h", delta: "CNS Desensitization" },
            { label: "Lung Intercostal Elasticity", value: "+15%", delta: "Active Posture" },
            { label: "Carbon Breathing Cadence", value: "4-4-4-4s", delta: "Reflector System" }
          ],
          telemetryGraph: "M 0 10 C 20 10, 30 28, 50 15 C 70 2, 80 10, 100 10"
        };
    }
  };

  const telemetry = getTelemetryData();

  // Custom syllabus content expansion for each program
  const getSyllabusData = () => {
    return [
      {
        phase: "PHASE 01 // LOAD CALIBRATION",
        duration: "Weeks 1-4",
        focus: "Neuromuscular Recalibration & Joint Loading",
        description: "Benchmark raw mechanical capacity, initialize structural joint alignment, and adjust training volume to avoid CNS saturation. Focuses on base posture control and clinical biometric capture."
      },
      {
        phase: "PHASE 02 // STAGGERED INTENSITY BURST",
        duration: "Weeks 5-8",
        focus: "Myofibrillar Load Structuring & Metabolic Acidosis",
        description: "Scale dynamic intensity variables. This phase introduces progressive overload frequencies, anaerobic buffering sets, and specific time-under-tension protocols designed to target cell micro-tears."
      },
      {
        phase: "PHASE 03 // DESTRUCTIVE STIMULUS & RECOVERY",
        duration: "Weeks 9+",
        focus: "Supercompensation Cycles & Peak Telemetry",
        description: "Push biological parameters to extreme overreaching thresholds, followed by structured metabolic resetting. Complete CNS restoration cycles, advanced recovery feeding schemas, and final validation telemetry."
      }
    ];
  };

  const syllabus = getSyllabusData();

  return (
    <div className="relative min-h-screen bg-[#050505] concrete-texture text-[#E0E0E0] font-sans flex flex-col justify-between border-0 md:border-[16px] border-[#121212] overflow-hidden">
      <Header />
      <main className="flex-1 pt-14 scanlines">
        
        {/* Detail Body Wrapper */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#222]">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 font-mono text-[9px] font-black tracking-widest uppercase text-zinc-500 hover:text-white transition-colors duration-150 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Curriculums</span>
            </button>
            <div className="font-mono text-[8px] text-zinc-500 tracking-widest uppercase">
              STATUS: {isUnlocked ? "AUTHORIZED ACCESS GRANTED" : "TACTICAL SECURED BLOCK"}
            </div>
          </div>

          {/* Hero Section Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            
            {/* Left Column: Visual Display */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative h-[280px] sm:h-[400px] bg-neutral-900 border border-neutral-800 overflow-hidden group">
                <ImageWithFallback
                  src={program.image}
                  alt={program.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  wrapperClassName="absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                
                {/* Visual Indicators overlay */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="bg-black/90 border border-neutral-800 px-3 py-1 font-mono text-[9px] font-black text-neon-orange tracking-widest uppercase flex items-center space-x-1.5">
                    <Flame className="h-3 w-3" />
                    <span>{program.difficulty}</span>
                  </span>
                  <span className="bg-black/90 border border-neutral-800 px-3 py-1 font-mono text-[9px] font-black text-white tracking-widest uppercase flex items-center space-x-1.5">
                    <Clock className="h-3 w-3" />
                    <span>{program.duration}</span>
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <span className="font-mono text-[8px] text-zinc-400 font-bold tracking-[0.2em] uppercase">
                      SYSTEM MODULE {program.id.toUpperCase()}
                    </span>
                    <h1 className="font-display font-black text-2xl sm:text-4xl text-white italic uppercase tracking-tighter leading-none mt-1">
                      {program.name}
                    </h1>
                  </div>
                  <div className="bg-black/90 border border-neutral-800 p-2 text-right">
                    <div className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">STABILITY RATING</div>
                    <div className="flex items-center space-x-1 justify-end mt-0.5">
                      <Star className="h-3 w-3 fill-neon-orange text-neon-orange" />
                      <span className="font-mono text-xs font-black text-white">{program.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tactical Overview */}
              <div className="bg-[#121212] border border-[#222] p-6">
                <h3 className="font-display font-black text-xs text-white tracking-widest uppercase mb-3 flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-neon-orange" />
                  <span>DIRECTIVE OVERVIEW & GOAL CALIBRATION</span>
                </h3>
                <p className="font-sans text-sm text-zinc-300 font-light leading-relaxed">
                  {program.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-neutral-900 font-mono">
                  <div className="bg-[#050505] border border-neutral-900 p-3">
                    <div className="text-[8px] text-zinc-500 uppercase tracking-widest">GOAL TYPE</div>
                    <div className="text-xs font-black text-white uppercase mt-1">{program.goal}</div>
                  </div>
                  <div className="bg-[#050505] border border-neutral-900 p-3">
                    <div className="text-[8px] text-zinc-500 uppercase tracking-widest">DIFFICULTY RATING</div>
                    <div className="text-xs font-black text-neon-orange uppercase mt-1">{program.difficulty}</div>
                  </div>
                  <div className="bg-[#050505] border border-neutral-900 p-3 col-span-2 md:col-span-1">
                    <div className="text-[8px] text-zinc-500 uppercase tracking-widest">INTEGRATED AUDIT</div>
                    <div className="text-xs font-black text-white uppercase mt-1">Clinical Pass</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Checkout & Loyalty Terminal */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Acquisition Board */}
              <div className="bg-[#121212] border border-[#222] p-6 relative">
                <div className="absolute top-0 right-0 bg-neon-orange/10 border-l border-b border-[#222] px-3 py-1 font-mono text-[8px] text-neon-orange font-bold uppercase tracking-widest">
                  COMMERCE LINK
                </div>

                <h3 className="font-display font-black text-sm text-white tracking-widest uppercase mb-4">
                  ACQUISITION TERMINAL
                </h3>

                {isUnlocked ? (
                  <div className="space-y-4">
                    <div className="bg-green-500/5 border border-green-500/30 p-4 flex items-start space-x-3">
                      <ShieldCheck className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-mono text-[10px] font-black text-green-400 uppercase tracking-wider">
                          UPLINK SECURITY: CLEARED
                        </div>
                        <p className="font-sans text-xs text-zinc-400 leading-relaxed mt-1">
                          This training curriculum has been fully unlocked. You have lifetime access to the clinical telemetry logs and instruction plans.
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white w-full py-3.5 font-mono text-[10px] font-black tracking-widest uppercase flex items-center justify-center space-x-2 decoration-transparent duration-150"
                    >
                      <Download className="h-3.5 w-3.5 text-green-400" />
                      <span>ACCESS IN ATHLETE DASHBOARD</span>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-neutral-900 pb-4">
                      <div>
                        <div className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">STANDARD RATE</div>
                        <div className="font-display font-black text-2xl text-white italic mt-1">${program.price}.00</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">LOYALTY REDEEM</div>
                        <div className="font-display font-black text-xl text-neon-orange italic mt-1">{pointCost} PTS</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* Option 1: Buy */}
                      <button
                        onClick={() => addToCart({ program })}
                        className="w-full bg-[#FF5500] hover:bg-white text-black font-mono font-black text-[10px] py-4 tracking-widest uppercase flex items-center justify-center space-x-2 cursor-pointer duration-150"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>AUTHORIZE CREDIT ORDER [${program.price}]</span>
                      </button>

                      {/* Option 2: Redeem with Points */}
                      <button
                        onClick={handleRedeemWithPoints}
                        className="w-full bg-transparent hover:bg-white hover:text-black hover:border-white text-zinc-300 border border-[#333] text-[10px] font-mono py-4 tracking-widest uppercase cursor-pointer duration-150"
                      >
                        <span>REDEEM WITH {pointCost} IRON POINTS</span>
                      </button>

                      <p className="font-mono text-[8px] text-zinc-500 text-center uppercase tracking-tight">
                        Purchase immediately adds blueprint to account dossier. 15% points back on USD buy.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Telemetry live status monitor widget */}
              <div className="bg-[#121212] border border-[#222] p-6 font-mono">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-neon-orange animate-pulse" />
                    <span className="font-display font-black text-xs text-white tracking-widest uppercase">LIVE METRIC FEED</span>
                  </div>
                  <span className="bg-[#050505] border border-neutral-900 px-2 py-0.5 text-[8px] text-green-400 font-bold uppercase tracking-widest">
                    ACTIVE SIGNAL
                  </span>
                </div>

                <div className="relative h-20 bg-[#050505] border border-neutral-900 overflow-hidden flex items-center justify-center">
                  {/* Grid background effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,85,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,85,0,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />
                  
                  {/* Telemetry wave line animation */}
                  <svg className="w-full h-full absolute inset-0 opacity-80" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <path
                      d={telemetry.telemetryGraph}
                      fill="none"
                      stroke="#FF5500"
                      strokeWidth="0.8"
                      className="dash-draw-pulse"
                    />
                  </svg>
                  
                  <div className="absolute top-2 left-2 text-[7px] text-zinc-500 uppercase tracking-widest">
                    BIOMECHANICAL WAVEFORM
                  </div>
                  <div className="absolute bottom-2 right-2 text-[8px] text-neon-orange uppercase font-bold tracking-widest animate-pulse">
                    FREQUENCY OVERLOAD OVERRIDE: OK
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 text-[9px] text-zinc-400">
                  <div className="bg-[#050505] border border-neutral-900 p-2">
                    <span>CNS STRAIN RANGE:</span>
                    <strong className="block text-white font-black mt-0.5">{telemetry.cnsStrain}% MAX</strong>
                  </div>
                  <div className="bg-[#050505] border border-neutral-900 p-2">
                    <span>RECOVERY DURATION:</span>
                    <strong className="block text-white font-black mt-0.5">{telemetry.recovery}</strong>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Info Section Tabs */}
          <div className="border border-[#222] bg-[#121212] mb-12">
            
            {/* Tabs Header */}
            <div className="flex border-b border-[#222] font-mono">
              <button
                onClick={() => setActiveTab('telemetry')}
                className={`flex-1 py-4 text-center text-[10px] font-black tracking-widest uppercase cursor-pointer border-r border-[#222] transition-colors duration-150 ${
                  activeTab === 'telemetry' 
                    ? 'bg-neutral-900 text-neon-orange border-b-2 border-b-neon-orange' 
                    : 'text-zinc-400 hover:text-white hover:bg-neutral-900/40'
                }`}
              >
                [01 // CLINICAL TELEMETRY SPECIFICATIONS]
              </button>
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`flex-1 py-4 text-center text-[10px] font-black tracking-widest uppercase cursor-pointer transition-colors duration-150 ${
                  activeTab === 'curriculum' 
                    ? 'bg-neutral-900 text-neon-orange border-b-2 border-b-neon-orange' 
                    : 'text-zinc-400 hover:text-white hover:bg-neutral-900/40'
                }`}
              >
                [02 // DETAILED CURRICULUM SYLLABUS]
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-6">
              
              {activeTab === 'telemetry' ? (
                <div className="space-y-6">
                  
                  {/* Top Header of telemetry */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-neutral-900">
                    <div>
                      <h4 className="font-display font-black text-sm text-white uppercase italic tracking-tight">
                        {telemetry.title}
                      </h4>
                      <p className="font-mono text-[9px] text-zinc-500 uppercase mt-0.5">
                        Clinical biometrics validated under dynamic mechanical load
                      </p>
                    </div>
                    <span className="mt-2 md:mt-0 font-mono text-[9px] bg-neon-orange/10 border border-neon-orange/30 text-neon-orange px-2 py-0.5 uppercase">
                      TELEMETRY GRADE 04-A
                    </span>
                  </div>

                  {/* Telemetry detailed indicators list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {telemetry.biometrics.map((bio, index) => (
                      <div key={index} className="bg-[#050505] border border-neutral-900 p-4 font-mono">
                        <div className="text-[8px] text-zinc-500 uppercase tracking-widest">{bio.label}</div>
                        <div className="flex items-baseline justify-between mt-2">
                          <span className="text-xl font-black text-white">{bio.value}</span>
                          <span className="text-[9px] text-neon-orange font-bold uppercase tracking-wider">{bio.delta}</span>
                        </div>
                        <div className="w-full bg-neutral-900 h-1 mt-3 rounded-full overflow-hidden">
                          <div 
                            className="bg-neon-orange h-full duration-1000 ease-out"
                            style={{ width: bio.value.includes('%') ? bio.value.replace('%', '') + '%' : '75%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Scientific disclaimer */}
                  <p className="font-mono text-[8.5px] text-zinc-500 leading-normal uppercase">
                    * NOTICE: Telemetry values represent standard biological markers validated under biomechanical stress. CNS strain levels fluctuate according to user sleep index, caloric availability, and dynamic recovery thresholds. Rest periods must be calculated strictly to avoid physiological deterioration.
                  </p>

                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* Syllabus phase blocks */}
                  <div className="space-y-4">
                    {syllabus.map((syll, index) => (
                      <div 
                        key={index}
                        className="group flex flex-col md:flex-row items-start bg-[#050505] border border-neutral-900 p-5 hover:border-zinc-800 transition-colors duration-150"
                      >
                        {/* Numbering / duration */}
                        <div className="w-full md:w-48 font-mono mb-3 md:mb-0">
                          <div className="text-neon-orange text-[10px] font-black tracking-widest">{syll.phase}</div>
                          <div className="text-zinc-400 text-xs font-bold mt-1 uppercase">{syll.duration}</div>
                          <span className="inline-block mt-2 font-mono text-[8px] bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-zinc-500 uppercase tracking-wider">
                            SECURED PLAN
                          </span>
                        </div>

                        {/* Title & Desc */}
                        <div className="flex-1 md:pl-6 md:border-l md:border-neutral-900">
                          <h4 className="font-display font-black text-sm text-white uppercase tracking-tight mb-2">
                            {syll.focus}
                          </h4>
                          <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light">
                            {syll.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>

          </div>

          {/* Instructor profile block */}
          {athlete && (
            <div className="bg-[#121212] border border-[#222] p-6 md:p-8 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Photo */}
                <div className="md:col-span-4 lg:col-span-3">
                  <div className="relative h-48 w-48 mx-auto md:mx-0 rounded-none overflow-hidden border border-neutral-800 bg-neutral-900">
                    <ImageWithFallback
                      src={athlete.image}
                      alt={athlete.name}
                      className="w-full h-full object-cover"
                      wrapperClassName="absolute inset-0"
                    />
                  </div>
                </div>

                {/* Info and bio */}
                <div className="md:col-span-8 lg:col-span-9 space-y-4 text-center md:text-left">
                  <div>
                    <span className="font-mono text-[9px] text-neon-orange font-bold uppercase tracking-[0.2em]">
                      INSTRUCTING STRENGTH ENGINEER
                    </span>
                    <h3 className="font-display font-black text-xl md:text-2xl text-white uppercase italic tracking-tight leading-none mt-1">
                      {athlete.name}
                    </h3>
                    <p className="font-mono text-[10px] text-zinc-400 uppercase mt-1">
                      {athlete.role}
                    </p>
                  </div>

                  <blockquote className="border-l-0 md:border-l-2 md:border-l-neon-orange md:pl-4 italic font-mono text-xs text-zinc-300 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                    "{athlete.quote}"
                  </blockquote>

                  <p className="font-sans text-xs text-zinc-400 font-light leading-relaxed max-w-3xl">
                    {athlete.bio}
                  </p>

                  <div className="pt-2">
                    <Link
                      to={`/adviser/${athlete.id}`}
                      className="inline-flex items-center space-x-1.5 font-mono text-[10px] font-bold text-neon-orange hover:text-white uppercase tracking-widest duration-150 decoration-transparent"
                    >
                      <span>VIEW ADVISER BIO PROFILE</span>
                      <span>↳</span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Endorsed Tactical Gear (Physical Products) */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-[#222] pt-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 pb-4 border-b border-neutral-900">
                <div>
                  <div className="font-mono text-[8px] text-neon-orange font-bold uppercase tracking-widest">
                    SYSTEM SUITE LOADOUT
                  </div>
                  <h3 className="font-display font-black text-xl text-white uppercase italic tracking-tight mt-1">
                    REQUIRED TACTICAL GEAR & FUEL
                  </h3>
                </div>
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mt-2 md:mt-0">
                  Recommended equipment integration for this curriculum
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="group flex flex-col justify-between bg-[#121212] border border-[#222] p-4 hover:border-[#FF5500] transition-colors duration-150"
                  >
                    <div>
                      {/* Product Image */}
                      <div className="relative h-40 bg-neutral-900 border border-neutral-800 overflow-hidden mb-4">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          wrapperClassName="absolute inset-0"
                        />
                      </div>

                      {/* Header Specs */}
                      <div className="flex justify-between items-start font-mono text-[8px] text-zinc-500 uppercase font-bold tracking-widest">
                        <span>{product.type}</span>
                        <span className="text-neon-orange">★ {product.rating}</span>
                      </div>

                      {/* Product Name */}
                      <h4 className="font-display font-bold text-sm text-white uppercase tracking-tight mt-1 leading-snug min-h-[40px] group-hover:text-neon-orange duration-150">
                        {product.name}
                      </h4>

                      <p className="font-sans font-light text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Bottom Buy Area */}
                    <div className="mt-4 pt-4 border-t border-neutral-900 flex items-center justify-between">
                      <span className="font-mono text-sm font-black text-white">${product.price}</span>
                      <button
                        type="button"
                        onClick={() => {
                          addToCart({
                            product,
                            selectedSize: product.sizes?.[0],
                            selectedWeight: product.weights?.[0],
                            selectedColor: product.colors?.[0]
                          });
                        }}
                        className="bg-neutral-900 hover:bg-neon-orange hover:text-black border border-neutral-800 hover:border-neon-orange px-4 py-2 font-mono text-[9px] font-black uppercase tracking-widest duration-150 flex items-center space-x-1.5 cursor-pointer"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        <span>ADD TO CART</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </main>
      <Footer />
      <JoinBrotherhood />
      <Toast />
      <MiniCart />

      {/* Styled animation keyframe rules for waveform drawing */}
      <style>{`
        .dash-draw-pulse {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawLine 5s linear infinite;
        }
        @keyframes drawLine {
          0% { stroke-dashoffset: 1000; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -1000; }
        }
      `}</style>
    </div>
  );
}
