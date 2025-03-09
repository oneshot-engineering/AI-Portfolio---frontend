import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Brain, AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import axios from 'axios';
import { mockAnalysts, mockAnalysisSummary } from '../data/mockData';

interface Analyst {
  name: string;
  signal: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  confidence: number;
  status: 'pending' | 'running' | 'complete';
}

interface AIAnalysisProps {
  symbol: string;
  onComplete: () => void;
}

interface AnalysisResponse {
  analysts: Analyst[];
  summary: {
    sentiment: string;
    confidence: number;
    action: string;
    description: string;
  };
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ symbol, onComplete }) => {
  const [currentAnalysts, setCurrentAnalysts] = useState<Analyst[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [summary, setSummary] = useState<AnalysisResponse['summary'] | null>(null);

  useEffect(() => {
    const simulateAnalysis = (analysts: Analyst[]) => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < analysts.length) {
          setCurrentAnalysts(prev => {
            const newAnalysts = [...prev];
            if (!newAnalysts[currentIndex]) {
              newAnalysts[currentIndex] = {
                ...analysts[currentIndex],
                status: 'running'
              };
            }
            return newAnalysts;
          });

          setTimeout(() => {
            setCurrentAnalysts(prev => {
              const newAnalysts = [...prev];
              if (newAnalysts[currentIndex]) {
                newAnalysts[currentIndex] = {
                  ...newAnalysts[currentIndex],
                  status: 'complete'
                };
              }
              return newAnalysts;
            });
            setAnalysisProgress((currentIndex + 1) / analysts.length * 100);
          }, Math.random() * 1000 + 500);

          currentIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setSummary(mockAnalysisSummary);
            setShowSummary(true);
            onComplete();
          }, 1000);
        }
      }, 300);

      return () => clearInterval(interval);
    };

    const fetchAnalysis = async () => {
      try {
        const response = await axios.get<AnalysisResponse>(`http://127.0.0.1:5000/run-hedge-fund?tickers=${symbol}`);
        const { analysts, summary } = response.data;
        simulateAnalysis(analysts);
        setSummary(summary);
      } catch (err) {
        console.warn('Failed to fetch analysis, using mock data:', err);
        simulateAnalysis(mockAnalysts);
      }
    };

    fetchAnalysis();
  }, [symbol]);

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'BULLISH':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'BEARISH':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'running':
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
              key={`${analyst.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: analyst.status !== 'pending' ? 1 : 0,
                y: analyst.status !== 'pending' ? 0 : 20
              }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-xl backdrop-blur-xl border transition-all duration-300 ${
                analyst.status === 'complete'
                  ? 'bg-white/5 border-white/10'
                  : 'bg-blue-500/5 border-blue-500/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(analyst.status)}
                  <span className="text-sm font-medium">{analyst.name}</span>
                </div>
                {analyst.status === 'complete' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-2"
                  >
                    {getSignalIcon(analyst.signal)}
                    <span className={`text-sm ${
                      analyst.signal === 'BULLISH' 
                        ? 'text-green-400' 
                        : analyst.signal === 'BEARISH' 
                          ? 'text-red-400' 
                          : 'text-yellow-400'
                    }`}>
                      {analyst.confidence}%
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="sync">
        {showSummary && summary && (
          <motion.div
            key="summary"
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
                <span className="text-white/60">Overall Sentiment</span>
                <span className={`font-medium ${
                  summary.sentiment === 'BULLISH' 
                    ? 'text-green-400' 
                    : summary.sentiment === 'BEARISH'
                      ? 'text-red-400'
                      : 'text-yellow-400'
                }`}>
                  {summary.sentiment}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Confidence Level</span>
                <span className="text-white/80 font-medium">{summary.confidence}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Recommended Action</span>
                <span className="text-yellow-400 font-medium">{summary.action}</span>
              </div>
              <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm text-white/80">{summary.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAnalysis;