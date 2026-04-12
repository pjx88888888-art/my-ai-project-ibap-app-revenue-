/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, X, TrendingUp, BarChart3, Users, ChevronRight, HelpCircle, ArrowRightLeft, ChevronDown, TrendingDown, Bell } from 'lucide-react';
import { MetricType, TimeDimension } from '../types';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface ProductDetailViewProps {
  onBack: () => void;
  onClose: () => void;
  onSelectFlow: (product: string) => void;
  segment: string;
  activeMetric: MetricType;
  setActiveMetric: (metric: MetricType) => void;
  timeDimension: TimeDimension;
}

export default function ProductDetailView({ 
  onBack, 
  onClose, 
  onSelectFlow,
  segment, 
  activeMetric, 
  setActiveMetric,
  timeDimension 
}: ProductDetailViewProps) {
  const productNames = ['国际特快', '国际标快', '国际标快+', '国际特惠', '国际大件', '国际集运', '医药跨境', '其他'];
  const [activeProduct, setActiveProduct] = useState(productNames[0]);
  const [isTrendExpanded, setIsTrendExpanded] = useState(false);

  const metrics: { id: MetricType; name: string }[] = [
    { id: 'income', name: '收入' },
    { id: 'volume', name: '件量' },
    { id: 'weight', name: '重量' },
  ];

  const orgData = useMemo(() => [
    { name: '深莞区', income: '1,234.56', volume: '23.40', weight: '123.50', perTicketIncome: '82.45', dailyAvgIncome: '15.23', discountRate: '12.5%', dailyAvgVolume: '1.20', perTicketWeight: '5.28', yoy: '+12.5%', achievement: '103%' },
    { name: '广佛区', income: '1,095.23', volume: '18.90', weight: '98.40', perTicketIncome: '79.32', dailyAvgIncome: '12.97', discountRate: '11.8%', dailyAvgVolume: '0.90', perTicketWeight: '5.21', yoy: '+8.4%', achievement: '98%' },
    { name: '沪苏区', income: '986.45', volume: '12.40', weight: '65.20', perTicketIncome: '85.67', dailyAvgIncome: '8.19', discountRate: '13.2%', dailyAvgVolume: '0.60', perTicketWeight: '5.26', yoy: '+10.2%', achievement: '101%' },
    { name: '京津区', income: '876.12', volume: '34.50', weight: '156.70', perTicketIncome: '54.87', dailyAvgIncome: '6.31', discountRate: '10.5%', dailyAvgVolume: '1.50', perTicketWeight: '4.54', yoy: '+5.6%', achievement: '95%' },
    { name: '浙皖区', income: '765.89', volume: '21.20', weight: '112.30', perTicketIncome: '72.15', dailyAvgIncome: '10.45', discountRate: '11.2%', dailyAvgVolume: '1.10', perTicketWeight: '5.30', yoy: '+7.2%', achievement: '99%' },
  ], []);

  const trendData = useMemo(() => {
    const dates = ['3-24', '3-25', '3-26', '3-27', '3-28', '3-29'];
    return dates.map(date => ({
      date,
      value: Math.floor(Math.random() * 200) + 1000,
      secondary: (Math.random() * 0.1 + 2.1).toFixed(3)
    }));
  }, []);

  const getMetricLabel = (id: MetricType) => {
    if (id === 'income') return '收入';
    if (id === 'volume') return '件量';
    return '重量';
  };

  const getMetricUnit = (id: MetricType) => {
    if (id === 'income') return '万元';
    if (id === 'volume') return '万票';
    return '吨';
  };

  const getSecondaryMetricLabel = (id: MetricType) => {
    if (id === 'income') return '单票收入';
    if (id === 'volume') return '日均件量';
    return '单票重量';
  };

  const getSecondaryMetricUnit = (id: MetricType) => {
    if (id === 'income') return '元';
    if (id === 'volume') return '万票';
    return 'kg';
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-100 shadow-lg rounded-lg">
          <p className="text-[10px] font-bold text-gray-800 mb-1">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <p key={index} className="text-[9px] font-bold" style={{ color: entry.color }}>
                {entry.name} : {entry.value}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-screen bg-[#f4f7fc] no-scrollbar overflow-hidden">
      {/* Header */}
      <div className="bg-[#1b63d6] text-white pt-10 pb-4 px-4 relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <ChevronLeft size={20} />
            </button>
            <span className="text-lg font-bold">{segment}指标详情</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">本部</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="opacity-80">...</button>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Level 1 Tabs: Product Names - High Priority */}
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4 mb-5">
          <div className="flex items-center gap-8 min-w-max">
            {productNames.map((name) => (
              <button
                key={name}
                onClick={() => setActiveProduct(name)}
                className={`pb-2 text-base transition-all relative whitespace-nowrap ${
                  activeProduct === name ? 'text-white font-black scale-105' : 'text-white/60 font-medium'
                }`}
              >
                {name}
                {activeProduct === name && (
                  <motion.div 
                    layoutId="productDetailUnderline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Level 2 Tabs: Metric Types - Left Aligned Small Buttons */}
        <div className="flex items-center gap-2">
          {metrics.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMetric(m.id)}
              className={`px-4 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                activeMetric === m.id 
                  ? 'bg-white text-[#1b63d6] shadow-sm' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 pb-10">
        {/* Trend Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-50 p-1 rounded-lg">
                <TrendingUp size={16} className="text-[#1b63d6]" />
              </div>
              <span className="text-sm font-bold text-gray-800">趋势详情</span>
            </div>
          </div>
          
          <div className="bg-blue-50/30 rounded-xl p-4 border border-blue-50/50">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={14} className="text-orange-400" />
              <div className="text-[10px] text-orange-600">
                当地公告日全网休息 <span className="text-blue-500 underline ml-1">具体节日假日信息</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 mb-4">
              <div className="text-sm font-bold text-gray-800 pr-4 border-r border-gray-200">3月29日</div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">{getMetricLabel(activeMetric)}</span>
                  <span className="text-sm font-black text-gray-800">1,234 {getMetricUnit(activeMetric)}</span>
                </div>
                {activeMetric === 'income' && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">{getSecondaryMetricLabel(activeMetric)}</span>
                    <span className="text-sm font-black text-gray-800">2.18 {getSecondaryMetricUnit(activeMetric)}</span>
                  </div>
                )}
              </div>
            </div>

            <AnimatePresence>
              {isTrendExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-gray-100 pt-4 mt-2">
                    {/* Legend */}
                    <div className="flex items-center justify-end gap-4 mb-4">
                      {activeMetric === 'income' && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-orange-400" />
                          <span className="text-[9px] text-orange-400 font-bold">{getSecondaryMetricLabel(activeMetric)}({getSecondaryMetricUnit(activeMetric)})</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#1b63d6]" />
                        <span className="text-[9px] text-[#1b63d6] font-bold">{getMetricLabel(activeMetric)}({getMetricUnit(activeMetric)})</span>
                      </div>
                    </div>

                    <div className="h-[180px] w-full relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={trendData} margin={{ top: 5, right: -15, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis 
                            dataKey="date" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 9, fill: '#9ca3af' }} 
                          />
                          <YAxis 
                            yAxisId="left"
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 9, fill: '#9ca3af' }} 
                          />
                          {activeMetric === 'income' && (
                            <YAxis 
                              yAxisId="right"
                              orientation="right"
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fontSize: 9, fill: '#9ca3af' }} 
                              domain={['auto', 'auto']}
                            />
                          )}
                          <Tooltip content={<CustomTooltip />} />
                          <Bar
                            yAxisId="left"
                            dataKey="value"
                            name={`${getMetricLabel(activeMetric)}(${getMetricUnit(activeMetric)})`}
                            fill="#1b63d6"
                            barSize={24}
                            radius={[4, 4, 0, 0]}
                          />
                          {activeMetric === 'income' && (
                            <Line
                              yAxisId="right"
                              type="monotone"
                              dataKey="secondary"
                              name={`${getSecondaryMetricLabel(activeMetric)}(${getSecondaryMetricUnit(activeMetric)})`}
                              stroke="#f59e0b"
                              strokeWidth={2}
                              dot={{ r: 3, fill: '#f59e0b', strokeWidth: 0 }}
                              activeDot={{ r: 5 }}
                            />
                          )}
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex justify-center mt-4">
              <button 
                onClick={() => setIsTrendExpanded(!isTrendExpanded)}
                className="text-[10px] text-gray-400 flex items-center gap-1"
              >
                {isTrendExpanded ? '收起' : '展开'} <ChevronDown size={12} className={`transition-transform ${isTrendExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Organization Details Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-50 p-1 rounded-lg">
                <Users size={16} className="text-[#1b63d6]" />
              </div>
              <span className="text-sm font-bold text-gray-800">组织详情</span>
            </div>
          </div>

          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
            <button className="bg-[#1b63d6] text-white text-[10px] px-3 py-1.5 rounded-lg font-bold whitespace-nowrap">国内-销售口径</button>
            <button className="bg-gray-100 text-gray-500 text-[10px] px-3 py-1.5 rounded-lg font-bold whitespace-nowrap">国内-始发口径</button>
            <button className="bg-gray-100 text-gray-500 text-[10px] px-3 py-1.5 rounded-lg font-bold whitespace-nowrap">海外-始发口径</button>
          </div>

          <div className="bg-gray-50 rounded-xl p-1 flex mb-4">
            <button className="flex-1 py-1.5 text-[10px] font-bold rounded-lg bg-white shadow-sm text-gray-800">全网</button>
            <button className="flex-1 py-1.5 text-[10px] font-bold rounded-lg text-gray-400">小组</button>
            <button className="flex-1 py-1.5 text-[10px] font-bold rounded-lg text-gray-400">大区</button>
          </div>

          <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="text-[10px] text-gray-400 border-b border-gray-50">
                  <th className="text-left py-2 font-medium sticky left-0 bg-white z-10 w-16">组织</th>
                  <th className="text-left py-2 font-medium w-12">流向</th>
                  {activeMetric === 'income' ? (
                    <>
                      <th className="text-right py-2 font-medium">收入</th>
                      <th className="text-right py-2 font-medium">单票收入</th>
                      <th className="text-right py-2 font-medium">日均收入</th>
                      <th className="text-right py-2 font-medium">折让率</th>
                    </>
                  ) : activeMetric === 'volume' ? (
                    <>
                      <th className="text-right py-2 font-medium">件量</th>
                      <th className="text-right py-2 font-medium">日均件量</th>
                    </>
                  ) : (
                    <>
                      <th className="text-right py-2 font-medium">重量</th>
                      <th className="text-right py-2 font-medium">单票重量</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orgData.map((item, idx) => (
                  <tr key={idx} className="text-[10px]">
                    <td className="py-3 font-bold text-[#333333] sticky left-0 bg-white z-10">{item.name}</td>
                    <td className="py-3">
                      <button 
                        onClick={() => onSelectFlow(activeProduct)}
                        className="p-1 bg-blue-50 text-[#1b63d6] rounded hover:bg-blue-100 transition-colors"
                      >
                        <ArrowRightLeft size={12} />
                      </button>
                    </td>
                    {activeMetric === 'income' ? (
                      <>
                        <td className="py-3 text-right">
                          <div className="font-bold text-gray-800">{item.income}</div>
                          <div className="text-green-500 font-bold scale-90 origin-right">同比 {item.yoy}</div>
                        </td>
                        <td className="py-3 text-right font-bold text-gray-800">{item.perTicketIncome}</td>
                        <td className="py-3 text-right font-bold text-gray-800">{item.dailyAvgIncome}</td>
                        <td className="py-3 text-right font-bold text-gray-800">{item.discountRate}</td>
                      </>
                    ) : activeMetric === 'volume' ? (
                      <>
                        <td className="py-3 text-right">
                          <div className="font-bold text-gray-800">{item.volume}</div>
                          <div className="text-green-500 font-bold scale-90 origin-right">同比 {item.yoy}</div>
                        </td>
                        <td className="py-3 text-right font-bold text-gray-800">{item.dailyAvgVolume}</td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 text-right">
                          <div className="font-bold text-gray-800">{item.weight}</div>
                          <div className="text-green-500 font-bold scale-90 origin-right">同比 {item.yoy}</div>
                        </td>
                        <td className="py-3 text-right font-bold text-gray-800">{item.perTicketWeight}</td>
                      </>
                    )}
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
