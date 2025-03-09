import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, TrendingUp, X } from 'lucide-react';
import { Stock, Institution } from '../../types';
import AIAnalysis from '../AIAnalysis';
import StepNavigation from '../StepNavigation';

interface SelectStockProps {
  stocks: Stock[];
  institutions: Institution[];
  selectedStock: Stock | null;
  showAnalysis: boolean;
  onStockSelect: (stock: Stock) => void;
  onToggleAnalysis: (show: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

const SelectStock: React.FC<SelectStockProps> = ({
  stocks,
  institutions,
  selectedStock,
  showAnalysis,
  onStockSelect,
  onToggleAnalysis,
  onNext,
  onBack,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateGainLoss = (current: number, cost: number) => {
    const percentage = ((current - cost) / cost) * 100;
    return {
      value: current - cost,
      percentage,
      isPositive: percentage > 0
    };
  };

  return (
    <div className="space-y-6">
      <StepNavigation
        currentStep={2}
        totalSteps={4}
        onNext={onNext}
        onBack={onBack}
        disableNext={!selectedStock}
        summary={selectedStock ? `Selected ${selectedStock.symbol} (${selectedStock.shares} shares) from ${selectedStock.institution} at $${selectedStock.price.toFixed(2)} per share` : undefined}
      />
      
      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
        Select Stock from Connected Accounts
      </h2>
      
      <div className="flex gap-6">
        <div className="space-y-6 flex-1">
          <div className="grid gap-4">
            {stocks
              .filter(stock => 
                institutions.some(inst => 
                  inst.connected && inst.name === stock.institution
                )
              )
              .map((stock) => {
                const gainLoss = calculateGainLoss(stock.price, stock.costBasis);
                return (
                  <button
                    key={stock.symbol}
                    onClick={() => onStockSelect(stock)}
                    className={`p-4 rounded-xl backdrop-blur-xl border transition-all duration-300 ${
                      selectedStock?.symbol === stock.symbol
                        ? 'bg-blue-500/10 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                        : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                            {stock.symbol}
                          </h3>
                          <span className="text-sm text-white/60">({stock.institution})</span>
                        </div>
                        <p className="text-sm text-white/80">{stock.shares} shares available</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Calendar className="w-4 h-4 text-white/60" />
                          <span className="text-sm text-white/60">
                            Purchased {formatDate(stock.purchaseDate)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                          ${stock.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-white/60">Current Price</p>
                        <div className="mt-2">
                          <p className="text-sm text-white/80">Cost Basis: ${stock.costBasis.toFixed(2)}</p>
                          <p className={`text-sm flex items-center justify-end space-x-1.5 ${
                            gainLoss.isPositive ? 'text-green-400' : 'text-red-400'
                          }`}>
                            <TrendingUp className={`w-3 h-3 ${gainLoss.isPositive ? '' : 'transform rotate-180'}`} />
                            <span>{gainLoss.percentage.toFixed(2)}%</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {showAnalysis && selectedStock && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-[500px] bg-white/5 rounded-xl backdrop-blur-xl border border-white/10 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                  AI Analysis for {selectedStock.symbol}
                </h3>
                <button
                  onClick={() => onToggleAnalysis(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <AIAnalysis symbol={selectedStock.symbol} onComplete={() => {}} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SelectStock;