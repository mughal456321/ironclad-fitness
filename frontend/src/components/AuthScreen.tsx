import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Shield, Eye, EyeOff, Mail, Lock, User, LogIn } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AuthScreen() {
  const { login, register, googleLogin, authLoading, showToast } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [googleBtnReady, setGoogleBtnReady] = useState(false);
  const googleBtnRef = useRef<HTMLDivElement>(null);

  // Load Google Sign-In script
  useEffect(() => {
    if (document.getElementById('google-gis-script')) {
      setGoogleBtnReady(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'google-gis-script';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setGoogleBtnReady(true);
    };
    document.body.appendChild(script);
    return () => {
      // Don't remove script on unmount
    };
  }, []);

  // Render Google button when ready
  useEffect(() => {
    if (!googleBtnReady || !googleBtnRef.current || typeof window === 'undefined') return;
    if (!(window as any).google?.accounts?.id) return;

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
    if (!clientId) return;

    (window as any).google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response: any) => {
        try {
          await googleLogin(response.credential);
        } catch {
          setError('Google authentication failed');
        }
      }
    });

    (window as any).google.accounts.id.renderButton(
      googleBtnRef.current,
      { theme: 'outline', size: 'large', type: 'standard', text: 'signin_with', shape: 'rectangular', width: 320 }
    );
  }, [googleBtnReady, googleLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('ALL FIELDS REQUIRED');
      return;
    }
    if (mode === 'register' && !name) {
      setError('ALL FIELDS REQUIRED');
      return;
    }

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
    } catch (err: any) {
      setError(err.message || 'AUTHENTICATION FAILED');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] concrete-texture flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        {/* Brand Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FF5500] mb-5">
            <Shield className="h-10 w-10 text-black" />
          </div>
          <div className="font-mono text-[9px] text-[#FF5500] font-black uppercase tracking-[0.3em] mb-1">
            IRONCLAD ELITE FITNESS
          </div>
          <h1 className="font-display font-black text-4xl text-white uppercase italic tracking-tighter mt-1">
            SECURE <span className="text-[#FF5500]">TERMINAL</span>
          </h1>
          <p className="mt-2 text-xs text-zinc-500 font-mono tracking-tight">
            {mode === 'login' ? 'SIGN IN TO ACCESS YOUR COMMAND PANEL' : 'INITIALIZE NEW OPERATOR PROFILE'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-[#0c0c0c] border border-neutral-800 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Mode Tabs */}
            <div className="flex border border-[#222]">
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); }}
                className={`flex-1 py-3 text-xs font-mono font-bold tracking-widest uppercase transition-colors duration-150 cursor-pointer ${
                  mode === 'login'
                    ? 'bg-[#FF5500] text-black'
                    : 'bg-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <LogIn className="h-3.5 w-3.5 inline mr-1.5 -mt-0.5" />
                SIGN IN
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); setError(''); }}
                className={`flex-1 py-3 text-xs font-mono font-bold tracking-widest uppercase transition-colors duration-150 cursor-pointer ${
                  mode === 'register'
                    ? 'bg-[#FF5500] text-black'
                    : 'bg-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <User className="h-3.5 w-3.5 inline mr-1.5 -mt-0.5" />
                REGISTER
              </button>
            </div>

            {/* Name Field (register only) */}
            {mode === 'register' && (
              <div>
                <label className="block font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-1.5 text-left">
                  FULL NAME
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                    placeholder="e.g. GARRISON SHROUD"
                    className="w-full bg-[#050505] border border-[#222] pl-10 pr-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#FF5500] placeholder-zinc-700 uppercase tracking-wider transition-colors duration-150"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-1.5 text-left">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@ironclad-elite.com"
                  className="w-full bg-[#050505] border border-[#222] pl-10 pr-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#FF5500] placeholder-zinc-700 tracking-wider transition-colors duration-150"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-widest mb-1.5 text-left">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                  className="w-full bg-[#050505] border border-[#222] pl-10 pr-10 py-3 text-xs font-mono text-white focus:outline-none focus:border-[#FF5500] placeholder-zinc-700 tracking-wider transition-colors duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="border border-red-900/50 bg-red-950/20 px-4 py-2.5">
                <span className="font-mono text-[10px] text-red-400 font-bold tracking-wider">{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-[#FF5500] hover:bg-white disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-black font-mono font-black text-xs py-4 tracking-widest uppercase flex items-center justify-center space-x-2 transition-colors duration-150 cursor-pointer"
            >
              {authLoading ? (
                <span className="animate-pulse">AUTHORIZING...</span>
              ) : (
                <>
                  <Shield className="h-4 w-4" />
                  <span>{mode === 'login' ? 'SECURE SIGN IN' : 'ACTIVATE PROFILE'}</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 border-t border-[#222]" />
              <span className="font-mono text-[8px] text-zinc-600 tracking-widest">OR</span>
              <div className="flex-1 border-t border-[#222]" />
            </div>

            {/* Google Sign-In */}
            <div className="flex justify-center min-h-[40px]">
              {googleBtnReady && import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
                <div ref={googleBtnRef} />
              ) : (
                <div className="text-center">
                  <div className="border border-[#222] px-6 py-3 inline-flex items-center space-x-2 opacity-50">
                    <span className="font-mono text-[9px] text-zinc-500 tracking-widest">
                      {import.meta.env.VITE_GOOGLE_CLIENT_ID
                        ? 'LOADING GOOGLE AUTH...'
                        : 'GOOGLE SIGN-IN: SET VITE_GOOGLE_CLIENT_ID IN .ENV'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </form>

          {/* Footer hint */}
          <p className="mt-5 text-center font-mono text-[8px] text-zinc-700 tracking-wider leading-relaxed">
            {mode === 'login'
              ? 'NEW HERE? SWITCH TO REGISTER. BY SIGNING IN YOU ACCEPT THE IRONCLAD TERMS.'
              : 'ALREADY A MEMBER? SWITCH TO SIGN IN.'}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
