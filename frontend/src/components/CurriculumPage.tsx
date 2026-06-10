import React from 'react';
import Header from './Header';
import Curriculum from './Curriculum';
import JoinBrotherhood from './JoinBrotherhood';
import Toast from './Toast';
import MiniCart from './MiniCart';
import Footer from './Footer';

export default function CurriculumPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] concrete-texture text-[#E0E0E0] font-sans flex flex-col justify-between border-0 md:border-[16px] border-[#121212] overflow-hidden">
      <Header />
      <main className="flex-1 pt-14">
        <Curriculum />
      </main>
      <Footer />
      <JoinBrotherhood />
      <Toast />
      <MiniCart />
    </div>
  );
}
