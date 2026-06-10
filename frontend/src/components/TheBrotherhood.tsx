import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Flame, Star, ShoppingCart, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRANSFORMATIONS } from '../data';
import ImageWithFallback from './ImageWithFallback';

export default function TheBrotherhood() {
  const { products, programs, addToCart } = useApp();

  const handleBuyPinnedItem = (itemId: string) => {
    const matProduct = products.find(p => p.id === itemId);
    if (matProduct) {
      addToCart({
        product: matProduct,
        selectedSize: matProduct.sizes ? matProduct.sizes[0] : undefined,
        selectedWeight: matProduct.weights ? matProduct.weights[0] : undefined,
        selectedColor: matProduct.colors ? matProduct.colors[0] : undefined
      });
      return;
    }
    const matProgram = programs.find(p => p.id === itemId);
    if (matProgram) {
      addToCart({ program: matProgram });
    }
  };

  const SOCIAL_FEED = [
    {
      id: 'sf1',
      user: '@tactical.gainz',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop',
      likedProduct: 'IRONCLAD BILLET BARBELL',
      caption: 'Hit an absolute PR double of 495lbs. Zero flex, extreme hold. Knurling bit right into the shelf.'
    },
    {
      id: 'sf2',
      user: '@shredded_seraph',
      image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=400&auto=format&fit=crop',
      likedProduct: 'NITRIC BLAST FUEL',
      caption: '3 AM wakeup call. Hyper-Drive pump is genuinely clinical. Veins popping on the first warm set.'
    },
    {
      id: 'sf3',
      user: '@barbell_brigade_raw',
      image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=400&auto=format&fit=crop',
      likedProduct: 'APEX WEIGHTED VEST',
      caption: 'Double Murph session complete. Zero strap shifting during the sprint blocks. Unbelievable durability.'
    },
    {
      id: 'sf4',
      user: '@viking_iron_40',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop',
      likedProduct: 'OBSIDIAN REINFORCED HOODIE',
      caption: 'Garage gym at 28F outside. Heavy loopback keeps joints core hot. Barbell catches are fully secure.'
    }
  ];

  return (
    <section id="brotherhood" className="relative bg-[#050505] py-20 px-4 md:px-8 border-b border-[#222] scanlines font-sans">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#222]">
          <div>
            <div className="font-mono text-[10px] text-[#FF5500] font-black uppercase tracking-[0.3em] mb-2">
              05 // MEMBER TRANSFORMATIONS & COMMUNITY REPORT
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase italic tracking-tighter leading-none">
              MEMBER TRANSFORMATIONS
            </h2>
            <p className="mt-2 text-xs text-[#888] font-mono tracking-tight uppercase">
              No soft lighting. No fake models. Real performance output datasets.
            </p>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-[9px] text-zinc-500 max-w-xs text-left md:text-right">
            VERIFIED SECURE BUYERS SYSTEM SYNCHRONIZATION
          </div>
        </div>

        {/* Transformations Block */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {TRANSFORMATIONS.map((story) => {
            return (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                whileHover={{ borderColor: '#FF5500' }}
                className="bg-[#121212] border border-[#222] p-6 flex flex-col justify-between will-change-transform"
              >
                <div>
                  {/* Before / After Dual Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4 relative">
                    
                    {/* Before Image */}
                    <div className="relative aspect-[3/4] bg-neutral-900 border border-neutral-800 overflow-hidden">
                      <ImageWithFallback
                        src={story.imageBefore}
                        alt="Before"
                        className="w-full h-full object-cover brightness-90"
                        wrapperClassName="absolute inset-0"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      
                      <span className="absolute bottom-2 left-2 font-mono text-[9px] font-bold bg-neutral-900/90 text-zinc-400 border border-neutral-800 px-1.5 py-0.5 uppercase">
                        BEFORE / {story.beforeWeight}
                      </span>
                    </div>

                    {/* After Image */}
                    <div className="relative aspect-[3/4] bg-neutral-900 border border-neon-orange/40 overflow-hidden">
                      <ImageWithFallback
                        src={story.imageAfter}
                        alt="After"
                        className="w-full h-full object-cover contrast-110"
                        wrapperClassName="absolute inset-0"
                      />
                      <div className="absolute inset-0 border-2 border-neon-orange/20" />

                      <span className="absolute bottom-2 left-2 font-mono text-[9px] font-black bg-neon-orange text-black px-1.5 py-0.5 uppercase">
                        AFTER / {story.afterWeight}
                      </span>
                    </div>

                    {/* Absolute Timeframe Center Indicator */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0c0c0c] border border-[#222] px-3 py-1 font-mono text-[9px] font-black tracking-widest text-white uppercase shadow-xl whitespace-nowrap">
                      {story.timeframe} STRUGGLE
                    </div>
                  </div>

                  {/* Customer Status Details */}
                  <div className="flex items-center space-x-2 mt-4">
                    <span className="font-display font-black text-sm text-white uppercase">
                      {story.name} (AGE {story.age})
                    </span>
                    
                    {story.isVerifiedBuyer && (
                      <span className="inline-flex items-center space-x-1 bg-green-500/10 border border-green-500/30 text-green-400 px-1.5 py-0.5 font-mono text-[8px] font-bold tracking-wider uppercase">
                        <ShieldCheck className="h-2.5 w-2.5" />
                        <span>VERIFIED BUYER</span>
                      </span>
                    )}
                  </div>

                  <div className="mt-1 font-mono text-[10px] text-neon-orange uppercase font-bold tracking-wider">
                    ACHIEVED: {story.achievement}
                  </div>

                  <p className="mt-3 font-sans text-xs text-zinc-300 font-light leading-relaxed">
                    "{story.story}"
                  </p>
                </div>

                {/* Transformed pinned products box */}
                <div className="mt-6 border-t border-[#222] pt-4">
                  <span className="block font-mono text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-2.5">
                    DEPLOYED PRODUCTS LOADOUT:
                  </span>

                  <div className="grid grid-cols-1 gap-2">
                    {story.pinnedProductIds.map((pId) => {
                      const matchedP = products.find(p => p.id === pId) || programs.find(p => p.id === pId);
                      const finalName = matchedP ? matchedP.name : 'DIGITAL CLASS';
                      const finalPrice = matchedP ? matchedP.price : 0;
                      const finalImage = matchedP ? matchedP.image : 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=300&auto=format&fit=crop';

                      return (
                        <motion.div
                          key={pId}
                          whileHover={{ borderColor: 'rgba(255,255,255,0.2)' }}
                          className="flex items-center justify-between bg-black/70 p-2 border border-[#222] text-left font-mono leading-tight will-change-transform"
                        >
                          <div className="flex items-center space-x-2">
                            <ImageWithFallback
                              src={finalImage}
                              alt={finalName}
                              className="h-8 w-8 object-cover"
                              wrapperClassName="h-8 w-8 shrink-0"
                            />
                            <div>
                              <span className="block text-[9px] text-zinc-300 font-extrabold max-w-[150px] truncate uppercase">
                                {finalName}
                              </span>
                              <span className="block text-[8px] text-zinc-500">${finalPrice} SECURED</span>
                            </div>
                          </div>

                          <motion.button
                            type="button"
                            whileHover={{ backgroundColor: '#ffffff', color: '#000000' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleBuyPinnedItem(pId)}
                            className="bg-[#FF5500] text-black font-mono tracking-widest font-black uppercase p-2 text-[8px] rounded-none cursor-pointer"
                            title="Add item to loadout"
                          >
                            <ShoppingCart className="h-3.5 w-3.5" />
                          </motion.button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Tactical Instagram/TikTok Social loop grid simulation */}
        <div className="mt-16 pt-12 border-t border-[#222]">
          <div className="text-center md:text-left mb-8">
            <div className="font-mono text-[9px] text-zinc-500 font-black uppercase tracking-widest mb-1">
              LIVE DIGITAL DISCIPLINARY UPLOADS // #IRONCLADELITE
            </div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
              THE BROTHERHOOD SOCIAL TELEMETRY
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SOCIAL_FEED.map((post) => {
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  whileHover={{ borderColor: '#FF5500' }}
                  className="group relative aspect-square bg-[#0c0c0c] border border-[#222] overflow-hidden cursor-pointer will-change-transform"
                >
                  <ImageWithFallback
                    src={post.image}
                    alt="Social feed"
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 will-change-transform"
                    wrapperClassName="absolute inset-0"
                  />
                  
                  <div className="absolute inset-0 bg-black/15 transition-opacity duration-200 ease-out group-hover:bg-black/40" />

                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/90 to-transparent border-t border-[#222] opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out translate-y-2 group-hover:translate-y-0 will-change-transform">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[9px] text-neon-orange font-black">
                        {post.user}
                      </span>
                      <span className="inline-flex items-center space-x-1 text-zinc-400 font-mono text-[8px]">
                        <MessageSquare className="h-2 w-2" />
                        <span>FEED</span>
                      </span>
                    </div>

                    <p className="font-mono text-[9.5px] text-zinc-300 leading-tight">
                      {post.caption}
                    </p>

                    <div className="mt-2.5 pt-2.5 border-t border-[#222] text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                      USING: <span className="text-white font-bold">{post.likedProduct}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
