import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import StepSummary from './StepSummary';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  disableNext?: boolean;
  summary?: React.ReactNode;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  disableNext = false,
  summary,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {currentStep > 1 && (
          <button
            onClick={onBack}
            className="px-4 sm:px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        )}
        {currentStep < totalSteps && (
          <button
            onClick={onNext}
            disabled={disableNext}
            className={`ml-auto px-4 sm:px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl ${
              disableNext ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
      {summary && <StepSummary>{summary}</StepSummary>}
    </div>
  );
};

export default StepNavigation;