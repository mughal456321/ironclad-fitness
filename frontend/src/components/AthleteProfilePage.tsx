import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Award, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { ATHLETES, PRODUCTS } from '../data';
import { useApp } from '../context/AppContext';
import ImageWithFallback from './ImageWithFallback';
import Header from './Header';
import JoinBrotherhood from './JoinBrotherhood';
import Toast from './Toast';
import MiniCart from './MiniCart';
import Footer from './Footer';

export default function AthleteProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useApp();

  const athlete = ATHLETES.find(a => a.id === id);

  if (!athlete) {
    return (
      <div className="relative min-h-screen bg-[#050505] concrete-texture text-[#E0E0E0] font-sans flex flex-col justify-between border-0 md:border-[16px] border-[#121212] overflow-hidden">
        <Header />
        <main className="flex-1 pt-14 flex items-center justify-center">
          <div className="text-center font-mono">
            <div className="text-4xl font-black text-[#FF5500] mb-4">404</div>
            <div className="text-zinc-400 text-xs tracking-widest uppercase mb-6">Adviser Not Found</div>
            <button
              onClick={() => navigate('/')}
              className="border border-[#333] px-6 py-2 text-xs tracking-widest uppercase font-bold text-white hover:bg-white hover:text-black duration-150 cursor-pointer"
            >
              Return to Base
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const favoriteProducts = PRODUCTS.filter(p => athlete.favoriteProductIds.includes(p.id));

  return (
    <div className="relative min-h-screen bg-[#050505] concrete-texture text-[#E0E0E0] font-sans flex flex-col justify-between border-0 md:border-[16px] border-[#121212] overflow-hidden">
      <Header />
      <main className="flex-1 pt-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">

          {/* Back link */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 hover:text-white mb-8 transition-colors duration-150 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </button>

          {/* Hero section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* Photo */}
            <div className="relative h-[400px] lg:h-[500px] bg-neutral-900 overflow-hidden border border-neutral-800">
              <ImageWithFallback
                src={athlete.image}
                alt={athlete.name}
                className="w-full h-full object-cover"
                wrapperClassName="absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm p-4 border-l-2 border-l-[#FF5500]">
                <span className="block font-mono text-[8px] font-bold text-zinc-400 tracking-wider uppercase">
                  TACTICAL LAB STATION
                </span>
                <strong className="block font-display font-medium text-sm text-white uppercase tracking-tight">
                  {athlete.role}
                </strong>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              <div className="font-mono text-[10px] text-[#FF5500] font-black uppercase tracking-[0.3em] mb-3">
                ELITE ADVISER PROFILE
              </div>
              <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase italic tracking-tighter leading-none mb-4">
                {athlete.name}
              </h1>

              <div className="border-l-2 border-l-[#FF5500] pl-4 mb-6">
                <Quote className="h-4 w-4 text-[#FF5500] mb-2" />
                <blockquote className="font-mono text-sm text-zinc-300 italic leading-relaxed">
                  "{athlete.quote}"
                </blockquote>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  <Award className="h-3.5 w-3.5 text-[#FF5500]" />
                  <span>Biomechanical Credentials</span>
                </div>
                <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                  {athlete.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Endorsed Gear */}
          <div className="border-t border-[#222] pt-10">
            <div className="flex items-center space-x-3 mb-8">
              <Star className="h-5 w-5 text-[#FF5500]" />
              <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase italic tracking-tight">
                Endorsed Loadout
              </h2>
              <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase border border-[#333] px-2 py-0.5">
                {favoriteProducts.length} Items
              </span>
            </div>

            {favoriteProducts.length === 0 ? (
              <p className="font-mono text-xs text-zinc-600">No endorsed products listed.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#121212] border border-[#222] p-4 flex flex-col hover:border-[#FF5500] transition-all duration-150"
                  >
                    <div className="relative h-40 bg-neutral-900 overflow-hidden mb-4 border border-neutral-800">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        wrapperClassName="absolute inset-0"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="font-mono text-[8px] text-[#FF5500] font-bold tracking-widest uppercase">
                        {product.type}
                      </span>
                      <h3 className="font-display font-bold text-sm text-white uppercase tracking-tight mt-1 leading-tight">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="font-mono text-xs text-[#FF5500] font-black">
                          ${product.price}
                        </span>
                        <span className="font-mono text-[8px] text-zinc-600">|</span>
                        <span className="font-mono text-[8px] text-zinc-500">
                          ★ {product.rating}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        addToCart({
                          product,
                          selectedSize: product.sizes?.[0],
                          selectedWeight: product.weights?.[0],
                          selectedColor: product.colors?.[0]
                        });
                      }}
                      className="mt-4 w-full bg-[#FF5500] hover:bg-orange-600 py-2 text-black text-[9px] font-mono uppercase font-black tracking-widest transition-colors duration-150 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
      <JoinBrotherhood />
      <Toast />
      <MiniCart />
    </div>
  );
}
