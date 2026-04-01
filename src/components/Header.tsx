/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Battery, Signal, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const [time, setTime] = useState(new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-10">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-5 py-2 text-white text-sm font-semibold">
        <span>{time}</span>
        <div className="flex items-center gap-1.5">
          <Signal size={14} />
          <span className="text-xs">5G</span>
          <Wifi size={14} />
          <div className="w-6 h-3 border border-white/50 rounded-sm flex p-[1px]">
            <div className="bg-white w-full rounded-[1px]"></div>
          </div>
        </div>
      </div>

      {/* Nav Header */}
      <div className="flex justify-between items-center px-4 py-2 text-white">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-white/10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
            </svg>
          </div>
          <span className="text-sm font-medium">本部</span>
        </div>
        <div className="text-lg font-bold tracking-wide">经营动态</div>
        <div className="flex items-center gap-3">
          <div className="bg-white/15 px-2.5 py-0.5 rounded-full text-[10px] font-medium backdrop-blur-sm">
            中/EN ⇌
          </div>
          <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-xs cursor-pointer hover:bg-white/10 transition-colors">
            ✕
          </div>
        </div>
      </div>
    </div>
  );
}
