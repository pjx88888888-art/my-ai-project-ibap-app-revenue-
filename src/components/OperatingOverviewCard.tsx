/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MetricType, TimeDimension } from '../types';
import { ChevronRight, TrendingUp, TrendingDown, HelpCircle, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OperatingOverviewCardProps {
  activeMetric: MetricType;
  timeDimension: TimeDimension;
  onOpenDetail: () => void;
}

export default function OperatingOverviewCard({ activeMetric, timeDimension, onOpenDetail }: OperatingOverviewCardProps) {
  const data: Record<MetricType, {
    daily: { value: string; unit: string; yoy: string; isUp: boolean };
    monthly: { value: string; unit: string; yoy: string; isUp: boolean; status: 'green' | 'yellow' | 'red' | 'none' };
    yearly: { value: string; unit: string; yoy: string; isUp: boolean; status: 'green' | 'yellow' | 'red' | 'none' };
  }> = {
    income: {
      daily: { value: '1,234.56', unit: '万元', yoy: '+12.5%', isUp: true },
      monthly: { value: '287.56', unit: '亿元', yoy: '+8.3%', isUp: true, status: 'green' },
      yearly: { value: '852.34', unit: '亿元', yoy: '+15.7%', isUp: true, status: 'yellow' },
    },
    volume: {
      daily: { value: '567.89', unit: '万票', yoy: '-5.2%', isUp: false },
      monthly: { value: '152.35', unit: '亿票', yoy: '+6.8%', isUp: true, status: 'green' },
      yearly: { value: '425.67', unit: '亿票', yoy: '+3.9%', isUp: true, status: 'yellow' },
    },
    weight: {
      daily: { value: '234.56', unit: '吨', yoy: '+8.6%', isUp: true },
      monthly: { value: '5,678.90', unit: '吨', yoy: '-2.1%', isUp: false, status: 'red' },
      yearly: { value: '12,345.67', unit: '吨', yoy: '+4.5%', isUp: true, status: 'green' },
    },
  };

  const currentData = data[activeMetric];

  return (
    <div className="bg-white mx-3 my-3 rounded-2xl p-4 shadow-xl relative z-10 overflow-hidden border border-white/20">
      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-50">
        <div className="flex items-center gap-2">
          <div className="bg-blue-50 p-1 rounded-lg">
            <BarChart3 size={16} className="text-[#1b63d6]" />
          </div>
          <span className="text-sm font-bold text-gray-800">经营概览</span>
          <HelpCircle size={14} className="text-gray-300" />
        </div>
        <div
          onClick={onOpenDetail}
          className="text-gray-400 text-[10px] flex items-center cursor-pointer hover:text-[#1b63d6] transition-colors"
        >
          详情 <ChevronRight size={10} className="ml-0.5" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeMetric}-${timeDimension}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {timeDimension === 'day' ? (
            <>
              {/* Daily Metric */}
              <div className="bg-[#f8fbff] p-4 rounded-xl mb-3 border border-blue-50/50">
                <div className="text-xs text-gray-700 mb-2 flex items-center font-medium">
                  当日 <span className="text-[10px] text-gray-400 ml-1.5 font-normal">3月29日</span>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold text-gray-900 tracking-tight">{currentData.daily.value}</span>
                  <span className="text-xs text-gray-500 font-medium">{currentData.daily.unit}</span>
                </div>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#f8fbff] p-3 rounded-xl relative border border-blue-50/50">
                  <div className="text-[11px] text-gray-700 mb-2 font-medium">
                    月累计 <span className="text-[9px] text-gray-400 ml-1 font-normal">3.1-29日</span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-1.5">
                    <span className="text-lg font-bold text-gray-900 tracking-tight">{currentData.monthly.value}</span>
                    <span className="text-[10px] text-gray-500 font-medium">{currentData.monthly.unit}</span>
                  </div>
                  <div className="text-[9px] text-gray-400 flex items-center gap-1">
                    同比: 
                    <span className={`flex items-center font-semibold ${currentData.monthly.isUp ? 'text-green-500' : 'text-red-500'}`}>
                      {currentData.monthly.yoy}
                      {currentData.monthly.isUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                    </span>
                  </div>
                  {currentData.monthly.status !== 'none' && activeMetric === 'income' && (
                    <div className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full ${
                      currentData.monthly.status === 'green' ? 'bg-green-500' : 
                      currentData.monthly.status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                  )}
                </div>

                <div className="bg-[#f8fbff] p-3 rounded-xl relative border border-blue-50/50">
                  <div className="text-[11px] text-gray-700 mb-2 font-medium">
                    年累计 <span className="text-[9px] text-gray-400 ml-1 font-normal">1-3.29日</span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-1.5">
                    <span className="text-lg font-bold text-gray-900 tracking-tight">{currentData.yearly.value}</span>
                    <span className="text-[10px] text-gray-500 font-medium">{currentData.yearly.unit}</span>
                  </div>
                  <div className="text-[9px] text-gray-400 flex items-center gap-1">
                    同比: 
                    <span className={`flex items-center font-semibold ${currentData.yearly.isUp ? 'text-green-500' : 'text-red-500'}`}>
                      {currentData.yearly.yoy}
                      {currentData.yearly.isUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                    </span>
                  </div>
                  {currentData.yearly.status !== 'none' && activeMetric === 'income' && (
                    <div className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full ${
                      currentData.yearly.status === 'green' ? 'bg-green-500' : 
                      currentData.yearly.status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {/* Monthly Metric */}
              <div className="bg-[#f8fbff] p-3 rounded-xl border border-blue-50/50">
                <div className="text-[11px] text-gray-700 mb-2 flex items-center font-medium">
                  当月 <span className="text-[9px] text-gray-400 ml-1 font-normal">3月</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1.5">
                  <span className="text-lg font-bold text-gray-900 tracking-tight">{currentData.monthly.value}</span>
                  <span className="text-[10px] text-gray-500 font-medium">{currentData.monthly.unit}</span>
                </div>
                <div className="text-[9px] text-gray-400 flex items-center gap-1">
                  同比: 
                  <span className={`flex items-center font-semibold ${currentData.monthly.isUp ? 'text-green-500' : 'text-red-500'}`}>
                    {currentData.monthly.yoy}
                    {currentData.monthly.isUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                  </span>
                </div>
              </div>

              {/* Yearly Metric for Month Dimension */}
              <div className="bg-[#f8fbff] p-3 rounded-xl relative border border-blue-50/50">
                <div className="text-[11px] text-gray-700 mb-2 font-medium">
                  年累计 <span className="text-[9px] text-gray-400 ml-1 font-normal">1-3月</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1.5">
                  <span className="text-lg font-bold text-gray-900 tracking-tight">{currentData.yearly.value}</span>
                  <span className="text-[10px] text-gray-500 font-medium">{currentData.yearly.unit}</span>
                </div>
                <div className="text-[9px] text-gray-400 flex items-center gap-1">
                  同比: 
                  <span className={`flex items-center font-semibold ${currentData.yearly.isUp ? 'text-green-500' : 'text-red-500'}`}>
                    {currentData.yearly.yoy}
                    {currentData.yearly.isUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
