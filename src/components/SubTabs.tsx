import React from 'react';

export const CATEGORIES = [
  'Indices',
  'US stocks',
  'World stocks',
  'Crypto',
  'Futures & commodities',
  'Forex & currencies',
  'Government bonds',
  'Corporate bonds',
  'ETFs',
  'Economy'
] as const;

export type CategoryType = (typeof CATEGORIES)[number];

interface SubTabsProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

export const SubTabs: React.FC<SubTabsProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-6 border-b border-[#e0e3eb] dark:border-[#2a2e39]">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 text-sm font-semibold whitespace-nowrap">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full transition cursor-pointer text-sm font-semibold ${
                isActive
                  ? 'bg-[#131722] dark:bg-white text-white dark:text-[#131722] shadow-xs'
                  : 'text-[#131722] dark:text-[#d1d4dc] hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </section>
  );
};
