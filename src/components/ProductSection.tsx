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
  onOpenDetail: (segment: string, metric: 'income' | 'volume' | 'weight') => void;
}

export default function ProductSection({ timeDimension, onOpenDetail }: ProductSectionProps) {
  const businessSegments = ['国际快递', '国际电商', '海外仓配', '本地运配', '国际运输', '国际航线', '国际大宗'];
  const [activeSegment, setActiveSegment] = useState(businessSegments[0]);
  
  const metricTabs: { id: 'income' | 'volume' | 'weight'; name: string }[] = [
    { id: 'income', name: '收入' },
    { id: 'volume', name: '件量' },
    { id: 'weight', name: '重量' },
  ];
  const [activeMetricTab, setActiveMetricTab] = useState<'income' | 'volume' | 'weight'>('income');

  const products = [
    { 
      name: '国际特快', 
      income: { current: '456.70', yoy: '+5.2%', mom: '+1.2%', monthAccum: '1,234.50', monthYoy: '+8.4%', monthMom: '+2.1%', yearAccum: '12,345.60', yearYoy: '+12.5%', yearMom: '+3.2%' },
      volume: { current: '23.40', yoy: '+3.1%', mom: '+0.8%', monthAccum: '65.20', monthYoy: '+5.2%', monthMom: '+1.5%', yearAccum: '789.40', yearYoy: '+10.2%', yearMom: '+2.4%' },
      weight: { current: '123.50', yoy: '+4.2%', mom: '+1.5%', monthAccum: '345.60', monthYoy: '+6.8%', monthMom: '+1.8%', yearAccum: '4,567.80', yearYoy: '+15.4%', yearMom: '+4.1%' },
      perTicketIncome: '82.45', perTicketIncomeYoy: '+2.1%', perTicketIncomeMom: '+0.5%', 
      dailyAvgIncome: '15.23', dailyAvgIncomeYoy: '+3.4%', dailyAvgIncomeMom: '+1.1%', 
      discountRate: '12.5%', discountRateYoyDiff: '-0.5%', discountRateMomDiff: '-0.2%', 
      perTicketWeight: '5.28', perTicketWeightYoy: '+1.5%', perTicketWeightMom: '+0.4%' 
    },
    { 
      name: '国际标快', 
      income: { current: '389.20', yoy: '+3.1%', mom: '-0.5%', monthAccum: '1,056.40', monthYoy: '+6.2%', monthMom: '+1.1%', yearAccum: '10,892.30', yearYoy: '+9.8%', yearMom: '+2.1%' },
      volume: { current: '18.90', yoy: '+2.5%', mom: '-0.2%', monthAccum: '52.40', monthYoy: '+4.1%', monthMom: '+0.9%', yearAccum: '654.20', yearYoy: '+8.5%', yearMom: '+1.8%' },
      weight: { current: '98.40', yoy: '+2.4%', mom: '-0.8%', monthAccum: '289.20', monthYoy: '+5.5%', monthMom: '+1.2%', yearAccum: '3,892.10', yearYoy: '+12.4%', yearMom: '+3.5%' },
      perTicketIncome: '79.32', perTicketIncomeYoy: '+1.8%', perTicketIncomeMom: '+0.3%', 
      dailyAvgIncome: '12.97', dailyAvgIncomeYoy: '+2.1%', dailyAvgIncomeMom: '+0.5%', 
      discountRate: '11.8%', discountRateYoyDiff: '-0.3%', discountRateMomDiff: '-0.1%', 
      perTicketWeight: '5.21', perTicketWeightYoy: '+1.2%', perTicketWeightMom: '+0.3%' 
    },
    { 
      name: '国际标快+', 
      income: { current: '245.60', yoy: '+8.4%', mom: '+2.1%', monthAccum: '689.20', monthYoy: '+10.5%', monthMom: '+3.2%', yearAccum: '7,456.20', yearYoy: '+15.2%', yearMom: '+5.4%' },
      volume: { current: '12.40', yoy: '+6.2%', mom: '+1.5%', monthAccum: '34.50', monthYoy: '+8.2%', monthMom: '+2.4%', yearAccum: '456.70', yearYoy: '+12.4%', yearMom: '+4.2%' },
      weight: { current: '65.20', yoy: '+5.8%', mom: '+2.4%', monthAccum: '189.30', monthYoy: '+9.4%', monthMom: '+2.8%', yearAccum: '2,456.80', yearYoy: '+18.5%', yearMom: '+6.1%' },
      perTicketIncome: '85.67', perTicketIncomeYoy: '+4.2%', perTicketIncomeMom: '+1.2%', 
      dailyAvgIncome: '8.19', dailyAvgIncomeYoy: '+5.6%', dailyAvgIncomeMom: '+2.1%', 
      discountRate: '13.2%', discountRateYoyDiff: '-0.8%', discountRateMomDiff: '-0.4%', 
      perTicketWeight: '5.26', perTicketWeightYoy: '+2.1%', perTicketWeightMom: '+0.8%' 
    },
    { 
      name: '国际特惠', 
      income: { current: '189.30', yoy: '-2.1%', mom: '-1.5%', monthAccum: '543.20', monthYoy: '+2.4%', monthMom: '+0.8%', yearAccum: '5,892.10', yearYoy: '+5.8%', yearMom: '+1.2%' },
      volume: { current: '34.50', yoy: '+4.2%', mom: '+1.2%', monthAccum: '98.40', monthYoy: '+6.5%', monthMom: '+1.8%', yearAccum: '1,234.50', yearYoy: '+9.2%', yearMom: '+2.5%' },
      weight: { current: '156.70', yoy: '+3.8%', mom: '+1.5%', monthAccum: '456.20', monthYoy: '+5.2%', monthMom: '+1.4%', yearAccum: '5,678.90', yearYoy: '+10.4%', yearMom: '+3.1%' },
      perTicketIncome: '54.87', perTicketIncomeYoy: '-1.2%', perTicketIncomeMom: '-0.8%', 
      dailyAvgIncome: '6.31', dailyAvgIncomeYoy: '+2.4%', dailyAvgIncomeMom: '+0.8%', 
      discountRate: '10.5%', discountRateYoyDiff: '-0.2%', discountRateMomDiff: '-0.1%', 
      perTicketWeight: '4.54', perTicketWeightYoy: '+0.8%', perTicketWeightMom: '+0.2%' 
    },
    { 
      name: '国际大件', 
      income: { current: '156.40', yoy: '+4.5%', mom: '+0.8%', monthAccum: '432.10', monthYoy: '+6.8%', monthMom: '+1.5%', yearAccum: '4,567.20', yearYoy: '+10.5%', yearMom: '+2.8%' },
      volume: { current: '8.20', yoy: '+2.1%', mom: '+0.4%', monthAccum: '24.50', monthYoy: '+4.2%', monthMom: '+1.1%', yearAccum: '345.60', yearYoy: '+7.8%', yearMom: '+1.5%' },
      weight: { current: '245.60', yoy: '+6.2%', mom: '+1.2%', monthAccum: '789.40', monthYoy: '+8.5%', monthMom: '+2.1%', yearAccum: '8,923.40', yearYoy: '+14.2%', yearMom: '+4.5%' },
      perTicketIncome: '190.73', perTicketIncomeYoy: '+2.4%', perTicketIncomeMom: '+0.6%', 
      dailyAvgIncome: '5.21', dailyAvgIncomeYoy: '+3.1%', dailyAvgIncomeMom: '+0.9%', 
      discountRate: '14.2%', discountRateYoyDiff: '-0.4%', discountRateMomDiff: '-0.2%', 
      perTicketWeight: '29.95', perTicketWeightYoy: '+4.1%', perTicketWeightMom: '+1.2%' 
    },
    { 
      name: '国际集运', 
      income: { current: '123.80', yoy: '+12.4%', mom: '+3.5%', monthAccum: '345.60', monthYoy: '+15.2%', monthMom: '+4.1%', yearAccum: '3,892.40', yearYoy: '+20.5%', yearMom: '+6.8%' },
      volume: { current: '45.60', yoy: '+8.2%', mom: '+2.1%', monthAccum: '123.40', monthYoy: '+10.5%', monthMom: '+2.8%', yearAccum: '1,567.80', yearYoy: '+15.2%', yearMom: '+4.5%' },
      weight: { current: '89.40', yoy: '+5.5%', mom: '+1.8%', monthAccum: '245.60', monthYoy: '+8.4%', monthMom: '+2.2%', yearAccum: '2,892.10', yearYoy: '+12.5%', yearMom: '+3.8%' },
      perTicketIncome: '27.15', perTicketIncomeYoy: '+3.8%', perTicketIncomeMom: '+1.2%', 
      dailyAvgIncome: '4.12', dailyAvgIncomeYoy: '+6.4%', dailyAvgIncomeMom: '+2.5%', 
      discountRate: '9.8%', discountRateYoyDiff: '-0.6%', discountRateMomDiff: '-0.3%', 
      perTicketWeight: '1.96', perTicketWeightYoy: '+2.4%', perTicketWeightMom: '+0.8%' 
    },
    { 
      name: '医药跨境', 
      income: { current: '89.50', yoy: '+15.2%', mom: '+4.1%', monthAccum: '245.60', monthYoy: '+18.5%', monthMom: '+5.2%', yearAccum: '2,892.30', yearYoy: '+25.4%', yearMom: '+8.5%' },
      volume: { current: '2.10', yoy: '+10.5%', mom: '+2.8%', monthAccum: '6.50', monthYoy: '+12.4%', monthMom: '+3.1%', yearAccum: '78.40', yearYoy: '+18.2%', yearMom: '+5.2%' },
      weight: { current: '12.40', yoy: '+8.4%', mom: '+2.2%', monthAccum: '34.50', monthYoy: '+10.2%', monthMom: '+2.5%', yearAccum: '456.70', yearYoy: '+15.8%', yearMom: '+4.8%' },
      perTicketIncome: '426.19', perTicketIncomeYoy: '+4.5%', perTicketIncomeMom: '+1.5%', 
      dailyAvgIncome: '2.98', dailyAvgIncomeYoy: '+12.1%', dailyAvgIncomeMom: '+3.8%', 
      discountRate: '15.5%', discountRateYoyDiff: '-0.8%', discountRateMomDiff: '-0.4%', 
      perTicketWeight: '5.90', perTicketWeightYoy: '+3.2%', perTicketWeightMom: '+1.1%' 
    },
    { 
      name: '其他', 
      income: { current: '45.20', yoy: '+2.1%', mom: '+0.5%', monthAccum: '123.40', monthYoy: '+4.2%', monthMom: '+1.2%', yearAccum: '1,567.80', yearYoy: '+6.5%', yearMom: '+1.8%' },
      volume: { current: '12.40', yoy: '+1.2%', mom: '+0.3%', monthAccum: '34.50', monthYoy: '+2.5%', monthMom: '+0.8%', yearAccum: '456.70', yearYoy: '+4.8%', yearMom: '+1.2%' },
      weight: { current: '34.50', yoy: '+1.5%', mom: '+0.4%', monthAccum: '98.40', monthYoy: '+3.2%', monthMom: '+1.1%', yearAccum: '1,234.50', yearYoy: '+5.5%', yearMom: '+1.5%' },
      perTicketIncome: '36.45', perTicketIncomeYoy: '+0.8%', perTicketIncomeMom: '+0.2%', 
      dailyAvgIncome: '1.51', dailyAvgIncomeYoy: '+1.2%', dailyAvgIncomeMom: '+0.4%', 
      discountRate: '10.2%', discountRateYoyDiff: '-0.1%', discountRateMomDiff: '-0.1%', 
      perTicketWeight: '2.78', perTicketWeightYoy: '+0.5%', perTicketWeightMom: '+0.1%' 
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Business Segment Tabs - Blended with top background */}
      <div className="px-4 pb-2 pt-3">
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

      {/* Metric Tabs - Level 2 */}
      <div className="px-4 pb-2">
        <div className="flex items-center gap-2">
          {metricTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMetricTab(tab.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeMetricTab === tab.id 
                  ? 'bg-white text-[#1b63d6] shadow-sm' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {tab.name}
            </button>
          ))}
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
            
            <div className="flex items-center gap-3">
              {/* Detail Button */}
              <div 
                onClick={() => onOpenDetail(activeSegment, activeMetricTab)}
                className="text-gray-400 text-[10px] flex items-center cursor-pointer hover:text-[#1b63d6] transition-colors"
              >
                详情 <ChevronRight size={10} className="ml-0.5" />
              </div>
            </div>
          </div>

          {/* Product Cards List */}
          <div className="space-y-4">
            {products.map((product, idx) => (
              <ProductCard 
                key={product.name} 
                product={product} 
                idx={idx} 
                activeMetricTab={activeMetricTab}
                timeDimension={timeDimension}
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
  activeMetricTab: 'income' | 'volume' | 'weight';
  timeDimension: TimeDimension;
  key?: React.Key;
}

function ProductCard({ product, idx, activeMetricTab, timeDimension }: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getMetricData = () => {
    return product[activeMetricTab];
  };

  const metricData = getMetricData();
  const unit = activeMetricTab === 'income' ? '万元' : activeMetricTab === 'volume' ? '万票' : '吨';
  const showExpand = activeMetricTab === 'income' || activeMetricTab === 'weight';

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
      </div>

      {/* Small Metrics Cards Grid - Time Dimensions */}
      <div className={`grid ${timeDimension === 'day' ? 'grid-cols-3' : 'grid-cols-2'} gap-2 mb-1`}>
        {/* Current Card (当日 or 当月) */}
        <div className="bg-white border border-blue-50/30 rounded-lg p-2 transition-all active:scale-[0.98]">
          <div className="text-[10px] text-gray-400 mb-0.5 font-medium">{timeDimension === 'day' ? '当日' : '当月'}</div>
          <div className="flex items-baseline gap-0.5 mb-0.5">
            <div className="text-sm font-extrabold text-gray-800 tracking-tight">{metricData.current}</div>
            <div className="text-[9px] text-gray-400 font-medium">{unit}</div>
          </div>
          {!(timeDimension === 'day') && (
            <div className="flex flex-col gap-0.5">
              <div className="text-[9px] text-gray-400 flex items-center gap-1">
                <span className="text-gray-400 font-normal">同比:</span>
                <span className={`flex items-center font-semibold ${metricData.yoy.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {metricData.yoy}
                  {metricData.yoy.startsWith('+') ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Month Accum Card (Only for Day Dimension) */}
        {timeDimension === 'day' && (
          <div className="bg-white border border-blue-50/30 rounded-lg p-2 transition-all active:scale-[0.98]">
            <div className="text-[10px] text-gray-400 mb-0.5 font-medium">月累计</div>
            <div className="flex items-baseline gap-0.5 mb-0.5">
              <div className="text-sm font-extrabold text-gray-800 tracking-tight">{metricData.monthAccum}</div>
              <div className="text-[9px] text-gray-400 font-medium">{unit}</div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-[9px] text-gray-400 flex items-center gap-1">
                <span className="text-gray-400 font-normal">同比:</span>
                <span className={`flex items-center font-semibold ${metricData.monthYoy.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {metricData.monthYoy}
                  {metricData.monthYoy.startsWith('+') ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Year Accum Card */}
        <div className="bg-white border border-blue-50/30 rounded-lg p-2 transition-all active:scale-[0.98]">
          <div className="text-[10px] text-gray-400 mb-0.5 font-medium">年累计</div>
          <div className="flex items-baseline gap-0.5 mb-0.5">
            <div className="text-sm font-extrabold text-gray-800 tracking-tight">{metricData.yearAccum}</div>
            <div className="text-[9px] text-gray-400 font-medium">{unit}</div>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="text-[9px] text-gray-400 flex items-center gap-1">
              <span className="text-gray-400 font-normal">同比:</span>
              <span className={`flex items-center font-semibold ${metricData.yearYoy.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {metricData.yearYoy}
                {metricData.yearYoy.startsWith('+') ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Section */}
      <AnimatePresence>
        {isExpanded && showExpand && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-3 border-t border-gray-100/50 mt-2">
              {/* Key Metrics Header */}
              <div className="flex items-center gap-2">
                <div className="w-1 h-3 bg-blue-400 rounded-full" />
                <span className="text-[11px] font-bold text-gray-700">关键指标</span>
              </div>

              {/* Metrics Table-like Layout */}
              <div className="bg-white rounded-lg border border-blue-50/50 overflow-hidden">
                {/* Table Header */}
                <div className={`grid ${timeDimension === 'day' ? 'grid-cols-4' : 'grid-cols-3'} bg-gray-50/50 border-b border-gray-100 py-1.5 px-2 text-[9px] font-bold text-gray-400`}>
                  <div className="col-span-1">指标</div>
                  <div className="text-center">{timeDimension === 'day' ? '当日' : '当月'}</div>
                  {timeDimension === 'day' && <div className="text-center">月累计</div>}
                  <div className="text-center">年累计</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-gray-50">
                  {activeMetricTab === 'income' && (
                    <>
                      {/* Per Ticket Income Row */}
                      <div className={`grid ${timeDimension === 'day' ? 'grid-cols-4' : 'grid-cols-3'} py-2 px-2 items-center`}>
                        <div className="text-[10px] text-gray-500 font-medium">单票收入</div>
                        {/* Column 1: 当日 or 当月 */}
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-gray-800">{product.perTicketIncome}元</div>
                          {!(timeDimension === 'day') && (
                            <div className="flex flex-col items-center mt-0.5">
                              <div className="flex items-center gap-0.5 scale-90">
                                <span className="text-[8px] text-gray-400 font-normal">同比:</span>
                                <span className={`flex items-center font-bold text-[8px] ${product.perTicketIncomeYoy.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                  {product.perTicketIncomeYoy}
                                  {product.perTicketIncomeYoy.startsWith('+') ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                                </span>
                              </div>
                              <div className="flex items-center gap-0.5 scale-90">
                                <span className="text-[8px] text-gray-400 font-normal">环比:</span>
                                <span className={`flex items-center font-bold text-[8px] ${product.perTicketIncomeMom.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                  {product.perTicketIncomeMom}
                                  {product.perTicketIncomeMom.startsWith('+') ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Column 2: 月累计 (Only for Day Dimension) */}
                        {timeDimension === 'day' && (
                          <div className="text-center">
                            <div className="text-[10px] font-bold text-gray-800">{(parseFloat(product.perTicketIncome) * 1.02).toFixed(2)}元</div>
                            <div className="flex flex-col items-center mt-0.5">
                              <div className="flex items-center gap-0.5 scale-90">
                                <span className="text-[8px] text-gray-400 font-normal">同比:</span>
                                <span className="text-[8px] font-bold text-green-500 flex items-center">
                                  +2.1%
                                  <TrendingUp size={8} className="ml-0.5" />
                                </span>
                              </div>
                              <div className="flex items-center gap-0.5 scale-90">
                                <span className="text-[8px] text-gray-400 font-normal">环比:</span>
                                <span className="text-[8px] font-bold text-green-500 flex items-center">
                                  +0.8%
                                  <TrendingUp size={8} className="ml-0.5" />
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        {/* Column 3: 年累计 */}
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-gray-800">{(parseFloat(product.perTicketIncome) * 1.05).toFixed(2)}元</div>
                          <div className="flex flex-col items-center mt-0.5">
                            <div className="flex items-center gap-0.5 scale-90">
                              <span className="text-[8px] text-gray-400 font-normal">同比:</span>
                              <span className="text-[8px] font-bold text-green-500 flex items-center">
                                +4.5%
                                <TrendingUp size={8} className="ml-0.5" />
                              </span>
                            </div>
                            <div className="flex items-center gap-0.5 scale-90">
                              <span className="text-[8px] text-gray-400 font-normal">环比:</span>
                              <span className="text-[8px] font-bold text-green-500 flex items-center">
                                +1.5%
                                <TrendingUp size={8} className="ml-0.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Daily Avg Income Row */}
                      <div className={`grid ${timeDimension === 'day' ? 'grid-cols-4' : 'grid-cols-3'} py-2 px-2 items-center`}>
                        <div className="text-[10px] text-gray-500 font-medium">日均收入</div>
                        {/* Column 1: 当日 or 当月 */}
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-gray-800">{product.dailyAvgIncome}万元</div>
                          {!(timeDimension === 'day') && (
                            <div className="flex flex-col items-center mt-0.5">
                              <div className="flex items-center gap-0.5 scale-90">
                                <span className="text-[8px] text-gray-400 font-normal">同比:</span>
                                <span className={`flex items-center font-bold text-[8px] ${product.dailyAvgIncomeYoy.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                  {product.dailyAvgIncomeYoy}
                                  {product.dailyAvgIncomeYoy.startsWith('+') ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                                </span>
                              </div>
                              <div className="flex items-center gap-0.5 scale-90">
                                <span className="text-[8px] text-gray-400 font-normal">环比:</span>
                                <span className={`flex items-center font-bold text-[8px] ${product.dailyAvgIncomeMom.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                  {product.dailyAvgIncomeMom}
                                  {product.dailyAvgIncomeMom.startsWith('+') ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Column 2: 月累计 (Only for Day Dimension) */}
                        {timeDimension === 'day' && (
                          <div className="text-center">
                            <div className="text-[10px] font-bold text-gray-800">{(parseFloat(product.dailyAvgIncome) * 1.1).toFixed(2)}万元</div>
                            <div className="flex flex-col items-center mt-0.5">
                              <div className="flex items-center gap-0.5 scale-90">
                                <span className="text-[8px] text-gray-400 font-normal">同比:</span>
                                <span className="text-[8px] font-bold text-green-500 flex items-center">
                                  +3.4%
                                  <TrendingUp size={8} className="ml-0.5" />
                                </span>
                              </div>
                              <div className="flex items-center gap-0.5 scale-90">
                                <span className="text-[8px] text-gray-400 font-normal">环比:</span>
                                <span className="text-[8px] font-bold text-green-500 flex items-center">
                                  +1.2%
                                  <TrendingUp size={8} className="ml-0.5" />
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        {/* Column 3: 年累计 */}
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-gray-800">{(parseFloat(product.dailyAvgIncome) * 1.2).toFixed(2)}万元</div>
                          <div className="flex flex-col items-center mt-0.5">
                            <div className="flex items-center gap-0.5 scale-90">
                              <span className="text-[8px] text-gray-400 font-normal">同比:</span>
                              <span className="text-[8px] font-bold text-green-500 flex items-center">
                                +5.6%
                                <TrendingUp size={8} className="ml-0.5" />
                              </span>
                            </div>
                            <div className="flex items-center gap-0.5 scale-90">
                              <span className="text-[8px] text-gray-400 font-normal">环比:</span>
                              <span className="text-[8px] font-bold text-green-500 flex items-center">
                                +2.1%
                                <TrendingUp size={8} className="ml-0.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Discount Rate Row */}
                      <div className={`grid ${timeDimension === 'day' ? 'grid-cols-4' : 'grid-cols-3'} py-2 px-2 items-center`}>
                        <div className="text-[10px] text-gray-500 font-medium">折让率</div>
                        {/* Column 1: 当日 or 当月 */}
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-gray-800">{product.discountRate}</div>
                          {!(timeDimension === 'day') && (
                            <div className="flex flex-col items-center mt-0.5">
                              <div className="flex items-center gap-0.5 scale-90">
                                <span className="text-[8px] text-gray-400 font-normal">同比差:</span>
                                <span className={`flex items-center font-bold text-[8px] ${product.discountRateYoyDiff.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                  {product.discountRateYoyDiff}
                                  {product.discountRateYoyDiff.startsWith('+') ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                                </span>
                              </div>
                              <div className="flex items-center gap-0.5 scale-90">
                                <span className="text-[8px] text-gray-400 font-normal">环比差:</span>
                                <span className={`flex items-center font-bold text-[8px] ${product.discountRateMomDiff.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                  {product.discountRateMomDiff}
                                  {product.discountRateMomDiff.startsWith('+') ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Column 2: 月累计 (Only for Day Dimension) */}
                        {timeDimension === 'day' && (
                          <div className="text-center">
                            <div className="text-[10px] font-bold text-gray-800">12.2%</div>
                            <div className="flex flex-col items-center mt-0.5">
                              <div className="flex items-center gap-0.5 scale-90">
                                <span className="text-[8px] text-gray-400 font-normal">同比差:</span>
                                <span className="text-[8px] font-bold text-red-500 flex items-center">
                                  -0.3%
                                  <TrendingDown size={8} className="ml-0.5" />
                                </span>
                              </div>
                              <div className="flex items-center gap-0.5 scale-90">
                                <span className="text-[8px] text-gray-400 font-normal">环比差:</span>
                                <span className="text-[8px] font-bold text-red-500 flex items-center">
                                  -0.1%
                                  <TrendingDown size={8} className="ml-0.5" />
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        {/* Column 3: 年累计 */}
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-gray-800">11.8%</div>
                          <div className="flex flex-col items-center mt-0.5">
                            <div className="flex items-center gap-0.5 scale-90">
                              <span className="text-[8px] text-gray-400 font-normal">同比差:</span>
                              <span className="text-[8px] font-bold text-red-500 flex items-center">
                                -0.7%
                                <TrendingDown size={8} className="ml-0.5" />
                              </span>
                            </div>
                            <div className="flex items-center gap-0.5 scale-90">
                              <span className="text-[8px] text-gray-400 font-normal">环比差:</span>
                              <span className="text-[8px] font-bold text-red-500 flex items-center">
                                -0.3%
                                <TrendingDown size={8} className="ml-0.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {activeMetricTab === 'weight' && (
                    <div className={`grid ${timeDimension === 'day' ? 'grid-cols-4' : 'grid-cols-3'} py-2 px-2 items-center`}>
                      <div className="text-[10px] text-gray-500 font-medium">单票重量</div>
                      {/* Column 1: 当日 or 当月 */}
                      <div className="text-center">
                        <div className="text-[10px] font-bold text-gray-800">{product.perTicketWeight}kg</div>
                        {!(timeDimension === 'day') && (
                          <div className="flex flex-col items-center mt-0.5">
                            <div className="flex items-center gap-0.5 scale-90">
                              <span className="text-[8px] text-gray-400 font-normal">同比:</span>
                              <span className={`flex items-center font-bold text-[8px] ${product.perTicketWeightYoy.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                {product.perTicketWeightYoy}
                                {product.perTicketWeightYoy.startsWith('+') ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                              </span>
                            </div>
                            <div className="flex items-center gap-0.5 scale-90">
                              <span className="text-[8px] text-gray-400 font-normal">环比:</span>
                              <span className={`flex items-center font-bold text-[8px] ${product.perTicketWeightMom.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                {product.perTicketWeightMom}
                                {product.perTicketWeightMom.startsWith('+') ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      {/* Column 2: 月累计 (Only for Day Dimension) */}
                      {timeDimension === 'day' && (
                          <div className="text-center">
                            <div className="text-[10px] font-bold text-gray-800">{(parseFloat(product.perTicketWeight) * 1.01).toFixed(2)}kg</div>
                            <div className="flex flex-col items-center mt-0.5">
                              <div className="flex items-center gap-0.5 scale-90">
                                <span className="text-[8px] text-gray-400 font-normal">同比:</span>
                                <span className="text-[8px] font-bold text-green-500 flex items-center">
                                  +1.5%
                                  <TrendingUp size={8} className="ml-0.5" />
                                </span>
                              </div>
                              <div className="flex items-center gap-0.5 scale-90">
                                <span className="text-[8px] text-gray-400 font-normal">环比:</span>
                                <span className="text-[8px] font-bold text-green-500 flex items-center">
                                  +0.4%
                                  <TrendingUp size={8} className="ml-0.5" />
                                </span>
                              </div>
                            </div>
                          </div>
                      )}
                      {/* Column 3: 年累计 */}
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-gray-800">{(parseFloat(product.perTicketWeight) * 1.03).toFixed(2)}kg</div>
                          <div className="flex flex-col items-center mt-0.5">
                            <div className="flex items-center gap-0.5 scale-90">
                              <span className="text-[8px] text-gray-400 font-normal">同比:</span>
                              <span className="text-[8px] font-bold text-green-500 flex items-center">
                                +3.2%
                                <TrendingUp size={8} className="ml-0.5" />
                              </span>
                            </div>
                            <div className="flex items-center gap-0.5 scale-90">
                              <span className="text-[8px] text-gray-400 font-normal">环比:</span>
                              <span className="text-[8px] font-bold text-green-500 flex items-center">
                                +1.1%
                                <TrendingUp size={8} className="ml-0.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand Button */}
      {showExpand && (
        <div className="flex justify-center mt-2 pt-1">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
          >
            {isExpanded ? '收起' : '展开'} <ChevronDown size={12} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </motion.div>
  );
}
