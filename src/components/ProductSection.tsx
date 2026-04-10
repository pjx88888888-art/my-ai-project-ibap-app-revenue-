/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronRight, ChevronDown, BarChart3, TrendingUp, TrendingDown, Package } from 'lucide-react';
import { TimeDimension } from '../types';

interface ProductSectionProps {
  timeDimension: TimeDimension;
  onOpenDetail: (product: string) => void;
}

export default function ProductSection({ timeDimension, onOpenDetail }: ProductSectionProps) {
  const businessSegments = ['国际快递', '国际电商', '海外仓配', '本地运配', '国际运输', '国际航线', '国际大宗'];
  const [activeSegment, setActiveSegment] = useState(businessSegments[0]);
  
  // Period state for Day dimension
  const [dayPeriod, setDayPeriod] = useState<'current' | 'monthAccum' | 'yearAccum'>('current');
  // Period state for Month dimension
  const [monthPeriod, setMonthPeriod] = useState<'current' | 'yearAccum'>('current');

  const products = [
    { 
      name: '国际特快', 
      income: '456.7', incomeYoy: '+5.2%', incomeMom: '+1.2%',
      volume: '23.4', volumeYoy: '+3.1%', volumeMom: '+0.8%',
      weight: '123.5', weightYoy: '+4.2%', weightMom: '+1.5%',
      perTicketIncome: '82.45', perTicketIncomeYoy: '+2.1%', perTicketIncomeMom: '+0.5%',
      dailyAvgIncome: '15.23', dailyAvgIncomeYoy: '+3.4%', dailyAvgIncomeMom: '+1.1%',
      discountRate: '12.5%', discountRateYoyDiff: '-0.5%', discountRateMomDiff: '-0.2%',
      perTicketWeight: '5.28', perTicketWeightYoy: '+1.5%'
    },
    { 
      name: '国际标快', 
      income: '389.2', incomeYoy: '+3.1%', incomeMom: '-0.5%',
      volume: '18.9', volumeYoy: '+2.5%', volumeMom: '-0.2%',
      weight: '98.4', weightYoy: '+2.4%', weightMom: '-0.8%',
      perTicketIncome: '79.32', perTicketIncomeYoy: '+1.8%', perTicketIncomeMom: '+0.3%',
      dailyAvgIncome: '12.97', dailyAvgIncomeYoy: '+2.1%', dailyAvgIncomeMom: '+0.5%',
      discountRate: '11.8%', discountRateYoyDiff: '-0.3%', discountRateMomDiff: '-0.1%',
      perTicketWeight: '5.21', perTicketWeightYoy: '+1.2%'
    },
    { 
      name: '国际标快+', 
      income: '245.6', incomeYoy: '+8.4%', incomeMom: '+2.1%',
      volume: '12.4', volumeYoy: '+6.2%', volumeMom: '+1.5%',
      weight: '65.2', weightYoy: '+5.8%', weightMom: '+2.4%',
      perTicketIncome: '85.67', perTicketIncomeYoy: '+4.2%', perTicketIncomeMom: '+1.2%',
      dailyAvgIncome: '8.19', dailyAvgIncomeYoy: '+5.6%', dailyAvgIncomeMom: '+2.1%',
      discountRate: '13.2%', discountRateYoyDiff: '-0.8%', discountRateMomDiff: '-0.4%',
      perTicketWeight: '5.26', perTicketWeightYoy: '+2.1%'
    },
    { 
      name: '国际特惠', 
      income: '189.3', incomeYoy: '-2.1%', incomeMom: '-1.5%',
      volume: '34.5', volumeYoy: '+4.2%', volumeMom: '+1.2%',
      weight: '156.7', weightYoy: '+3.8%', weightMom: '+1.5%',
      perTicketIncome: '54.87', perTicketIncomeYoy: '-1.2%', perTicketIncomeMom: '-0.8%',
      dailyAvgIncome: '6.31', dailyAvgIncomeYoy: '+2.4%', dailyAvgIncomeMom: '+0.8%',
      discountRate: '10.5%', discountRateYoyDiff: '-0.2%', discountRateMomDiff: '-0.1%',
      perTicketWeight: '4.54', perTicketWeightYoy: '+0.8%'
    },
  ];

  const showComparison = !(timeDimension === 'day' && dayPeriod === 'current');

  return (
    <div className="flex flex-col">
      {/* Business Segment Tabs - Blended with top background */}
      <div className="px-4 pb-4 pt-3">
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
          <div className="flex items-center gap-6 min-w-max">
            {businessSegments.map((segment) => (
              <button
                key={segment}
                onClick={() => setActiveSegment(segment)}
                className={`pb-2 text-sm font-bold transition-all relative whitespace-nowrap ${
                  activeSegment === segment ? 'text-white' : 'text-white/60'
                }`}
              >
                {segment}
                {activeSegment === segment && (
                  <motion.div 
                    layoutId="productSegmentUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-3 py-4 space-y-4">
        {/* Product Overview Section */}
        <div className="bg-white rounded-2xl p-4 shadow-xl border border-white/20 relative overflow-hidden">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-50">
            <div className="flex items-center gap-2">
              <div className="bg-blue-50 p-1 rounded-lg">
                <BarChart3 size={16} className="text-[#1b63d6]" />
              </div>
              <span className="text-sm font-bold text-gray-800">产品概览</span>
              <HelpCircle size={14} className="text-gray-300" />
            </div>
            
            {/* Period Switcher */}
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5 text-[9px] font-bold">
              {timeDimension === 'day' ? (
                <>
                  <button
                    onClick={() => setDayPeriod('current')}
                    className={`px-2 py-1 rounded-md transition-all ${dayPeriod === 'current' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                  >
                    当日
                  </button>
                  <button
                    onClick={() => setDayPeriod('monthAccum')}
                    className={`px-2 py-1 rounded-md transition-all ${dayPeriod === 'monthAccum' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                  >
                    月累计
                  </button>
                  <button
                    onClick={() => setDayPeriod('yearAccum')}
                    className={`px-2 py-1 rounded-md transition-all ${dayPeriod === 'yearAccum' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                  >
                    年累计
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setMonthPeriod('current')}
                    className={`px-3 py-1 rounded-md transition-all ${monthPeriod === 'current' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                  >
                    当月
                  </button>
                  <button
                    onClick={() => setMonthPeriod('yearAccum')}
                    className={`px-3 py-1 rounded-md transition-all ${monthPeriod === 'yearAccum' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                  >
                    年累计
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Product Cards List */}
          <div className="space-y-4">
            {products.map((product, idx) => (
              <ProductCard 
                key={product.name} 
                product={product} 
                idx={idx} 
                showComparison={showComparison}
                onOpenDetail={() => onOpenDetail(product.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: any;
  idx: number;
  showComparison: boolean;
  onOpenDetail: () => void;
  key?: React.Key;
}

function ProductCard({ product, idx, showComparison, onOpenDetail }: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="bg-[#f8fbff] rounded-xl p-3 border-l-4 border-[#1b63d6] shadow-sm relative overflow-hidden"
    >
      {/* Product Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-white bg-[#1b63d6] px-2 py-0.5 rounded shadow-sm">
            {product.name}
          </span>
        </div>
        <div 
          onClick={onOpenDetail}
          className="text-[10px] text-gray-400 flex items-center cursor-pointer hover:text-[#1b63d6] transition-colors"
        >
          详情 <ChevronRight size={10} className="ml-0.5 opacity-50" />
        </div>
      </div>

      {/* Small Metrics Cards Grid */}
      <div className="grid grid-cols-3 gap-2 mb-1">
        {/* Income Card */}
        <div className="bg-white border border-blue-50/30 rounded-lg p-2 transition-all active:scale-[0.98]">
          <div className="text-[10px] text-gray-400 mb-0.5 font-medium">收入</div>
          <div className="flex items-baseline gap-0.5 mb-0.5">
            <div className="text-sm font-extrabold text-gray-800 tracking-tight">{product.income}</div>
            <div className="text-[9px] text-gray-400 font-medium">万</div>
          </div>
          {showComparison && (
            <div className={`text-[9px] font-bold flex items-center ${product.incomeYoy.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {product.incomeYoy.startsWith('+') ? '▲' : '▼'} {product.incomeYoy}
            </div>
          )}
        </div>

        {/* Volume Card */}
        <div className="bg-white border border-blue-50/30 rounded-lg p-2 transition-all active:scale-[0.98]">
          <div className="text-[10px] text-gray-400 mb-0.5 font-medium">件量</div>
          <div className="flex items-baseline gap-0.5 mb-0.5">
            <div className="text-sm font-extrabold text-gray-800 tracking-tight">{product.volume}</div>
            <div className="text-[9px] text-gray-400 font-medium">万</div>
          </div>
          {showComparison && (
            <div className={`text-[9px] font-bold flex items-center ${product.volumeYoy.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {product.volumeYoy.startsWith('+') ? '▲' : '▼'} {product.volumeYoy}
            </div>
          )}
        </div>

        {/* Weight Card */}
        <div className="bg-white border border-blue-50/30 rounded-lg p-2 transition-all active:scale-[0.98]">
          <div className="text-[10px] text-gray-400 mb-0.5 font-medium">重量</div>
          <div className="flex items-baseline gap-0.5 mb-0.5">
            <div className="text-sm font-extrabold text-gray-800 tracking-tight">{product.weight}</div>
            <div className="text-[9px] text-gray-400 font-medium">吨</div>
          </div>
          {showComparison && (
            <div className={`text-[9px] font-bold flex items-center ${product.weightYoy.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {product.weightYoy.startsWith('+') ? '▲' : '▼'} {product.weightYoy}
            </div>
          )}
        </div>
      </div>

      {/* Expandable Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-3 border-t border-gray-100/50 mt-2">
              {/* Key Metrics */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-3 bg-blue-400 rounded-full" />
                  <span className="text-[11px] font-bold text-gray-700">关键指标</span>
                </div>
                <div className="bg-white rounded-lg p-2 space-y-2 border border-blue-50/50">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-gray-500">单票收入</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-800">{product.perTicketIncome}元</span>
                      {showComparison && (
                        <>
                          <span className={`flex items-center gap-0.5 font-bold ${product.perTicketIncomeYoy.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                            同 {product.perTicketIncomeYoy} {product.perTicketIncomeYoy.startsWith('+') ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                          </span>
                          <span className={`flex items-center gap-0.5 font-bold ${product.perTicketIncomeMom.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                            环 {product.perTicketIncomeMom} {product.perTicketIncomeMom.startsWith('+') ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-gray-500">日均收入</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-800">{product.dailyAvgIncome}万</span>
                      {showComparison && (
                        <>
                          <span className={`flex items-center gap-0.5 font-bold ${product.dailyAvgIncomeYoy.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                            同 {product.dailyAvgIncomeYoy} {product.dailyAvgIncomeYoy.startsWith('+') ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                          </span>
                          <span className={`flex items-center gap-0.5 font-bold ${product.dailyAvgIncomeMom.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                            环 {product.dailyAvgIncomeMom} {product.dailyAvgIncomeMom.startsWith('+') ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-gray-500">折让率</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-800">{product.discountRate}</span>
                      {showComparison && (
                        <>
                          <span className={`flex items-center gap-0.5 font-bold ${product.discountRateYoyDiff.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                            同差 {product.discountRateYoyDiff}
                          </span>
                          <span className={`flex items-center gap-0.5 font-bold ${product.discountRateMomDiff.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                            环差 {product.discountRateMomDiff}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-gray-50">
                    <span className="text-gray-500">单票重量</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-800">{product.perTicketWeight}kg</span>
                      {showComparison && (
                        <span className={`flex items-center gap-0.5 font-bold ${product.perTicketWeightYoy.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          同 {product.perTicketWeightYoy} {product.perTicketWeightYoy.startsWith('+') ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand Button */}
      <div className="flex justify-center mt-2 pt-1">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
        >
          {isExpanded ? '收起' : '展开'} <ChevronDown size={12} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </motion.div>
  );
}
