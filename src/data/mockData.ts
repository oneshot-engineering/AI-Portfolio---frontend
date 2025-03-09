import { Stock, Institution } from "../types";

export const mockInstitutions: Institution[] = [
  {
    id: "robinhood",
    name: "Robinhood",
    logo: "https://logo.clearbit.com/robinhood.com",
    connected: false,
  },
  {
    id: "etrade",
    name: "E*TRADE",
    logo: "https://logo.clearbit.com/etrade.com",
    connected: false,
  },
  {
    id: "tdameritrade",
    name: "TD Ameritrade",
    logo: "https://logo.clearbit.com/tdameritrade.com",
    connected: false,
  },
  {
    id: "fidelity",
    name: "Fidelity",
    logo: "https://logo.clearbit.com/fidelity.com",
    connected: false,
  },
];
export const mockStocks: Stock[] = [
  {
    symbol: "AAPL",
    shares: 100,
    price: 239.07, // Updated from $150
    costBasis: 132.5,
    purchaseDate: "2023-08-15",
    institution: "Robinhood",
  },
  {
    symbol: "MSFT",
    shares: 50,
    price: 393.31, // Updated from $320
    costBasis: 285.75,
    purchaseDate: "2023-06-22",
    institution: "Fidelity",
  },
  {
    symbol: "GOOGL",
    shares: 25,
    price: 173.86, // Updated from $140
    costBasis: 125.3,
    purchaseDate: "2024-01-10",
    institution: "Robinhood",
  },
];

export const defaultPreferences = {
  incomeTarget: 500,
  frequency: "monthly" as const,
  willingSell: true,
  strikePrice: 180,
};

export const mockAnalysisData = {
  analyst_signals: {
    ben_graham_agent: {
      AAPL: {
        confidence: 50.0,
        reasoning:
          "While AAPL shows stable earnings with positive EPS historically, the lack of growth and high debt ratio raises concerns. The significant negative margin of safety indicates that the current price is above intrinsic value, suggesting limited upside potential.",
        signal: "neutral",
      },
    },
    bill_ackman_agent: {
      AAPL: {
        confidence: 60.0,
        reasoning:
          "While Apple (AAPL) exhibits strong operating margins and high ROE, the lack of significant revenue growth and high debt levels raise concerns about its long-term sustainability. Additionally, the substantial negative margin of safety suggests that the stock is significantly overvalued compared to its intrinsic value. Hence, the investment outlook is bearish under current conditions.",
        signal: "bearish",
      },
    },
    cathie_wood_agent: {
      AAPL: {
        confidence: 65.0,
        reasoning:
          "While AAPL exhibits positive operating leverage and decent investment in R&D, its valuation indicates a significant margin of safety issue with a market cap exceeding intrinsic value by over 30%. The growth potential appears limited in the current market conditions, resulting in a bearish outlook.",
        signal: "bearish",
      },
    },
    charlie_munger_agent: {
      AAPL: {
        confidence: 65.0,
        reasoning:
          "AAPL demonstrates a strong competitive position with excellent ROIC and predictable revenue, showing good pricing power and low capital requirements. However, the management score is moderate due to high debt levels and lack of insider transactions, which diminish overall confidence in shareholder alignment. Valuation concerns are significant, as the current price is at a substantial premium to reasonable value, indicated by a low FCF yield. The investment thesis is bolstered by predictable operations and cash flows, but the elevated valuation coupled with management concerns leads to a neutral stance.",
        signal: "neutral",
      },
    },
    fundamentals_agent: {
      AAPL: {
        confidence: 50.0,
        reasoning: {
          financial_health_signal: {
            details: "Current Ratio: 0.92, D/E: 4.15",
            signal: "neutral",
          },
          growth_signal: {
            details: "Revenue Growth: 1.21%, Earnings Growth: 2.58%",
            signal: "neutral",
          },
          price_ratios_signal: {
            details: "P/E: 40.18, P/B: 57.87, P/S: 9.76",
            signal: "bullish",
          },
          profitability_signal: {
            details: "ROE: 145.30%, Net Margin: 24.30%, Op Margin: 31.77%",
            signal: "bullish",
          },
        },
        signal: "bullish",
      },
    },
    risk_management_agent: {
      AAPL: {
        current_price: 239.07,
        reasoning: {
          available_cash: 100000.0,
          current_position: 0.0,
          portfolio_value: 100000.0,
          position_limit: 20000.0,
          remaining_limit: 20000.0,
        },
        remaining_position_limit: 20000.0,
      },
    },
    sentiment_agent: {
      AAPL: {
        confidence: 58.0,
        reasoning:
          "Weighted Bullish signals: 120.9, Weighted Bearish signals: 201.9",
        signal: "bearish",
      },
    },
    stanley_druckenmiller_agent: {
      AAPL: {
        confidence: 60.0,
        reasoning:
          "Despite strong revenue and EPS growth, negative price momentum, insider selling, high valuations, and high leverage present significant risks. The overall signal is neutral due to the mixed indicators, warranting caution in investment.",
        signal: "neutral",
      },
    },
    technical_analyst_agent: {
      AAPL: {
        confidence: 18,
        signal: "neutral",
        strategy_signals: {
          mean_reversion: {
            confidence: 50,
            metrics: {
              price_vs_bb: 0.48322142818703595,
              rsi_14: 40.09315657470438,
              rsi_28: 55.965798678585294,
              z_score: 0.03377554997546681,
            },
            signal: "neutral",
          },
          momentum: {
            confidence: 50,
            metrics: {
              momentum_1m: 0.029919034102568687,
              momentum_3m: NaN,
              momentum_6m: NaN,
              volume_momentum: 1.0620615080180484,
            },
            signal: "neutral",
          },
          statistical_arbitrage: {
            confidence: 50,
            metrics: {
              hurst_exponent: 3.5021793288704653e-15,
              kurtosis: NaN,
              skewness: NaN,
            },
            signal: "neutral",
          },
          trend_following: {
            confidence: 32,
            metrics: {
              adx: 31.86771376376679,
              trend_strength: 0.3186771376376679,
            },
            signal: "bearish",
          },
          volatility: {
            confidence: 50,
            metrics: {
              atr_ratio: 0.023549587986782135,
              historical_volatility: 0.21888402328679749,
              volatility_regime: NaN,
              volatility_z_score: NaN,
            },
            signal: "neutral",
          },
        },
      },
    },
    valuation_agent: {
      AAPL: {
        confidence: 76.0,
        reasoning: {
          dcf_analysis: {
            details:
              "Intrinsic Value: $1,384,683,782,101.15, Market Cap: $3,863,453,200,570.00, Gap: -64.2%",
            signal: "bearish",
          },
          owner_earnings_analysis: {
            details:
              "Owner Earnings Value: $467,980,442,527.33, Market Cap: $3,863,453,200,570.00, Gap: -87.9%",
            signal: "bearish",
          },
        },
        signal: "bearish",
      },
    },
    warren_buffett_agent: {
      AAPL: {
        confidence: 80.0,
        reasoning:
          "The investment analysis shows that AAPL has a very high debt-to-equity ratio of 4.2, which is concerning regarding financial strength. Additionally, the margin of safety is negative at -50.9%, indicating the stock is overvalued relative to its intrinsic value. Earnings growth has been inconsistent, with a total earnings growth decrease of 4.7% over the last 5 periods. Overall, the metrics suggest that this investment does not meet Warren Buffett's principles of safety and stability, thus warranting a bearish signal.",
        signal: "bearish",
      },
    },
  },
  decisions: {
    AAPL: {
      action: "hold",
      confidence: 50.0,
      quantity: 0,
      reasoning:
        "Despite the bullish signal from the fundamentals agent, the overwhelming bearish signals from valuation, sentiment, and multiple other agents indicate a lack of confidence in taking a long position. Therefore, I will not take action on AAPL.",
    },
  },
};
