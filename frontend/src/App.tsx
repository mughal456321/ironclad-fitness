import React from 'react';
import { useApp } from './context/AppContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProShop from './components/ProShop';
import Curriculum from './components/Curriculum';
import EliteAdvisory from './components/EliteAdvisory';
import TheBrotherhood from './components/TheBrotherhood';
import JoinBrotherhood from './components/JoinBrotherhood';
import AuthScreen from './components/AuthScreen';
import Toast from './components/Toast';
import MiniCart from './components/MiniCart';
import UserDashboard from './components/UserDashboard';
import Footer from './components/Footer';

export default function App() {
  const { loading, user, error } = useApp();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono text-neon-orange text-xs tracking-widest uppercase animate-pulse">
        Initializing Tactical Systems... 100% Signal Required
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center font-mono text-white text-xs tracking-widest uppercase p-4 text-center">
        <div className="text-neon-orange mb-4 text-2xl font-black">SYSTEM ERROR</div>
        <p className="max-w-md">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 border border-[#444] px-6 py-2 hover:bg-white hover:text-black duration-150"
        >
          RETRY UPLINK
        </button>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <div className="relative min-h-screen bg-[#050505] concrete-texture text-[#E0E0E0] font-sans flex flex-col justify-between border-0 md:border-[16px] border-[#121212] overflow-hidden">
        
        {/* Core Layout Modules */}
        <Header />
        
        <main className="flex-1 pt-14">
          <Hero />
          
          {/* Section: Dynamic Hardware, Apparel & Supplement Catalog */}
          <ProShop />
          
          {/* Section: Academic Digital Curriculums & Blueprints */}
          <Curriculum />
          
          {/* Section: Elite Advisory (Admissions & Athletes Loads) */}
          <EliteAdvisory />
          
          {/* Section: The Brotherhood (Transformations & Feed telemetry) */}
          <TheBrotherhood />
          
          {/* Section: Client control portal, Loyalty Iron Point indicators */}
          <UserDashboard />
        </main>

        <Footer />

        {/* Overlays / Sliders */}
        <JoinBrotherhood />
        <Toast />
        <MiniCart />

      </div>
  );
}
