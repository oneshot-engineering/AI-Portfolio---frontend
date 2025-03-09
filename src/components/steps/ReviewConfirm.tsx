import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Stock } from '../../types';
import StepNavigation from '../StepNavigation';

interface ReviewConfirmProps {
  selectedStock: Stock | null;
  strikePrice: number;
  onBack: () => void;
  onConfirm: () => void;
}

const ReviewConfirm: React.FC<ReviewConfirmProps> = ({
  selectedStock,
  strikePrice,
  onBack,
  onConfirm,
}) => {
  return (
    <div className="space-y-6">
      <StepNavigation
        currentStep={4}
        totalSteps={4}
        onNext={onConfirm}
        onBack={onBack}
        summary={selectedStock ? `Ready to place covered call trade for ${selectedStock.symbol} with strike price of $${strikePrice.toFixed(2)}` : undefined}
      />
      
      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
        Review & Confirm
      </h2>
      
      <div className="bg-white/5 rounded-xl backdrop-blur-xl border border-white/10 p-6 space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
              Recommended Trade
            </h3>
            <p className="text-sm text-white/60">{selectedStock?.symbol} Covered Call</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-emerald-200">
              ${(strikePrice * 1.02).toFixed(2)}
            </p>
            <p className="text-sm text-white/60">Strike Price</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h4 className="font-medium mb-3 text-white/80">Potential Outcomes</h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-green-500/5 rounded-lg border border-green-500/20">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
              <p className="text-sm text-white/80">
                If price stays below ${strikePrice}: Keep shares & premium
              </p>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <p className="text-sm text-white/80">
                If price goes above ${strikePrice}: Sell shares at profit & keep premium
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onConfirm}
          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
        >
          Place Trade
        </button>
      </div>
    </div>
  );
};

export default ReviewConfirm;