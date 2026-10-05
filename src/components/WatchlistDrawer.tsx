import React from 'react';
import { MarketItem } from '../types/market';
import { X, Trash2, Star, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlistItems: MarketItem[];
  onSelectAsset: (item: MarketItem) => void;
  onRemoveFromWatchlist: (id: string) => void;
  onClearWatchlist: () => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlistItems,
  onSelectAsset,
  onRemoveFromWatchlist,
  onClearWatchlist,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex justify-end animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white dark:bg-[#1e222d] border-l border-[#e0e3eb] dark:border-[#2a2e39] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#e0e3eb] dark:border-[#2a2e39] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            <h3 className="font-bold text-sm text-[#131722] dark:text-white">
              My Watchlist ({watchlistItems.length})
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {watchlistItems.length > 0 && (
              <button
                onClick={onClearWatchlist}
                className="text-xs text-gray-400 hover:text-red-500 p-1 transition"
                title="Clear all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-[#787b86] hover:text-[#131722] dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Watchlist Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
          {watchlistItems.length === 0 ? (
            <div className="p-8 text-center text-[#787b86] space-y-2">
              <Star className="w-10 h-10 mx-auto text-gray-300 stroke-1" />
              <p className="text-xs">Your watchlist is currently empty.</p>
              <p className="text-[11px] text-gray-400">
                Click the star icon next to any index, stock, crypto, or commodity to track it here.
              </p>
            </div>
          ) : (
            watchlistItems.map((item) => {
              const isPositive = item.change >= 0;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectAsset(item);
                    onClose();
                  }}
                  className="p-3 hover:bg-[#f0f3fa] dark:hover:bg-[#252a36] cursor-pointer flex items-center justify-between transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      style={{ backgroundColor: item.badgeBg?.includes('gradient') ? undefined : (item.badgeBg || '#0066cc') }}
                      className={`w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 ${
                        item.badgeBg?.includes('gradient') ? 'bg-gradient-to-tr from-purple-500 to-teal-400' : ''
                      }`}
                    >
                      {item.badgeText || item.symbol.slice(0, 2)}
                    </span>
                    <div>
                      <div className="font-bold text-xs text-[#131722] dark:text-white group-hover:text-[#2962ff]">
                        {item.symbol}
                      </div>
                      <div className="text-[11px] text-[#787b86] truncate max-w-[130px]">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="text-right">
                      <div className="text-xs font-bold tabular-num text-[#131722] dark:text-white">
                        {item.type === 'stock' || item.type === 'crypto' ? '$' : ''}
                        {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div
                        className={`text-[10px] font-semibold tabular-num flex items-center justify-end ${
                          isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isPositive ? (
                          <ArrowUpRight className="w-3 h-3 inline mr-0.5" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 inline mr-0.5" />
                        )}
                        {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFromWatchlist(item.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 p-1 transition"
                      title="Remove"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-[#e0e3eb] dark:border-[#2a2e39] bg-gray-50/50 dark:bg-[#181c25] text-[11px] text-[#787b86] text-center">
          Real-time quotes synchronized with market hours
        </div>
      </div>
    </div>
  );
};
