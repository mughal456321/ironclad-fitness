import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, Star, Dumbbell, Award, Download, CheckCircle, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ImageWithFallback from './ImageWithFallback';
import { useId } from 'react';

export default function Curriculum() {
  const { programs, addToCart, user, claimDigitalBlueprint, showToast } = useApp();
  const [curriculumGoal, setCurriculumGoal] = useState('All');

  const filteredPrograms = programs.filter(prog => {
    return curriculumGoal === 'All' || prog.goal === curriculumGoal;
  });

  const handleRedeemWithPoints = (progId: string, pointCost: number) => {
    if (user && user.ironPoints >= pointCost) {
      claimDigitalBlueprint(progId);
    } else {
      showToast(`Insufficient points. Need ${pointCost}, have ${user?.ironPoints || 0}.`, 'error');
    }
  };

  return (
    <section id="curriculum" className="relative bg-[#050505] bg-[radial-gradient(circle_at_top_left,_#1a1a1a_0%,_#050505_70%)] py-20 px-4 md:px-8 border-b border-[#222] scanlines">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#222]">
          <div>
            <div className="font-mono text-[10px] text-[#FF5500] font-black uppercase tracking-[0.3em] mb-2">
              03 // TRAINING DIRECTIVES & PROGRAM BLUEPRINTS
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase italic tracking-tighter leading-none">
              TRAINING CURRICULUMS
            </h2>
            <p className="mt-2 text-xs text-[#888] font-mono tracking-tight uppercase">
              Downloadable physical goal programs validated by clinical telemetry
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 font-mono text-[9px] text-zinc-500 max-w-xs text-left md:text-right">
            DIGITAL MODULES INSTRUCTED BY EXPERT Strength Engineers & PRO ATHLETES
          </div>
        </div>

        {/* Goal filter - local to Curriculum only */}
        <div className="flex items-center space-x-2 mb-8 pb-4 border-b border-[#222]">
          <span className="font-mono text-[8px] text-zinc-500 font-bold uppercase tracking-widest mr-2">
            GOAL:
          </span>
          {['All', 'Muscle Gain', 'Fat Loss', 'Endurance'].map(g => (
            <button
              key={g}
              onClick={() => setCurriculumGoal(g)}
              className={`font-mono text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 border transition-colors duration-150 cursor-pointer ${
                curriculumGoal === g
                  ? 'bg-neon-orange border-neon-orange text-black'
                  : 'bg-black border-[#333] text-zinc-400 hover:text-white hover:border-zinc-500'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {filteredPrograms.length === 0 ? (
          <div className="text-center py-12 bg-neutral-950 border border-neutral-900">
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              No digital blueprints fit the goal filter ({curriculumGoal}).
            </p>
            <button 
              onClick={() => setCurriculumGoal('All')}
              className="mt-3 font-mono text-[10px] text-neon-orange font-bold hover:underline"
            >
              Reset Filters To Read
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((prog) => {
              const isUnlocked = user?.unlockedPrograms.includes(prog.id);
              const pointCost = Math.floor(prog.price * 10); // E.g. $49 program costs 490 points

              return (
                <div 
                  key={prog.id}
                  className="group relative flex flex-col justify-between bg-[#121212] border border-[#222] hover:border-[#FF5500] transition-all duration-200"
                >
                  
                  {/* Aspect Header Image */}
                  <Link to={`/curriculum/${prog.id}`} className="relative h-48 w-full bg-neutral-900 overflow-hidden block">
                    <ImageWithFallback
                      src={prog.image}
                      alt={prog.name}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                      wrapperClassName="absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                    
                    {/* Badge Difficulty */}
                    <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-black/85 border border-neutral-800 px-2 py-0.5">
                      <Flame className="h-3 w-3 text-neon-orange" />
                      <span className="font-mono text-[8px] font-black text-white tracking-wider uppercase">
                        {prog.difficulty}
                      </span>
                    </div>

                    {/* Unlocked stamp */}
                    {isUnlocked && (
                      <div className="absolute top-3 right-3 bg-green-500/10 border border-green-500/80 text-green-400 px-2 py-0.5 font-mono text-[8px] font-black tracking-widest uppercase flex items-center space-x-1">
                        <CheckCircle className="h-2.5 w-2.5" />
                        <span>AUTHORIZED PASS</span>
                      </div>
                    )}
                  </Link>

                  {/* Core Body Container */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Duration */}
                      <div className="flex items-start justify-between min-h-[50px]">
                        <Link to={`/curriculum/${prog.id}`} className="decoration-transparent">
                          <h3 className="font-display font-black text-sm text-white tracking-tight uppercase group-hover:text-neon-orange leading-snug hover:text-neon-orange transition-colors">
                            {prog.name}
                          </h3>
                        </Link>
                        <span className="font-mono text-[9px] font-bold text-zinc-400 bg-neutral-900 px-2 py-0.5 mt-0.5 uppercase border border-neutral-800 whitespace-nowrap">
                          {prog.duration}
                        </span>
                      </div>

                      {/* Decoded specs */}
                      <p className="mt-2 font-sans font-light text-xs text-zinc-400 leading-relaxed min-h-[60px]">
                        {prog.description}
                      </p>

                      {/* Link to details */}
                      <div className="mt-2 mb-1">
                        <Link 
                          to={`/curriculum/${prog.id}`}
                          className="inline-flex items-center space-x-1 font-mono text-[8px] font-black text-neon-orange hover:underline uppercase tracking-wider"
                        >
                          <span>INSPECT TACTICAL BLUEPRINT</span>
                          <span className="text-[10px]">↳</span>
                        </Link>
                      </div>

                      {/* Sneak peek Syllabus points (high info density) */}
                      <div className="mt-4 bg-[#050505]/95 border border-[#222] p-3">
                        <div className="flex items-center space-x-1.5 font-mono text-[8px] text-zinc-500 font-bold uppercase tracking-widest mb-2 border-b border-[#222] pb-1.5">
                          <BookOpen className="h-3 w-3 text-neon-orange" />
                          <span>COURSES SNEAK PEEK SYLLABUS:</span>
                        </div>
                        <ul className="space-y-1.5 text-[10px] font-mono text-zinc-300 font-light">
                          {prog.curriculumSneakPeek.map((course, idx) => (
                            <li key={idx} className="flex items-start leading-tight">
                              <span className="text-neon-orange mr-1.5 font-bold">↳</span>
                              <span>{course}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer Operations */}
                    <div className="mt-6 border-t border-[#222] pt-4">
                      
                      {isUnlocked ? (
                        <div className="space-y-2">
                          <span className="block font-mono text-[8px] text-green-400 font-bold text-center tracking-widest uppercase">
                            ✓ READY FOR DIRECT SECTOR DOWNLOAD
                          </span>
                          <a 
                            href="#user-dashboard"
                            className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white w-full py-2.5 font-mono text-[10px] font-black tracking-widest uppercase flex items-center justify-center space-x-2 decoration-transparent"
                            onClick={(e) => {
                              const tab = document.getElementById('user-dashboard');
                              if (tab) {
                                e.preventDefault();
                                tab.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                          >
                            <Download className="h-3.5 w-3.5 text-green-400" />
                            <span>ACCESS IN CONTROLLER PANEL</span>
                          </a>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          
                          {/* Price details line */}
                          <div className="flex justify-between items-center font-mono text-[10px] text-zinc-400 mb-2">
                            <span>REDEEM SAVINGS RATE:</span>
                            <span className="text-white font-black text-sm">${prog.price} (ONE TIME PAY)</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {/* Option 1: Buy with money */}
                            <button
                              type="button"
                              onClick={() => addToCart({ program: prog })}
                              className="bg-[#FF5500] hover:bg-white text-black font-mono font-black text-[9px] py-3.5 tracking-widest uppercase focus:outline-none flex items-center justify-center space-x-1 cursor-pointer duration-150"
                            >
                              <span>BUY [${prog.price}]</span>
                            </button>

                            {/* Option 2: Buy with Loyalty points */}
                            <button
                              type="button"
                              onClick={() => handleRedeemWithPoints(prog.id, pointCost)}
                              className="bg-transparent hover:bg-white hover:text-black hover:border-white text-zinc-300 border border-[#444] text-[9.5px] font-mono py-3.5 tracking-tight uppercase cursor-pointer duration-150"
                            >
                              <span>REDEEM [{pointCost} PTS]</span>
                            </button>
                          </div>
                        </div>
                      )}

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
