import React from 'react';
import { Plus, X, CheckCircle2 } from 'lucide-react';
import { Institution } from '../../types';
import StepNavigation from '../StepNavigation';

interface ConnectAccountsProps {
  institutions: Institution[];
  onToggleConnection: (id: string) => void;
  onNext: () => void;
}

const ConnectAccounts: React.FC<ConnectAccountsProps> = ({
  institutions,
  onToggleConnection,
  onNext,
}) => {
  const connectedCount = institutions.filter(i => i.connected).length;
  const connectedInstitutions = institutions.filter(i => i.connected);

  return (
    <div className="space-y-6">
      <StepNavigation
        currentStep={1}
        totalSteps={4}
        onNext={onNext}
        onBack={() => {}}
        disableNext={connectedCount === 0}
        summary={connectedCount > 0 ? `Connected to ${connectedInstitutions.map(inst => inst.name).join(', ')}` : undefined}
      />
      
      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
        Connect Your Investment Accounts
      </h2>
      
      <div className="space-y-6">
        <div className="bg-white/5 rounded-xl backdrop-blur-xl border border-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_32px_rgba(31,34,37,0.12)] transition-all duration-300">
          <div className="grid grid-cols-2 gap-4">
            {institutions.map((institution) => (
              <div
                key={institution.id}
                className={`p-6 rounded-xl backdrop-blur-xl border transition-all duration-300 ${
                  institution.connected
                    ? 'bg-blue-500/5 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-3 flex items-center justify-center shadow-inner">
                    <img
                      src={institution.logo}
                      alt={`${institution.name} logo`}
                      className="w-12 h-12 object-contain rounded"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">{institution.name}</h4>
                    <p className="text-sm text-white/60 mt-1">
                      {institution.connected ? 'Connected' : 'Not Connected'}
                    </p>
                  </div>
                  <button
                    onClick={() => onToggleConnection(institution.id)}
                    className={`w-full px-4 py-2 rounded-lg text-sm flex items-center justify-center space-x-2 transition-all duration-300 ${
                      institution.connected
                        ? 'bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20'
                        : 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20'
                    }`}
                  >
                    {institution.connected ? (
                      <>
                        <X className="w-4 h-4" />
                        <span>Disconnect</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
            <Plus className="w-5 h-5" />
            <span>Add New Institution</span>
          </button>
        </div>

        {connectedCount > 0 && (
          <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg flex items-center justify-center space-x-2 border border-green-500/20">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-300">
              Connected to {connectedCount} institutions
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectAccounts;