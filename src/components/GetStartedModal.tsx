import React, { useState } from 'react';
import { X, Check, ShieldCheck, Zap, TrendingUp, Sparkles } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#787b86] hover:text-[#131722] dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <svg className="w-6 h-6 text-black dark:text-white fill-current" viewBox="0 0 36 28">
            <path d="M14 22H7V11h7v11zm15-16h-7v22h7V6zm-7.5 8h-7v14h7V14z"></path>
          </svg>
          <span className="font-black text-sm uppercase tracking-wider text-gray-500">
            TradingView
          </span>
        </div>

        <h3 className="text-2xl font-black text-[#131722] dark:text-white">
          Join 60M+ traders and investors
        </h3>
        <p className="text-xs text-[#787b86] mt-1 mb-6">
          Look first, then leap. Access institutional-grade supercharts, live global order books, and real-time screeners.
        </p>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 text-[#089981] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h4 className="text-base font-bold text-[#131722] dark:text-white">Welcome aboard!</h4>
            <p className="text-xs text-[#787b86]">
              Your simulated portfolio of $100,000 has been initialized.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="trader@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#e0e3eb] dark:border-[#2a2e39] rounded-lg bg-gray-50 dark:bg-[#181c25] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2962ff]"
              />
            </div>

            <div className="space-y-2 py-2">
              <div className="flex items-center gap-2 text-xs text-[#787b86]">
                <Check className="w-4 h-4 text-[#089981]" />
                <span>Zero-delay live streaming market data</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#787b86]">
                <Check className="w-4 h-4 text-[#089981]" />
                <span>Unlimited custom technical indicator alerts</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#787b86]">
                <Check className="w-4 h-4 text-[#089981]" />
                <span>Risk-free paper trading with virtual $100k balance</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-full tv-btn-gradient text-white text-xs font-bold hover:opacity-95 transition shadow-sm cursor-pointer"
            >
              Start Free 30-Day Pro Trial
            </button>

            <p className="text-[10px] text-center text-[#787b86]">
              No credit card required for paper trading. By signing up, you agree to our Terms of Use.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
