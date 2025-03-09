import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import AIAnalysis from './AIAnalysis';

interface Stock {
  symbol: string;
  shares: number;
  price: number;
  costBasis: number;
  purchaseDate: string;
  institution: string;
}

interface StockAnalysisModalProps {
  stock: Stock;
  onClose: () => void;
}

const StockAnalysisModal: React.FC<StockAnalysisModalProps> = ({ stock, onClose }) => {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-gradient-to-br from-gray-900 to-[#091428] rounded-2xl border border-white/10 p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
              AI Analysis for {stock.symbol}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <AIAnalysis symbol={stock.symbol} onComplete={() => {}} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default StockAnalysisModal;