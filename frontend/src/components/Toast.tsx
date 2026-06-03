import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info
};

const colors = {
  success: 'border-green-500/40 bg-green-500/10 text-green-400',
  error: 'border-red-500/40 bg-red-500/10 text-red-400',
  info: 'border-[#FF5500]/40 bg-[#FF5500]/10 text-[#FF5500]'
};

export default function Toast() {
  const { toast, clearToast } = useApp();
  const Icon = toast ? icons[toast.type] : null;

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -20, x: '-50%' }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`fixed top-20 left-1/2 z-50 flex items-center space-x-2.5 border px-4 py-2.5 font-mono text-[11px] font-bold tracking-wider uppercase shadow-lg ${colors[toast.type]}`}
        >
          {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
          <span>{toast.message}</span>
          <button
            onClick={clearToast}
            className="ml-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <X className="h-3 w-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
