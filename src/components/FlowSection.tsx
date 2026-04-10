/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, HelpCircle, ChevronRight, ChevronDown, CircleDollarSign, Package, Target, Trophy, ArrowRightLeft, MoveRight } from 'lucide-react';

interface FlowCardProps {
  title: string;
  icon: React.ReactNode;
  unit: string;
  daily: { value: string; yoy: string; isUp: boolean };
  monthly: { value: string; yoy: string; isUp: boolean };
  yearly: { value: string; yoy: string; isUp: boolean };
  onOpenDetail?: () => void;
}

function FlowCard({ title, icon, unit, daily, monthly, yearly, onOpenDetail }: FlowCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-white/50 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-50 p-1.5 rounded-lg text-[#1b63d6]">
            {icon}
          </div>
          <span className="text-sm font-bold text-gray-800">{title}</span>
          <HelpCircle size={14} className="text-gray-300" />
        </div>
        <button 
          onClick={onOpenDetail}
          className="flex items-center text-[10px] text-gray-400 hover:text-[#1b63d6] transition-colors"
        >
          详情 <ChevronRight size={12} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* Daily */}
        <div className="bg-[#f8fbff] rounded-xl p-3">
          <div className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
            <span className="font-bold text-gray-600">当日</span>
            <span className="opacity-60">3月30日</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-gray-800 tracking-tight">{daily.value}</span>
            <span className="text-[10px] text-gray-400 font-medium">{unit}</span>
            <div className={`flex items-center text-[10px] font-bold ml-auto ${daily.isUp ? 'text-green-500' : 'text-red-500'}`}>
              同比:{daily.yoy}
              {daily.isUp ? <TrendingUp size={10} className="ml-0.5" /> : <TrendingDown size={10} className="ml-0.5" />}
            </div>
          </div>
        </div>

        {/* Monthly & Yearly */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#f8fbff] rounded-xl p-3">
            <div className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
              <span className="font-bold text-gray-600">月累计</span>
              <span className="opacity-60 text-[8px]">3月1-30日</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-gray-800">{monthly.value}</span>
              <span className="text-[8px] text-gray-400">{unit}</span>
            </div>
            <div className={`flex items-center text-[9px] font-bold mt-1 ${monthly.isUp ? 'text-green-500' : 'text-red-500'}`}>
              同比:{monthly.yoy}
              {monthly.isUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
            </div>
          </div>
          <div className="bg-[#f8fbff] rounded-xl p-3">
            <div className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
              <span className="font-bold text-gray-600">年累计</span>
              <span className="opacity-60 text-[8px]">1-3月30日</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-gray-800">{yearly.value}</span>
              <span className="text-[8px] text-gray-400">{unit}</span>
            </div>
            <div className={`flex items-center text-[9px] font-bold mt-1 ${yearly.isUp ? 'text-green-500' : 'text-red-500'}`}>
              同比:{yearly.yoy}
              {yearly.isUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-3">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
        >
          展开 <ChevronDown size={12} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
}


export default function FlowSection({ onOpenDetail }: { onOpenDetail: (type: 'cnob' | 'osob', metric: 'income' | 'volume' | 'weight') => void }) {
  const [flowType, setFlowType] = useState<'cnob' | 'osob'>('cnob');

  const flowData = {
    income: {
      title: '流向收入',
      icon: <CircleDollarSign size={16} />,
      unit: '万元',
      daily: { value: '892.45', yoy: '+5.2%', isUp: true },
      monthly: { value: '2.45', yoy: '+3.1%', isUp: true },
      yearly: { value: '8.56', yoy: '+4.2%', isUp: true },
    },
    volume: {
      title: '流向件量',
      icon: <Package size={16} />,
      unit: '万票',
      daily: { value: '456.12', yoy: '+4.8%', isUp: true },
      monthly: { value: '1.23', yoy: '+2.5%', isUp: true },
      yearly: { value: '4.12', yoy: '+3.8%', isUp: true },
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-3"
    >
      {/* Flow Sub Tabs */}
      <div className="flex gap-2 mb-4">
        {['cnob', 'osob'].map((type) => (
          <button
            key={type}
            onClick={() => setFlowType(type as any)}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              flowType === type 
                ? 'bg-white text-[#1b63d6] shadow-md' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      <FlowCard 
        {...flowData.income}
        onOpenDetail={() => onOpenDetail(flowType, 'income')}
      />

      <FlowCard 
        {...flowData.volume}
        onOpenDetail={() => onOpenDetail(flowType, 'volume')}
      />
    </motion.div>
  );
}
