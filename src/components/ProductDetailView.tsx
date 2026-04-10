/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, X, TrendingUp, BarChart3, Users, ChevronRight, HelpCircle, ArrowRightLeft, ChevronDown } from 'lucide-react';
import { MetricType, TimeDimension } from '../types';

interface ProductDetailViewProps {
  onBack: () => void;
  onClose: () => void;
  onSelectFlow: (product: string) => void;
  product: string;
  activeMetric: MetricType;
  setActiveMetric: (metric: MetricType) => void;
  timeDimension: TimeDimension;
}

export default function ProductDetailView({ 
  onBack, 
  onClose, 
  onSelectFlow,
  product, 
  activeMetric, 
  setActiveMetric,
  timeDimension 
}: ProductDetailViewProps) {
  const productNames = ['国际特快', '国际标快', '国际标快+', '国际特惠', '国际大件', '医药跨境', '生鲜跨境', '电子跨境', '服装跨境', '其他'];
  const [activeProduct, setActiveProduct] = useState(product);

  const metrics: { id: MetricType; name: string }[] = [
    { id: 'income', name: '收入' },
    { id: 'volume', name: '件量' },
    { id: 'weight', name: '重量' },
  ];

  const orgData = [
    { name: '深莞区', value: '1,234.56', yoy: '+12.5%', perTicket: '2.18', perTicketYoy: '+12.5%', achievement: '103%' },
    { name: '广佛区', value: '1,095.23', yoy: '+8.4%', perTicket: '2.12', perTicketYoy: '+5.2%', achievement: '98%' },
    { name: '沪苏区', value: '986.45', yoy: '+10.2%', perTicket: '2.15', perTicketYoy: '+7.8%', achievement: '101%' },
    { name: '京津区', value: '876.12', yoy: '+5.6%', perTicket: '2.08', perTicketYoy: '+3.4%', achievement: '95%' },
    { name: '浙皖区', value: '765.89', yoy: '+7.2%', perTicket: '2.10', perTicketYoy: '+4.1%', achievement: '99%' },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#f4f7fc]">
      {/* Header */}
      <div className="bg-[#1b63d6] text-white pt-10 pb-4 px-4 relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <ChevronLeft size={20} />
            </button>
            <span className="text-lg font-bold">指标详情</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">本部</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="opacity-80">...</button>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Level 1 Tabs: Product Names */}
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4 mb-4">
          <div className="flex items-center gap-8 min-w-max">
            {productNames.map((name) => (
              <button
                key={name}
                onClick={() => setActiveProduct(name)}
                className={`pb-2 text-sm font-medium transition-all relative whitespace-nowrap ${
                  activeProduct === name ? 'text-white font-bold' : 'text-white/60'
                }`}
              >
                {name}
                {activeProduct === name && (
                  <motion.div 
                    layoutId="productDetailUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Level 2 Tabs: Metric Types */}
        <div className="flex items-center justify-around bg-white/10 rounded-xl p-1">
          {metrics.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMetric(m.id)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                activeMetric === m.id ? 'bg-white text-[#1b63d6] shadow-md' : 'text-white/60'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-10">
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
              <HelpCircle size={14} className="text-orange-400" />
              <span className="text-[10px] text-orange-600">当地公告日全网休息 具体节日假日信息</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-gray-800">3月29日</div>
              <div className="space-y-2 text-right">
                <div className="flex items-center justify-end gap-4">
                  <span className="text-[10px] text-gray-400">收入</span>
                  <span className="text-sm font-black text-gray-800">1,234 万元</span>
                </div>
                <div className="flex items-center justify-end gap-4">
                  <span className="text-[10px] text-gray-400">单票收入</span>
                  <span className="text-sm font-black text-gray-800">2.18 元</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-4">
              <button className="text-[10px] text-gray-400 flex items-center gap-1">
                展开 <ChevronDown size={12} />
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

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-[10px] text-gray-400 border-b border-gray-50">
                  <th className="text-left py-2 font-medium">组织</th>
                  <th className="text-left py-2 font-medium">流向</th>
                  <th className="text-right py-2 font-medium">收入</th>
                  <th className="text-right py-2 font-medium">单票收入</th>
                  <th className="text-right py-2 font-medium">收入达成</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orgData.map((item, idx) => (
                  <tr key={idx} className="text-[10px]">
                    <td className="py-3 font-bold text-[#1b63d6]">{item.name}</td>
                    <td className="py-3">
                      <button 
                        onClick={() => onSelectFlow(activeProduct)}
                        className="p-1 bg-blue-50 text-[#1b63d6] rounded hover:bg-blue-100 transition-colors"
                      >
                        <ArrowRightLeft size={12} />
                      </button>
                    </td>
                    <td className="py-3 text-right">
                      <div className="font-bold text-gray-800">{item.value}</div>
                      <div className="text-green-500 font-bold scale-90 origin-right">同比 {item.yoy}</div>
                    </td>
                    <td className="py-3 text-right">
                      <div className="font-bold text-gray-800">{item.perTicket}</div>
                      <div className="text-green-500 font-bold scale-90 origin-right">同比 {item.perTicketYoy}</div>
                    </td>
                    <td className="py-3 text-right font-bold text-gray-800">{item.achievement}</td>
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
