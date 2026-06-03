import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShieldCheck, CreditCard, ChevronRight, CheckCircle2, ChevronLeft, Plus, Minus, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, DIGITAL_PROGRAMS } from '../data';

export default function MiniCart() {
  const { 
    products,
    programs,
    cart, 
    isCartOpen, 
    checkoutStep,
    setCartOpen, 
    updateCartQuantity, 
    removeFromCart, 
    setCheckoutStep,
    placeOrder,
    addToCart,
    lastOrderId,
    showToast
  } = useApp();

  // Internal checkout shipping state
  const [shippingForm, setShippingForm] = useState({
    name: 'GARRISON SHROUD',
    street: '894 KNURLED STEEL BLVD',
    city: 'DETROIT',
    zip: '48201',
    cardNum: '4111 8892 0192 4892'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingForm({
      ...shippingForm,
      [e.target.name]: e.target.value
    });
  };

  // Cross sell "Complete the Kit" items (Products not currently in cart)
  const cartProductIds = cart.map(item => item.product?.id || item.program?.id);
  const upsellItems = [...products, ...programs]
    .filter(item => !cartProductIds.includes(item.id))
    .slice(0, 2);

  // Totals
  const subtotal = cart.reduce((acc, item) => {
    const price = item.product ? item.product.price : (item.program ? item.program.price : 0);
    return acc + (price * item.quantity);
  }, 0);

  const accumulatedPoints = Math.floor(subtotal * 1.5);
  const shippingFee = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const grandTotal = subtotal + shippingFee;

  const handleNextStep = () => {
    if (checkoutStep === 'idle') {
      setCheckoutStep('billing');
    } else if (checkoutStep === 'billing') {
      if (!shippingForm.name || !shippingForm.street || !shippingForm.city || !shippingForm.zip) {
        showToast('All fields must be filled.', 'error');
        return;
      }
      setCheckoutStep('review');
    }
  };

  const handleBackStep = () => {
    if (checkoutStep === 'billing') {
      setCheckoutStep('idle');
    } else if (checkoutStep === 'review') {
      setCheckoutStep('billing');
    }
  };

  const handleConfirmSubmit = () => {
    placeOrder(shippingForm);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          
          {/* Backdrop Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (checkoutStep !== 'confirmed') {
                setCartOpen(false);
                setCheckoutStep('idle');
              }
            }}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#0c0c0c] border-l border-[#222] flex flex-col justify-between shadow-2xl relative"
            >
              
              {/* Header block */}
              <div className="p-4 border-b border-[#222] flex justify-between items-center bg-[#050505]">
                <div className="font-mono text-left">
                  <span className="block text-[8px] text-[#FF5500] font-black uppercase tracking-widest">
                    SECURED TRANSPORT // TERMINAL CART
                  </span>
                  <h3 className="font-display font-black text-base text-white uppercase tracking-tight">
                    {checkoutStep === 'idle' && 'CURRENT LOADOUT'}
                    {checkoutStep === 'billing' && 'STEP 01 // SHIPPING DOSSIER'}
                    {checkoutStep === 'review' && 'STEP 02 // CONFIRM AMMUNITION'}
                    {checkoutStep === 'confirmed' && 'SYSTEM UNLOCKED'}
                  </h3>
                </div>
                
                <button 
                  onClick={() => {
                    setCartOpen(false);
                    if (checkoutStep === 'confirmed') setCheckoutStep('idle');
                  }}
                  className="p-1 px-2.5 text-zinc-400 hover:text-[#FF5500] border border-[#444] hover:border-[#FF5500] bg-black font-mono text-[10px] font-bold focus:outline-none cursor-pointer duration-150"
                >
                  CLOSE [X]
                </button>
              </div>

              {/* Status Stepper Indicator (High Information Density) */}
              {checkoutStep !== 'confirmed' && (
                <div className="bg-black border-b border-[#222] grid grid-cols-3 font-mono text-[8px] font-bold tracking-widest text-center">
                  <div className={`p-2.5 border-r border-[#222] ${checkoutStep === 'idle' ? 'bg-[#121212] text-[#FF5500]' : 'text-zinc-500'}`}>
                    01 // LOADOUT
                  </div>
                  <div className={`p-2.5 border-r border-[#222] ${checkoutStep === 'billing' ? 'bg-[#121212] text-[#FF5500]' : 'text-zinc-500'}`}>
                    02 // SHIPPING
                  </div>
                  <div className={`p-2.5 ${checkoutStep === 'review' ? 'bg-[#121212] text-[#FF5500]' : 'text-zinc-500'}`}>
                    03 // RECLAIM
                  </div>
                </div>
              )}

              {/* Body Cart Items Panel */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">

                {/* 1. STATE: STANDARD SHOPPING CART LIST (IDLE) */}
                {checkoutStep === 'idle' && (
                  <>
                    {cart.length === 0 ? (
                      <div className="text-center py-16 border border-dashed border-[#222]">
                        <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                          AMMO BELT IS CURRENTLY EMPTY.
                        </p>
                        <button 
                          onClick={() => setCartOpen(false)}
                          className="mt-4 bg-[#FF5500] text-black px-4 py-2 font-mono text-[10px] font-black uppercase tracking-widest hover:bg-white focus:outline-none duration-150 cursor-pointer"
                        >
                          COMMENCE SHOPPING
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {cart.map((item, idx) => {
                          const isDigital = item.program !== undefined;
                          const name = isDigital ? item.program!.name : item.product!.name;
                          const price = isDigital ? item.program!.price : item.product!.price;
                          const image = isDigital ? item.program!.image : item.product!.image;

                          return (
                            <div 
                              key={idx}
                              className="bg-neutral-950 p-3 border border-neutral-900 flex justify-between items-start gap-3"
                            >
                              <div className="flex items-center space-x-3">
                                <img 
                                  src={image} 
                                  alt={name} 
                                  className="h-12 w-12 object-cover border border-neutral-800"
                                />
                                <div className="text-left font-mono">
                                  <span className="block text-[10px] text-white font-extrabold uppercase leading-tight max-w-[200px] truncate">
                                    {name}
                                  </span>
                                  
                                  {/* Custom variations output */}
                                  {!isDigital && (
                                    <div className="flex flex-wrap gap-1 mt-1 text-[8px] text-zinc-500 tracking-tight">
                                      {item.selectedSize && <span>FIT: {item.selectedSize}</span>}
                                      {item.selectedWeight && <span>CALIBER: {item.selectedWeight}</span>}
                                      {item.selectedColor && <span>SHADE: {item.selectedColor}</span>}
                                    </div>
                                  )}
                                  
                                  {isDigital && (
                                    <span className="block text-[8px] text-neon-orange tracking-widest uppercase mt-0.5">
                                      DIGITAL MANUAL BLUEPRINT
                                    </span>
                                  )}

                                  <span className="block text-white text-[10px] font-black mt-1">${price}</span>
                                </div>
                              </div>

                              <div className="flex flex-col items-end justify-between self-stretch">
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(idx)}
                                  className="text-zinc-600 hover:text-red-500 focus:outline-none"
                                  title="Purge item from loadout"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>

                                {/* Quantity Toggles */}
                                <div className="flex items-center space-x-1.5 border border-neutral-900 bg-black p-0.5 mt-2">
                                  <button
                                    onClick={() => updateCartQuantity(idx, item.quantity - 1)}
                                    className="p-1 text-zinc-400 hover:text-neon-orange"
                                  >
                                    <Minus className="h-2 w-2" />
                                  </button>
                                  <span className="font-mono text-[9px] font-black text-white px-1">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateCartQuantity(idx, item.quantity + 1)}
                                    className="p-1 text-zinc-400 hover:text-neon-orange"
                                  >
                                    <Plus className="h-2 w-2" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Integrated Cross Sell ("Complete the Kit") */}
                    {upsellItems.length > 0 && cart.length > 0 && (
                      <div className="mt-6 border-t border-neutral-900 pt-5">
                        <span className="block font-mono text-[8px] font-bold text-zinc-500 uppercase tracking-widest mb-3 text-left">
                          COMPLETE THE KIT // MULTI-LOAD RECOMMENDATIONS
                        </span>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {upsellItems.map((up) => {
                            const isDig = 'duration' in up;
                            return (
                              <div 
                                key={up.id}
                                className="bg-neutral-950 p-2.5 border border-dashed border-neutral-900 text-left flex flex-col justify-between"
                              >
                                <div>
                                  <img 
                                    src={up.image} 
                                    alt={up.name} 
                                    className="h-16 w-full object-cover mb-2 border border-neutral-900"
                                  />
                                  <h4 className="font-mono text-[9px] text-white font-black uppercase truncate">
                                    {up.name}
                                  </h4>
                                  <span className="block font-mono text-[8px] text-neon-orange mt-0.5">
                                    ${up.price}
                                  </span>
                                </div>
                                
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (isDig) {
                                      addToCart({ program: up as any }, true);
                                    } else {
                                      addToCart({ product: up as any }, true);
                                    }
                                  }}
                                  className="mt-3 bg-white hover:bg-neon-orange text-black font-mono font-black text-[8px] py-1.5 text-center tracking-widest uppercase focus:outline-none"
                                >
                                  + COMPLEMENT
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* 2. STATE: SHIPPING DOSSIER DATA INPUT */}
                {checkoutStep === 'billing' && (
                  <div className="space-y-4">
                    <div className="bg-[#050505] p-3 border border-[#222]">
                      <span className="block font-mono text-[8px] text-[#888] font-bold uppercase tracking-widest mb-1.5">
                        REGULAR COMPLIANT SHIPPING PROTOCOL
                      </span>
                      <p className="font-sans text-[11px] text-[#888] font-light leading-snug">
                        All heavy duty barbell packages ship in armored timber freights. Tracking links will activate instantly inside your dashboard.
                      </p>
                    </div>

                    <div className="space-y-3 text-left font-mono text-[9px] font-bold tracking-wider text-zinc-400">
                      <div>
                        <label className="block mb-1 text-[8px] text-zinc-500 uppercase">ATHLETE REGISTERED NAME:</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={shippingForm.name}
                          onChange={handleInputChange}
                          className="w-full bg-[#050505] border border-[#222] hover:border-[#444] focus:border-[#FF5500] px-3 py-2 text-white outline-none rounded-none text-xs text-left" 
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-[8px] text-zinc-500 uppercase">DESTINATION ADRESSE / STREET:</label>
                        <input 
                          type="text" 
                          name="street" 
                          value={shippingForm.street}
                          onChange={handleInputChange}
                          className="w-full bg-[#050505] border border-[#222] hover:border-[#444] focus:border-[#FF5500] px-3 py-2 text-white outline-none rounded-none text-xs text-left" 
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block mb-1 text-[8px] text-zinc-500 uppercase">METROPOLIS / CITY:</label>
                          <input 
                            type="text" 
                            name="city" 
                            value={shippingForm.city}
                            onChange={handleInputChange}
                            className="w-full bg-[#050505] border border-[#222] hover:border-[#444] focus:border-[#FF5500] px-3 py-2 text-white outline-none rounded-none text-xs text-left" 
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-[8px] text-zinc-500 uppercase">ZIP COORDINATE:</label>
                          <input 
                            type="text" 
                            name="zip" 
                            value={shippingForm.zip}
                            onChange={handleInputChange}
                            className="w-full bg-[#050505] border border-[#222] hover:border-[#444] focus:border-[#FF5500] px-3 py-2 text-white outline-none rounded-none text-xs text-left" 
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#222] mt-2">
                        <label className="block mb-1 text-[8px] text-zinc-500 uppercase">LOOT SAVING MATRIX / DEBIT CARD:</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            name="cardNum" 
                            value={shippingForm.cardNum}
                            onChange={handleInputChange}
                            className="w-full bg-[#050505] border border-[#222] hover:border-[#444] focus:border-[#FF5FF5] px-3 py-2 pl-9 text-white outline-none rounded-none text-xs text-left" 
                          />
                          <CreditCard className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#FF5500]" />
                        </div>
                        <span className="block text-[8px] text-zinc-600 mt-1 uppercase">
                          * ALL CREDIT TRANSACTIONS ARE PROCESSED THROUGH END-TO-END SILO SYNC LOCKS.
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. STATE: CONFIRM AMMUNITION ORDER REVIEW */}
                {checkoutStep === 'review' && (
                  <div className="space-y-4">
                    <div className="bg-[#FF5500]/10 border border-[#FF5500]/25 p-3 text-left">
                      <span className="font-mono text-[8px] text-[#FF5500] font-black uppercase tracking-widest block mb-1">
                        CONFIRM SECURED INTENT
                      </span>
                      <p className="font-mono text-[9px] text-zinc-300 leading-tight">
                        Review your tactical physical inventory and body assets before triggering the final charge. Digital manual authorizations will be allocated instantly.
                      </p>
                    </div>

                    {/* Summary list */}
                    <div className="border border-[#222] bg-[#050505] divide-y divide-[#222]">
                      
                      <div className="p-3 text-left font-mono">
                        <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-widest mb-1">
                          DELIVERY BASEPOINT:
                        </span>
                        <div className="text-[10px] text-white">
                          <strong className="text-zinc-200">{shippingForm.name}</strong> <br />
                          {shippingForm.street}, {shippingForm.city} ({shippingForm.zip})
                        </div>
                      </div>

                      <div className="p-3 text-left font-mono">
                        <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-widest mb-1">
                          LIQUID ASSETS SECURED:
                        </span>
                        <span className="text-[10px] text-white font-bold block truncate">
                          DEBIT: {shippingForm.cardNum.replace(/\d{4}\s\d{4}\s\d{4}/, '•••• •••• ••••')}
                        </span>
                      </div>

                      <div className="p-3 text-left font-mono">
                        <span className="block text-[8px] text-zinc-500 font-bold uppercase tracking-widest mb-2">
                          SUMMARY LOOT DESCRIPTIONS:
                        </span>
                        
                        <div className="space-y-1.5 text-[9px]">
                          {cart.map((item, index) => {
                            const subName = item.product ? item.product.name : item.program!.name;
                            const subPrice = item.product ? item.product.price : item.program!.price;
                            return (
                              <div key={index} className="flex justify-between items-center text-zinc-300">
                                <span className="truncate max-w-[200px]">{item.quantity}x {subName}</span>
                                <span className="text-white">${subPrice * item.quantity}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 4. STATE: ORDER CONFIRMED SUCCESS PANEL */}
                {checkoutStep === 'confirmed' && (
                  <div className="py-8 text-center space-y-6">
                    <div className="mx-auto h-12 w-12 rounded-full bg-[#FF5500]/20 border border-[#FF5500] flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-[#FF5500] animate-bounce" />
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-mono text-[9px] text-[#FF5500] font-black uppercase tracking-widest">
                        TRANSACTION MUTATION PASSED
                      </span>
                      <h4 className="font-display font-black text-xl text-white uppercase leading-none">
                        ORDER RECEIVED.
                      </h4>
                      <p className="font-sans text-xs text-zinc-400 font-light leading-relaxed max-w-xs mx-auto">
                        Your equipment order is currently undergoing high-precision packaging in the Detroit warehouse facility. Digital manuals are now authorized.
                      </p>
                    </div>

                    {/* Order metadata and claim indicators */}
                    <div className="bg-[#050505] p-4 border border-[#222] text-left font-mono text-[9px] space-y-2">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">SYSTEM CODES:</span>
                        <span className="text-white font-bold">{lastOrderId || 'ORD-PENDING'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">FREIGHT CARRIER:</span>
                        <span className="text-white font-bold">IRONCLAD COMPLIANT COURIER</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">ESTIMATED LAUNCH:</span>
                        <span className="text-[#FF5500] font-bold">36 - 48 HRS</span>
                      </div>
                      <div className="pt-2 border-t border-[#222] flex justify-between items-center">
                        <span className="text-zinc-400 font-black">RECLAIMED PTS EARNED:</span>
                        <span className="text-white font-black bg-[#FF5500] text-black px-1.5 py-0.5">
                          +{accumulatedPoints} IRON PTS
                        </span>
                      </div>
                    </div>

                    <div className="bg-black p-3.5 border border-dashed border-[#222] text-left">
                      <span className="block font-mono text-[8.5px] text-[#888] font-bold uppercase tracking-widest mb-1.5">
                        HOW TO GAIN ACCESS TO MANUALS:
                      </span>
                      <p className="font-mono text-[9px] text-zinc-400 leading-snug">
                        Scroll down or click the user badge above to view your <strong className="text-[#FF5500]">Customer Account Dashboard</strong>. Your digital manuals are unlocked and ready for telemetry download.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setCartOpen(false);
                        setCheckoutStep('idle');
                        // Scroll to account dashboard
                        const el = document.getElementById('user-dashboard');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full bg-white hover:bg-[#FF5500] text-black font-mono font-black text-xs py-3.5 tracking-widest uppercase transition-colors cursor-pointer"
                    >
                      ACCESS CONTROLLER PANEL
                    </button>
                  </div>
                )}

              </div>

              {/* Bottom Totals & CTA persistent panel */}
              {cart.length > 0 && checkoutStep !== 'confirmed' && (
                <div className="p-4 bg-black border-t border-[#222] space-y-3 text-left">
                  
                  {/* Totals Calculation module */}
                  <div className="font-mono text-[10px] space-y-1.5 border-b border-[#222]/80 pb-3">
                    <div className="flex justify-between text-zinc-500">
                      <span>LOADOUT SUB-TOTAL:</span>
                      <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-500">
                      <span>FREIGHT INSURANCES:</span>
                      <span className="text-white font-bold">
                        {shippingFee === 0 ? 'FREE EXTREME COMP' : `$${shippingFee.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-400 font-bold pt-1.5 border-t border-[#222]">
                      <span className="text-zinc-300">TOTAL TACTICAL COST:</span>
                      <span className="text-white text-base font-black">${grandTotal.toFixed(2)}</span>
                    </div>

                    {/* Loyaltypoints multiplier info */}
                    {subtotal > 0 && (
                      <div className="pt-2 text-[8px] text-[#FF5500] font-bold uppercase flex justify-between items-center bg-[#FF5500]/10 p-1 px-2 border border-[#FF5500]/30 font-black">
                        <span>LOYALTY POINTS CONVERSION RATIO:</span>
                        <span>+{accumulatedPoints} PTS</span>
                      </div>
                    )}
                  </div>

                  {/* Actions buttons */}
                  <div className="flex space-x-2">
                    {/* Back Arrow button */}
                    {checkoutStep !== 'idle' && (
                      <button
                        onClick={handleBackStep}
                        className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 p-3.5 text-zinc-400 focus:outline-none cursor-pointer duration-150"
                        title="Return to previous interface"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                    )}

                    {/* Forward Master Button */}
                    <button
                      type="button"
                      onClick={checkoutStep === 'review' ? handleConfirmSubmit : handleNextStep}
                      className="flex-1 bg-[#FF5500] hover:bg-white text-black font-mono font-black text-xs py-3.5 tracking-widest uppercase focus:outline-none flex items-center justify-center space-x-1.5 duration-150 shadow-lg cursor-pointer"
                    >
                      <span>
                        {checkoutStep === 'idle' && 'PROCEED TO FREIGHT'}
                        {checkoutStep === 'billing' && 'REVIEW LOADOUT DEETS'}
                        {checkoutStep === 'review' && 'CONFIRM SYSTEM CHARGE'}
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-[8px] text-zinc-600 font-mono text-center uppercase tracking-widest">
                    ⚡ END-TO-END CRYPTO MILITARY SHIELDS ENABLED
                  </p>

                </div>
              )}

            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}
