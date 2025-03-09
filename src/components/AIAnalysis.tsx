import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
  X,
} from "lucide-react";
import axios from "axios";
import { mockAnalysisData } from "../data/mockData";

interface AIAnalysisProps {
  symbol: string;
  onComplete: () => void;
}

type Signal = "bullish" | "bearish" | "neutral";

interface Analyst {
  name: string;
  signal: Signal;
  confidence: number;
  reasoning: string;
  status: "pending" | "running" | "complete";
}

const getInitialAnalysts = () => {
  return Object.entries(mockAnalysisData.analyst_signals)
    .filter(([key]) => key !== "risk_management_agent")
    .map(([name]) => ({
      name: name
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
        .replace("Agent", ""),
      signal: "neutral",
      confidence: 0,
      reasoning: "Analysis in progress...",
      status: "running",
    }));
};

const formatReasoning = (reasoning: string): string => {
  try {
    const parsed = JSON.parse(reasoning);
    if (typeof parsed === "object") {
      if ("financial_health_signal" in parsed) {
        return `Financial Health: ${parsed.financial_health_signal.details}`;
      }
      if ("dcf_analysis" in parsed) {
        return parsed.dcf_analysis.details;
      }
      const firstValue = Object.values(parsed)[0];
      return typeof firstValue === "object"
        ? firstValue.details || firstValue.signal
        : firstValue;
    }
    return reasoning;
  } catch {
    return reasoning;
  }
};

const AIAnalysis: React.FC<AIAnalysisProps> = ({ symbol, onComplete }) => {
  const [currentAnalysts, setCurrentAnalysts] =
    useState<Analyst[]>(getInitialAnalysts);
  const [showSummary, setShowSummary] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(25);
  const [selectedAnalyst, setSelectedAnalyst] = useState<Analyst | null>(null);

  useEffect(() => {
    setCurrentAnalysts(getInitialAnalysts());
    setShowSummary(false);
    setAnalysisProgress(25);
    setSelectedAnalyst(null);
  }, [symbol]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setAnalysisProgress(50);
        const response = await axios.get(
          `http://127.0.0.1:5000/run-hedge-fund?tickers=${symbol}`
        );

        let analysisData;
        try {
          analysisData =
            typeof response.data === "string"
              ? JSON.parse(response.data)
              : response.data;

          if (!analysisData?.analyst_signals) {
            throw new Error("Invalid response data structure");
          }

          const updatedAnalysts = Object.entries(analysisData.analyst_signals)
            .filter(([key]) => key !== "risk_management_agent")
            .map(([name, data]) => ({
              name: name
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
                .replace("Agent", ""),
              signal: data[symbol]?.signal || "neutral",
              confidence: Number(data[symbol]?.confidence || 0).toFixed(2),
              reasoning: formatReasoning(
                typeof data[symbol]?.reasoning === "string"
                  ? data[symbol].reasoning
                  : JSON.stringify(data[symbol]?.reasoning)
              ),
              status: "complete" as const,
            }));

          setAnalysisProgress(100);
          setCurrentAnalysts(updatedAnalysts);
          setShowSummary(true);
          onComplete();
        } catch (parseError) {
          console.warn("Failed to parse response data:", parseError);
          fallbackToMockData();
        }
      } catch (err) {
        console.warn("Failed to fetch analysis:", err);
        fallbackToMockData();
      }
    };

    const fallbackToMockData = () => {
      setTimeout(() => {
        const mockAnalysts = Object.entries(mockAnalysisData.analyst_signals)
          .filter(([key]) => key !== "risk_management_agent")
          .map(([name, data]) => ({
            name: name
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
              .replace("Agent", ""),
            signal: data[symbol]?.signal || "neutral",
            confidence: Number(data[symbol]?.confidence || 0).toFixed(2),
            reasoning: formatReasoning(
              typeof data[symbol]?.reasoning === "string"
                ? data[symbol].reasoning
                : JSON.stringify(data[symbol]?.reasoning)
            ),
            status: "complete" as const,
          }));

        setAnalysisProgress(100);
        setCurrentAnalysts(mockAnalysts);
        setShowSummary(true);
        onComplete();
      }, 2000);
    };

    fetchAnalysis();
  }, [symbol, onComplete]);

  const getSignalIcon = (signal: Signal) => {
    switch (signal) {
      case "bullish":
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case "bearish":
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case "running":
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Brain className="w-4 h-4 text-blue-400" />
          </motion.div>
        );
      default:
        return <div className="w-4 h-4" />;
    }
  };

  const getSignalColor = (signal: Signal) => {
    switch (signal) {
      case "bullish":
        return "text-green-400";
      case "bearish":
        return "text-red-400";
      default:
        return "text-yellow-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: "0%" }}
          animate={{ width: `${analysisProgress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AnimatePresence mode="sync">
          {currentAnalysts.map((analyst, index) => (
            <motion.div
              key={`${analyst.name}-${symbol}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={() =>
                analyst.status === "complete" && setSelectedAnalyst(analyst)
              }
              className={`group relative p-4 rounded-xl backdrop-blur-xl border transition-all duration-300 cursor-pointer ${
                analyst.status === "complete"
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-blue-500/5 border-blue-500/20"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(analyst.status)}
                  <span className="text-sm font-medium">{analyst.name}</span>
                </div>
                {analyst.status === "complete" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-2"
                  >
                    {getSignalIcon(analyst.signal)}
                    <span
                      className={`text-sm ${getSignalColor(analyst.signal)}`}
                    >
                      {analyst.confidence}%
                    </span>
                  </motion.div>
                )}
              </div>
              {analyst.status === "complete" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-white/60 mt-2 line-clamp-2"
                >
                  {analyst.reasoning}
                </motion.p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="sync">
        {showSummary && mockAnalysisData.decisions[symbol] && (
          <motion.div
            key={`summary-${symbol}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 rounded-xl backdrop-blur-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10"
          >
            <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
              Analysis Summary for {symbol}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Recommended Action</span>
                <span className="text-yellow-400 font-medium uppercase">
                  {mockAnalysisData.decisions[symbol].action}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Confidence Level</span>
                <span className="text-white/80 font-medium">
                  {Number(
                    mockAnalysisData.decisions[symbol].confidence
                  ).toFixed(2)}
                  %
                </span>
              </div>
              <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm text-white/80">
                  {mockAnalysisData.decisions[symbol].reasoning}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedAnalyst && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAnalyst(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/10 p-6 max-w-lg w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(selectedAnalyst.status)}
                  <h3 className="text-lg font-semibold">
                    {selectedAnalyst.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedAnalyst(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                {getSignalIcon(selectedAnalyst.signal)}
                <span
                  className={`${getSignalColor(
                    selectedAnalyst.signal
                  )} font-medium`}
                >
                  {selectedAnalyst.confidence}% Confidence
                </span>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-sm text-white/80 whitespace-pre-wrap">
                  {selectedAnalyst.reasoning}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAnalysis;
