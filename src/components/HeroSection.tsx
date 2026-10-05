import React, { useState } from 'react';
import { CategoryType } from './SubTabs';

interface HeroSectionProps {
  onSelectCategory?: (category: CategoryType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectCategory }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('Markets, everywhere');

  const marketViews = [
    { name: 'Markets, everywhere', desc: 'Comprehensive global overview across asset classes' },
    { name: 'Global Market Heatmap', desc: 'Visual representation of sector weightings and performance' },
    { name: 'Major World Indices', desc: 'Wall Street, European bourses, and Asian powerhouse indices' },
    { name: 'Cryptocurrency Ecosystem', desc: 'Leading layer 1s, DeFi, and digital store of values' },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-6 pt-10 pb-6">
      <div className="relative inline-block">
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 cursor-pointer group w-fit select-none"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#131722] dark:text-white">
            {selectedView}
          </h1>
          <svg
            className={`w-6 h-6 md:w-8 md:h-8 text-[#131722] dark:text-white transition-transform duration-200 mt-1 stroke-current fill-none stroke-[2.5] ${
              dropdownOpen ? 'rotate-180' : 'group-hover:translate-y-1'
            }`}
            viewBox="0 0 24 24"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute left-0 mt-3 w-80 bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl shadow-2xl p-2 z-30 animate-in fade-in zoom-in-95">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#787b86] px-3 py-1.5">
              Select Market View
            </div>
            {marketViews.map((view) => (
              <button
                key={view.name}
                onClick={() => {
                  setSelectedView(view.name);
                  setDropdownOpen(false);
                  if (onSelectCategory && view.name.includes('Indices')) {
                    onSelectCategory('Indices');
                  } else if (onSelectCategory && view.name.includes('Crypto')) {
                    onSelectCategory('Crypto');
                  }
                }}
                className={`w-full text-left p-3 rounded-lg text-xs transition cursor-pointer ${
                  selectedView === view.name
                    ? 'bg-[#f0f3fa] dark:bg-[#2a2e39] font-bold text-[#2962ff]'
                    : 'text-[#131722] dark:text-[#d1d4dc] hover:bg-gray-50 dark:hover:bg-[#252a36]'
                }`}
              >
                <div className="font-semibold text-sm">{view.name}</div>
                <div className="text-[11px] text-[#787b86] mt-0.5">{view.desc}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mini live macro tags */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#787b86]">
        <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-[#1e222d] px-2.5 py-1 rounded-md border border-gray-100 dark:border-gray-800">
          <span className="font-medium text-gray-500">Market Sentiment:</span>
          <span className="font-bold text-[#089981]">Greed 68/100</span>
        </div>
        <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-[#1e222d] px-2.5 py-1 rounded-md border border-gray-100 dark:border-gray-800">
          <span className="font-medium text-gray-500">CBOE VIX:</span>
          <span className="font-bold tabular-num text-gray-800 dark:text-gray-200">18.24 (-2.1%)</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 bg-gray-50 dark:bg-[#1e222d] px-2.5 py-1 rounded-md border border-gray-100 dark:border-gray-800">
          <span className="font-medium text-gray-500">Advancing/Declining:</span>
          <span className="font-bold tabular-num text-[#089981]">3.2 : 1</span>
        </div>
      </div>
    </section>
  );
};
