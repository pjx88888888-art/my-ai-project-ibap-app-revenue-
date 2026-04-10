/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronDown, TrendingUp, TrendingDown, MoreHorizontal, Bell } from 'lucide-react';
import { MetricType, TimeDimension } from '../types';
import { useState, useEffect } from 'react';
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
  Cell
} from 'recharts';

interface DetailModalProps {
  onClose: () => void;
  activeMetric: MetricType;
  setActiveMetric: (metric: MetricType) => void;
  onSelectRegion: (region: string) => void;
  timeDimension: TimeDimension;
}

export default function DetailModal({ onClose, activeMetric, setActiveMetric, onSelectRegion, timeDimension }: DetailModalProps) {
  const [isTrendExpanded, setIsTrendExpanded] = useState(false);
  const [activePeriod, setActivePeriod] = useState<'daily' | 'monthly' | 'yearly'>('daily');
  const [activeFilter, setActiveFilter] = useState('domestic-sales');
  const [activeSubFilter, setActiveSubFilter] = useState('all');

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

  const trendData: Record<MetricType, any[]> = {
    income: [
      { date: '3-24', value: 1120, perTicket: 2.12 },
      { date: '3-25', value: 1150, perTicket: 2.15 },
      { date: '3-26', value: 1180, perTicket: 2.16 },
      { date: '3-27', value: 1210, perTicket: 2.17 },
      { date: '3-28', value: 1190, perTicket: 2.14 },
      { date: '3-29', value: 1234, perTicket: 2.18 },
    ],
    volume: [
      { date: '3-24', value: 520 },
      { date: '3-25', value: 540 },
      { date: '3-26', value: 555 },
      { date: '3-27', value: 570 },
      { date: '3-28', value: 560 },
      { date: '3-29', value: 567 },
    ],
    weight: [
      { date: '3-24', value: 210 },
      { date: '3-25', value: 220 },
      { date: '3-26', value: 228 },
      { date: '3-27', value: 235 },
      { date: '3-28', value: 230 },
      { date: '3-29', value: 234 },
    ],
  };

  const orgData: Record<MetricType, any[]> = {
    income: [
      { region: '深莞区', status: 'green', value: '1,234.56', perTicket: '2.18', rate: '103.5%', yoy: '12.5%', isUp: true },
      { region: '广佛区', status: 'yellow', value: '1,095.23', perTicket: '2.12', rate: '98.3%', yoy: '8.9%', isUp: true },
      { region: '福建区', status: 'red', value: '1,156.78', perTicket: '2.15', rate: '101.2%', yoy: '10.5%', isUp: true },
      { region: '苏南区', status: 'green', value: '985.34', perTicket: '2.08', rate: '97.5%', yoy: '6.2%', isUp: true },
      { region: '上海区', status: 'yellow', value: '852.12', perTicket: '2.25', rate: '105.7%', yoy: '2.1%', isUp: false },
    ],
    volume: [
      { region: '深莞区', status: 'green', value: '567.89', rate: '102.1%', yoy: '8.3%', isUp: true },
      { region: '广佛区', status: 'yellow', value: '489.23', rate: '99.5%', yoy: '2.1%', isUp: false },
      { region: '福建区', status: 'red', value: '456.78', rate: '101.8%', yoy: '5.2%', isUp: true },
    ],
    weight: [
      { region: '深莞区', status: 'green', value: '234.56', rate: '105.3%', yoy: '12.1%', isUp: true },
      { region: '广佛区', status: 'yellow', value: '195.67', rate: '101.2%', yoy: '3.8%', isUp: true },
      { region: '福建区', status: 'red', value: '178.90', rate: '98.5%', yoy: '1.2%', isUp: false },
    ],
  };

  const currentOrgData = orgData[activeMetric];
  const currentTrendData = trendData[activeMetric];
  const latestTrend = currentTrendData[currentTrendData.length - 1];

  return (
    <div className="max-w-[450px] mx-auto bg-[#f4f7fc] min-h-screen overflow-hidden flex flex-col">
      {/* Header with Blue Gradient Background */}
            <div className="bg-gradient-to-b from-[#1b63d6] to-[#3b82f6] pt-4 pb-2 px-4 relative">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <button onClick={onClose} className="text-white p-1">
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
                        layoutId="modalTabUnderline"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              
              {/* Trend Details Section */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-white/50">
                <div className="px-4 py-3 flex items-center justify-between border-b border-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-50 p-1.5 rounded-lg">
                      <TrendingUp size={16} className="text-[#1b63d6]" />
                    </div>
                    <div className="text-sm font-bold text-gray-800">趋势详情</div>
                  </div>
                </div>

                <div className="p-3">
                  {/* Notice Bar */}
                  <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-lg p-2 flex items-center gap-2 mb-3">
                    <Bell size={14} className="text-[#d97706]" />
                    <div className="text-[10px] text-[#92400e] flex-1">
                      当地公息日全国休息 <span className="text-[#1b63d6] underline">具体节假日信息</span>
                    </div>
                  </div>

                  {/* Trend Card */}
                  <div className="bg-[#f8fbff] rounded-xl p-4 relative">
                    <div className="flex items-center">
                      <div className="w-20 border-r border-gray-200 pr-3">
                        <div className="text-sm font-bold text-gray-800">{latestTrend.date.replace('-', '月')}日</div>
                      </div>
                      <div className="flex-1 pl-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">{activeMetric === 'income' ? '业务' : activeMetric === 'volume' ? '件量' : '重量'}</span>
                          <span className="text-sm font-bold text-gray-800">
                            {latestTrend.value.toLocaleString()} {activeMetric === 'income' ? '万元' : activeMetric === 'volume' ? '万票' : '吨'}
                          </span>
                        </div>
                        {activeMetric === 'income' && (
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">单票业务</span>
                            <span className="text-sm font-bold text-gray-800">{latestTrend.perTicket} 元</span>
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
                          className="overflow-hidden mt-3 pt-3 border-t border-gray-100"
                        >
                          <div className="h-[200px] w-full mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                              {activeMetric === 'income' ? (
                                <ComposedChart data={currentTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                  <XAxis 
                                    dataKey="date" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 10, fill: '#9ca3af' }} 
                                  />
                                  <YAxis 
                                    yAxisId="left" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 10, fill: '#9ca3af' }} 
                                  />
                                  <YAxis 
                                    yAxisId="right" 
                                    orientation="right" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 10, fill: '#9ca3af' }} 
                                    domain={[2, 2.3]}
                                  />
                                  <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                                  />
                                  <Legend 
                                    verticalAlign="top" 
                                    align="right" 
                                    iconType="circle" 
                                    iconSize={8} 
                                    wrapperStyle={{ fontSize: '10px', paddingBottom: '10px' }}
                                  />
                                  <Bar 
                                    yAxisId="left" 
                                    dataKey="value" 
                                    name="业务(万元)" 
                                    fill="#1b63d6" 
                                    radius={[4, 4, 0, 0]} 
                                    barSize={20} 
                                  />
                                  <Line 
                                    yAxisId="right" 
                                    type="monotone" 
                                    dataKey="perTicket" 
                                    name="单票业务(元)" 
                                    stroke="#f59e0b" 
                                    strokeWidth={2} 
                                    dot={{ r: 3, fill: '#f59e0b' }} 
                                    activeDot={{ r: 5 }} 
                                  />
                                </ComposedChart>
                              ) : (
                                <BarChart data={currentTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                  <XAxis 
                                    dataKey="date" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 10, fill: '#9ca3af' }} 
                                  />
                                  <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 10, fill: '#9ca3af' }} 
                                  />
                                  <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                                  />
                                  <Legend 
                                    verticalAlign="top" 
                                    align="right" 
                                    iconType="circle" 
                                    iconSize={8} 
                                    wrapperStyle={{ fontSize: '10px', paddingBottom: '10px' }}
                                  />
                                  <Bar 
                                    dataKey="value" 
                                    name={activeMetric === 'volume' ? '件量(万票)' : '重量(吨)'} 
                                    fill="#1b63d6" 
                                    radius={[4, 4, 0, 0]} 
                                    barSize={24} 
                                  />
                                </BarChart>
                              )}
                            </ResponsiveContainer>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button 
                      onClick={() => setIsTrendExpanded(!isTrendExpanded)}
                      className="w-full mt-2 pt-2 flex justify-center items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600"
                    >
                      {isTrendExpanded ? '收起' : '展开'}
                      <ChevronDown size={12} className={`transition-transform ${isTrendExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Organization Details Section */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-white/50">
                <div className="px-4 py-3 flex items-center justify-between border-b border-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-50 p-1.5 rounded-lg">
                      <div className="w-4 h-4 border-2 border-[#1b63d6] rounded-sm flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#1b63d6] rounded-full" />
                      </div>
                    </div>
                    <div className="text-sm font-bold text-gray-800">组织详情</div>
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

                <div className="p-3 space-y-3">
                  {/* Filters */}
                  <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {[
                      { id: 'domestic-sales', label: '国内-销售口径' },
                      { id: 'domestic-origin', label: '国内-始发口径' },
                      { id: 'overseas-origin', label: '海外-始发口径' },
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setActiveFilter(f.id)}
                        className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                          activeFilter === f.id ? 'bg-[#1b63d6] text-white' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {/* Sub Filters */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    {['全网', '小组', '大区'].map((f, i) => {
                      const id = ['all', 'group', 'region'][i];
                      return (
                        <button
                          key={id}
                          onClick={() => setActiveSubFilter(id)}
                          className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
                            activeSubFilter === id ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400'
                          }`}
                        >
                          {f}
                        </button>
                      );
                    })}
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto -mx-3 px-3">
                    <table className="w-full text-left text-xs min-w-[450px]">
                      <thead>
                        <tr className="bg-[#f8f9fb]">
                          <th className="px-3 py-2.5 text-gray-500 font-bold sticky left-0 bg-[#f8f9fb] z-10 w-24">组织</th>
                          <th className="px-3 py-2.5 text-gray-500 font-bold text-right">
                            <div className="flex items-center justify-end gap-1">
                              {activeMetric === 'income' ? '业务' : activeMetric === 'volume' ? '件量' : '重量'}
                              <div className="flex flex-col -space-y-1 opacity-30">
                                <ChevronDown size={8} className="rotate-180" />
                                <ChevronDown size={8} />
                              </div>
                            </div>
                          </th>
                          {activeMetric === 'income' && (
                            <>
                              <th className="px-3 py-2.5 text-gray-500 font-bold text-right">
                                <div className="flex items-center justify-end gap-1">
                                  单票业务
                                  <div className="flex flex-col -space-y-1 opacity-30">
                                    <ChevronDown size={8} className="rotate-180" />
                                    <ChevronDown size={8} />
                                  </div>
                                </div>
                              </th>
                              <th className="px-3 py-2.5 text-gray-500 font-bold text-right">
                                <div className="flex items-center justify-end gap-1">
                                  业务达成率
                                  <div className="flex flex-col -space-y-1 opacity-30">
                                    <ChevronDown size={8} className="rotate-180" />
                                    <ChevronDown size={8} />
                                  </div>
                                </div>
                              </th>
                            </>
                          )}
                          {activeMetric !== 'income' && (
                            <th className="px-3 py-2.5 text-gray-500 font-bold text-right">
                              <div className="flex items-center justify-end gap-1">
                                达成率
                                <div className="flex flex-col -space-y-1 opacity-30">
                                  <ChevronDown size={8} className="rotate-180" />
                                  <ChevronDown size={8} />
                                </div>
                              </div>
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {currentOrgData.map((row, idx) => (
                          <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                            <td 
                              className="px-3 py-4 font-bold text-[#1b63d6] sticky left-0 bg-white z-10 cursor-pointer hover:underline"
                              onClick={() => onSelectRegion(row.region)}
                            >
                              <div className="flex items-center gap-2">
                                {row.region}
                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                  row.status === 'green' ? 'bg-green-500' : 
                                  row.status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                                }`} />
                              </div>
                            </td>
                            <td className="px-3 py-4 text-right">
                              <div className="font-bold text-gray-800">{row.value}</div>
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
                                <td className="px-3 py-4 text-right">
                                  <div className="font-bold text-gray-800">{row.perTicket}</div>
                                  <div className="flex items-center justify-end gap-1 mt-1">
                                    <span className="text-[10px] text-gray-400">同比:</span>
                                    <span className={`text-[10px] font-bold flex items-center ${row.isUp ? 'text-green-500' : 'text-red-500'}`}>
                                      {row.yoy}
                                      {row.isUp ? <TrendingUp size={10} className="ml-0.5" /> : <TrendingDown size={10} className="ml-0.5" />}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-3 py-4 text-right">
                                  <div className="font-bold text-gray-800">{row.rate}</div>
                                </td>
                              </>
                            )}
                            {activeMetric !== 'income' && (
                              <td className="px-3 py-4 text-right">
                                <div className="font-bold text-gray-800">{row.rate}</div>
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
