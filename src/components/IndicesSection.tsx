import React from 'react';
import { MarketItem } from '../types/market';
import { Star } from 'lucide-react';

interface IndicesSectionProps {
  indices: MarketItem[];
  onSelectAsset: (item: MarketItem) => void;
  watchlist: string[];
  onToggleWatchlist: (id: string, e: React.MouseEvent) => void;
  lastUpdatedTickId?: string | null;
}

export const IndicesSection: React.FC<IndicesSectionProps> = ({
  indices,
  onSelectAsset,
  watchlist,
  onToggleWatchlist,
  lastUpdatedTickId,
}) => {
  // First 4 indices for the pill cards
  const pillCards = indices.slice(0, 4);

  return (
    <section id="indices-section">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-4">
        <a
          className="inline-flex items-center text-2xl font-bold hover:text-[#2962ff] dark:hover:text-[#2962ff] group text-[#131722] dark:text-white"
          href="#indices-section"
          onClick={(e) => e.preventDefault()}
        >
          <span>Indices</span>
          <svg
            className="w-5 h-5 ml-1 transition group-hover:translate-x-1 stroke-current fill-none stroke-[2.5]"
            viewBox="0 0 24 24"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </a>
        <div className="flex items-center gap-2 text-xs font-medium text-[#787b86]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#089981] animate-pulse"></span>
          <span>Market Open</span>
        </div>
      </div>

      {/* Quick Index Pill Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {pillCards.map((card) => {
          const isPositive = card.change >= 0;
          const isRecentlyUpdated = lastUpdatedTickId === card.id;

          return (
            <div
              key={card.id}
              onClick={() => onSelectAsset(card)}
              className={`bg-[#f0f3fa] dark:bg-[#1e222d] hover:bg-[#e8ebf2] dark:hover:bg-[#252a36] p-4 rounded-xl transition cursor-pointer flex items-center justify-between border border-transparent hover:border-[#e0e3eb] dark:hover:border-[#2a2e39] ${
                isRecentlyUpdated
                  ? isPositive
                    ? 'animate-flash-green ring-1 ring-[#089981]'
                    : 'animate-flash-red ring-1 ring-[#f23645]'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  style={{ backgroundColor: card.badgeBg || '#0066cc', color: card.badgeColor || '#fff' }}
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs tracking-tight shadow-xs flex-shrink-0"
                >
                  {card.badgeText}
                </span>
                <div>
                  <div className="text-xs text-[#787b86] font-medium uppercase tracking-wide">
                    {card.symbol}
                  </div>
                  <div className="text-sm font-bold text-[#131722] dark:text-white truncate max-w-[110px]">
                    {card.name.replace(' Index', '')}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold tabular-num text-[#131722] dark:text-white">
                  {card.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div
                  className={`text-xs font-semibold tabular-num ${
                    isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                  }`}
                >
                  {isPositive ? `+${card.changePercent.toFixed(2)}%` : `${card.changePercent.toFixed(2)}%`}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indices Table */}
      <div className="overflow-x-auto border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl bg-white dark:bg-[#1e222d]">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <thead>
            <tr className="border-b border-[#e0e3eb] dark:border-[#2a2e39] bg-gray-50/70 dark:bg-[#181c25] text-[#787b86] text-[11px] font-bold uppercase tracking-wider">
              <th className="py-3 px-4">Index</th>
              <th className="py-3 px-4 text-right">Price</th>
              <th className="py-3 px-4 text-right">Change</th>
              <th className="py-3 px-4 text-right">Change %</th>
              <th className="py-3 px-4 text-center hidden md:table-cell">24H Trend</th>
              <th className="py-3 px-4 text-right hidden lg:table-cell">High</th>
              <th className="py-3 px-4 text-right hidden lg:table-cell">Low</th>
              <th className="py-3 px-3 text-center w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0e3eb] dark:divide-[#2a2e39] font-medium">
            {indices.map((item) => {
              const isPositive = item.change >= 0;
              const isStarred = watchlist.includes(item.id);
              const isRecentlyUpdated = lastUpdatedTickId === item.id;

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectAsset(item)}
                  className={`hover:bg-[#f0f3fa] dark:hover:bg-[#252a36] transition cursor-pointer group ${
                    isRecentlyUpdated
                      ? isPositive
                        ? 'animate-flash-green'
                        : 'animate-flash-red'
                      : ''
                  }`}
                >
                  {/* Index Name & Badge */}
                  <td className="py-3.5 px-4 font-bold flex items-center gap-2.5 text-[#131722] dark:text-white">
                    <span
                      style={{ backgroundColor: item.badgeBg || '#e12a3d', color: item.badgeColor || '#fff' }}
                      className="w-6 h-6 rounded-full text-[10px] flex items-center justify-center font-bold shadow-xs flex-shrink-0"
                    >
                      {item.badgeText || item.symbol.slice(0, 2)}
                    </span>
                    <span className="group-hover:text-[#2962ff] transition-colors">{item.name}</span>
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 text-right tabular-num font-bold text-[#131722] dark:text-white">
                    {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  {/* Change */}
                  <td
                    className={`py-3.5 px-4 text-right tabular-num font-semibold ${
                      isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {isPositive ? `+${item.change.toFixed(2)}` : item.change.toFixed(2)}
                  </td>

                  {/* Change % */}
                  <td className="py-3.5 px-4 text-right tabular-num font-semibold">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded ${
                        isPositive
                          ? 'bg-[#e6f7f4] dark:bg-emerald-950/60 text-[#089981]'
                          : 'bg-[#feecee] dark:bg-rose-950/60 text-[#f23645]'
                      }`}
                    >
                      {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                    </span>
                  </td>

                  {/* 24H Trend Sparkline */}
                  <td className="py-3.5 px-4 text-center hidden md:table-cell">
                    <svg
                      className={`w-24 h-6 inline-block ${
                        isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 100 24"
                    >
                      {isPositive ? (
                        <polyline points="0,18 20,15 40,19 60,11 80,8 100,3" />
                      ) : (
                        <polyline points="0,5 25,7 50,14 75,12 100,19" />
                      )}
                    </svg>
                  </td>

                  {/* High */}
                  <td className="py-3.5 px-4 text-right tabular-num text-[#787b86] hidden lg:table-cell">
                    {item.high?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  {/* Low */}
                  <td className="py-3.5 px-4 text-right tabular-num text-[#787b86] hidden lg:table-cell">
                    {item.low?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  {/* Watchlist Star */}
                  <td className="py-3.5 px-2 text-center" onClick={(e) => onToggleWatchlist(item.id, e)}>
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
