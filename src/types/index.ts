export interface Stock {
  symbol: string;
  shares: number;
  price: number;
  costBasis: number;
  purchaseDate: string;
  institution: string;
}

export interface Institution {
  id: string;
  name: string;
  logo: string;
  connected: boolean;
}