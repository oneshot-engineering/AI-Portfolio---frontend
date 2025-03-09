import React from 'react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex-none flex justify-between items-center mb-6">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div
          key={step}
          className={`flex items-center ${step !== totalSteps ? 'flex-1' : ''}`}
        >
          <div
            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
              currentStep >= step
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                : 'bg-white/10 border border-white/20'
            }`}
          >
            {step}
          </div>
          {step !== totalSteps && (
            <div
              className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${
                currentStep > step
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                  : 'bg-white/10'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepProgress;