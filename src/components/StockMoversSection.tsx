import React, { useState } from 'react';
import { MarketItem, MoversTab } from '../types/market';
import { Star } from 'lucide-react';

interface StockMoversSectionProps {
  moversData: Record<string, MarketItem[]>;
  onSelectAsset: (item: MarketItem) => void;
  watchlist: string[];
  onToggleWatchlist: (id: string, e: React.MouseEvent) => void;
  lastUpdatedTickId?: string | null;
}

export const StockMoversSection: React.FC<StockMoversSectionProps> = ({
  moversData,
  onSelectAsset,
  watchlist,
  onToggleWatchlist,
  lastUpdatedTickId,
}) => {
  const [activeTab, setActiveTab] = useState<MoversTab>('volume');

  const tabs: { key: MoversTab; label: string }[] = [
    { key: 'volume', label: 'Highest volume' },
    { key: 'volatile', label: 'Most volatile' },
    { key: 'gainers', label: 'Gainers' },
    { key: 'losers', label: 'Losers' },
  ];

  const currentStocks = moversData[activeTab] || moversData.volume;

  const renderRatingBadge = (rating?: string) => {
    if (!rating) return null;
    switch (rating) {
      case 'Strong Buy':
      case 'Buy':
        return (
          <span className="text-[11px] font-bold text-[#089981] bg-[#e6f7f4] dark:bg-emerald-950/60 px-2 py-1 rounded">
            {rating}
          </span>
        );
      case 'Sell':
      case 'Strong Sell':
        return (
          <span className="text-[11px] font-bold text-[#f23645] bg-[#feecee] dark:bg-rose-950/60 px-2 py-1 rounded">
            {rating}
          </span>
        );
      case 'Neutral':
      default:
        return (
          <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded">
            {rating}
          </span>
        );
    }
  };

  return (
    <section id="stocks-section">
      {/* Header with Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <a
          className="inline-flex items-center text-2xl font-bold hover:text-[#2962ff] dark:hover:text-[#2962ff] group text-[#131722] dark:text-white"
          href="#stocks-section"
          onClick={(e) => e.preventDefault()}
        >
          <span>US Stocks &amp; Market Movers</span>
          <svg
            className="w-5 h-5 ml-1 transition group-hover:translate-x-1 stroke-current fill-none stroke-[2.5]"
            viewBox="0 0 24 24"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </a>

        {/* Filter Sub-tabs */}
        <div className="flex items-center gap-1.5 bg-[#f0f3fa] dark:bg-[#1e222d] p-1 rounded-lg text-xs font-semibold self-start md:self-auto border border-gray-100 dark:border-gray-800">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-1 rounded-md transition cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-[#2a2e39] text-[#131722] dark:text-white shadow-xs font-bold'
                    : 'text-[#787b86] hover:text-[#131722] dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stocks Table */}
      <div className="overflow-x-auto border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl bg-white dark:bg-[#1e222d]">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <thead>
            <tr className="border-b border-[#e0e3eb] dark:border-[#2a2e39] bg-gray-50/70 dark:bg-[#181c25] text-[#787b86] text-[11px] font-bold uppercase tracking-wider">
              <th className="py-3 px-4">Company</th>
              <th className="py-3 px-4 text-right">Last</th>
              <th className="py-3 px-4 text-right">Chg %</th>
              <th className="py-3 px-4 text-right">Chg</th>
              <th className="py-3 px-4 text-right hidden sm:table-cell">Volume</th>
              <th className="py-3 px-4 text-right hidden md:table-cell">Market Cap</th>
              <th className="py-3 px-4 text-center hidden lg:table-cell">Technical Rating</th>
              <th className="py-3 px-3 text-center w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0e3eb] dark:divide-[#2a2e39] font-medium">
            {currentStocks.map((stock) => {
              const isPositive = stock.change >= 0;
              const isStarred = watchlist.includes(stock.id);
              const isRecentlyUpdated = lastUpdatedTickId === stock.id;

              return (
                <tr
                  key={stock.id}
                  onClick={() => onSelectAsset(stock)}
                  className={`hover:bg-[#f0f3fa] dark:hover:bg-[#252a36] transition cursor-pointer group ${
                    isRecentlyUpdated
                      ? isPositive
                        ? 'animate-flash-green'
                        : 'animate-flash-red'
                      : ''
                  }`}
                >
                  {/* Company Info */}
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div
                      style={{ backgroundColor: stock.badgeBg || '#1b365d', color: stock.badgeColor || '#fff' }}
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs"
                    >
                      {stock.badgeText || stock.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-bold text-[#131722] dark:text-white flex items-center gap-1.5 group-hover:text-[#2962ff] transition-colors">
                        <span>{stock.symbol}</span>
                        {stock.exchange && (
                          <span className="text-[11px] font-medium text-[#787b86] px-1.5 bg-gray-100 dark:bg-gray-800 rounded">
                            {stock.exchange}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#787b86] truncate max-w-[180px] md:max-w-none">
                        {stock.name}
                      </div>
                    </div>
                  </td>

                  {/* Last Price */}
                  <td className="py-3 px-4 text-right tabular-num font-bold text-[#131722] dark:text-white">
                    ${stock.price.toFixed(2)}
                  </td>

                  {/* Change % */}
                  <td
                    className={`py-3 px-4 text-right tabular-num font-semibold ${
                      isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded ${
                        isPositive
                          ? 'bg-[#e6f7f4] dark:bg-emerald-950/60 text-[#089981]'
                          : 'bg-[#feecee] dark:bg-rose-950/60 text-[#f23645]'
                      }`}
                    >
                      {isPositive ? `+${stock.changePercent.toFixed(2)}%` : `${stock.changePercent.toFixed(2)}%`}
                    </span>
                  </td>

                  {/* Change in currency */}
                  <td
                    className={`py-3 px-4 text-right tabular-num font-semibold ${
                      isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {isPositive ? `+${stock.change.toFixed(2)}` : stock.change.toFixed(2)}
                  </td>

                  {/* Volume */}
                  <td className="py-3 px-4 text-right tabular-num text-[#787b86] hidden sm:table-cell">
                    {stock.volume || '—'}
                  </td>

                  {/* Market Cap */}
                  <td className="py-3 px-4 text-right tabular-num text-[#787b86] hidden md:table-cell">
                    {stock.marketCap || '—'}
                  </td>

                  {/* Technical Rating */}
                  <td className="py-3 px-4 text-center hidden lg:table-cell">
                    {renderRatingBadge(stock.technicalRating)}
                  </td>

                  {/* Watchlist toggle */}
                  <td className="py-3 px-2 text-center" onClick={(e) => onToggleWatchlist(stock.id, e)}>
                    <button
                      className="text-gray-300 dark:text-gray-600 hover:text-amber-500 transition p-1"
                      title={isStarred ? 'Remove from Watchlist' : 'Add to Watchlist'}
                    >
                      <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400 text-amber-500' : ''}`} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
