import React from 'react';
import { MarketItem } from '../types/market';
import { Star } from 'lucide-react';
import { CategoryType } from './SubTabs';

interface CategoryDeepDiveProps {
  category: CategoryType;
  items: MarketItem[];
  onSelectAsset: (item: MarketItem) => void;
  watchlist: string[];
  onToggleWatchlist: (id: string, e: React.MouseEvent) => void;
  lastUpdatedTickId?: string | null;
}

export const CategoryDeepDive: React.FC<CategoryDeepDiveProps> = ({
  category,
  items,
  onSelectAsset,
  watchlist,
  onToggleWatchlist,
  lastUpdatedTickId,
}) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#131722] dark:text-white flex items-center gap-2">
          <span>{category}</span>
        </h2>
        <span className="text-xs text-[#787b86] font-medium">
          Showing {items.length} top assets
        </span>
      </div>

      <div className="overflow-x-auto border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl bg-white dark:bg-[#1e222d]">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <thead>
            <tr className="border-b border-[#e0e3eb] dark:border-[#2a2e39] bg-gray-50/70 dark:bg-[#181c25] text-[#787b86] text-[11px] font-bold uppercase tracking-wider">
              <th className="py-3 px-4">Instrument</th>
              <th className="py-3 px-4 text-right">Price</th>
              <th className="py-3 px-4 text-right">Change</th>
              <th className="py-3 px-4 text-right">Change %</th>
              <th className="py-3 px-4 text-right hidden sm:table-cell">52W Range</th>
              <th className="py-3 px-4 text-center hidden md:table-cell">Technical Rating</th>
              <th className="py-3 px-3 text-center w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0e3eb] dark:divide-[#2a2e39] font-medium">
            {items.map((item) => {
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
                  <td className="py-3 px-4 flex items-center gap-3">
                    <span
                      style={{ backgroundColor: item.badgeBg || '#1e3a8a' }}
                      className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs flex-shrink-0"
                    >
                      {item.badgeText || item.symbol.slice(0, 2)}
                    </span>
                    <div>
                      <div className="font-bold text-[#131722] dark:text-white flex items-center gap-1.5 group-hover:text-[#2962ff]">
                        <span>{item.symbol}</span>
                        {item.exchange && (
                          <span className="text-[10px] text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                            {item.exchange}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#787b86]">{item.name}</div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-right tabular-num font-bold text-[#131722] dark:text-white">
                    {item.type === 'stock' || item.type === 'crypto' || item.type === 'etf' ? '$' : ''}
                    {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                    {item.unit?.includes('%') ? '%' : ''}
                  </td>

                  <td
                    className={`py-3 px-4 text-right tabular-num font-semibold ${
                      isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                    }`}
                  >
                    {isPositive ? `+${item.change.toFixed(4).replace(/0+$/, '').replace(/\.$/, '')}` : item.change.toFixed(4).replace(/0+$/, '').replace(/\.$/, '')}
                  </td>

                  <td className="py-3 px-4 text-right tabular-num font-semibold">
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

                  <td className="py-3 px-4 text-right tabular-num text-[#787b86] hidden sm:table-cell">
                    {item.week52Low && item.week52High
                      ? `${item.week52Low} - ${item.week52High}`
                      : '—'}
                  </td>

                  <td className="py-3 px-4 text-center hidden md:table-cell">
                    <span className="text-[11px] font-bold text-[#089981] bg-[#e6f7f4] dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                      {item.technicalRating || 'Buy'}
                    </span>
                  </td>

                  <td className="py-3 px-2 text-center" onClick={(e) => onToggleWatchlist(item.id, e)}>
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
