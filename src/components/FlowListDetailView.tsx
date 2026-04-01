/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronLeft, X, TrendingUp, TrendingDown, ArrowRightLeft, MoreHorizontal } from 'lucide-react';

interface FlowListDetailViewProps {
  onBack: () => void;
  onClose: () => void;
  type: 'cnob' | 'osob';
  segment: string;
}

export default function FlowListDetailView({ onBack, onClose, type: initialType, segment }: FlowListDetailViewProps) {
  const flows = [
    { from: '深莞区', to: '美洲', income: '1,234.5', incomeYoy: '5.2%', volume: '567', volumeYoy: '3.1%', weight: '12.5', weightYoy: '1.2%', isUp: true },
    { from: '深莞区', to: '西欧', income: '982.3', incomeYoy: '3.1%', volume: '489', volumeYoy: '2.1%', weight: '10.2', weightYoy: '0.8%', isUp: true },
    { from: '深莞区', to: '英国', income: '876.1', incomeYoy: '-1.2%', volume: '456', volumeYoy: '-0.5%', weight: '9.8', weightYoy: '-1.5%', isUp: false },
    { from: '深莞区', to: '非洲', income: '543.2', incomeYoy: '2.4%', volume: '234', volumeYoy: '1.8%', weight: '5.6', weightYoy: '2.1%', isUp: true },
    { from: '深莞区', to: '马来西亚', income: '432.1', incomeYoy: '0.0%', volume: '198', volumeYoy: '0.5%', weight: '4.2', weightYoy: '0.0%', isUp: true },
    { from: '深莞区', to: '日本', income: '321.0', incomeYoy: '1.5%', volume: '156', volumeYoy: '2.2%', weight: '3.1', weightYoy: '1.1%', isUp: true },
    { from: '深莞区', to: '新加坡', income: '210.5', incomeYoy: '10.3%', volume: '98', volumeYoy: '8.5%', weight: '2.1', weightYoy: '5.2%', isUp: true },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#f4f7fc]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#104fb1] to-[#1c66d8] pt-12 pb-6 px-4 text-white relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <ChevronLeft size={24} />
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">流向明细-{segment}</span>
                <div className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-medium">
                  深莞区
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MoreHorizontal size={20} />
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        {/* Flow Detail List */}
        <div className="bg-white rounded-2xl shadow-sm border border-white/50 overflow-hidden">
          <div className="bg-gray-50/50 px-4 py-2 border-b border-gray-100 grid grid-cols-4 text-[10px] font-bold text-gray-400">
            <div className="col-span-1">流向</div>
            <div className="text-right">收入</div>
            <div className="text-right">件量</div>
            <div className="text-right">重量</div>
          </div>

          <div className="divide-y divide-gray-50">
            {flows.map((f, i) => (
              <div key={i} className="p-4 grid grid-cols-4 items-center gap-2">
                <div className="col-span-1">
                  <div className="text-[11px] font-bold text-gray-800">{f.from}</div>
                  <div className="my-1 text-[#1b63d6]">
                    <ArrowRightLeft size={12} className="rotate-90" />
                  </div>
                  <div className="text-[11px] font-bold text-gray-800">{f.to}</div>
                </div>
                
                <div className="text-right">
                  <div className="text-[11px] font-black text-gray-800">
                    {f.income}<span className="text-[9px] text-gray-400 ml-0.5">万元</span>
                  </div>
                  <div className={`text-[8px] font-bold flex items-center justify-end ${f.incomeYoy.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                    {f.incomeYoy}
                    {f.incomeYoy.startsWith('-') ? <TrendingDown size={8} /> : <TrendingUp size={8} />}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] font-black text-gray-800">
                    {f.volume}<span className="text-[9px] text-gray-400 ml-0.5">万票</span>
                  </div>
                  <div className={`text-[8px] font-bold flex items-center justify-end ${f.volumeYoy.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                    {f.volumeYoy}
                    {f.volumeYoy.startsWith('-') ? <TrendingDown size={8} /> : <TrendingUp size={8} />}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] font-black text-gray-800">
                    {f.weight}<span className="text-[9px] text-gray-400 ml-0.5">吨</span>
                  </div>
                  <div className={`text-[8px] font-bold flex items-center justify-end ${f.weightYoy.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                    {f.weightYoy}
                    {f.weightYoy.startsWith('-') ? <TrendingDown size={8} /> : <TrendingUp size={8} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
