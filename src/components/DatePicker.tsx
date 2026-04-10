/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { TimeDimension } from '../types';

interface DatePickerProps {
  selectedDate: number;
  setSelectedDate: (date: number) => void;
  timeDimension: TimeDimension;
  setTimeDimension: (dim: TimeDimension) => void;
}

export default function DatePicker({ selectedDate, setSelectedDate, timeDimension, setTimeDimension }: DatePickerProps) {
  const [showDimMenu, setShowDimMenu] = useState(false);

  const dates = [
    { day: '一', num: 23 },
    { day: '二', num: 24 },
    { day: '三', num: 25 },
    { day: '四', num: 26 },
    { day: '五', num: 27 },
    { day: '六', num: 28 },
    { day: '日', num: 29 },
  ];

  const months = [
    { day: '10月', num: 10 },
    { day: '11月', num: 11 },
    { day: '12月', num: 12 },
    { day: '1月', num: 1 },
    { day: '2月', num: 2 },
    { day: '3月', num: 3 },
    { day: '4月', num: 4 },
  ];

  const currentItems = timeDimension === 'day' ? dates : months;

  return (
    <div className="px-4 py-2 relative z-20">
      {/* Dimension Switcher */}
      <div className="relative mb-2">
        <button 
          onClick={() => setShowDimMenu(!showDimMenu)}
          className="flex items-center gap-1 text-white/80 text-xs font-medium hover:text-white transition-colors"
        >
          {timeDimension === 'day' ? '日维度' : '月维度'}
          <ChevronDown size={12} className={`transition-transform duration-200 ${showDimMenu ? 'rotate-180' : ''}`} />
        </button>

        {showDimMenu && (
          <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl overflow-hidden min-w-[80px] py-1 animate-in fade-in slide-in-from-top-1 duration-200">
            <button 
              onClick={() => { setTimeDimension('day'); setShowDimMenu(false); }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50 transition-colors ${timeDimension === 'day' ? 'text-[#1b63d6] font-bold' : 'text-gray-600'}`}
            >
              日维度
            </button>
            <button 
              onClick={() => { setTimeDimension('month'); setShowDimMenu(false); }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50 transition-colors ${timeDimension === 'month' ? 'text-[#1b63d6] font-bold' : 'text-gray-600'}`}
            >
              月维度
            </button>
          </div>
        )}
      </div>

      {/* Date/Month Selector */}
      <div className="flex justify-between text-white/90">
        {currentItems.map((item) => (
          <div
            key={item.num}
            onClick={() => setSelectedDate(item.num)}
            className={`flex-1 text-center py-1.5 transition-all duration-300 cursor-pointer ${
              selectedDate === item.num
                ? 'bg-white text-[#1b63d6] rounded-lg shadow-md font-bold scale-105'
                : 'hover:bg-white/10 rounded-lg'
            }`}
          >
            <div className="text-[10px] opacity-70 mb-0.5">{timeDimension === 'day' ? item.day : ''}</div>
            <div className="text-sm font-semibold">{timeDimension === 'day' ? item.num : item.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
