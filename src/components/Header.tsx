import React, { useState } from 'react';
import { Search, Globe, User, Star, Activity, Moon, Sun, Check, Bell } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
  isLiveSimulation: boolean;
  onToggleLiveSimulation: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onGetStarted: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenWatchlist,
  watchlistCount,
  isLiveSimulation,
  onToggleLiveSimulation,
  isDarkMode,
  onToggleDarkMode,
  onGetStarted,
}) => {
  const [activeNav, setActiveNav] = useState('Markets');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const languages = [
    { code: 'EN', name: 'English (US)' },
    { code: 'ES', name: 'Español' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'JA', name: '日本語' },
    { code: 'FR', name: 'Français' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#131722] border-b border-[#e0e3eb] dark:border-[#2a2e39] transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand & Search */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <a
            aria-label="TradingView Home"
            className="flex items-center gap-2 group cursor-pointer"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <svg
              className="w-8 h-8 text-black dark:text-white fill-current transition-transform group-hover:scale-105"
              viewBox="0 0 36 28"
            >
              <path d="M14 22H7V11h7v11zm15-16h-7v22h7V6zm-7.5 8h-7v14h7V14z"></path>
            </svg>
          </a>

          {/* Search Bar Pill */}
          <div
            className="relative hidden sm:block w-48 md:w-64 lg:w-72 cursor-pointer group"
            onClick={onOpenSearch}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#787b86]">
              <Search className="w-4 h-4 stroke-[2]" />
            </div>
            <input
              className="w-full bg-[#f0f3fa] dark:bg-[#1e222d] dark:text-[#d1d4dc] text-xs font-medium text-[#787b86] pl-9 pr-8 py-2 rounded-full border-none cursor-pointer group-hover:bg-[#e4e7ed] dark:group-hover:bg-[#2a2e39] transition-colors focus:ring-1 focus:ring-[#2962ff] focus:outline-none"
              readOnly
              type="text"
              value="Search (Ctrl+K)"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-gray-500 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-xs">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold">
          {['Products', 'Community', 'Markets', 'Brokers', 'More'].map((nav) => {
            const isActive = activeNav === nav;
            return (
              <button
                key={nav}
                onClick={() => setActiveNav(nav)}
                className={`transition-colors py-4 text-sm font-semibold cursor-pointer ${
                  isActive
                    ? 'text-[#2962ff] relative border-b-2 border-[#2962ff]'
                    : 'text-[#131722] dark:text-[#d1d4dc] hover:text-[#2962ff] dark:hover:text-[#2962ff]'
                }`}
              >
                {nav}
              </button>
            );
          })}
        </nav>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Simulation Indicator Toggle */}
          <button
            onClick={onToggleLiveSimulation}
            title={isLiveSimulation ? 'Live price ticks enabled (Click to pause)' : 'Live simulation paused (Click to start)'}
            className={`hidden md:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full border transition cursor-pointer ${
              isLiveSimulation
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#089981] border-emerald-200 dark:border-emerald-800'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 border-transparent hover:bg-gray-200'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isLiveSimulation ? 'bg-[#089981] animate-ping' : 'bg-gray-400'
              }`}
            />
            <span className="text-[11px]">{isLiveSimulation ? 'Live Feed' : 'Static'}</span>
          </button>

          {/* Watchlist Quick Button */}
          <button
            onClick={onOpenWatchlist}
            className="relative p-1.5 text-[#131722] dark:text-white hover:text-[#2962ff] hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] rounded-full transition cursor-pointer"
            title="My Watchlist"
          >
            <Star className={`w-4 h-4 ${watchlistCount > 0 ? 'fill-amber-400 text-amber-500' : ''}`} />
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#2962ff] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle theme"
            className="p-1.5 text-[#131722] dark:text-white hover:text-[#2962ff] hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] rounded-full transition cursor-pointer"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
          </button>

          {/* Mobile Search Button */}
          <button
            onClick={onOpenSearch}
            className="sm:hidden p-1.5 text-[#131722] dark:text-white hover:text-[#2962ff] hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] rounded-full transition"
            aria-label="Open search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#131722] dark:text-[#d1d4dc] hover:text-[#2962ff] py-1.5 px-2 rounded-md hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] transition cursor-pointer"
            >
              <Globe className="w-4 h-4 text-[#787b86]" />
              <span>{selectedLang}</span>
            </button>
            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-lg shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setShowLangMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-[#131722] dark:text-[#d1d4dc] hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] flex items-center justify-between cursor-pointer"
                  >
                    <span>{lang.name}</span>
                    {selectedLang === lang.code && <Check className="w-3.5 h-3.5 text-[#2962ff]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Avatar Button */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              aria-label="User account"
              className="p-1.5 text-[#131722] dark:text-white hover:text-[#2962ff] hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] rounded-full transition cursor-pointer"
            >
              <User className="w-5 h-5 text-[#131722] dark:text-white" />
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl shadow-xl py-2 z-50 text-xs">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                  <div className="font-bold text-gray-900 dark:text-white">Guest Trader</div>
                  <div className="text-[11px] text-[#787b86]">Demo Account ($100k)</div>
                </div>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onOpenWatchlist();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span>My Watchlist ({watchlistCount})</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onGetStarted();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] text-gray-700 dark:text-gray-300"
                >
                  Trading Preferences
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onOpenSearch();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] text-gray-700 dark:text-gray-300"
                >
                  Symbol Lookup (⌘K)
                </button>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <button
            onClick={onGetStarted}
            className="tv-btn-gradient text-white text-xs font-semibold px-4 py-2 rounded-full shadow-xs hover:opacity-95 transition-opacity cursor-pointer whitespace-nowrap"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};
