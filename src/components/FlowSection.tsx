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


function TopFlowsCard() {
  const flows = [
    { from: '深莞区', to: '西欧', income: '1,234.56', incomeYoy: '5.2%', incomeUp: true, volume: '892.45', volumeYoy: '3.1%', volumeUp: true },
    { from: '深莞区', to: '美洲', income: '982.34', incomeYoy: '1.8%', incomeUp: true, volume: '678.90', volumeYoy: '2.5%', volumeUp: true },
    { from: '广佛区', to: '美洲', income: '876.12', incomeYoy: '4.2%', incomeUp: true, volume: '567.12', volumeYoy: '2.9%', volumeUp: true },
    { from: '湖北区', to: '西欧', income: '754.32', incomeYoy: '3.5%', incomeUp: true, volume: '456.78', volumeYoy: '1.8%', volumeUp: true },
    { from: '广佛区', to: '英国', income: '643.21', incomeYoy: '2.9%', incomeUp: true, volume: '345.67', volumeYoy: '2.1%', volumeUp: true },
    { from: '新加坡', to: '海南区', income: '532.10', incomeYoy: '4.8%', incomeUp: true, volume: '234.56', volumeYoy: '3.2%', volumeUp: true },
    { from: '福建区', to: '美洲', income: '421.98', incomeYoy: '1.5%', incomeUp: true, volume: '123.45', volumeYoy: '1.9%', volumeUp: true },
    { from: '粤东区', to: '美洲', income: '310.87', incomeYoy: '2.2%', incomeUp: true, volume: '98.76', volumeYoy: '1.5%', volumeUp: true },
    { from: '苏南区', to: '美洲', income: '209.76', incomeYoy: '3.1%', incomeUp: true, volume: '87.65', volumeYoy: '2.4%', volumeUp: true },
    { from: '深莞区', to: '日本', income: '198.65', incomeYoy: '1.2%', incomeUp: true, volume: '76.54', volumeYoy: '1.1%', volumeUp: true },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-white/50 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-50 p-1.5 rounded-lg text-[#1b63d6]">
            <Trophy size={16} />
          </div>
          <span className="text-sm font-bold text-gray-800">TOP10流向</span>
          <HelpCircle size={14} className="text-gray-300" />
        </div>
        <button className="bg-[#1b63d6] text-white px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1">
          地区/国家 <ArrowRightLeft size={10} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[10px] border-separate border-spacing-0">
          <thead>
            <tr className="text-gray-400">
              <th className="text-left font-bold py-2 bg-[#f8fbff] rounded-l-lg px-2 sticky left-0 z-10">流向</th>
              <th className="text-center font-bold py-2 bg-[#f8fbff] px-4">收入</th>
              <th className="text-center font-bold py-2 bg-[#f8fbff] px-4">件量</th>
              <th className="text-center font-bold py-2 bg-[#f8fbff] rounded-r-lg px-4">重量</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {flows.map((f, i) => (
              <tr key={i}>
                <td className="py-3 px-2 sticky left-0 bg-white z-10">
                  <div className="flex flex-col text-[#1b63d6] font-bold">
                    <span>{f.from}</span>
                    <MoveRight size={10} className="my-0.5" />
                    <span>{f.to}</span>
                  </div>
                </td>
                <td className="py-3 text-center px-4">
                  <div className="font-black text-gray-800">{f.income} <span className="text-[8px] font-normal text-gray-400">万元</span></div>
                  <div className={`flex items-center justify-center font-bold ${f.incomeUp ? 'text-green-500' : 'text-red-500'}`}>
                    同比:{f.incomeYoy}
                    {f.incomeYoy !== '-' && (f.incomeUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />)}
                  </div>
                </td>
                <td className="py-3 text-center px-4">
                  <div className="font-black text-gray-800">{f.volume} <span className="text-[8px] font-normal text-gray-400">万票</span></div>
                  <div className={`flex items-center justify-center font-bold ${f.volumeUp ? 'text-green-500' : 'text-red-500'}`}>
                    同比:{f.volumeYoy}
                    {f.volumeYoy !== '-' && (f.volumeUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />)}
                  </div>
                </td>
                <td className="py-3 text-center px-4">
                  <div className="font-black text-gray-800">{f.weight} <span className="text-[8px] font-normal text-gray-400">吨</span></div>
                  <div className={`flex items-center justify-center font-bold ${f.weightUp ? 'text-green-500' : 'text-red-500'}`}>
                    同比:{f.weightYoy}
                    {f.weightYoy !== '-' && (f.weightUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface KeyFlowData {
  name: string;
  income: { value: string; yoy: string; mom?: string; ratio: string; isUp: boolean; isMomUp?: boolean };
  volume: { value: string; yoy: string; mom?: string; ratio: string; isUp: boolean; isMomUp?: boolean };
  weight: { value: string; yoy: string; mom?: string; ratio: string; isUp: boolean; isMomUp?: boolean };
}

function KeyFlowsCard({ type }: { type: 'cnob' | 'osob' }) {
  const [dimension, setDimension] = useState<'daily' | 'monthly'>('daily');

  const cnobFlows: KeyFlowData[] = [
    { name: '中→英', income: { value: '456.2', yoy: '5.2%', ratio: '12.4%', isUp: true }, volume: { value: '34.5', yoy: '3.1%', ratio: '11.8%', isUp: true }, weight: { value: '123.4', yoy: '4.2%', ratio: '13.1%', isUp: true } },
    { name: '中→日', income: { value: '389.4', yoy: '2.1%', ratio: '10.2%', isUp: true }, volume: { value: '28.9', yoy: '1.5%', ratio: '9.5%', isUp: true }, weight: { value: '98.2', yoy: '2.4%', ratio: '10.5%', isUp: true } },
    { name: '中→法', income: { value: '312.8', yoy: '4.2%', ratio: '8.5%', isUp: true }, volume: { value: '22.4', yoy: '2.9%', ratio: '7.8%', isUp: true }, weight: { value: '87.6', yoy: '3.8%', ratio: '9.2%', isUp: true } },
    { name: '中→美', income: { value: '289.5', yoy: '1.8%', ratio: '7.2%', isUp: true }, volume: { value: '18.2', yoy: '2.5%', ratio: '6.5%', isUp: true }, weight: { value: '76.4', yoy: '2.1%', ratio: '8.1%', isUp: true } },
  ];

  const osobFlows: KeyFlowData[] = [
    { name: '中国大陆', income: { value: '892.4', yoy: '6.2%', ratio: '22.4%', isUp: true }, volume: { value: '64.5', yoy: '4.1%', ratio: '21.8%', isUp: true }, weight: { value: '223.4', yoy: '5.2%', ratio: '23.1%', isUp: true } },
    { name: '中国港澳台', income: { value: '456.2', yoy: '3.1%', ratio: '12.4%', isUp: true }, volume: { value: '34.5', yoy: '2.5%', ratio: '11.8%', isUp: true }, weight: { value: '123.4', yoy: '3.4%', ratio: '13.1%', isUp: true } },
    { name: '亚太', income: { value: '789.4', yoy: '5.2%', ratio: '18.5%', isUp: true }, volume: { value: '52.4', yoy: '3.9%', ratio: '17.8%', isUp: true }, weight: { value: '187.6', yoy: '4.8%', ratio: '19.2%', isUp: true } },
    { name: '欧洲', income: { value: '678.5', yoy: '4.8%', ratio: '16.2%', isUp: true }, volume: { value: '48.2', yoy: '3.5%', ratio: '15.5%', isUp: true }, weight: { value: '176.4', yoy: '4.1%', ratio: '17.1%', isUp: true } },
    { name: '美洲', income: { value: '567.8', yoy: '4.2%', ratio: '14.5%', isUp: true }, volume: { value: '38.2', yoy: '3.1%', ratio: '13.8%', isUp: true }, weight: { value: '156.4', yoy: '3.8%', ratio: '15.1%', isUp: true } },
    { name: '新兴区域', income: { value: '432.1', yoy: '3.8%', ratio: '11.2%', isUp: true }, volume: { value: '28.2', yoy: '2.8%', ratio: '10.5%', isUp: true }, weight: { value: '132.4', yoy: '3.2%', ratio: '12.1%', isUp: true } },
  ];

  // Add mock MoM data for monthly dimension
  const flows = (type === 'cnob' ? cnobFlows : osobFlows).map(f => ({
    ...f,
    income: { ...f.income, mom: '1.2%', isMomUp: true },
    volume: { ...f.volume, mom: '0.8%', isMomUp: true },
    weight: { ...f.weight, mom: '1.5%', isMomUp: true },
  }));

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-white/50 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-50 p-1.5 rounded-lg text-[#1b63d6]">
            <ArrowRightLeft size={16} />
          </div>
          <span className="text-sm font-bold text-gray-800">重点流向</span>
          <HelpCircle size={14} className="text-gray-300" />
        </div>
        <div className="flex bg-gray-100 p-0.5 rounded-lg">
          <button 
            onClick={() => setDimension('daily')}
            className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${dimension === 'daily' ? 'bg-white text-[#1b63d6] shadow-sm' : 'text-gray-400'}`}
          >
            当日
          </button>
          <button 
            onClick={() => setDimension('monthly')}
            className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${dimension === 'monthly' ? 'bg-white text-[#1b63d6] shadow-sm' : 'text-gray-400'}`}
          >
            月累计
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="text-gray-400">
              <th className="text-left font-bold py-2 bg-[#f8fbff] rounded-l-lg px-2">流向</th>
              <th className="text-center font-bold py-2 bg-[#f8fbff]">收入</th>
              <th className="text-center font-bold py-2 bg-[#f8fbff]">件量</th>
              <th className="text-center font-bold py-2 bg-[#f8fbff] rounded-r-lg">重量</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {flows.map((f, i) => (
              <tr key={i}>
                <td className="py-3 px-2 font-bold text-gray-800">{f.name}</td>
                <td className="py-3 text-center">
                  <div className="font-black text-gray-800">{f.income.value}</div>
                  <div className="flex flex-col gap-0.5 mt-1">
                    <div className={`flex items-center justify-center font-bold ${f.income.isUp ? 'text-green-500' : 'text-red-500'}`}>
                      同:{f.income.yoy}
                      {f.income.isUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                    </div>
                    {dimension === 'monthly' && (
                      <div className={`flex items-center justify-center font-bold ${f.income.isMomUp ? 'text-green-500' : 'text-red-500'}`}>
                        环:{f.income.mom}
                        {f.income.isMomUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                      </div>
                    )}
                    <div className="text-gray-400 font-medium">占:{f.income.ratio}</div>
                  </div>
                </td>
                <td className="py-3 text-center">
                  <div className="font-black text-gray-800">{f.volume.value}</div>
                  <div className="flex flex-col gap-0.5 mt-1">
                    <div className={`flex items-center justify-center font-bold ${f.volume.isUp ? 'text-green-500' : 'text-red-500'}`}>
                      同:{f.volume.yoy}
                      {f.volume.isUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                    </div>
                    {dimension === 'monthly' && (
                      <div className={`flex items-center justify-center font-bold ${f.volume.isMomUp ? 'text-green-500' : 'text-red-500'}`}>
                        环:{f.volume.mom}
                        {f.volume.isMomUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                      </div>
                    )}
                    <div className="text-gray-400 font-medium">占:{f.volume.ratio}</div>
                  </div>
                </td>
                <td className="py-3 text-center">
                  <div className="font-black text-gray-800">{f.weight.value}</div>
                  <div className="flex flex-col gap-0.5 mt-1">
                    <div className={`flex items-center justify-center font-bold ${f.weight.isUp ? 'text-green-500' : 'text-red-500'}`}>
                      同:{f.weight.yoy}
                      {f.weight.isUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                    </div>
                    {dimension === 'monthly' && (
                      <div className={`flex items-center justify-center font-bold ${f.weight.isMomUp ? 'text-green-500' : 'text-red-500'}`}>
                        环:{f.weight.mom}
                        {f.weight.isMomUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                      </div>
                    )}
                    <div className="text-gray-400 font-medium">占:{f.weight.ratio}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function FlowSection({ onOpenDetail }: { onOpenDetail: (type: 'cnob' | 'osob', metric: 'income' | 'volume' | 'weight') => void }) {
  const [flowType, setFlowType] = useState<'cnob' | 'osob'>('cnob');

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
        title="收入"
        icon={<CircleDollarSign size={16} />}
        unit="万元"
        daily={{ value: '1,245.82', yoy: '5.2%', isUp: true }}
        monthly={{ value: '34,567.12', yoy: '4.8%', isUp: true }}
        yearly={{ value: '102,456.34', yoy: '6.1%', isUp: true }}
        onOpenDetail={() => onOpenDetail(flowType, 'income')}
      />

      <FlowCard 
        title="件量"
        icon={<Package size={16} />}
        unit="万票"
        daily={{ value: '892.45', yoy: '3.1%', isUp: true }}
        monthly={{ value: '25,678.90', yoy: '2.9%', isUp: true }}
        yearly={{ value: '78,901.23', yoy: '4.2%', isUp: true }}
        onOpenDetail={() => onOpenDetail(flowType, 'volume')}
      />

      <KeyFlowsCard type={flowType} />
      
      <TopFlowsCard />
    </motion.div>
  );
}
