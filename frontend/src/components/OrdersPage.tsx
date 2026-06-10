import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Package, Truck, XCircle, RotateCcw, Eye, ChevronDown, ChevronUp, Download, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';
import ImageWithFallback from './ImageWithFallback';

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string; border: string }> = {
  'Processing': { label: 'PROCESSING', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30' },
  'Dispatched': { label: 'DISPATCHED', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30' },
  'Completed': { label: 'COMPLETED', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30' },
  'Cancelled': { label: 'CANCELLED', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30' },
  'Return Requested': { label: 'RETURN REQUESTED', color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30' },
  'Returned': { label: 'RETURNED', color: 'text-zinc-500', bg: 'bg-zinc-500/10', border: 'border-zinc-500/30' },
};

export default function OrdersPage() {
  const { user, showToast, cancelOrder, returnOrder } = useApp();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'All'>('All');

  if (!user) return null;

  const toggleExpand = (id: string) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const filteredOrders = statusFilter === 'All'
    ? user.orders
    : user.orders.filter(o => o.status === statusFilter);

  const canCancel = (status: OrderStatus) => status === 'Processing';
  const canReturn = (status: OrderStatus) => status === 'Completed' || status === 'Dispatched';

  const handleCancel = (orderId: string) => {
    cancelOrder(orderId);
  };

  const handleReturn = (orderId: string) => {
    returnOrder(orderId);
  };

  return (
    <>
      <section className="relative bg-[#080808] py-20 px-4 md:px-8 border-b border-[#222] metallic-grain font-sans min-h-screen">
        <div className="mx-auto max-w-7xl">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#222]">
            <div>
              <div className="font-mono text-[10px] text-[#FF5500] font-black uppercase tracking-[0.3em] mb-2">
                07 // LOGISTICS COMMAND // ORDER TERMINAL
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase italic tracking-tighter leading-none">
                ORDER COMMAND CENTER
              </h2>
              <p className="mt-2 text-xs text-[#888] font-mono tracking-tight uppercase">
                Manage all your orders, returns, and logistics
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center space-x-2 font-mono text-[9px] text-[#888] border border-[#222] bg-black p-2 py-1">
              <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-ping" />
              <span className="uppercase font-black">{user.orders.length} ORDERS ON RECORD</span>
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 font-mono text-[9px] font-black uppercase tracking-widest">
            {(['All', 'Processing', 'Dispatched', 'Completed', 'Cancelled', 'Returned'] as const).map(status => {
              const active = statusFilter === status;
              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-2 border cursor-pointer duration-150 ${
                    active
                      ? 'bg-[#FF5500] text-black border-[#FF5500]'
                      : 'bg-[#121212] text-zinc-400 border-[#222] hover:border-zinc-500 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="p-12 bg-[#121212] border border-[#222] text-center font-mono">
              <Package className="h-8 w-8 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">
                {statusFilter === 'All' ? 'NO ORDERS ON RECORD. MAKE YOUR FIRST PURCHASE FROM THE PRO-SHOP.' : `NO ORDERS WITH STATUS "${statusFilter}".`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map(order => {
                const statusCfg = STATUS_CONFIG[order.status];
                const isExpanded = expandedOrder === order.id;
                const allowCancel = canCancel(order.status);
                const allowReturn = canReturn(order.status);

                return (
                  <div
                    key={order.id}
                    className="bg-[#121212] border border-[#222] overflow-hidden"
                  >
                    {/* Order Header Bar */}
                    <div
                      onClick={() => toggleExpand(order.id)}
                      className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer hover:bg-[#1a1a1a] duration-150"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 ${statusCfg.bg} border ${statusCfg.border}`}>
                          <Package className={`h-4 w-4 ${statusCfg.color}`} />
                        </div>
                        <div className="text-left font-mono">
                          <div className="text-xs text-white font-black uppercase tracking-tight">
                            {order.id}
                          </div>
                          <div className="text-[9px] text-zinc-500 font-bold tracking-wider">
                            {order.date} • {order.items.length} ITEM{order.items.length !== 1 ? 'S' : ''} • ${order.total.toFixed(0)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-[8px] font-black tracking-widest uppercase border ${statusCfg.border} ${statusCfg.bg} ${statusCfg.color}`}>
                          {statusCfg.label}
                        </span>
                        <span className="text-zinc-600">
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </span>
                      </div>
                    </div>

                    {/* Expanded Order Details */}
                    {isExpanded && (
                      <div className="border-t border-[#222] bg-[#0c0c0c]">
                        <div className="p-4 md:p-6 space-y-6">
                          {/* Items List */}
                          <div>
                            <span className="block font-mono text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-3 text-left">
                              ORDER CONTENTS
                            </span>
                            <div className="divide-y divide-[#222] border border-[#222]">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center space-x-3 p-3 bg-[#050505]">
                                  <ImageWithFallback
                                    src={item.image}
                                    alt={item.name}
                                    className="h-10 w-10 object-cover"
                                    wrapperClassName="h-10 w-10 shrink-0 border border-[#222]"
                                  />
                                  <div className="flex-1 text-left font-mono text-[10px]">
                                    <div className="text-white font-black uppercase tracking-tight">
                                      {item.name}
                                    </div>
                                    <div className="text-zinc-500 font-bold flex items-center space-x-2">
                                      <span>${item.price} x {item.quantity}</span>
                                      <span className={`text-[8px] px-1 py-0.5 border ${
                                        item.type === 'digital' ? 'text-neon-orange border-neon-orange/30 bg-neon-orange/10' : 'text-blue-400 border-blue-400/30 bg-blue-400/10'
                                      }`}>
                                        {item.type === 'digital' ? 'DIGITAL' : 'PHYSICAL'}
                                      </span>
                                    </div>
                                  </div>
                                  <span className="font-mono text-xs text-white font-black">
                                    ${(item.price * item.quantity).toFixed(0)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Order Info Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Points & Tracking */}
                            <div className="bg-[#050505] border border-[#222] p-4 text-left font-mono text-[9px] space-y-2">
                              <div className="flex justify-between">
                                <span className="text-zinc-500">IRON POINTS EARNED:</span>
                                <span className="text-[#FF5500] font-black">+{order.ironPointsEarned} PTS</span>
                              </div>
                              {order.trackingNumber && (
                                <div className="flex justify-between">
                                  <span className="text-zinc-500">TRACKING NUMBER:</span>
                                  <span className="text-white font-black">{order.trackingNumber}</span>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <span className="text-zinc-500">TOTAL CHARGED:</span>
                                <span className="text-white font-black">${order.total.toFixed(0)}</span>
                              </div>
                            </div>

                            {/* Status Timeline */}
                            <div className="bg-[#050505] border border-[#222] p-4 text-left font-mono text-[8px] space-y-2">
                              <span className="block text-zinc-500 font-black uppercase tracking-widest mb-1">
                                ORDER STATUS TIMELINE
                              </span>
                              <div className="space-y-1.5">
                                <div className="flex items-center space-x-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                  <span className="text-zinc-400">ORDER PLACED — {order.date}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className={`h-1.5 w-1.5 rounded-full ${
                                    ['Dispatched', 'Completed'].includes(order.status) ? 'bg-green-500' : 'bg-zinc-700'
                                  }`} />
                                  <span className="text-zinc-400">DISPATCHED — {order.status === 'Processing' ? 'PENDING' : order.date}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className={`h-1.5 w-1.5 rounded-full ${
                                    order.status === 'Completed' ? 'bg-green-500' : 'bg-zinc-700'
                                  }`} />
                                  <span className="text-zinc-400">DELIVERED — {order.status === 'Completed' ? order.date : 'PENDING'}</span>
                                </div>
                                {order.cancellationDate && (
                                  <div className="flex items-center space-x-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                    <span className="text-red-400">CANCELLED — {order.cancellationDate}</span>
                                  </div>
                                )}
                                {order.returnDate && (
                                  <div className="flex items-center space-x-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                    <span className="text-orange-400">RETURNED — {order.returnDate}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3 pt-2 border-t border-[#222]">
                            {allowCancel && (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleCancel(order.id)}
                                className="inline-flex items-center space-x-2 bg-red-500/10 border border-red-500/30 px-4 py-2.5 font-mono text-[9px] font-black tracking-widest uppercase text-red-400 hover:bg-red-500 hover:text-white cursor-pointer duration-150"
                              >
                                <XCircle className="h-3.5 w-3.5" />
                                <span>CANCEL ORDER</span>
                              </motion.button>
                            )}
                            {allowReturn && (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleReturn(order.id)}
                                className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/30 px-4 py-2.5 font-mono text-[9px] font-black tracking-widest uppercase text-orange-400 hover:bg-orange-500 hover:text-white cursor-pointer duration-150"
                              >
                                <RotateCcw className="h-3.5 w-3.5" />
                                <span>RETURN ORDER</span>
                              </motion.button>
                            )}
                            {order.trackingNumber && (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => showToast(`Package ${order.trackingNumber} — routed via US Freight Central Stations.`, 'info')}
                                className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 px-4 py-2.5 font-mono text-[9px] font-black tracking-widest uppercase text-blue-400 hover:bg-blue-500 hover:text-white cursor-pointer duration-150"
                              >
                                <Truck className="h-3.5 w-3.5" />
                                <span>TRACK PACKAGE</span>
                              </motion.button>
                            )}
                            {order.status === 'Completed' && (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => showToast(`Invoice for ${order.id} transmitted.`, 'success')}
                                className="inline-flex items-center space-x-2 bg-zinc-500/10 border border-zinc-500/30 px-4 py-2.5 font-mono text-[9px] font-black tracking-widest uppercase text-zinc-400 hover:bg-zinc-500 hover:text-white cursor-pointer duration-150"
                              >
                                <Download className="h-3.5 w-3.5" />
                                <span>DOWNLOAD INVOICE</span>
                              </motion.button>
                            )}
                          </div>

                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
