/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MainTab, SubTab } from '../types';
import { ChevronDown } from 'lucide-react';

interface TabsProps {
  activeMain: MainTab;
  setActiveMain: (tab: MainTab) => void;
  activeSub: SubTab;
  setActiveSub: (tab: SubTab) => void;
}

export default function Tabs({ activeMain, setActiveMain, activeSub, setActiveSub }: TabsProps) {
  return (
    <div className="relative z-10 mt-2">
      {/* Main Tabs */}
      <div className="flex justify-around px-2 py-3 text-white/80 font-medium">
        {(['income', 'operation', 'quality'] as MainTab[]).map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveMain(tab)}
            className={`cursor-pointer transition-all duration-300 relative px-4 py-1 ${
              activeMain === tab ? 'text-white font-bold scale-110' : 'hover:text-white/90'
            }`}
          >
            {tab === 'income' ? '业务' : tab === 'quality' ? '质量' : '运营'}
            {activeMain === tab && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white rounded-full" />
            )}
          </div>
        ))}
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 px-4 py-2">
        {(['overview', 'flow', 'product', 'customer'] as SubTab[]).map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveSub(tab)}
            className={`flex-1 text-center py-2 rounded-lg text-sm transition-all duration-300 cursor-pointer ${
              activeSub === tab
                ? 'bg-white text-[#1b63d6] font-bold shadow-lg'
                : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            {tab === 'overview' ? '概览' : tab === 'flow' ? '流向' : tab === 'product' ? '产品' : '客户'}
          </div>
        ))}
      </div>

      {/* Time Dimension */}
      <div className="flex items-center px-4 text-white/70 text-[10px] mt-2 uppercase tracking-widest font-semibold">
        日维度 <ChevronDown size={10} className="ml-1" />
      </div>
    </div>
  );
}
