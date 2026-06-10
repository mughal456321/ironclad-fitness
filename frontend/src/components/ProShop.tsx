import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, Star, Filter, Heart, AlertTriangle, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import ImageWithFallback from './ImageWithFallback';

export default function ProShop({ allProducts }: { allProducts?: Product[] }) {
  const { 
    products: contextProducts,
    activeGoalFilter, 
    activeTypeFilter, 
    searchQuery, 
    setGoalFilter, 
    setTypeFilter, 
    setSearchQuery, 
    addToCart 
  } = useApp();

  const products = allProducts || contextProducts;

  // For the quick item inspection modal or cards
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Track individual card selected variants in state local to avoid global clashing
  const [cardVariations, setCardVariations] = useState<Record<string, { size?: string; weight?: string; color?: string }>>({});

  // Filter products based on search and selected rules
  const filteredProducts = products.filter(prod => {
    const matchesGoal = activeGoalFilter === 'All' || prod.goal === activeGoalFilter;
    const matchesType = activeTypeFilter === 'All' || prod.type === activeTypeFilter;
    const matchesSearch = searchQuery === '' || 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGoal && matchesType && matchesSearch;
  });

  const goals = ['All', 'Muscle Gain', 'Fat Loss', 'Endurance'];
  const types = ['All', 'Hardware', 'Apparel', 'Supplements'];

  const selectCardSize = (productId: string, size: string) => {
    setCardVariations(prev => ({
      ...prev,
      [productId]: { ...prev[productId], size }
    }));
  };

  const selectCardWeight = (productId: string, weight: string) => {
    setCardVariations(prev => ({
      ...prev,
      [productId]: { ...prev[productId], weight }
    }));
  };

  const selectCardColor = (productId: string, color: string) => {
    setCardVariations(prev => ({
      ...prev,
      [productId]: { ...prev[productId], color }
    }));
  };

  const handleQuickAdd = (prod: Product) => {
    const vars = cardVariations[prod.id] || {};
    
    // Choose first default if none selected by user
    const finalSize = vars.size || (prod.sizes && prod.sizes[0]);
    const finalWeight = vars.weight || (prod.weights && prod.weights[0]);
    const finalColor = vars.color || (prod.colors && prod.colors[0]);

    addToCart({
      product: prod,
      selectedSize: finalSize,
      selectedWeight: finalWeight,
      selectedColor: finalColor
    });
  };

  return (
    <section id="pro-shop" className="relative bg-[#080808] py-20 px-4 md:px-8 metallic-grain border-b border-[#222]">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#222]">
          <div>
            <div className="font-mono text-[10px] text-[#FF5500] font-black uppercase tracking-[0.3em] mb-2">
              02 // Elite Equipment Showcase
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase italic tracking-tighter leading-none">
              THE PRO-SHOP
            </h2>
            <p className="mt-2 text-xs text-[#888] font-mono tracking-tight uppercase">
              High density mechanical units / custom woven armor
            </p>
          </div>

          {/* Quick Informational Search Input */}
          <div className="mt-4 md:mt-0 relative w-full md:w-80">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH CATALOG OR COMPOSITION..."
              className="w-full bg-[#121212] border border-[#222] focus:border-neon-orange px-4 py-2.5 pl-10 text-xs font-mono text-white focus:outline-none placeholder-zinc-500 uppercase rounded-none tracking-widest font-bold"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-[10px] text-neon-orange font-mono font-bold hover:underline"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Multi-layered System filter */}
        <div className="bg-[#050505] p-4 border border-[#222] mb-10 flex flex-col gap-4">
          
          {/* Layer A: Goal-Based Filtering */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest w-28">
              TACTICAL GOAL:
            </span>
            <div className="flex flex-wrap gap-1">
              {goals.map(g => (
                <button
                  key={g}
                  onClick={() => setGoalFilter(g)}
                  className={`px-3 py-1 text-[10px] font-mono tracking-wider font-bold transition-all uppercase rounded-none ${
                    activeGoalFilter === g 
                      ? 'bg-neon-orange text-black border border-neon-orange' 
                      : 'bg-neutral-900/60 text-zinc-400 border border-neutral-800 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  {g === 'All' ? 'ALL GOALS' : g}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[1px] bg-[#222] w-full" />

          {/* Layer B: Product Type-Based Filtering */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest w-28">
              PRODUCT TYPE:
            </span>
            <div className="flex flex-wrap gap-1">
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1 text-[10px] font-mono tracking-wider font-bold transition-all uppercase rounded-none ${
                    activeTypeFilter === t 
                      ? 'bg-neon-orange text-black border border-neon-orange' 
                      : 'bg-neutral-900/60 text-zinc-400 border border-neutral-800 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  {t === 'All' ? 'ALL GEAR' : t}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Counter & Catalog Grid */}
        <div className="mb-6 font-mono text-[10px] text-[#888] flex justify-between items-center bg-[#121212] p-2 border border-[#222]">
          <span>CATALOG MODULES FOUND: <strong className="text-white font-black">{filteredProducts.length} ARTICLES</strong></span>
          <span className="text-zinc-500">EXPRESS COMPLIANT FREIGHT SYSTEM REGISTERED</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-neutral-900 bg-black/45">
            <p className="font-mono text-zinc-500 text-sm tracking-widest uppercase">
              NO HEAVY HARDWARE OR APPAREL CRITERIA MET.
            </p>
            <button 
              onClick={() => { setGoalFilter('All'); setTypeFilter('All'); setSearchQuery(''); }}
              className="mt-4 font-mono text-xs font-bold text-neon-orange hover:underline uppercase"
            >
              Reset Terminal Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((prod) => {
              const currentVars = cardVariations[prod.id] || {};
              const isLimited = prod.stockCount <= 10;

              return (
                <motion.div
                  key={prod.id}
                  layoutId={`prod-card-${prod.id}`}
                  className="group relative flex flex-col justify-between bg-[#121212] border border-[#222] hover:border-[#FF5500] duration-200"
                >
                  {/* Performance Badges */}
                  <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5 pointer-events-none">
                    {prod.isLimitedEdition && (
                      <span className="font-mono text-[8px] font-black bg-white text-black px-1.5 py-0.5 tracking-wider uppercase">
                        LIMITED EDT.
                      </span>
                    )}
                    {prod.isLimitedBatch && (
                      <span className="font-mono text-[8px] font-black bg-neon-orange text-black px-1.5 py-0.5 tracking-wider uppercase">
                        LIMITED BATCH
                      </span>
                    )}
                    {prod.isAthleteApproved && (
                      <span className="font-mono text-[8px] font-black bg-zinc-900 text-neon-orange border border-neon-orange/40 px-1.5 py-0.5 tracking-widest uppercase">
                        ATHLETE APPROVED
                      </span>
                    )}
                  </div>

                  {/* Image Canvas with gritty hover zoom option */}
                  <div className="relative aspect-square w-full bg-neutral-900 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(prod)}>
                    <ImageWithFallback
                      src={prod.image}
                      alt={prod.name}
                      className="h-full w-full object-cover group-hover:scale-105 duration-300"
                      wrapperClassName="absolute inset-0"
                    />
                    {/* Quick View Cover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 duration-150 flex flex-col items-center justify-center p-4">
                      <span className="font-mono text-[9px] text-neon-orange border border-neon-orange/80 bg-black px-3 py-1.5 tracking-widest uppercase mb-2">
                        INSPECT SPECIFICATIONS
                      </span>
                      <p className="text-[10px] text-zinc-300 min-h-[30px] overflow-hidden text-center max-w-[200px] leading-tight font-mono truncate">
                        {prod.description}
                      </p>
                    </div>
                  </div>

                  {/* Information Box */}
                  <div className="p-4 flex-1 flex flex-col justify-between bg-[#121212] [content-visibility:auto]">
                    
                    <div>
                      {/* Title & Price */}
                      <div className="flex items-start justify-between">
                        <h3 className="font-display font-black text-sm tracking-tight text-white group-hover:text-neon-orange transition-colors duration-150 uppercase leading-snug">
                          {prod.name}
                        </h3>
                        <div className="text-right font-mono ml-2">
                          <span className="text-white text-sm font-black">${prod.price}</span>
                          {prod.originalPrice && (
                            <span className="block text-[10px] text-zinc-500 line-through font-bold">${prod.originalPrice}</span>
                          )}
                        </div>
                      </div>

                      {/* Goal and Material tags */}
                      <div className="flex items-center space-x-1.5 mt-2 font-mono text-[8px] text-[#888] font-bold uppercase tracking-widest">
                        <span>{prod.type}</span>
                        <span>•</span>
                        <span className="text-zinc-300">{prod.goal}</span>
                      </div>

                      {/* Hardcore Features snippet (High density information constraint) */}
                      <ul className="mt-3 space-y-1 border-t border-[#222] pt-2.5 text-zinc-400 text-[10px] font-mono leading-tight">
                        {prod.features.slice(0, 2).map((feat, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-neon-orange mr-1.5">✓</span>
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Stock indicator levels */}
                      <div className="mt-4">
                        {isLimited ? (
                          <div className="flex items-center space-x-1.5 bg-orange-950/30 border border-orange-900/40 p-1 px-2 font-mono text-[8px] text-neon-orange font-bold uppercase tracking-widest">
                            <AlertTriangle className="h-3 w-3 animate-pulse" />
                            <span>STOCK: ONLY {prod.stockCount} ATOMS REMAINING</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between font-mono text-[8px] tracking-wider text-zinc-500">
                            <span>STOCK LEVEL GAUGED</span>
                            <span className="text-zinc-400">STABLE ({prod.stockCount} UNITS)</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Integrated Dynamic Variant Selecting Panel */}
                    <div className="mt-4 border-t border-[#222] pt-3 space-y-2">
                      
                      {/* Size layout */}
                      {prod.sizes && (
                        <div>
                          <div className="font-mono text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
                            SELECT BODY FIT:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {prod.sizes.map(size => {
                              const isSelected = currentVars.size === size || (!currentVars.size && prod.sizes && prod.sizes[0] === size);
                              return (
                                <button
                                  key={size}
                                  onClick={() => selectCardSize(prod.id, size)}
                                  className={`px-1.5 py-0.5 text-[8px] font-mono font-bold border transition-colors ${
                                    isSelected 
                                      ? 'bg-neon-orange border-neon-orange text-black font-black' 
                                      : 'bg-black border-neutral-800 text-zinc-400 hover:border-zinc-500'
                                  }`}
                                >
                                  {size}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Weight layout */}
                      {prod.weights && (
                        <div>
                          <div className="font-mono text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
                            CALIBRATE WEIGHT:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {prod.weights.map(weight => {
                              const isSelected = currentVars.weight === weight || (!currentVars.weight && prod.weights && prod.weights[0] === weight);
                              return (
                                <button
                                  key={weight}
                                  onClick={() => selectCardWeight(prod.id, weight)}
                                  className={`px-1.5 py-0.5 text-[8px] font-mono font-bold border transition-colors ${
                                    isSelected 
                                      ? 'bg-neon-orange border-neon-orange text-black font-black' 
                                      : 'bg-black border-neutral-800 text-zinc-400 hover:border-zinc-500'
                                  }`}
                                >
                                  {weight}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Color layout */}
                      {prod.colors && (
                        <div>
                          <div className="font-mono text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
                            COATING SHADE:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {prod.colors.map(color => {
                              const isSelected = currentVars.color === color || (!currentVars.color && prod.colors && prod.colors[0] === color);
                              return (
                                <button
                                  key={color}
                                  onClick={() => selectCardColor(prod.id, color)}
                                  className={`px-2 py-0.5 text-[8px] font-mono font-bold border transition-colors ${
                                    isSelected 
                                      ? 'bg-orange-800 text-white border-neon-orange' 
                                      : 'bg-black border-neutral-800 text-zinc-400 hover:border-zinc-500'
                                  }`}
                                >
                                  {color}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Action trigger: QUICK BUY */}
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleQuickAdd(prod)}
                        className="w-full border border-[#444] py-2 text-[10px] font-black uppercase tracking-widest hover:bg-[#FF5500] hover:border-[#FF5500] hover:text-black transition-all bg-transparent text-white cursor-pointer duration-150 flex items-center justify-center space-x-1"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        <span>Quick Buy +</span>
                      </motion.button>

                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* Advanced Product Specs Modal Panel (Lightbox overlay on click) */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#090909] border-2 border-neutral-900 md:border-neon-orange p-6 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-neon-orange font-mono text-xs font-bold border border-neutral-800 px-3 py-1.5 focus:outline-none bg-black"
              >
                CLOSE [X]
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <ImageWithFallback
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full object-cover aspect-square transition-all duration-300"
                    wrapperClassName="border border-neutral-800"
                  />
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-neutral-950 p-2 border border-neutral-900 border-l-2 border-l-neon-orange">
                      <span className="block font-mono text-[8px] text-zinc-500">RATING RANGES</span>
                      <strong className="font-display font-black text-sm text-white">{selectedProduct.rating} / 5.0</strong>
                    </div>
                    <div className="bg-neutral-950 p-2 border border-neutral-900 border-l-2 border-l-white">
                      <span className="block font-mono text-[8px] text-zinc-500">VERIFIED TESTERS</span>
                      <strong className="font-display font-black text-sm text-white">{selectedProduct.ratingCount} ATHLETES</strong>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[8px] font-bold text-neon-orange border border-neon-orange/20 px-2 py-0.5 tracking-wider uppercase">
                      SPECIFICATIONS DOSSIER
                    </span>
                    <h3 className="font-display font-black text-xl text-white uppercase mt-2 tracking-tight">
                      {selectedProduct.name}
                    </h3>

                    <div className="font-mono text-xs font-bold text-neutral-400 mt-2 flex gap-4 uppercase bg-neutral-950 p-1 border border-neutral-900 px-2.5">
                      <span>TYPE: <strong className="text-white">{selectedProduct.type}</strong></span>
                      <span>•</span>
                      <span>GOAL: <strong className="text-neon-orange">{selectedProduct.goal}</strong></span>
                    </div>

                    <p className="mt-4 font-sans text-xs text-zinc-300 leading-relaxed font-light">
                      {selectedProduct.description}
                    </p>

                    <div className="mt-4 space-y-2">
                      <span className="font-mono text-[9px] font-black tracking-wider text-zinc-400 uppercase">
                        ANABOLIC & BIOMECHANICAL STRENGTHS:
                      </span>
                      <ul className="space-y-1 text-xs font-mono">
                        {selectedProduct.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-zinc-300 font-light text-[11px]">
                            <span className="text-neon-orange mr-2">⌁</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-neutral-900 pt-4">
                    <div className="flex items-center justify-between font-mono text-xs font-bold tracking-wider mb-2 text-zinc-400">
                      <span>PRICE STRUCTURE:</span>
                      <span className="text-white text-lg font-black">${selectedProduct.price}</span>
                    </div>

                    <button 
                      onClick={() => {
                        handleQuickAdd(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="w-full bg-neon-orange hover:bg-orange-600 text-black font-mono font-black text-xs py-3.5 tracking-widest uppercase focus:outline-none flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>SECURE RAW DROPS INSTANTLY</span>
                    </button>
                    <p className="text-[9px] text-zinc-500 font-mono text-center mt-2 tracking-wider">
                      RECLAIM LOYALTY SAVINGS: +{Math.floor(selectedProduct.price * 1.5)} IRON POINTS EARNED
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
