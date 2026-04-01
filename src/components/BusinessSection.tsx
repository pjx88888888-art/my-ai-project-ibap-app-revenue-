/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BUSINESS_UNITS } from '../constants';
import { TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';

export default function BusinessSection() {
  const getUnit = (name: string) => {
    if (name.includes('收入')) return '万元';
    if (name.includes('件量')) return '万票';
    if (name.includes('重量')) return '吨';
    return '';
  };

  return (
    <div className="bg-white mx-3 mb-6 rounded-2xl p-4 shadow-xl relative z-10 border border-white/20">
      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-50">
        <div className="flex items-center gap-2">
          <div className="bg-blue-50 p-1 rounded-lg">
            <TrendingUp size={16} className="text-[#1b63d6]" />
          </div>
          <span className="text-sm font-bold text-gray-800">业务板块</span>
          <HelpCircle size={14} className="text-gray-300" />
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        {BUSINESS_UNITS.map((unit) => (
          <div 
            key={unit.id} 
            className="bg-[#f8fbff] rounded-xl p-3 border-l-4 transition-transform hover:scale-[1.01]"
            style={{ borderLeftColor: unit.color }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span 
                className="text-[10px] font-bold text-white px-2 py-0.5 rounded shadow-sm"
                style={{ backgroundColor: unit.color }}
              >
                {unit.name}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {unit.metrics.map((metric, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="text-[11px] font-bold text-gray-600 text-center mb-0.5">
                    {metric.name}
                  </div>
                  
                  <div className="bg-[#f8fbff] border border-blue-50/50 rounded-xl p-2 flex flex-col gap-2">
                    <div className="bg-white border border-blue-50/30 rounded-lg p-2 transition-all active:scale-[0.98]">
                      <div className="text-[8px] text-gray-400 mb-0.5 font-medium">当日</div>
                      <div className="flex items-baseline gap-0.5 mb-0.5">
                        <div className="text-xs font-extrabold text-gray-800 tracking-tight">{metric.daily.value}</div>
                        <div className="text-[7px] text-gray-400 font-medium">{getUnit(metric.name)}</div>
                      </div>
                      <div className="flex justify-between items-center text-[7px] text-gray-500">
                        <span className={`flex items-center font-bold ${metric.daily.isUp ? 'text-green-500' : 'text-red-500'}`}>
                          {metric.daily.isUp ? '▲' : '▼'} {metric.daily.yoy}
                        </span>
                        <span className="opacity-60">占比 {metric.daily.ratio}</span>
                      </div>
                    </div>

                    <div className="bg-white border border-blue-50/30 rounded-lg p-2 transition-all active:scale-[0.98]">
                      <div className="text-[8px] text-gray-400 mb-0.5 font-medium">月累计</div>
                      <div className="flex items-baseline gap-0.5 mb-0.5">
                        <div className="text-xs font-extrabold text-gray-800 tracking-tight">{metric.monthly.value}</div>
                        <div className="text-[7px] text-gray-400 font-medium">{getUnit(metric.name)}</div>
                      </div>
                      <div className="flex justify-between items-center text-[7px] text-gray-500">
                        <span className={`flex items-center font-bold ${metric.monthly.isUp ? 'text-green-500' : 'text-red-500'}`}>
                          {metric.monthly.isUp ? '▲' : '▼'} {metric.monthly.yoy}
                        </span>
                        <span className="opacity-60">占比 {metric.monthly.ratio}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
