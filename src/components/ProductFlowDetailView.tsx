/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, X, MoreHorizontal, TrendingUp, TrendingDown, MoveRight } from 'lucide-react';
import { MetricType, TimeDimension } from '../types';

interface ProductFlowDetailViewProps {
  onBack: () => void;
  onClose: () => void;
  product: string;
  activeMetric: MetricType;
  setActiveMetric: (metric: MetricType) => void;
  timeDimension: TimeDimension;
}

export default function ProductFlowDetailView({ onBack, onClose, product: initialProduct, activeMetric, setActiveMetric, timeDimension }: ProductFlowDetailViewProps) {
  const [activeProduct, setActiveProduct] = useState(initialProduct);
  const [activePeriod, setActivePeriod] = useState<'daily' | 'monthly' | 'yearly'>('daily');

  useEffect(() => {
    if (timeDimension === 'month') {
      setActivePeriod('monthly');
    } else {
      setActivePeriod('daily');
    }
  }, [timeDimension]);

  const products = [
    '国际特快',
    '国际标快',
    '国际标快+',
    '国际特惠',
    '国际大件',
    '国际集运',
    '医药跨境',
    '其他'
  ];

  const flows = [
    { from: '深莞区', to: '西欧', income: '1,234.5', incomeYoy: '5.2%', incomeUp: true, volume: '567', volumeYoy: '3.1%', volumeUp: true, weight: '12.5', weightYoy: '1.2%', weightUp: true },
    { from: '深莞区', to: '美洲', income: '982.3', incomeYoy: '3.1%', incomeUp: true, volume: '489', volumeYoy: '2.1%', volumeUp: true, weight: '10.2', weightYoy: '0.8%', weightUp: true },
    { from: '深莞区', to: '英国', income: '876.1', incomeYoy: '-1.2%', incomeUp: false, volume: '456', volumeYoy: '-0.5%', volumeUp: false, weight: '9.8', weightYoy: '-1.5%', weightUp: false },
    { from: '深莞区', to: '非洲', income: '543.2', incomeYoy: '2.4%', incomeUp: true, volume: '234', volumeYoy: '1.8%', volumeUp: true, weight: '5.6', weightYoy: '2.1%', weightUp: true },
    { from: '深莞区', to: '马来西亚', income: '432.1', incomeYoy: '0.0%', incomeUp: true, volume: '198', volumeYoy: '0.5%', volumeUp: true, weight: '4.2', weightYoy: '0.0%', weightUp: true },
    { from: '深莞区', to: '日本', income: '321.0', incomeYoy: '1.5%', incomeUp: true, volume: '156', volumeYoy: '2.2%', volumeUp: true, weight: '3.1', weightYoy: '1.1%', weightUp: true },
  ];

  return (
    <div className="max-w-[450px] mx-auto bg-[#f4f7fc] min-h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1b63d6] to-[#3b82f6] pt-4 pb-0 px-4 relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="text-white p-1">
              <ChevronLeft size={24} />
            </button>
            <div className="text-lg font-bold text-white">指标详情</div>
            <div className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-md backdrop-blur-sm font-medium">
              本部
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-white p-1">
              <MoreHorizontal size={20} />
            </button>
            <button onClick={onClose} className="text-white p-1">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="flex overflow-x-auto no-scrollbar pb-1">
          {products.map((p) => (
            <div
              key={p}
              onClick={() => setActiveProduct(p)}
              className={`whitespace-nowrap px-4 py-3 text-sm transition-all relative cursor-pointer ${
                activeProduct === p ? 'text-white font-bold' : 'text-white/70 font-medium'
              }`}
            >
              {p}
              {activeProduct === p && (
                <motion.div
                  layoutId="productFlowTabUnderline"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-white/50">
          <div className="px-4 py-3 flex items-center justify-between border-b border-gray-50">
            <div className="text-sm font-bold text-gray-800">流向明细</div>
            {timeDimension === 'month' && (
              <div className="relative z-50">
                <button
                  onClick={() => setActivePeriod(activePeriod === 'monthly' ? 'yearly' : 'monthly')}
                  className="flex items-center gap-1 bg-blue-50 text-[#1b63d6] px-2 py-1 rounded-md text-[10px] font-bold"
                >
                  {activePeriod === 'monthly' ? '月-当月' : '月-年累计'}
                  <span className="text-[8px]">⇅</span>
                </button>
              </div>
            )}
          </div>
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs border-separate border-spacing-0">
              <thead>
                <tr className="bg-[#f8f9fb]">
                  <th className="px-4 py-3 text-gray-500 font-bold sticky left-0 bg-[#f8f9fb] z-10 whitespace-nowrap border-b border-gray-100">流向</th>
                  <th className="px-4 py-3 text-gray-500 font-bold text-right whitespace-nowrap border-b border-gray-100">收入</th>
                  <th className="px-4 py-3 text-gray-500 font-bold text-right whitespace-nowrap border-b border-gray-100">件量</th>
                  <th className="px-4 py-3 text-gray-500 font-bold text-right whitespace-nowrap border-b border-gray-100">重量</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {flows.map((f, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-5 sticky left-0 bg-white z-10">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-gray-800">{f.from}</span>
                        <div className="flex items-center text-[#1b63d6]">
                          <div className="w-5 h-5 rounded-md border border-blue-100 flex items-center justify-center bg-blue-50/50">
                            <ArrowRightLeft size={10} className="rotate-90" />
                          </div>
                        </div>
                        <span className="font-bold text-gray-800">{f.to}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-right align-top whitespace-nowrap">
                      <div className="font-bold text-gray-800">
                        {f.income}
                        <span className="text-[10px] text-gray-400 ml-0.5 font-normal">万元</span>
                      </div>
                      <div className={`text-[10px] font-bold flex items-center justify-end mt-1 ${f.incomeUp ? 'text-green-500' : 'text-red-500'}`}>
                        {f.incomeYoy}
                        {f.incomeUp ? <TrendingUp size={10} className="ml-0.5" /> : <TrendingDown size={10} className="ml-0.5" />}
                      </div>
                    </td>
                    <td className="px-4 py-5 text-right align-top whitespace-nowrap">
                      <div className="font-bold text-gray-800">
                        {f.volume}
                        <span className="text-[10px] text-gray-400 ml-0.5 font-normal">万票</span>
                      </div>
                      <div className={`text-[10px] font-bold flex items-center justify-end mt-1 ${f.volumeUp ? 'text-green-500' : 'text-red-500'}`}>
                        {f.volumeYoy}
                        {f.volumeUp ? <TrendingUp size={10} className="ml-0.5" /> : <TrendingDown size={10} className="ml-0.5" />}
                      </div>
                    </td>
                    <td className="px-4 py-5 text-right align-top whitespace-nowrap">
                      <div className="font-bold text-gray-800">
                        {f.weight}
                        <span className="text-[10px] text-gray-400 ml-0.5 font-normal">吨</span>
                      </div>
                      <div className={`text-[10px] font-bold flex items-center justify-end mt-1 ${f.weightUp ? 'text-green-500' : 'text-red-500'}`}>
                        {f.weightYoy}
                        {f.weightUp ? <TrendingUp size={10} className="ml-0.5" /> : <TrendingDown size={10} className="ml-0.5" />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper icon for flow
function ArrowRightLeft({ size, className }: { size: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m7 16-4-4 4-4" />
      <path d="m17 8 4 4-4 4" />
      <path d="M3 12h18" />
    </svg>
  );
}
