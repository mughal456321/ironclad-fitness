import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#050505] concrete-texture text-[#E0E0E0] font-sans flex flex-col justify-between border-0 md:border-[16px] border-[#121212] overflow-hidden">
      <Header />
      <main className="flex-1 pt-14 flex items-center justify-center scanlines">
        <div className="text-center font-mono px-4">
          <div className="text-8xl font-black text-[#FF5500] mb-4">404</div>
          <div className="text-zinc-400 text-xs tracking-widest uppercase mb-2">SECTOR NOT FOUND</div>
          <div className="text-zinc-600 text-[9px] tracking-wider uppercase mb-8 max-w-md">
            The requested tactical coordinate does not exist in our command database. Verify your navigation parameters and attempt re-entry.
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-[#FF5500] hover:bg-white text-black font-mono font-black text-xs py-3.5 px-8 tracking-widest uppercase cursor-pointer duration-150"
            >
              RETURN TO COMMAND BASE
            </button>
            <button
              onClick={() => navigate(-1)}
              className="border border-[#333] hover:border-white text-zinc-400 hover:text-white font-mono font-bold text-xs py-3.5 px-8 tracking-widest uppercase cursor-pointer duration-150"
            >
              RETROGRADE NAVIGATION
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
