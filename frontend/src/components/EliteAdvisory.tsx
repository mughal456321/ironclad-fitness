import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Award, Star, ShoppingCart, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ATHLETES, PRODUCTS } from '../data';
import ImageWithFallback from './ImageWithFallback';

export default function EliteAdvisory() {
  const { addToCart, products } = useApp();
  const navigate = useNavigate();

  const handleBuyEndorsedItem = (productId: string) => {
    const matched = PRODUCTS.find(p => p.id === productId);
    if (matched) {
      addToCart({
        product: matched,
        selectedSize: matched.sizes ? matched.sizes[0] : undefined,
        selectedWeight: matched.weights ? matched.weights[0] : undefined,
        selectedColor: matched.colors ? matched.colors[0] : undefined
      });
    }
  };

  return (
    <section id="advisory" className="relative bg-[#080808] py-20 px-4 md:px-8 border-b border-[#222] metallic-grain font-sans">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#222]">
          <div>
            <div className="font-mono text-[10px] text-[#FF5500] font-black uppercase tracking-[0.3em] mb-2">
              04 // CLINICAL COLLABORATORS & ADVISORS
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase italic tracking-tighter leading-none">
              ELITE ADVISORY
            </h2>
            <p className="mt-2 text-xs text-[#888] font-mono tracking-tight uppercase">
              The human assets who push our gears beyond cellular failure thresholds
            </p>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-[9px] text-zinc-500 max-w-xs text-left md:text-right">
            EVERY PRODUCT LINE IS SUBJECT TO BIOCHEMICAL AND MECHANICAL LOAD STRESS TESTING
          </div>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ATHLETES.map((ath) => {
            return (
              <div 
                key={ath.id}
                onClick={() => navigate(`/adviser/${ath.id}`)}
                className="bg-[#121212] border border-[#222] p-6 flex flex-col justify-between hover:border-[#FF5500] transition-all duration-150 cursor-pointer"
              >
                <div>
                  {/* Photo of Athlete - High Contrast B&W Gritty */}
                  <div className="group relative h-64 w-full bg-neutral-900 overflow-hidden mb-6 border border-neutral-800">
                    <ImageWithFallback
                      src={ath.image}
                      alt={ath.name}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                      wrapperClassName="absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    
                    {/* Role Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm p-3 border-l-2 border-l-neon-orange">
                      <span className="block font-mono text-[8px] font-bold text-zinc-400 tracking-wider uppercase">
                        TACTICAL LAB STATION
                      </span>
                      <strong className="block font-display font-medium text-xs text-white uppercase tracking-tight">
                        {ath.role}
                      </strong>
                    </div>
                  </div>

                  {/* Name and Quote */}
                  <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                    {ath.name}
                  </h3>
                  
                  <blockquote className="mt-3 border-l-2 border-l-[#222] pl-3 font-mono text-[10px] text-zinc-400 italic leading-snug">
                    "{ath.quote}"
                  </blockquote>

                  <p className="mt-4 font-sans text-xs text-zinc-400 leading-relaxed font-light">
                    {ath.bio}
                  </p>
                </div>

                {/* Linked gear block - User requests "Linked directly to the specific collections they use" */}
                <div className="mt-6 border-t border-[#222] pt-4 font-sans">
                  <span className="block font-mono text-[8px] font-black text-zinc-500 tracking-widest uppercase mb-3">
                    ATHLETIC LOADOUT // SECURE APPROVED ITEMS:
                  </span>
                  
                  <div className="space-y-2">
                    {ath.favoriteProductIds.map((pId) => {
                      const matItem = products.find(item => item.id === pId);
                      if (!matItem) return null;

                      return (
                        <div 
                          key={pId}
                          className="flex items-center justify-between p-2 bg-[#050505] hover:bg-[#121212] transition-colors border border-[#222] leading-tight"
                        >
                          <div className="flex items-center space-x-2">
                            <ImageWithFallback
                              src={matItem.image}
                              alt={matItem.name}
                              className="h-8 w-8 object-cover"
                              wrapperClassName="h-8 w-8 shrink-0"
                            />
                            <div className="text-left font-mono">
                              <span className="block text-[9px] text-white font-extrabold max-w-[150px] truncate uppercase">
                                {matItem.name}
                              </span>
                              <span className="block text-[8px] text-neon-orange">${matItem.price}</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleBuyEndorsedItem(pId); }}
                            className="bg-neon-orange hover:bg-orange-600 p-2 text-black text-[9px] font-mono uppercase font-black tracking-widest outline-none transition-all duration-150 rounded-none flex items-center space-x-1"
                            title="Add Approved Gear to Cart"
                          >
                            <ShoppingCart className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
