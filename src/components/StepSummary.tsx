import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface StepSummaryProps {
  children: React.ReactNode;
}

const StepSummary: React.FC<StepSummaryProps> = ({ children }) => {
  return (
    <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20 flex items-start space-x-3">
      <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-white/80">
        {children}
      </div>
    </div>
  );
};

export default StepSummary;