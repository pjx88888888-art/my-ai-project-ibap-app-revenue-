/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, X, HelpCircle, ChevronDown, TrendingUp, TrendingDown, ArrowRightLeft, Bell, ChevronRight } from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart
} from 'recharts';

interface FlowDetailViewProps {
  onBack: () => void;
  onClose: () => void;
  onSelectFlow: (segment: string, source: 'segment' | 'flow') => void;
  type: 'cnob' | 'osob';
  activeMetric: 'income' | 'volume' | 'weight';
  setActiveMetric: (metric: 'income' | 'volume' | 'weight') => void;
}

export default function FlowDetailView({ onBack, onClose, onSelectFlow, type: initialType, activeMetric, setActiveMetric }: FlowDetailViewProps) {
  const [type, setType] = useState<'cnob' | 'osob'>(initialType);
  const [isTrendExpanded, setIsTrendExpanded] = useState(false);
  const [legendPage, setLegendPage] = useState(1);

  const trendSegments = [
    '国际快递',
    '国际电商',
    '海外仓配',
    '本地运配',
    '国际运输',
    '国际航线',
    '国际大宗'
  ];

  const segmentColors = [
    '#1b63d6', '#f59e0b', '#3b82f6', '#06b6d4', '#94a3b8', 
    '#6366f1', '#8b5cf6'
  ];

  const combinedTrendData = useMemo(() => {
    const dates = ['03-25', '03-26', '03-27', '03-28', '03-29', '03-30'];
    return dates.map(date => {
      const entry: any = { date };
      trendSegments.forEach(segment => {
        entry[segment] = Math.floor(Math.random() * 400) + 100;
      });
      return entry;
    });
  }, []);

  // Legend pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(trendSegments.length / itemsPerPage);
  const currentLegendItems = trendSegments.slice((legendPage - 1) * itemsPerPage, legendPage * itemsPerPage);

  const segments = [
    { name: '国际快递', value: '1,234.5', yoy: '5.2%', isUp: true, achievement: '98.5%', perTicket: '2.15', dailyAvg: '41.15', discount: '12.5%' },
    { name: '国际电商', value: '982.3', yoy: '3.1%', isUp: true, achievement: '95.2%', perTicket: '1.95', dailyAvg: '32.74', discount: '10.2%' },
    { name: '海外仓配', value: '876.1', yoy: '-1.2%', isUp: false, achievement: '92.1%', perTicket: '2.45', dailyAvg: '29.20', discount: '15.8%' },
    { name: '本地运配', value: '543.2', yoy: '2.4%', isUp: true, achievement: '102.4%', perTicket: '1.85', dailyAvg: '18.11', discount: '8.4%' },
    { name: '国际运输', value: '432.1', yoy: '0.0%', isUp: true, achievement: '100.0%', perTicket: '2.05', dailyAvg: '14.40', discount: '11.5%' },
    { name: '国际航线', value: '321.0', yoy: '1.5%', isUp: true, achievement: '99.0%', perTicket: '2.20', dailyAvg: '10.50', discount: '9.0%' },
    { name: '国际大宗', value: '123.4', yoy: '-2.5%', isUp: false, achievement: '88.5%', perTicket: '1.75', dailyAvg: '4.11', discount: '7.2%' },
  ];

  const getMetricLabel = () => {
    switch (activeMetric) {
      case 'income': return '收入';
      case 'volume': return '件量';
      case 'weight': return '重量';
    }
  };

  const getUnit = () => {
    switch (activeMetric) {
      case 'income': return '万元';
      case 'volume': return '万票';
      case 'weight': return '吨';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f4f7fc]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#104fb1] to-[#1c66d8] pt-12 pb-6 px-4 text-white relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">指标详情</span>
              <div className="px-2 py-0.5 border border-white/50 rounded text-xs font-bold uppercase">
                {type}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Metric Tabs */}
        <div className="flex justify-around relative">
          {['income', 'volume', 'weight'].map((m) => (
            <button
              key={m}
              onClick={() => setActiveMetric(m as any)}
              className={`pb-2 text-sm font-bold transition-all relative ${
                activeMetric === m ? 'text-white' : 'text-white/60'
              }`}
            >
              {m === 'income' ? '收入' : m === 'volume' ? '件量' : '重量'}
              {activeMetric === m && (
                <motion.div 
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" 
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        {/* Trend Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-white/50">
          <div className="px-4 py-3 flex items-center gap-2 border-b border-gray-50">
            <div className="bg-blue-50 p-1.5 rounded-lg">
              <TrendingUp size={16} className="text-[#1b63d6]" />
            </div>
            <div className="text-sm font-bold text-gray-800">趋势详情</div>
          </div>

          <div className="p-3">
            {/* Notice Bar */}
            <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-lg p-2 flex items-center gap-2 mb-3">
              <Bell size={14} className="text-[#d97706]" />
              <div className="text-[10px] text-[#92400e] flex-1">
                <span className="text-[#1b63d6] underline">具体节假日信息</span>
              </div>
            </div>

            <div className="bg-[#f8fbff] rounded-xl p-2 relative">
              <AnimatePresence>
                {isTrendExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-2"
                  >
                    {/* Custom Legend with Pagination */}
                    <div className="flex items-center justify-between mb-4 px-2">
                      <div className="flex flex-wrap gap-x-3 gap-y-1 flex-1">
                        {currentLegendItems.map((item, i) => (
                          <div key={item} className="flex items-center gap-1">
                            <div 
                              className="w-2 h-0.5 rounded-full" 
                              style={{ backgroundColor: segmentColors[trendSegments.indexOf(item)] }} 
                            />
                            <span className="text-[9px] text-gray-400">{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <button 
                          onClick={() => setLegendPage(p => Math.max(1, p - 1))}
                          disabled={legendPage === 1}
                          className="disabled:opacity-20"
                        >
                          <ChevronLeft size={14} className="text-gray-400" />
                        </button>
                        <span className="text-[9px] text-gray-400">{legendPage}/{totalPages}</span>
                        <button 
                          onClick={() => setLegendPage(p => Math.min(totalPages, p + 1))}
                          disabled={legendPage === totalPages}
                          className="disabled:opacity-20"
                        >
                          <ChevronRight size={14} className="text-gray-400" />
                        </button>
                      </div>
                    </div>

                    <div className="text-[9px] text-gray-400 mb-1 pl-2">
                      {activeMetric === 'income' ? '万元' : activeMetric === 'volume' ? '万票' : '吨'}
                    </div>

                    <div className="h-[180px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={combinedTrendData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis 
                            dataKey="date" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 9, fill: '#9ca3af' }} 
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 9, fill: '#9ca3af' }} 
                          />
                          <Tooltip 
                            contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', fontSize: '10px' }}
                          />
                          {trendSegments.map((segment, idx) => (
                            <Line
                              key={segment}
                              type="monotone"
                              dataKey={segment}
                              stroke={segmentColors[idx]}
                              strokeWidth={1.5}
                              dot={false}
                              activeDot={{ r: 4 }}
                            />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-center">
                <button 
                  onClick={() => setIsTrendExpanded(!isTrendExpanded)}
                  className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600 py-1"
                >
                  {isTrendExpanded ? '收起' : '展开'}
                  <ChevronDown size={12} className={`transition-transform ${isTrendExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Business Structure Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-white/50">
          <div className="px-4 py-3 flex items-center justify-between border-b border-gray-50">
            <div className="flex items-center gap-2">
              <div className="bg-blue-50 p-1.5 rounded-lg">
                <div className="w-4 h-4 border-2 border-[#1b63d6] rounded-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#1b63d6] rounded-full" />
                </div>
              </div>
              <div className="text-sm font-bold text-gray-800">业务结构</div>
            </div>
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5 text-[10px] font-bold">
              <button
                onClick={() => setType('cnob')}
                className={`px-3 py-1 rounded-md transition-all ${type === 'cnob' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500'}`}
              >
                CNOB
              </button>
              <button
                onClick={() => setType('osob')}
                className={`px-3 py-1 rounded-md transition-all ${type === 'osob' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500'}`}
              >
                OSOB
              </button>
            </div>
          </div>

          <div className="p-3">
            <div className="overflow-x-auto -mx-3 px-3">
            <div className={`overflow-x-auto -mx-3 px-3 ${activeMetric === 'income' ? '' : 'overflow-x-hidden'}`}>
                <table className={`w-full text-left text-xs ${activeMetric === 'income' ? 'min-w-[600px]' : ''}`}>
                  <thead>
                    <tr className="bg-[#f8f9fb]">
                      <th className={`px-3 py-2.5 text-gray-500 font-bold sticky left-0 bg-[#f8f9fb] z-20 w-24 ${activeMetric === 'income' ? 'z-20' : ''}`}>业务板块</th>
                      <th className={`px-3 py-2.5 text-gray-500 font-bold text-center ${activeMetric === 'income' ? 'sticky left-24 bg-[#f8f9fb] z-20 w-16' : ''}`}>流向</th>
                      <th className="px-3 py-2.5 text-gray-500 font-bold text-right">
                        <div className="flex items-center justify-end gap-1">
                          {getMetricLabel()}
                          <div className="flex flex-col -space-y-1 opacity-30">
                            <ChevronDown size={8} className="rotate-180" />
                            <ChevronDown size={8} />
                          </div>
                        </div>
                      </th>
                      {activeMetric === 'income' && (
                        <>
                          <th className="px-3 py-2.5 text-gray-500 font-bold text-right">单票收入</th>
                          <th className="px-3 py-2.5 text-gray-500 font-bold text-right">日均收入</th>
                          <th className="px-3 py-2.5 text-gray-500 font-bold text-right">折让率</th>
                        </>
                      )}
                      {activeMetric === 'volume' && (
                        <th className="px-3 py-2.5 text-gray-500 font-bold text-right">日均件量</th>
                      )}
                      {activeMetric === 'weight' && (
                        <th className="px-3 py-2.5 text-gray-500 font-bold text-right">单票重量</th>
                      )}
                      {type === 'osob' && activeMetric === 'income' && (
                        <th className="px-3 py-2.5 text-gray-500 font-bold text-right">达成率</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {segments.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                        <td 
                          className={`px-3 py-4 font-bold text-[#1b63d6] sticky left-0 bg-white z-10 cursor-pointer active:opacity-60 ${activeMetric === 'income' ? 'z-10' : ''}`}
                          onClick={() => onSelectFlow(row.name, 'segment')}
                        >
                          {row.name}
                        </td>
                        <td className={`px-3 py-4 text-center bg-white ${activeMetric === 'income' ? 'sticky left-24 z-10' : ''}`}>
                          <div className="flex justify-center">
                            <button 
                              onClick={() => onSelectFlow(row.name, 'flow')}
                              className="w-5 h-5 rounded-md border border-blue-200 flex items-center justify-center bg-blue-50/50 text-[#1b63d6] hover:scale-110 transition-transform"
                            >
                              <ArrowRightLeft size={12} />
                            </button>
                          </div>
                        </td>
                        <td className="px-3 py-4 text-right">
                          <div className="font-bold text-gray-800">
                            {row.value}
                            <span className="text-[10px] text-gray-400 ml-0.5">
                              {activeMetric === 'income' ? '万元' : activeMetric === 'volume' ? '万票' : '吨'}
                            </span>
                          </div>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-[10px] text-gray-400">同比:</span>
                            <span className={`text-[10px] font-bold flex items-center ${row.isUp ? 'text-green-500' : 'text-red-500'}`}>
                              {row.yoy}
                              {row.isUp ? <TrendingUp size={10} className="ml-0.5" /> : <TrendingDown size={10} className="ml-0.5" />}
                            </span>
                          </div>
                        </td>
                        {activeMetric === 'income' && (
                          <>
                            <td className="px-3 py-4 text-right font-medium text-gray-700">
                              {row.perTicket}<span className="text-[10px] text-gray-400 ml-0.5">元</span>
                            </td>
                            <td className="px-3 py-4 text-right font-medium text-gray-700">
                              {row.dailyAvg}<span className="text-[10px] text-gray-400 ml-0.5">元</span>
                            </td>
                            <td className="px-3 py-4 text-right font-medium text-gray-700">{row.discount}</td>
                          </>
                        )}
                        {activeMetric === 'volume' && (
                          <td className="px-3 py-4 text-right font-medium text-gray-700">
                            {row.dailyAvg}<span className="text-[10px] text-gray-400 ml-0.5">票</span>
                          </td>
                        )}
                        {activeMetric === 'weight' && (
                          <td className="px-3 py-4 text-right font-medium text-gray-700">
                            {row.perTicket}<span className="text-[10px] text-gray-400 ml-0.5">KG</span>
                          </td>
                        )}
                        {type === 'osob' && activeMetric === 'income' && (
                          <td className="px-3 py-4 text-right font-bold text-gray-700">{row.achievement}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
