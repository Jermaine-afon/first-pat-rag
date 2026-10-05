import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SubTabs, CategoryType } from './components/SubTabs';
import { IndicesSection } from './components/IndicesSection';
import { StockMoversSection } from './components/StockMoversSection';
import { CryptoCommoditiesSection } from './components/CryptoCommoditiesSection';
import { CalendarSection } from './components/CalendarSection';
import { CategoryDeepDive } from './components/CategoryDeepDive';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AssetDetailModal } from './components/AssetDetailModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { GetStartedModal } from './components/GetStartedModal';
import {
  benchmarkIndices,
  stockMoversData,
  cryptoData,
  commoditiesData,
  calendarEvents,
  worldStocksData,
  forexData,
  bondsData,
  etfsData,
  allSearchableItems,
} from './data/marketsData';
import { MarketItem } from './types/market';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('Indices');
  const [selectedAsset, setSelectedAsset] = useState<MarketItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [watchlist, setWatchlist] = useState<string[]>(['nvda', 'btc', 'spx', 'gc1']);
  const [isLiveSimulation, setIsLiveSimulation] = useState(true);
  const [lastUpdatedTickId, setLastUpdatedTickId] = useState<string | null>(null);

  // Live price tick simulation
  const [indices, setIndices] = useState(benchmarkIndices);
  const [movers, setMovers] = useState(stockMoversData);
  const [cryptos, setCryptos] = useState(cryptoData);
  const [commodities, setCommodities] = useState(commoditiesData);

  // Toggle dark mode class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Periodic price tick simulation
  useEffect(() => {
    if (!isLiveSimulation) return;

    const interval = setInterval(() => {
      const targetPool = Math.random();

      if (targetPool < 0.35) {
        // Ticks an index
        const idx = Math.floor(Math.random() * indices.length);
        const item = indices[idx];
        const delta = (Math.random() - 0.49) * (item.price * 0.0006);
        const newPrice = Math.max(1, Number((item.price + delta).toFixed(2)));
        const newChange = Number((item.change + delta).toFixed(2));
        const newPercent = Number(((newChange / (newPrice - newChange)) * 100).toFixed(2));

        setIndices((prev) =>
          prev.map((ind, i) =>
            i === idx
              ? {
                  ...ind,
                  price: newPrice,
                  change: newChange,
                  changePercent: newPercent,
                  high: Math.max(ind.high || newPrice, newPrice),
                  low: Math.min(ind.low || newPrice, newPrice),
                }
              : ind
          )
        );
        setLastUpdatedTickId(item.id);
      } else if (targetPool < 0.7) {
        // Ticks a stock
        const tabKeys = ['volume', 'volatile', 'gainers', 'losers'];
        const randomTab = tabKeys[Math.floor(Math.random() * tabKeys.length)];
        const stockList = movers[randomTab];
        if (stockList && stockList.length > 0) {
          const sIdx = Math.floor(Math.random() * stockList.length);
          const stock = stockList[sIdx];
          const delta = (Math.random() - 0.49) * (stock.price * 0.001);
          const newPrice = Math.max(0.1, Number((stock.price + delta).toFixed(2)));
          const newChange = Number((stock.change + delta).toFixed(2));
          const newPercent = Number(((newChange / (newPrice - newChange)) * 100).toFixed(2));

          setMovers((prev) => ({
            ...prev,
            [randomTab]: prev[randomTab].map((s, i) =>
              i === sIdx
                ? {
                    ...s,
                    price: newPrice,
                    change: newChange,
                    changePercent: newPercent,
                  }
                : s
            ),
          }));
          setLastUpdatedTickId(stock.id);
        }
      } else if (targetPool < 0.85) {
        // Ticks a crypto
        const cIdx = Math.floor(Math.random() * cryptos.length);
        const crypto = cryptos[cIdx];
        const delta = (Math.random() - 0.48) * (crypto.price * 0.0015);
        const newPrice = Math.max(0.01, Number((crypto.price + delta).toFixed(2)));
        const newChange = Number((crypto.change + delta).toFixed(2));
        const newPercent = Number(((newChange / (newPrice - newChange)) * 100).toFixed(2));

        setCryptos((prev) =>
          prev.map((c, i) =>
            i === cIdx
              ? {
                  ...c,
                  price: newPrice,
                  change: newChange,
                  changePercent: newPercent,
                }
              : c
          )
        );
        setLastUpdatedTickId(crypto.id);
      } else {
        // Ticks a commodity
        const mIdx = Math.floor(Math.random() * commodities.length);
        const comm = commodities[mIdx];
        const delta = (Math.random() - 0.5) * (comm.price * 0.0008);
        const newPrice = Math.max(0.01, Number((comm.price + delta).toFixed(3)));
        const newChange = Number((comm.change + delta).toFixed(3));
        const newPercent = Number(((newChange / (newPrice - newChange)) * 100).toFixed(2));

        setCommodities((prev) =>
          prev.map((c, i) =>
            i === mIdx
              ? {
                  ...c,
                  price: newPrice,
                  change: newChange,
                  changePercent: newPercent,
                }
              : c
          )
        );
        setLastUpdatedTickId(comm.id);
      }

      // Clear animation indicator after 1.2s
      const timer = setTimeout(() => {
        setLastUpdatedTickId(null);
      }, 1200);

      return () => clearTimeout(timer);
    }, 2800);

    return () => clearInterval(interval);
  }, [isLiveSimulation, indices, movers, cryptos, commodities]);

  const handleToggleWatchlist = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (watchlist.includes(id)) {
      setWatchlist((prev) => prev.filter((item) => item !== id));
    } else {
      setWatchlist((prev) => [...prev, id]);
    }
  };

  const watchlistItems = allSearchableItems.filter((item) => watchlist.includes(item.id));

  const handleCategorySelect = (category: CategoryType) => {
    setActiveCategory(category);
    if (category === 'Indices') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (category === 'US stocks') {
      const el = document.getElementById('stocks-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (category === 'Crypto' || category === 'Futures & commodities') {
      const el = document.getElementById('crypto-commodities-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (category === 'Economy') {
      const el = document.getElementById('calendar-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Check if we should render a specialized category deep dive
  const isSpecializedCategory = [
    'World stocks',
    'Forex & currencies',
    'Government bonds',
    'Corporate bonds',
    'ETFs',
  ].includes(activeCategory);

  const getSpecializedItems = () => {
    switch (activeCategory) {
      case 'World stocks':
        return worldStocksData;
      case 'Forex & currencies':
        return forexData;
      case 'Government bonds':
      case 'Corporate bonds':
        return bondsData;
      case 'ETFs':
        return etfsData;
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#131722] text-[#131722] dark:text-[#d1d4dc] antialiased font-sans transition-colors">
      {/* 1. Main TradingView Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        watchlistCount={watchlist.length}
        isLiveSimulation={isLiveSimulation}
        onToggleLiveSimulation={() => setIsLiveSimulation(!isLiveSimulation)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onGetStarted={() => setIsGetStartedOpen(true)}
      />

      {/* 2. Hero Title Section */}
      <HeroSection onSelectCategory={handleCategorySelect} />

      {/* 3. Sub Navigation Tabs / Category Pills */}
      <SubTabs activeCategory={activeCategory} onSelectCategory={handleCategorySelect} />

      {/* 4. Main Market Content Area */}
      <main className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8 space-y-12">
        {/* If a specialized category is selected (e.g. World stocks, Forex, Bonds, ETFs) */}
        {isSpecializedCategory ? (
          <div className="space-y-8">
            <CategoryDeepDive
              category={activeCategory}
              items={getSpecializedItems()}
              onSelectAsset={setSelectedAsset}
              watchlist={watchlist}
              onToggleWatchlist={handleToggleWatchlist}
              lastUpdatedTickId={lastUpdatedTickId}
            />
            {/* Quick button to return to overview */}
            <div className="pt-4 text-center">
              <button
                onClick={() => setActiveCategory('Indices')}
                className="px-4 py-2 text-xs font-semibold rounded-full bg-[#f0f3fa] dark:bg-[#2a2e39] text-[#2962ff] hover:bg-[#e4e7ed] dark:hover:bg-[#363b48] transition cursor-pointer"
              >
                ← Return to Global Markets Overview
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Indices Benchmark Section */}
            <IndicesSection
              indices={indices}
              onSelectAsset={setSelectedAsset}
              watchlist={watchlist}
              onToggleWatchlist={handleToggleWatchlist}
              lastUpdatedTickId={lastUpdatedTickId}
            />

            {/* US Stocks & Market Movers Section */}
            <StockMoversSection
              moversData={movers}
              onSelectAsset={setSelectedAsset}
              watchlist={watchlist}
              onToggleWatchlist={handleToggleWatchlist}
              lastUpdatedTickId={lastUpdatedTickId}
            />

            {/* Crypto and Futures & Commodities Side-by-Side Grid */}
            <CryptoCommoditiesSection
              cryptoItems={cryptos}
              commodityItems={commodities}
              onSelectAsset={setSelectedAsset}
              watchlist={watchlist}
              onToggleWatchlist={handleToggleWatchlist}
              lastUpdatedTickId={lastUpdatedTickId}
            />

            {/* Economic & Earnings Calendar Widget Section */}
            <CalendarSection events={calendarEvents} />
          </>
        )}
      </main>

      {/* 5. Main Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAsset={(item) => setSelectedAsset(item)}
      />

      <AssetDetailModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
        isStarred={selectedAsset ? watchlist.includes(selectedAsset.id) : false}
        onToggleWatchlist={() => selectedAsset && handleToggleWatchlist(selectedAsset.id)}
      />

      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlistItems={watchlistItems}
        onSelectAsset={(item) => setSelectedAsset(item)}
        onRemoveFromWatchlist={(id) => handleToggleWatchlist(id)}
        onClearWatchlist={() => setWatchlist([])}
      />

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />
    </div>
  );
}
