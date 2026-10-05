export type AssetType = 'index' | 'stock' | 'crypto' | 'commodity' | 'forex' | 'bond' | 'etf';

export interface MarketItem {
  id: string;
  symbol: string;
  name: string;
  exchange?: string;
  type: AssetType;
  price: number;
  change: number;
  changePercent: number;
  volume?: string;
  marketCap?: string;
  high?: number;
  low?: number;
  open?: number;
  technicalRating?: 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';
  badgeText?: string;
  badgeBg?: string;
  badgeColor?: string;
  sparkline?: number[];
  unit?: string;
  description?: string;
  peRatio?: number;
  week52High?: number;
  week52Low?: number;
  history?: { time: string; price: number; volume: number; open: number; high: number; low: number; close: number }[];
}

export interface CalendarEvent {
  id: string;
  date: string;
  timeGmt: string;
  title: string;
  badge: string;
  badgeType: 'high' | 'earnings' | 'fomc' | 'medium';
  forecast?: string;
  prior?: string;
  estEps?: string;
  estRev?: string;
  category: 'Today' | 'This week' | 'Next week';
}

export type MoversTab = 'volume' | 'volatile' | 'gainers' | 'losers';
