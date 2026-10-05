import React, { useState } from 'react';
import { CalendarEvent } from '../types/market';
import { Bell, Check, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarSectionProps {
  events: CalendarEvent[];
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({ events }) => {
  const [activeTab, setActiveTab] = useState<'Today' | 'This week' | 'Next week'>('This week');
  const [reminders, setReminders] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const filteredEvents = events.filter((e) => e.category === activeTab);

  const toggleReminder = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (reminders.includes(id)) {
      setReminders(reminders.filter((r) => r !== id));
    } else {
      setReminders([...reminders, id]);
    }
  };

  const renderBadge = (badge: string, type: string) => {
    if (type === 'earnings') {
      return (
        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
          {badge}
        </span>
      );
    }
    return (
      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 dark:bg-rose-950/60 text-[#f23645]">
        {badge}
      </span>
    );
  };

  return (
    <section className="border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl p-5 bg-white dark:bg-[#1e222d] shadow-xs" id="calendar-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#131722] dark:text-white">
            Economic &amp; Earnings Calendar
          </h2>
          <p className="text-xs text-[#787b86] mt-0.5">
            High impact global market events and corporate earnings scheduled {activeTab.toLowerCase()}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {(['Today', 'This week', 'Next week'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition cursor-pointer ${
                  isActive
                    ? 'bg-[#131722] dark:bg-white text-white dark:text-[#131722] font-semibold'
                    : 'bg-[#f0f3fa] dark:bg-[#2a2e39] text-[#131722] dark:text-[#d1d4dc] hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredEvents.map((evt) => {
          const hasReminder = reminders.includes(evt.id);

          return (
            <div
              key={evt.id}
              onClick={() => setSelectedEvent(evt)}
              className="border border-[#e0e3eb] dark:border-[#2a2e39] rounded-lg p-3 hover:border-[#2962ff] dark:hover:border-[#2962ff] transition bg-white dark:bg-[#181c25] cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#787b86]">
                    {evt.date} • {evt.timeGmt}
                  </span>
                  {renderBadge(evt.badge, evt.badgeType)}
                </div>

                <div className="text-sm font-bold text-[#131722] dark:text-white group-hover:text-[#2962ff] transition-colors">
                  {evt.title}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs text-[#787b86]">
                {evt.forecast ? (
                  <div className="flex gap-4">
                    <span>Forecast: <strong className="text-gray-900 dark:text-gray-200">{evt.forecast}</strong></span>
                    {evt.prior && <span>Prior: <strong className="text-gray-900 dark:text-gray-200">{evt.prior}</strong></span>}
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <span>Est. EPS: <strong className="text-gray-900 dark:text-gray-200">{evt.estEps}</strong></span>
                    <span>Est. Rev: <strong className="text-gray-900 dark:text-gray-200">{evt.estRev}</strong></span>
                  </div>
                )}

                <button
                  onClick={(e) => toggleReminder(evt.id, e)}
                  title={hasReminder ? 'Reminder set' : 'Set reminder'}
                  className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
                    hasReminder ? 'text-[#2962ff]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Bell className={`w-3.5 h-3.5 ${hasReminder ? 'fill-[#2962ff]' : ''}`} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Details Quick Dialog */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#787b86]">
                  {selectedEvent.date} • {selectedEvent.timeGmt}
                </span>
                <h3 className="text-lg font-bold text-[#131722] dark:text-white mt-1">
                  {selectedEvent.title}
                </h3>
              </div>
              {renderBadge(selectedEvent.badge, selectedEvent.badgeType)}
            </div>

            <div className="bg-[#f0f3fa] dark:bg-[#181c25] p-3 rounded-lg text-xs space-y-1.5">
              {selectedEvent.forecast ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Market Consensus Forecast:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{selectedEvent.forecast}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Previous Period Actual:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{selectedEvent.prior}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Estimated Earnings Per Share:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{selectedEvent.estEps}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Estimated Revenue:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{selectedEvent.estRev}</span>
                  </div>
                </>
              )}
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Traders closely monitor this release. Higher than expected readings generally trigger aggressive repricing in bond yields and currency volatility.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-1.5 text-xs font-semibold rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Close
              </button>
              <button
                onClick={(e) => {
                  toggleReminder(selectedEvent.id, e);
                  setSelectedEvent(null);
                }}
                className="px-4 py-1.5 text-xs font-semibold rounded-md bg-[#2962ff] text-white hover:bg-[#1e53e5]"
              >
                {reminders.includes(selectedEvent.id) ? 'Remove Alert' : 'Add to Calendar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
