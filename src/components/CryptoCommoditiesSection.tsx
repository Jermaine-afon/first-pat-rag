import React from 'react';
import { MarketItem } from '../types/market';
import { Star } from 'lucide-react';

interface CryptoCommoditiesProps {
  cryptoItems: MarketItem[];
  commodityItems: MarketItem[];
  onSelectAsset: (item: MarketItem) => void;
  watchlist: string[];
  onToggleWatchlist: (id: string, e: React.MouseEvent) => void;
  lastUpdatedTickId?: string | null;
}

export const CryptoCommoditiesSection: React.FC<CryptoCommoditiesProps> = ({
  cryptoItems,
  commodityItems,
  onSelectAsset,
  watchlist,
  onToggleWatchlist,
  lastUpdatedTickId,
}) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="crypto-commodities-section">
      {/* Crypto Overview Card */}
      <div className="border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl p-5 bg-white dark:bg-[#1e222d] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <a
            className="inline-flex items-center text-xl font-bold hover:text-[#2962ff] dark:hover:text-[#2962ff] group text-[#131722] dark:text-white"
            href="#crypto-commodities-section"
            onClick={(e) => e.preventDefault()}
          >
            <span>Crypto</span>
            <svg
              className="w-4 h-4 ml-1 transition group-hover:translate-x-1 stroke-current fill-none stroke-[2.5]"
              viewBox="0 0 24 24"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
          <span className="text-xs font-semibold text-[#787b86]">24h volume: $84.2B</span>
        </div>

        <div className="space-y-3">
          {cryptoItems.map((crypto) => {
            const isPositive = crypto.change >= 0;
            const isStarred = watchlist.includes(crypto.id);
            const isRecentlyUpdated = lastUpdatedTickId === crypto.id;

            return (
              <div
                key={crypto.id}
                onClick={() => onSelectAsset(crypto)}
                className={`flex items-center justify-between p-2.5 rounded-lg hover:bg-[#f0f3fa] dark:hover:bg-[#252a36] transition cursor-pointer group ${
                  isRecentlyUpdated
                    ? isPositive
                      ? 'animate-flash-green'
                      : 'animate-flash-red'
                    : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      background: crypto.badgeBg?.includes('gradient') ? undefined : (crypto.badgeBg || '#f7931a')
                    }}
                    className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs ${
                      crypto.badgeBg?.includes('gradient') ? 'bg-gradient-to-tr from-purple-500 to-teal-400 text-[10px]' : ''
                    }`}
                  >
                    {crypto.badgeText}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#131722] dark:text-white group-hover:text-[#2962ff] transition-colors">
                      {crypto.name}
                    </div>
                    <div className="text-xs text-[#787b86]">{crypto.unit || `${crypto.symbol} / USD`}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-bold tabular-num text-[#131722] dark:text-white">
                      ${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`text-xs font-semibold tabular-num ${
                        isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {isPositive ? `+${crypto.changePercent.toFixed(2)}%` : `${crypto.changePercent.toFixed(2)}%`}
                    </div>
                  </div>

                  <button
                    onClick={(e) => onToggleWatchlist(crypto.id, e)}
                    className="text-gray-300 dark:text-gray-600 hover:text-amber-500 transition p-1"
                    title={isStarred ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  >
                    <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400 text-amber-500' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Futures & Commodities Overview Card */}
      <div className="border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl p-5 bg-white dark:bg-[#1e222d] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <a
            className="inline-flex items-center text-xl font-bold hover:text-[#2962ff] dark:hover:text-[#2962ff] group text-[#131722] dark:text-white"
            href="#crypto-commodities-section"
            onClick={(e) => e.preventDefault()}
          >
            <span>Futures &amp; Commodities</span>
            <svg
              className="w-4 h-4 ml-1 transition group-hover:translate-x-1 stroke-current fill-none stroke-[2.5]"
              viewBox="0 0 24 24"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
          <span className="text-xs font-semibold text-[#787b86]">Active contracts</span>
        </div>

        <div className="space-y-3">
          {commodityItems.map((commodity) => {
            const isPositive = commodity.change >= 0;
            const isStarred = watchlist.includes(commodity.id);
            const isRecentlyUpdated = lastUpdatedTickId === commodity.id;

            return (
              <div
                key={commodity.id}
                onClick={() => onSelectAsset(commodity)}
                className={`flex items-center justify-between p-2.5 rounded-lg hover:bg-[#f0f3fa] dark:hover:bg-[#252a36] transition cursor-pointer group ${
                  isRecentlyUpdated
                    ? isPositive
                      ? 'animate-flash-green'
                      : 'animate-flash-red'
                    : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    style={{ backgroundColor: commodity.badgeBg || '#44403c' }}
                    className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs"
                  >
                    {commodity.badgeText}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#131722] dark:text-white group-hover:text-[#2962ff] transition-colors">
                      {commodity.name}
                    </div>
                    <div className="text-xs text-[#787b86]">{commodity.unit || `${commodity.symbol}`}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-bold tabular-num text-[#131722] dark:text-white">
                      {commodity.price.toLocaleString('en-US', {
                        minimumFractionDigits: commodity.price < 10 ? 3 : 2,
                        maximumFractionDigits: commodity.price < 10 ? 3 : 2,
                      })}
                    </div>
                    <div
                      className={`text-xs font-semibold tabular-num ${
                        isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {isPositive ? `+${commodity.changePercent.toFixed(2)}%` : `${commodity.changePercent.toFixed(2)}%`}
                    </div>
                  </div>

                  <button
                    onClick={(e) => onToggleWatchlist(commodity.id, e)}
                    className="text-gray-300 dark:text-gray-600 hover:text-amber-500 transition p-1"
                    title={isStarred ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  >
                    <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400 text-amber-500' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
