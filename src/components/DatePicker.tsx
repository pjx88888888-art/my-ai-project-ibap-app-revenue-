/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface DatePickerProps {
  selectedDate: number;
  setSelectedDate: (date: number) => void;
}

export default function DatePicker({ selectedDate, setSelectedDate }: DatePickerProps) {
  const dates = [
    { day: '一', num: 23 },
    { day: '二', num: 24 },
    { day: '三', num: 25 },
    { day: '四', num: 26 },
    { day: '五', num: 27 },
    { day: '六', num: 28 },
    { day: '日', num: 29 },
  ];

  return (
    <div className="flex justify-between px-4 py-3 text-white/90 relative z-10">
      {dates.map((date) => (
        <div
          key={date.num}
          onClick={() => setSelectedDate(date.num)}
          className={`flex-1 text-center py-1.5 transition-all duration-300 cursor-pointer ${
            selectedDate === date.num
              ? 'bg-white text-[#1b63d6] rounded-lg shadow-md font-bold scale-105'
              : 'hover:bg-white/10 rounded-lg'
          }`}
        >
          <div className="text-[10px] opacity-70 mb-0.5">{date.day}</div>
          <div className="text-sm font-semibold">{date.num}</div>
        </div>
      ))}
    </div>
  );
}
