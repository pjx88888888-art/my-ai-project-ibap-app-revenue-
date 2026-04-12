/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, X, MoreHorizontal, TrendingUp, TrendingDown, Bell, ChevronDown, ChevronRight } from 'lucide-react';
import { MetricType, TimeDimension } from '../types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface SubDetailViewProps {
  onBack: () => void;
  onClose: () => void;
  onSelectSegment: (segment: string) => void;
  region: string;
  activeMetric: MetricType;
  setActiveMetric: (metric: MetricType) => void;
  timeDimension: TimeDimension;
  detailSource?: 'overview' | 'business' | 'key-metrics';
}

export default function SubDetailView({ 
  onBack, 
  onClose, 
  onSelectSegment, 
  region, 
  activeMetric, 
  setActiveMetric, 
  timeDimension,
  detailSource = 'overview'
}: SubDetailViewProps) {
  const [isTrendExpanded, setIsTrendExpanded] = useState(false);
  const [legendPage, setLegendPage] = useState(1);
  const [activePeriod, setActivePeriod] = useState<'daily' | 'monthly' | 'yearly'>('daily');

  useEffect(() => {
    if (timeDimension === 'month') {
      setActivePeriod('monthly');
    } else {
      setActivePeriod('daily');
    }
  }, [timeDimension]);

  const tabs = [
    { id: 'income', label: '收入' },
    { id: 'volume', label: '件量' },
    { id: 'weight', label: '重量' },
  ] as { id: MetricType; label: string }[];

  const metricLabels: Record<MetricType, string> = {
    income: '收入',
    volume: '件量',
    weight: '重量',
  };

  const segments = [
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

  // Combined trend data for multi-line chart
  const combinedTrendData = useMemo(() => {
    const dates = ['03-25', '03-26', '03-27', '03-28', '03-29', '03-30'];
    return dates.map(date => {
      const entry: any = { date };
      segments.forEach(segment => {
        entry[segment] = Math.floor(Math.random() * 400) + 100;
      });
      return entry;
    });
  }, []);

  // Mock data for the secondary detail table
  const subData = useMemo(() => {
    const data: Record<MetricType, any[]> = {
      income: segments.map(segment => ({
        segment,
        value: (Math.random() * 500 + 100).toFixed(2),
        perTicket: (Math.random() * 2 + 1).toFixed(2),
        dailyAvg: (Math.random() * 20 + 5).toFixed(2),
        discount: (Math.random() * 15).toFixed(1) + '%',
        isUp: Math.random() > 0.3
      })),
      volume: segments.map(segment => ({
        segment,
        value: (Math.random() * 300 + 50).toFixed(2),
        dailyAvg: (Math.random() * 10 + 2).toFixed(2),
        isUp: Math.random() > 0.3
      })),
      weight: segments.map(segment => ({
        segment,
        value: (Math.random() * 200 + 30).toFixed(2),
        perTicket: (Math.random() * 1 + 0.2).toFixed(2),
        isUp: Math.random() > 0.3
      })),
    };
    return data;
  }, []);

  const currentSubData = subData[activeMetric];

  // Legend pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(segments.length / itemsPerPage);
  const currentLegendItems = segments.slice((legendPage - 1) * itemsPerPage, legendPage * itemsPerPage);

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
              {region}
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

        {/* Tabs */}
        <div className="flex">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveMetric(tab.id)}
              className={`flex-1 text-center py-3 text-base transition-all relative cursor-pointer ${
                activeMetric === tab.id ? 'text-white font-bold' : 'text-white/70 font-medium'
              }`}
            >
              {tab.label}
              {activeMetric === tab.id && (
                <motion.div
                  layoutId="subModalTabUnderline"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Trend Details Section */}
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
                              style={{ backgroundColor: segmentColors[segments.indexOf(item)] }} 
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
                          {segments.map((segment, idx) => (
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
            <div className="relative z-50">
              <button
                onClick={() => {
                  if (timeDimension === 'day') {
                    setActivePeriod(activePeriod === 'daily' ? 'monthly' : activePeriod === 'monthly' ? 'yearly' : 'daily');
                  } else {
                    setActivePeriod(activePeriod === 'monthly' ? 'yearly' : 'monthly');
                  }
                }}
                className="flex items-center gap-1 bg-blue-50 text-[#1b63d6] px-2 py-1 rounded-md text-[10px] font-bold"
              >
                {timeDimension === 'day' ? (
                  activePeriod === 'daily' ? '日-当日' : activePeriod === 'monthly' ? '日-月累计' : '日-年累计'
                ) : (
                  activePeriod === 'monthly' ? '月-当月' : '月-年累计'
                )}
                <span className="text-[8px]">⇅</span>
              </button>
            </div>
          </div>

          <div className="p-3">
            <div className="overflow-x-auto -mx-3 px-3">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#f8f9fb]">
                    <th className="px-3 py-2.5 text-gray-500 font-bold sticky left-0 bg-[#f8f9fb] z-10 w-24">业务板块</th>
                    <th className="px-3 py-2.5 text-gray-500 font-bold text-right">
                      <div className="flex items-center justify-end gap-1">
                        {metricLabels[activeMetric]}
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {currentSubData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                      <td 
                        className="px-3 py-4 font-bold text-[#1b63d6] sticky left-0 bg-white z-10 cursor-pointer active:opacity-60"
                        onClick={() => onSelectSegment(row.segment)}
                      >
                        {row.segment}
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
                            5.2%
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
