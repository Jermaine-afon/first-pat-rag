import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#e0e3eb] dark:border-[#2a2e39] bg-white dark:bg-[#131722] mt-16 pt-12 pb-8 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
        {/* Footer Column Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-12 text-xs">
          <div>
            <h3 className="font-bold text-[#131722] dark:text-white uppercase tracking-wider mb-3">
              Products
            </h3>
            <ul className="space-y-2 text-[#787b86]">
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Supercharts</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Pine Script™</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Stock Screener</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">ETF Screener</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Crypto Screener</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Economic Calendar</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#131722] dark:text-white uppercase tracking-wider mb-3">
              Company
            </h3>
            <ul className="space-y-2 text-[#787b86]">
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">About</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Features</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Pricing</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Wall of Love</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Athletes</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Careers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#131722] dark:text-white uppercase tracking-wider mb-3">
              Community
            </h3>
            <ul className="space-y-2 text-[#787b86]">
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Refer a friend</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Ideas</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Scripts</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Streams</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">House Rules</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Moderators</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#131722] dark:text-white uppercase tracking-wider mb-3">
              For Business
            </h3>
            <ul className="space-y-2 text-[#787b86]">
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Widgets</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Advertising</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Charting Solutions</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Lightweight Charts™</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Brokerage integration</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Partner Program</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#131722] dark:text-white uppercase tracking-wider mb-3">
              Mobile &amp; Apps
            </h3>
            <ul className="space-y-2 text-[#787b86]">
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Download for iOS</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Download for Android</a></li>
              <li><a className="hover:text-[#2962ff] transition-colors" href="#">Desktop App (Mac/Win)</a></li>
              <li className="pt-2">
                <span className="inline-flex items-center text-[11px] font-semibold text-[#131722] dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  Trade with best brokers
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal and bottom bar */}
        <div className="border-t border-[#e0e3eb] dark:border-[#2a2e39] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#787b86]">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-black dark:text-white fill-current" viewBox="0 0 36 28">
              <path d="M14 22H7V11h7v11zm15-16h-7v22h7V6zm-7.5 8h-7v14h7V14z"></path>
            </svg>
            <span>© 2024 TradingView, Inc. Look first / Then leap.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a className="hover:text-[#131722] dark:hover:text-white transition-colors" href="#">
              Terms of use
            </a>
            <a className="hover:text-[#131722] dark:hover:text-white transition-colors" href="#">
              Privacy policy
            </a>
            <a className="hover:text-[#131722] dark:hover:text-white transition-colors" href="#">
              Cookies
            </a>
            <a className="hover:text-[#131722] dark:hover:text-white transition-colors" href="#">
              Security policy
            </a>
            <a className="hover:text-[#131722] dark:hover:text-white transition-colors" href="#">
              Status
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
