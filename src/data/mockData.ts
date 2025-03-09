import { Stock, Institution } from '../types';

export const mockInstitutions: Institution[] = [
  {
    id: 'robinhood',
    name: 'Robinhood',
    logo: 'https://logo.clearbit.com/robinhood.com',
    connected: false
  },
  {
    id: 'etrade',
    name: 'E*TRADE',
    logo: 'https://logo.clearbit.com/etrade.com',
    connected: false
  },
  {
    id: 'tdameritrade',
    name: 'TD Ameritrade',
    logo: 'https://logo.clearbit.com/tdameritrade.com',
    connected: false
  },
  {
    id: 'fidelity',
    name: 'Fidelity',
    logo: 'https://logo.clearbit.com/fidelity.com',
    connected: false
  }
];

export const mockStocks: Stock[] = [
  { 
    symbol: 'AAPL', 
    shares: 100, 
    price: 150, 
    costBasis: 132.50,
    purchaseDate: '2023-08-15',
    institution: 'Robinhood'
  },
  { 
    symbol: 'MSFT', 
    shares: 50, 
    price: 320,
    costBasis: 285.75,
    purchaseDate: '2023-06-22',
    institution: 'Fidelity'
  },
  { 
    symbol: 'GOOGL', 
    shares: 25, 
    price: 140,
    costBasis: 125.30,
    purchaseDate: '2024-01-10',
    institution: 'Robinhood'
  },
];

export const defaultPreferences = {
  incomeTarget: 500,
  frequency: 'monthly' as const,
  willingSell: true,
  strikePrice: 180,
};

export const mockAnalysts = [
  { name: 'Ben Graham', signal: 'BEARISH' as const, confidence: 70, status: 'pending' as const },
  { name: 'Bill Ackman', signal: 'BEARISH' as const, confidence: 20, status: 'pending' as const },
  { name: 'Cathie Wood', signal: 'BEARISH' as const, confidence: 75, status: 'pending' as const },
  { name: 'Charlie Munger', signal: 'NEUTRAL' as const, confidence: 65, status: 'pending' as const },
  { name: 'Fundamentals', signal: 'BULLISH' as const, confidence: 50, status: 'pending' as const },
  { name: 'Sentiment', signal: 'BEARISH' as const, confidence: 58, status: 'pending' as const },
  { name: 'Stanley Druckenmiller', signal: 'NEUTRAL' as const, confidence: 60, status: 'pending' as const },
  { name: 'Technical Analyst', signal: 'NEUTRAL' as const, confidence: 18, status: 'pending' as const },
  { name: 'Valuation', signal: 'BEARISH' as const, confidence: 76, status: 'pending' as const },
  { name: 'Warren Buffett', signal: 'BEARISH' as const, confidence: 75, status: 'pending' as const },
  { name: 'Risk Management', signal: 'NEUTRAL' as const, confidence: 45, status: 'pending' as const },
  { name: 'Portfolio Management', signal: 'BEARISH' as const, confidence: 62, status: 'pending' as const },
];

export const mockAnalysisSummary = {
  sentiment: 'BEARISH',
  confidence: 72,
  action: 'HOLD',
  description: 'Based on the analysis from multiple perspectives, maintaining a HOLD position is recommended. The majority of analysts indicate bearish signals, but current market conditions suggest waiting for a better entry/exit point.',
};