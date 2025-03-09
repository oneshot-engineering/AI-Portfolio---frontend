import React, { useState } from "react";
import { Stock, Institution } from "./types";
import StepProgress from "./components/StepProgress";
import ConnectAccounts from "./components/steps/ConnectAccounts";
import SelectStock from "./components/steps/SelectStock";
import DefinePreferences from "./components/steps/DefinePreferences";
import ReviewConfirm from "./components/steps/ReviewConfirm";
import {
  mockInstitutions,
  mockStocks,
  defaultPreferences,
} from "./data/mockData";

type Step = 1 | 2 | 3 | 4;

function App() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [institutions, setInstitutions] =
    useState<Institution[]>(mockInstitutions);
  const [incomeTarget, setIncomeTarget] = useState(
    defaultPreferences.incomeTarget
  );
  const [frequency, setFrequency] = useState(defaultPreferences.frequency);
  const [willingSell, setWillingSell] = useState(
    defaultPreferences.willingSell
  );
  const [strikePrice, setStrikePrice] = useState(
    defaultPreferences.strikePrice
  );

  const toggleConnection = (institutionId: string) => {
    setInstitutions(
      institutions.map((inst) =>
        inst.id === institutionId
          ? { ...inst, connected: !inst.connected }
          : inst
      )
    );
  };

  const handleStockClick = (stock: Stock) => {
    setSelectedStock(stock);
    setShowAnalysis(true);
  };

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) as Step);
  };

  const handleBack = () => {
    setCurrentStep((prev) => (prev - 1) as Step);
  };

  const handleConfirm = () => {
    // Handle trade confirmation
    console.log("Trade confirmed");
  };

  return (
    <div className="h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#091428] to-black text-white">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex flex-col max-w-[1400px] mx-auto w-full p-4 overflow-hidden">
        {/* Header */}
        <header className="flex-none text-center py-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
            Generate passive income
          </h1>
          <p className="text-sm sm:text-base text-white/60">
            Generate consistent income from your stock portfolio using our AI
            agents
          </p>
        </header>

        {/* Main container */}
        <main className="flex-1 flex flex-col min-h-0 mt-4">
          <div className="flex-1 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex flex-col min-h-0">
            <StepProgress currentStep={currentStep} totalSteps={4} />

            {/* Scrollable content */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent scrollbar-thumb-rounded-full px-0.5">
                {currentStep === 1 && (
                  <ConnectAccounts
                    institutions={institutions}
                    onToggleConnection={toggleConnection}
                    onNext={handleNext}
                  />
                )}
                {currentStep === 2 && (
                  <SelectStock
                    stocks={mockStocks}
                    institutions={institutions}
                    selectedStock={selectedStock}
                    showAnalysis={showAnalysis}
                    onStockSelect={handleStockClick}
                    onToggleAnalysis={setShowAnalysis}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {currentStep === 3 && (
                  <DefinePreferences
                    selectedStock={selectedStock}
                    incomeTarget={incomeTarget}
                    frequency={frequency}
                    willingSell={willingSell}
                    strikePrice={strikePrice}
                    onIncomeTargetChange={setIncomeTarget}
                    onFrequencyChange={setFrequency}
                    onWillingSellChange={setWillingSell}
                    onStrikePriceChange={setStrikePrice}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {currentStep === 4 && (
                  <ReviewConfirm
                    selectedStock={selectedStock}
                    strikePrice={strikePrice}
                    onBack={handleBack}
                    onConfirm={handleConfirm}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
