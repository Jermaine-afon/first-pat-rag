import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, ArrowRight, CornerDownLeft } from 'lucide-react';
import { MarketItem, AssetType } from '../types/market';
import { allSearchableItems } from '../data/marketsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAsset: (item: MarketItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectAsset,
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | AssetType>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = allSearchableItems.filter((item) => {
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    const matchesQuery =
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const filterTabs: { id: 'all' | AssetType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'stock', label: 'Stocks' },
    { id: 'index', label: 'Indices' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'commodity', label: 'Futures' },
    { id: 'forex', label: 'Forex' },
    { id: 'etf', label: 'ETFs' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#e0e3eb] dark:border-[#2a2e39] gap-3">
          <Search className="w-5 h-5 text-[#787b86]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search symbol, company, crypto, index (e.g. NVDA, SPX, BTC)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-[#131722] dark:text-white placeholder-[#787b86] text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] text-gray-500 bg-[#f0f3fa] dark:bg-gray-800 rounded">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-[#181c25] overflow-x-auto no-scrollbar">
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#131722] dark:bg-white text-white dark:text-[#131722]'
                    : 'text-[#787b86] hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Quick Suggestions when query is empty */}
        {query === '' && (
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-[#787b86] uppercase">Popular:</span>
            {['NVDA', 'SPX', 'BTC', 'TSLA', 'GC1!', 'AAPL'].map((sym) => {
              const item = allSearchableItems.find((s) => s.symbol === sym);
              return (
                <button
                  key={sym}
                  onClick={() => {
                    if (item) {
                      onSelectAsset(item);
                      onClose();
                    }
                  }}
                  className="px-2.5 py-0.5 text-xs bg-[#f0f3fa] dark:bg-[#2a2e39] text-[#131722] dark:text-[#d1d4dc] rounded hover:bg-[#2962ff] hover:text-white transition"
                >
                  {sym}
                </button>
              );
            })}
          </div>
        )}

        {/* Search Results List */}
        <div className="overflow-y-auto divide-y divide-[#e0e3eb]/60 dark:divide-[#2a2e39]/60 flex-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#787b86]">
              No instruments found matching &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredItems.map((item) => {
              const isPositive = item.change >= 0;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectAsset(item);
                    onClose();
                  }}
                  className="px-4 py-3 flex items-center justify-between hover:bg-[#f0f3fa] dark:hover:bg-[#252a36] cursor-pointer transition group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      style={{ backgroundColor: item.badgeBg?.includes('gradient') ? undefined : (item.badgeBg || '#1e3a8a') }}
                      className={`w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 ${
                        item.badgeBg?.includes('gradient') ? 'bg-gradient-to-tr from-purple-500 to-teal-400' : ''
                      }`}
                    >
                      {item.badgeText || item.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#131722] dark:text-white group-hover:text-[#2962ff]">
                          {item.symbol}
                        </span>
                        <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.2 rounded uppercase">
                          {item.type}
                        </span>
                        {item.exchange && (
                          <span className="text-[10px] text-[#787b86]">{item.exchange}</span>
                        )}
                      </div>
                      <div className="text-xs text-[#787b86] truncate max-w-xs">{item.name}</div>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <div>
                      <div className="font-bold text-xs tabular-num text-[#131722] dark:text-white">
                        {item.type === 'stock' || item.type === 'crypto' ? '$' : ''}
                        {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div
                        className={`text-[11px] font-semibold tabular-num ${
                          isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#2962ff] group-hover:translate-x-0.5 transition" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="px-4 py-2 bg-gray-50 dark:bg-[#181c25] border-t border-[#e0e3eb] dark:border-[#2a2e39] text-[11px] text-[#787b86] flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-[10px]">
              ↑
            </kbd>
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-[10px]">
              ↓
            </kbd>
            <span className="ml-2">Select:</span>
            <CornerDownLeft className="w-3 h-3 inline-block" />
          </div>
          <span>TradingView Symbol Directory</span>
        </div>
      </div>
    </div>
  );
};
