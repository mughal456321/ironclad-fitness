import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import Footer from './components/Footer';
import DashboardPage from './components/DashboardPage';
import OrdersPage from './components/OrdersPage';
import ProShopPage from './components/ProShopPage';
import AthleteProfilePage from './components/AthleteProfilePage';
import CurriculumDetailPage from './components/CurriculumDetailPage';
import CurriculumPage from './components/CurriculumPage';
import NotFoundPage from './components/NotFoundPage';

function HomePage() {
  return (
    <>
      <Hero />
      <ProShop />
      <Curriculum />
      <EliteAdvisory />
      <TheBrotherhood />
    </>
  );
}

export default function App() {
  const { loading, user, error } = useApp();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location]);

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
    <Routes>
      <Route path="/" element={
        <div className="relative min-h-screen bg-[#050505] concrete-texture text-[#E0E0E0] font-sans flex flex-col justify-between border-0 md:border-[16px] border-[#121212] overflow-hidden">
          <Header />
          <main className="flex-1 pt-14">
            <HomePage />
          </main>
          <Footer />
          <JoinBrotherhood />
          <Toast />
          <MiniCart />
        </div>
      } />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/orders" element={<DashboardPage><OrdersPage /></DashboardPage>} />
      <Route path="/pro-shop" element={<ProShopPage />} />
      <Route path="/curriculum" element={<CurriculumPage />} />
      <Route path="/curriculum/:id" element={<CurriculumDetailPage />} />
      <Route path="/adviser/:id" element={<AthleteProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
