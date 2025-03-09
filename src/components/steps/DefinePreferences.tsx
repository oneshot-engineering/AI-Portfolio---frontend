import React from 'react';
import { Stock } from '../../types';
import StepNavigation from '../StepNavigation';

interface DefinePreferencesProps {
  selectedStock: Stock | null;
  incomeTarget: number;
  frequency: 'weekly' | 'monthly';
  willingSell: boolean;
  strikePrice: number;
  onIncomeTargetChange: (value: number) => void;
  onFrequencyChange: (value: 'weekly' | 'monthly') => void;
  onWillingSellChange: (value: boolean) => void;
  onStrikePriceChange: (value: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const DefinePreferences: React.FC<DefinePreferencesProps> = ({
  selectedStock,
  incomeTarget,
  frequency,
  willingSell,
  strikePrice,
  onIncomeTargetChange,
  onFrequencyChange,
  onWillingSellChange,
  onStrikePriceChange,
  onNext,
  onBack,
}) => {
  const getSummary = () => {
    if (!selectedStock) return undefined;
    return `Set ${frequency} income target of $${incomeTarget}${
      willingSell ? ` with strike price of $${strikePrice.toFixed(2)}` : ' without selling shares'
    }`;
  };

  return (
    <div className="space-y-6">
      <StepNavigation
        currentStep={3}
        totalSteps={4}
        onNext={onNext}
        onBack={onBack}
        summary={getSummary()}
      />
      
      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
        Define Income & Selling Preferences
      </h2>
      
      <div className="space-y-6">
        <div className="space-y-3 bg-white/5 rounded-xl backdrop-blur-xl border border-white/10 p-6">
          <label className="block text-sm font-medium text-white/80">Monthly Income Target</label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={incomeTarget}
            onChange={(e) => onIncomeTargetChange(Number(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-white/60">
            <span>${incomeTarget}</span>
            <span>$2,000</span>
          </div>
        </div>

        <div className="space-y-3 bg-white/5 rounded-xl backdrop-blur-xl border border-white/10 p-6">
          <label className="block text-sm font-medium text-white/80">Income Frequency</label>
          <div className="grid grid-cols-2 gap-4">
            {['weekly', 'monthly'].map((freq) => (
              <button
                key={freq}
                onClick={() => onFrequencyChange(freq as 'weekly' | 'monthly')}
                className={`p-3 rounded-lg backdrop-blur-xl border transition-all duration-300 ${
                  frequency === freq
                    ? 'bg-blue-500/10 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 bg-white/5 rounded-xl backdrop-blur-xl border border-white/10 p-6">
          <label className="block text-sm font-medium text-white/80">Willing to Sell Shares?</label>
          <div className="flex items-center space-x-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={willingSell}
                onChange={() => onWillingSellChange(true)}
                className="form-radio text-blue-500 border-white/20"
              />
              <span className="ml-2 text-white/80">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={!willingSell}
                onChange={() => onWillingSellChange(false)}
                className="form-radio text-blue-500 border-white/20"
              />
              <span className="ml-2 text-white/80">No</span>
            </label>
          </div>
        </div>

        {willingSell && selectedStock && (
          <div className="space-y-3 bg-white/5 rounded-xl backdrop-blur-xl border border-white/10 p-6">
            <label className="block text-sm font-medium text-white/80">Preferred Sell Price</label>
            <div className="p-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg border border-white/10 mb-3">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/60">Cost Basis</span>
                <span className="font-medium text-white/80">${selectedStock.costBasis.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Potential Profit</span>
                <span className="text-green-400">
                  ${(strikePrice - selectedStock.costBasis).toFixed(2)} ({((strikePrice - selectedStock.costBasis) / selectedStock.costBasis * 100).toFixed(2)}%)
                </span>
              </div>
            </div>
            <input
              type="range"
              min={selectedStock.price}
              max={selectedStock.price * 1.3}
              value={strikePrice}
              onChange={(e) => onStrikePriceChange(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-white/60">
              <span>${strikePrice.toFixed(2)}</span>
              <span>${(selectedStock.price * 1.3).toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DefinePreferences;