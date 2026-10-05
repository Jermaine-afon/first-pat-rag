import React, { useState } from 'react';
import { MarketItem } from '../types/market';
import { X, Star, TrendingUp, TrendingDown, DollarSign, CheckCircle2, BarChart2 } from 'lucide-react';

interface AssetDetailModalProps {
  asset: MarketItem | null;
  onClose: () => void;
  isStarred: boolean;
  onToggleWatchlist: () => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose,
  isStarred,
  onToggleWatchlist,
}) => {
  const [chartMode, setChartMode] = useState<'line' | 'candles'>('line');
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '6M' | '1Y' | 'ALL'>('1M');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Paper trade simulation state
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [orderQuantity, setOrderQuantity] = useState<number>(10);
  const [orderSuccessMsg, setOrderSuccessMsg] = useState<string | null>(null);

  if (!asset) return null;

  const history = asset.history || [];
  const isPositive = asset.change >= 0;

  // Chart coordinate calculations
  const chartHeight = 260;
  const chartWidth = 650;
  const paddingX = 40;
  const paddingY = 25;

  const minPrice = Math.min(...history.map((h) => h.low || h.price)) * 0.998;
  const maxPrice = Math.max(...history.map((h) => h.high || h.price)) * 1.002;
  const priceRange = maxPrice - minPrice || 1;

  const maxVolume = Math.max(...history.map((h) => h.volume)) || 1;

  const getY = (val: number) => {
    return chartHeight - paddingY - ((val - minPrice) / priceRange) * (chartHeight - paddingY * 2);
  };

  const getX = (idx: number) => {
    if (history.length <= 1) return paddingX;
    return paddingX + (idx / (history.length - 1)) * (chartWidth - paddingX * 2);
  };

  // Generate SVG path for line chart
  const points = history.map((h, i) => `${getX(i)},${getY(h.close)}`).join(' ');
  const areaPath = history.length > 0
    ? `M ${getX(0)},${chartHeight - paddingY} L ${points} L ${getX(history.length - 1)},${chartHeight - paddingY} Z`
    : '';

  const activePoint = hoveredIndex !== null ? history[hoveredIndex] : history[history.length - 1];

  const handleExecuteTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const total = (orderQuantity * asset.price).toFixed(2);
    setOrderSuccessMsg(
      `Order executed! ${orderType.toUpperCase()} ${orderQuantity} shares of ${asset.symbol} @ $${asset.price.toFixed(2)} (Total: $${total})`
    );
    setTimeout(() => {
      setOrderSuccessMsg(null);
    }, 4500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-[#e0e3eb] dark:border-[#2a2e39] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              style={{ backgroundColor: asset.badgeBg?.includes('gradient') ? undefined : (asset.badgeBg || '#0066cc') }}
              className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm shadow-xs ${
                asset.badgeBg?.includes('gradient') ? 'bg-gradient-to-tr from-purple-500 to-teal-400' : ''
              }`}
            >
              {asset.badgeText || asset.symbol.slice(0, 2)}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-[#131722] dark:text-white">
                  {asset.symbol}
                </h2>
                {asset.exchange && (
                  <span className="text-[11px] font-semibold text-[#787b86] bg-[#f0f3fa] dark:bg-gray-800 px-2 py-0.5 rounded">
                    {asset.exchange}
                  </span>
                )}
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                  {asset.type}
                </span>
              </div>
              <p className="text-xs text-[#787b86]">{asset.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-black tabular-num text-[#131722] dark:text-white">
                {asset.type === 'stock' || asset.type === 'crypto' ? '$' : ''}
                {asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div
                className={`text-xs font-bold tabular-num ${
                  isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                }`}
              >
                {isPositive ? `+${asset.change.toFixed(2)}` : asset.change.toFixed(2)} (
                {isPositive ? `+${asset.changePercent.toFixed(2)}%` : `${asset.changePercent.toFixed(2)}%`})
              </div>
            </div>

            <button
              onClick={onToggleWatchlist}
              className="p-2 rounded-full hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] text-gray-400 hover:text-amber-500 transition cursor-pointer"
              title={isStarred ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Star className={`w-5 h-5 ${isStarred ? 'fill-amber-400 text-amber-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39] text-[#787b86] hover:text-[#131722] dark:hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chart Controls Bar */}
        <div className="px-5 py-2.5 bg-gray-50 dark:bg-[#181c25] border-b border-[#e0e3eb] dark:border-[#2a2e39] flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Timeframes */}
          <div className="flex items-center gap-1">
            {(['1D', '5D', '1M', '6M', '1Y', 'ALL'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded font-semibold transition cursor-pointer ${
                  timeframe === tf
                    ? 'bg-[#2962ff] text-white'
                    : 'text-[#787b86] hover:text-[#131722] dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart Display Mode */}
          <div className="flex items-center gap-1 bg-white dark:bg-[#1e222d] p-0.5 rounded-md border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setChartMode('line')}
              className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer ${
                chartMode === 'line'
                  ? 'bg-[#f0f3fa] dark:bg-[#2a2e39] text-[#2962ff] font-bold'
                  : 'text-[#787b86]'
              }`}
            >
              Area / Line
            </button>
            <button
              onClick={() => setChartMode('candles')}
              className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer ${
                chartMode === 'candles'
                  ? 'bg-[#f0f3fa] dark:bg-[#2a2e39] text-[#2962ff] font-bold'
                  : 'text-[#787b86]'
              }`}
            >
              Candles
            </button>
          </div>

          {/* Hover Crosshair Info */}
          {activePoint && (
            <div className="hidden sm:flex items-center gap-3 text-[11px] tabular-num text-[#787b86]">
              <span>O: <strong className="text-gray-900 dark:text-gray-200">${activePoint.open}</strong></span>
              <span>H: <strong className="text-gray-900 dark:text-gray-200">${activePoint.high}</strong></span>
              <span>L: <strong className="text-gray-900 dark:text-gray-200">${activePoint.low}</strong></span>
              <span>C: <strong className="text-gray-900 dark:text-gray-200">${activePoint.close}</strong></span>
              <span className="text-gray-400">({activePoint.time})</span>
            </div>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {/* Superchart Canvas SVG */}
          <div className="relative bg-white dark:bg-[#181c25] rounded-xl border border-[#e0e3eb] dark:border-[#2a2e39] p-2 overflow-hidden select-none">
            <svg
              className="w-full h-64 overflow-visible"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Horizontal Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = paddingY + ratio * (chartHeight - paddingY * 2);
                const priceLabel = (maxPrice - ratio * priceRange).toFixed(2);
                return (
                  <g key={ratio}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="currentColor"
                      className="text-gray-100 dark:text-gray-800"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={chartWidth - paddingX + 5}
                      y={y + 3}
                      className="text-[9px] fill-gray-400 font-mono"
                    >
                      {priceLabel}
                    </text>
                  </g>
                );
              })}

              {/* Volume Bars on Lower 20% */}
              {history.map((h, i) => {
                const x = getX(i);
                const barH = (h.volume / maxVolume) * 45;
                const y = chartHeight - paddingY - barH;
                const isGreen = h.close >= h.open;
                return (
                  <rect
                    key={`vol-${i}`}
                    x={x - 2.5}
                    y={y}
                    width={5}
                    height={barH}
                    fill={isGreen ? '#089981' : '#f23645'}
                    opacity={0.25}
                  />
                );
              })}

              {/* Chart Line or Candlesticks */}
              {chartMode === 'line' ? (
                <>
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={isPositive ? '#089981' : '#f23645'} stopOpacity="0.25" />
                      <stop offset="100%" stopColor={isPositive ? '#089981' : '#f23645'} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d={areaPath} fill="url(#chartGradient)" />
                  <polyline
                    fill="none"
                    stroke={isPositive ? '#089981' : '#f23645'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                </>
              ) : (
                /* Candlestick rendering */
                history.map((h, i) => {
                  const x = getX(i);
                  const isUp = h.close >= h.open;
                  const candleColor = isUp ? '#089981' : '#f23645';
                  const top = getY(Math.max(h.open, h.close));
                  const bottom = getY(Math.min(h.open, h.close));
                  const height = Math.max(2, bottom - top);
                  const highY = getY(h.high);
                  const lowY = getY(h.low);

                  return (
                    <g key={`candle-${i}`}>
                      {/* Upper & Lower Wick */}
                      <line x1={x} y1={highY} x2={x} y2={lowY} stroke={candleColor} strokeWidth="1.2" />
                      {/* Candle Body */}
                      <rect
                        x={x - 3.5}
                        y={top}
                        width={7}
                        height={height}
                        fill={isUp ? candleColor : candleColor}
                        rx={1}
                      />
                    </g>
                  );
                })
              )}

              {/* Invisible interactive hover rects */}
              {history.map((h, i) => {
                const x = getX(i);
                return (
                  <rect
                    key={`hover-${i}`}
                    x={x - (chartWidth / history.length) / 2}
                    y={paddingY}
                    width={chartWidth / history.length}
                    height={chartHeight - paddingY * 2}
                    fill="transparent"
                    className="cursor-crosshair"
                    onMouseEnter={() => setHoveredIndex(i)}
                  />
                );
              })}

              {/* Hover Crosshair indicator */}
              {hoveredIndex !== null && (
                <g>
                  <line
                    x1={getX(hoveredIndex)}
                    y1={paddingY}
                    x2={getX(hoveredIndex)}
                    y2={chartHeight - paddingY}
                    stroke="#2962ff"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1={paddingX}
                    y1={getY(history[hoveredIndex].close)}
                    x2={chartWidth - paddingX}
                    y2={getY(history[hoveredIndex].close)}
                    stroke="#2962ff"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx={getX(hoveredIndex)}
                    cy={getY(history[hoveredIndex].close)}
                    r="4"
                    fill="#2962ff"
                    stroke="white"
                    strokeWidth="2"
                  />
                </g>
              )}
            </svg>
          </div>

          {/* Key Financial Statistics & 52-Week Range */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#f0f3fa] dark:bg-[#181c25] p-3 rounded-xl">
              <span className="text-[11px] text-[#787b86] font-medium uppercase">Day Range</span>
              <div className="text-sm font-bold text-[#131722] dark:text-white tabular-num mt-0.5">
                ${asset.low?.toFixed(2) || (asset.price * 0.98).toFixed(2)} - ${asset.high?.toFixed(2) || (asset.price * 1.02).toFixed(2)}
              </div>
            </div>

            <div className="bg-[#f0f3fa] dark:bg-[#181c25] p-3 rounded-xl">
              <span className="text-[11px] text-[#787b86] font-medium uppercase">52-Week Range</span>
              <div className="text-sm font-bold text-[#131722] dark:text-white tabular-num mt-0.5">
                ${asset.week52Low?.toFixed(2) || (asset.price * 0.7).toFixed(2)} - ${asset.week52High?.toFixed(2) || (asset.price * 1.25).toFixed(2)}
              </div>
            </div>

            <div className="bg-[#f0f3fa] dark:bg-[#181c25] p-3 rounded-xl">
              <span className="text-[11px] text-[#787b86] font-medium uppercase">Volume / Market Cap</span>
              <div className="text-sm font-bold text-[#131722] dark:text-white tabular-num mt-0.5">
                {asset.volume || '32.4M'} / {asset.marketCap || '$2.1T'}
              </div>
            </div>

            <div className="bg-[#f0f3fa] dark:bg-[#181c25] p-3 rounded-xl">
              <span className="text-[11px] text-[#787b86] font-medium uppercase">Technical Sentiment</span>
              <div className="mt-0.5">
                <span className="text-xs font-bold text-[#089981] bg-[#e6f7f4] dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                  {asset.technicalRating || 'Strong Buy'}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          {asset.description && (
            <div className="text-xs text-[#787b86] leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
              <strong className="text-gray-900 dark:text-white block mb-1">About {asset.name}:</strong>
              {asset.description}
            </div>
          )}

          {/* Paper Trading Simulation Box */}
          <div className="border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl p-4 bg-gray-50/50 dark:bg-[#181c25]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#2962ff]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#131722] dark:text-white">
                  Paper Trading Simulation
                </h4>
              </div>
              <span className="text-[11px] text-[#787b86]">Virtual Balance: $100,000.00 USD</span>
            </div>

            {orderSuccessMsg && (
              <div className="mb-3 p-2.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs text-[#089981] flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{orderSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleExecuteTrade} className="flex flex-wrap items-center gap-3">
              <div className="flex bg-white dark:bg-[#1e222d] border border-gray-200 dark:border-gray-700 rounded-md p-0.5">
                <button
                  type="button"
                  onClick={() => setOrderType('buy')}
                  className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                    orderType === 'buy'
                      ? 'bg-[#089981] text-white shadow-xs'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  BUY
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('sell')}
                  className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                    orderType === 'sell'
                      ? 'bg-[#f23645] text-white shadow-xs'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  SELL
                </button>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500 font-medium">Qty:</label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(Number(e.target.value) || 1)}
                  className="w-20 px-2 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-[#1e222d] text-gray-900 dark:text-white tabular-num font-semibold"
                />
              </div>

              <div className="text-xs text-gray-500">
                Est. Value: <strong className="text-gray-900 dark:text-white">${(orderQuantity * asset.price).toFixed(2)}</strong>
              </div>

              <button
                type="submit"
                className={`ml-auto px-4 py-1.5 rounded-lg text-xs font-bold text-white transition cursor-pointer ${
                  orderType === 'buy' ? 'bg-[#089981] hover:bg-[#07826e]' : 'bg-[#f23645] hover:bg-[#d92231]'
                }`}
              >
                Place {orderType.toUpperCase()} Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
