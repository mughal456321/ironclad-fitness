import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, User, Activity, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { cart, user, liveCounter, setCartOpen } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Calculate cart totals
  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartTotal = cart.reduce((acc, curr) => {
    const price = curr.product ? curr.product.price : (curr.program ? curr.program.price : 0);
    return acc + (price * curr.quantity);
  }, 0);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-[#222] bg-[#050505]/95 backdrop-blur-md px-4 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between h-14">
        
        {/* Brand Logo */}
        <button 
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-2 focus:outline-none text-left shrink-0"
        >
          <div className="w-8 h-8 bg-[#FF5500] flex items-center justify-center font-black italic text-black text-xl leading-none">
            I
          </div>
          <span className="font-display text-xl md:text-2xl font-black tracking-tighter text-white uppercase select-none leading-none">
            IRON<span className="text-[#FF5500]">CLAD</span>
          </span>
          <span className="hidden sm:inline-block font-mono text-[8px] font-bold border border-[#FF5500] px-1.5 py-0.5 text-[#FF5500] tracking-widest bg-[#FF5500]/10 leading-none">
            ELITE
          </span>
        </button>

        {/* Navigation - centered */}
        <nav className="hidden md:flex items-center justify-center flex-1 px-6 space-x-10">
          <button 
            onClick={() => handleScrollTo('pro-shop')} 
            className="text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-400 hover:text-white border-b-2 border-transparent hover:border-[#FF5500] pb-1 transition-all duration-150 cursor-pointer"
          >
            Pro-Shop
          </button>
          <button 
            onClick={() => handleScrollTo('curriculum')} 
            className="text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-400 hover:text-white border-b-2 border-transparent hover:border-[#FF5500] pb-1 transition-all duration-150 cursor-pointer"
          >
            Blueprints
          </button>
          <button 
            onClick={() => handleScrollTo('advisory')} 
            className="text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-400 hover:text-white border-b-2 border-transparent hover:border-[#FF5500] pb-1 transition-all duration-150 cursor-pointer"
          >
            Advisers
          </button>
          <button 
            onClick={() => handleScrollTo('brotherhood')} 
            className="text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-400 hover:text-white border-b-2 border-transparent hover:border-[#FF5500] pb-1 transition-all duration-150 cursor-pointer"
          >
            Brotherhood
          </button>
        </nav>

        {/* Right side: mobile hamburger + live counter + user + cart */}
        <div className="flex items-center space-x-3 shrink-0">
          
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white border border-[#333] bg-[#121212] cursor-pointer duration-150"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          
          {/* Live counter - compact pill */}
          <div className="hidden lg:flex items-center space-x-1.5 bg-[#121212] border border-[#222] px-3 py-1.5 font-mono text-[9px] text-zinc-500 leading-none">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon-orange"></span>
            </span>
            <span className="font-bold text-white">{liveCounter.toLocaleString()}</span>
            <span className="hidden xl:inline uppercase tracking-widest">ONLINE</span>
          </div>

          {/* User Profile */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const el = document.getElementById('user-dashboard');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center space-x-2 border border-[#333] bg-[#121212] px-3 py-1.5 focus:outline-none hover:border-zinc-500 duration-150"
          >
            <User className="h-3.5 w-3.5 text-neon-orange shrink-0" />
            <div className="hidden sm:block text-left text-[9px] font-mono leading-tight">
              <div className="text-zinc-400 font-bold truncate max-w-[90px]">{user?.name || 'LOGGING IN...'}</div>
              <div className="text-white font-bold"><span className="text-[#FF5500]">{user?.ironPoints || 0}</span> PTS</div>
            </div>
          </motion.button>

          {/* Cart */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCartOpen(true)}
            className="relative flex items-center space-x-2 bg-neon-orange px-3 py-1.5 focus:outline-none hover:bg-orange-600 duration-150"
          >
            <div className="relative">
              <ShoppingBag className="h-4 w-4 text-black" />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  className="absolute -top-2 -right-2 bg-black text-neon-orange text-[8px] font-black font-mono h-4 w-4 flex items-center justify-center rounded-full border border-neon-orange leading-none"
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </motion.span>
              )}
            </div>
            <span className="hidden sm:inline-block font-mono text-[10px] font-bold text-black border-l border-black/30 pl-2">
              ${cartTotal.toFixed(0)}
            </span>
          </motion.button>

        </div>

      </div>

      {/* Mobile nav dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden overflow-hidden border-t border-[#222] bg-[#0c0c0c]"
          >
            <div className="flex flex-col px-4 py-3 space-y-2">
              {[
                { label: 'Pro-Shop', id: 'pro-shop' },
                { label: 'Blueprints', id: 'curriculum' },
                { label: 'Advisers', id: 'advisory' },
                { label: 'Brotherhood', id: 'brotherhood' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    handleScrollTo(link.id);
                    setMobileOpen(false);
                  }}
                  className="text-left text-sm font-bold tracking-widest uppercase text-zinc-400 hover:text-white border-b border-[#222] py-2.5 transition-colors duration-150 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
