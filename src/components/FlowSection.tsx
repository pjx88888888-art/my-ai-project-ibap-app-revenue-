/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, HelpCircle, ChevronRight, ChevronDown, CircleDollarSign, Package, Target, Trophy, ArrowRightLeft, MoveRight, ArrowRight } from 'lucide-react';
import { TimeDimension } from '../types';

interface FlowCardProps {
  title: string;
  icon: React.ReactNode;
  unit: string;
  daily: { value: string; yoy: string; isUp: boolean };
  monthly: { value: string; yoy: string; isUp: boolean };
  yearly: { value: string; yoy: string; isUp: boolean };
  timeDimension: TimeDimension;
  onOpenDetail?: () => void;
  isExpandable?: boolean;
}

function FlowCard({ title, icon, unit, daily, monthly, yearly, timeDimension, onOpenDetail, isExpandable = true }: FlowCardProps) {
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
        {timeDimension === 'day' ? (
          <>
            {/* Daily */}
            <div className="bg-[#f8fbff] rounded-xl p-3">
              <div className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
                <span className="font-bold text-gray-600">当日</span>
                <span className="opacity-60">3月30日</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-gray-800 tracking-tight">{daily.value}</span>
                <span className="text-[10px] text-gray-400 font-medium">{unit}</span>
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
                <div className="text-[9px] text-gray-400 flex items-center gap-1 mt-1">
                  <span className="text-gray-400 font-normal">同比:</span>
                  <span className={`flex items-center font-semibold ${monthly.isUp ? 'text-green-500' : 'text-red-500'}`}>
                    {monthly.yoy}
                    {monthly.isUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                  </span>
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
                <div className="text-[9px] text-gray-400 flex items-center gap-1 mt-1">
                  <span className="text-gray-400 font-normal">同比:</span>
                  <span className={`flex items-center font-semibold ${yearly.isUp ? 'text-green-500' : 'text-red-500'}`}>
                    {yearly.yoy}
                    {yearly.isUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {/* Monthly */}
            <div className="bg-[#f8fbff] rounded-xl p-3">
              <div className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
                <span className="font-bold text-gray-600">当月</span>
                <span className="opacity-60">3月</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-gray-800 tracking-tight">{monthly.value}</span>
                <span className="text-[10px] text-gray-400 font-medium">{unit}</span>
              </div>
              <div className="text-[9px] text-gray-400 flex items-center gap-1 mt-1">
                <span className="text-gray-400 font-normal">同比:</span>
                <span className={`flex items-center font-semibold ${monthly.isUp ? 'text-green-500' : 'text-red-500'}`}>
                  {monthly.yoy}
                  {monthly.isUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                </span>
              </div>
            </div>

            {/* Yearly */}
            <div className="bg-[#f8fbff] rounded-xl p-3">
              <div className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
                <span className="font-bold text-gray-600">年累计</span>
                <span className="opacity-60 text-[8px]">1-3月</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-gray-800">{yearly.value}</span>
                <span className="text-[8px] text-gray-400">{unit}</span>
              </div>
              <div className="text-[9px] text-gray-400 flex items-center gap-1 mt-1">
                <span className="text-gray-400 font-normal">同比:</span>
                <span className={`flex items-center font-semibold ${yearly.isUp ? 'text-green-500' : 'text-red-500'}`}>
                  {yearly.yoy}
                  {yearly.isUp ? <TrendingUp size={8} className="ml-0.5" /> : <TrendingDown size={8} className="ml-0.5" />}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {isExpandable && (
        <div className="flex justify-center mt-3">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
          >
            展开 <ChevronDown size={12} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
}


export default function FlowSection({ 
  timeDimension,
  onOpenDetail 
}: { 
  timeDimension: TimeDimension;
  onOpenDetail: (type: 'cnob' | 'osob', metric: 'income' | 'volume' | 'weight', hideFlow?: boolean) => void 
}) {
  const [flowType, setFlowType] = useState<'cnob' | 'osob'>('cnob');
  const [top10Dimension, setTop10Dimension] = useState<'country' | 'region'>('country');
  const [activePeriod, setActivePeriod] = useState<'current' | 'accumulated'>('current');

  const flowData = {
    income: {
      title: '收入',
      icon: <CircleDollarSign size={16} />,
      unit: '万元',
      daily: { value: '892.45', yoy: '+5.2%', isUp: true },
      monthly: { value: '2,456.78', yoy: '+3.1%', isUp: true },
      yearly: { value: '8,567.89', yoy: '+4.2%', isUp: true },
    },
    volume: {
      title: '件量',
      icon: <Package size={16} />,
      unit: '万票',
      daily: { value: '456.12', yoy: '+4.8%', isUp: true },
      monthly: { value: '1,234.56', yoy: '+2.5%', isUp: true },
      yearly: { value: '4,123.45', yoy: '+3.8%', isUp: true },
    }
  };

  const cnobKeyFlows = [
    { name: '中→英', income: '456.2', incomeYoy: '5.2%', incomeMom: '1.2%', incomeRatio: '12.4%', volume: '34.5', volumeYoy: '3.1%', volumeMom: '0.8%', volumeRatio: '11.8%', weight: '123.4', weightYoy: '4.2%', weightMom: '1.5%', weightRatio: '13.1%' },
    { name: '中→日', income: '389.4', incomeYoy: '2.1%', incomeMom: '1.2%', incomeRatio: '10.2%', volume: '28.9', volumeYoy: '1.5%', volumeMom: '0.8%', volumeRatio: '9.5%', weight: '98.2', weightYoy: '2.4%', weightMom: '1.5%', weightRatio: '10.5%' },
    { name: '中→法', income: '312.8', incomeYoy: '4.2%', incomeMom: '1.2%', incomeRatio: '8.5%', volume: '22.4', volumeYoy: '2.9%', volumeMom: '0.8%', volumeRatio: '7.8%', weight: '87.6', weightYoy: '3.8%', weightMom: '1.5%', weightRatio: '9.2%' },
    { name: '中→美', income: '289.5', incomeYoy: '1.8%', incomeMom: '1.2%', incomeRatio: '7.2%', volume: '18.2', volumeYoy: '2.5%', volumeMom: '0.8%', volumeRatio: '6.5%', weight: '76.4', weightYoy: '2.1%', weightMom: '1.5%', weightRatio: '8.1%' },
  ];

  const osobKeyFlows = [
    { name: '中国大陆', income: '892.4', incomeYoy: '6.2%', incomeMom: '1.2%', incomeRatio: '22.4%', volume: '64.5', volumeYoy: '4.1%', volumeMom: '0.8%', volumeRatio: '21.8%', weight: '223.4', weightYoy: '5.2%', weightMom: '1.5%', weightRatio: '23.1%' },
    { name: '中国港澳台', income: '456.2', incomeYoy: '3.1%', incomeMom: '1.2%', incomeRatio: '12.4%', volume: '34.5', volumeYoy: '2.5%', volumeMom: '0.8%', volumeRatio: '11.8%', weight: '123.4', weightYoy: '3.4%', weightMom: '1.5%', weightRatio: '13.1%' },
    { name: '亚太区域', income: '789.4', incomeYoy: '5.2%', incomeMom: '1.2%', incomeRatio: '18.5%', volume: '52.4', volumeYoy: '3.9%', volumeMom: '0.8%', volumeRatio: '17.8%', weight: '187.6', weightYoy: '4.8%', weightMom: '1.5%', weightRatio: '19.2%' },
    { name: '欧洲区域', income: '678.5', incomeYoy: '4.8%', incomeMom: '1.2%', incomeRatio: '16.2%', volume: '48.2', volumeYoy: '3.5%', volumeMom: '0.8%', volumeRatio: '15.5%', weight: '176.4', weightYoy: '4.1%', weightMom: '1.5%', weightRatio: '17.1%' },
    { name: '美洲区域', income: '567.8', incomeYoy: '4.2%', incomeMom: '1.2%', incomeRatio: '14.5%', volume: '38.2', volumeYoy: '3.1%', volumeMom: '0.8%', volumeRatio: '13.8%', weight: '156.4', weightYoy: '3.8%', weightMom: '1.5%', weightRatio: '15.1%' },
    { name: '新兴区域', income: '432.1', incomeYoy: '3.8%', incomeMom: '1.2%', incomeRatio: '11.2%', volume: '28.2', volumeYoy: '2.8%', volumeMom: '0.8%', volumeRatio: '10.5%', weight: '132.4', weightYoy: '3.2%', weightMom: '1.5%', weightRatio: '12.1%' },
  ];

  const currentFlows = flowType === 'cnob' ? cnobKeyFlows : osobKeyFlows;

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
        timeDimension={timeDimension}
        onOpenDetail={() => onOpenDetail(flowType, 'income')}
      />

      <FlowCard 
        {...flowData.volume}
        timeDimension={timeDimension}
        onOpenDetail={() => onOpenDetail(flowType, 'volume')}
        isExpandable={false}
      />

      {/* Key Flows Section */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-white/50 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-50 p-1.5 rounded-lg text-[#1b63d6]">
              <ArrowRightLeft size={16} />
            </div>
            <span className="text-sm font-bold text-gray-800">
              {flowType === 'cnob' ? '重点流向（国际电商）' : '重点流向'}
            </span>
            <HelpCircle size={14} className="text-gray-300" />
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr className="bg-[#f8f9fb]">
                <th className="px-2 py-2 text-gray-400 font-bold">流向</th>
                <th className="px-2 py-2 text-gray-400 font-bold text-center">收入</th>
                <th className="px-2 py-2 text-gray-400 font-bold text-center">件量</th>
                <th className="px-2 py-2 text-gray-400 font-bold text-center">重量</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentFlows.map((flow, i) => (
                <tr key={i}>
                  <td className="px-2 py-4 font-bold text-gray-800 whitespace-nowrap">{flow.name}</td>
                  <td className="px-2 py-4">
                    <div className="text-center">
                      <div className="font-black text-gray-800 mb-1">{flow.income}</div>
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="flex items-center gap-0.5 text-green-500 font-bold scale-90">
                          <span className="text-[9px] text-gray-400 font-normal">同比:</span>
                          <span>{flow.incomeYoy}</span>
                          <TrendingUp size={8} />
                        </div>
                        {timeDimension === 'month' && (
                          <div className="flex items-center gap-0.5 text-green-500 font-bold scale-90">
                            <span className="text-[9px] text-gray-400 font-normal">环比:</span>
                            <span>{flow.incomeMom}</span>
                            <TrendingUp size={8} />
                          </div>
                        )}
                        <div className="text-gray-400 scale-90">
                          <span className="text-[9px] text-gray-400 font-normal">占比:</span>
                          <span>{flow.incomeRatio}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-4">
                    <div className="text-center">
                      <div className="font-black text-gray-800 mb-1">{flow.volume}</div>
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="flex items-center gap-0.5 text-green-500 font-bold scale-90">
                          <span className="text-[9px] text-gray-400 font-normal">同比:</span>
                          <span>{flow.volumeYoy}</span>
                          <TrendingUp size={8} />
                        </div>
                        {timeDimension === 'month' && (
                          <div className="flex items-center gap-0.5 text-green-500 font-bold scale-90">
                            <span className="text-[9px] text-gray-400 font-normal">环比:</span>
                            <span>{flow.volumeMom}</span>
                            <TrendingUp size={8} />
                          </div>
                        )}
                        <div className="text-gray-400 scale-90">
                          <span className="text-[9px] text-gray-400 font-normal">占比:</span>
                          <span>{flow.volumeRatio}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-4">
                    <div className="text-center">
                      <div className="font-black text-gray-800 mb-1">{flow.weight}</div>
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="flex items-center gap-0.5 text-green-500 font-bold scale-90">
                          <span className="text-[9px] text-gray-400 font-normal">同比:</span>
                          <span>{flow.weightYoy}</span>
                          <TrendingUp size={8} />
                        </div>
                        {timeDimension === 'month' && (
                          <div className="flex items-center gap-0.5 text-green-500 font-bold scale-90">
                            <span className="text-[9px] text-gray-400 font-normal">环比:</span>
                            <span>{flow.weightMom}</span>
                            <TrendingUp size={8} />
                          </div>
                        )}
                        <div className="text-gray-400 scale-90">
                          <span className="text-[9px] text-gray-400 font-normal">占比:</span>
                          <span>{flow.weightRatio}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TOP10 Flows Section */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-white/50 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-50 p-1.5 rounded-lg text-[#f59e0b]">
              <Trophy size={16} />
            </div>
            <span className="text-sm font-bold text-gray-800">TOP10流向</span>
            <HelpCircle size={14} className="text-gray-300" />
          </div>
          <button 
            onClick={() => setTop10Dimension(top10Dimension === 'country' ? 'region' : 'country')}
            className="flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold shadow-sm active:scale-95 transition-transform"
          >
            <span>{top10Dimension === 'country' ? '国家/地区' : '地区/国家'}</span>
            <ArrowRightLeft size={10} />
          </button>
        </div>

        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr className="bg-[#f8f9fb]">
                <th className="px-2 py-2 text-gray-400 font-bold">流向</th>
                <th className="px-2 py-2 text-gray-400 font-bold text-center">收入</th>
                <th className="px-2 py-2 text-gray-400 font-bold text-center">件量</th>
                <th className="px-2 py-2 text-gray-400 font-bold text-center">重量</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(top10Dimension === 'country' ? [
                { from: 'China', to: 'America', income: '1,234.50', incomeYoy: '5.2%', volume: '456.10', volumeYoy: '4.8%', weight: '2,345.60', weightYoy: '6.1%' },
                { from: 'China', to: 'West Europe', income: '982.30', incomeYoy: '3.1%', volume: '345.20', volumeYoy: '2.5%', weight: '1,876.40', weightYoy: '4.2%' },
                { from: 'China', to: 'Great Britain', income: '876.10', incomeYoy: '5.1%', volume: '312.40', volumeYoy: '5.2%', weight: '1,654.20', weightYoy: '5.8%' },
                { from: 'China', to: 'Cross border_America', income: '543.20', incomeYoy: '2.4%', volume: '234.50', volumeYoy: '3.1%', weight: '1,234.50', weightYoy: '3.4%' },
                { from: 'West Europe', to: 'West Europe', income: '432.10', incomeYoy: '1.2%', volume: '187.60', volumeYoy: '1.5%', weight: '987.60', weightYoy: '2.1%' },
                { from: 'China', to: 'South Asia', income: '321.00', incomeYoy: '1.5%', volume: '154.20', volumeYoy: '1.8%', weight: '765.40', weightYoy: '2.5%' },
              ] : [
                { from: '深莞区', to: '西欧', income: '1,234.50', incomeYoy: '5.2%', volume: '456.10', volumeYoy: '4.8%', weight: '2,345.60', weightYoy: '6.1%' },
                { from: '深莞区', to: '美洲', income: '982.30', incomeYoy: '3.1%', volume: '345.20', volumeYoy: '2.5%', weight: '1,876.40', weightYoy: '4.2%' },
                { from: '西欧', to: '西欧', income: '876.10', incomeYoy: '5.1%', volume: '312.40', volumeYoy: '5.2%', weight: '1,654.20', weightYoy: '5.8%' },
                { from: '上海区', to: '美洲', income: '543.20', incomeYoy: '2.4%', volume: '234.50', volumeYoy: '3.1%', weight: '1,234.50', weightYoy: '3.4%' },
                { from: '福建区', to: '美洲', income: '432.10', incomeYoy: '1.2%', volume: '187.60', volumeYoy: '1.5%', weight: '987.60', weightYoy: '2.1%' },
                { from: '广佛区', to: '英国', income: '321.00', incomeYoy: '1.5%', volume: '154.20', volumeYoy: '1.8%', weight: '765.40', weightYoy: '2.5%' },
              ]).map((item, i) => (
                <tr key={i}>
                  <td className="px-2 py-4">
                    <button 
                      onClick={() => onOpenDetail(flowType, 'income', true)}
                      className="flex flex-col items-start gap-0.5 text-[#1b63d6] font-bold hover:underline"
                    >
                      <span>{item.from}</span>
                      <ArrowRight size={10} className="text-gray-300" />
                      <span>{item.to}</span>
                    </button>
                  </td>
                  <td className="px-2 py-4">
                    <div className="text-center">
                      <div className="font-black text-gray-800 mb-1">{item.income}</div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center gap-0.5 text-green-500 font-bold scale-90">
                          <span className="text-[9px] text-gray-400 font-normal">同比:</span>
                          <span>{item.incomeYoy}</span>
                          <TrendingUp size={8} />
                        </div>
                        <div className="flex items-center justify-center gap-0.5 text-green-500 font-bold scale-90">
                          <span className="text-[9px] text-gray-400 font-normal">环比:</span>
                          <span>+1.2%</span>
                          <TrendingUp size={8} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-4">
                    <div className="text-center">
                      <div className="font-black text-gray-800 mb-1">{item.volume}</div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center gap-0.5 text-green-500 font-bold scale-90">
                          <span className="text-[9px] text-gray-400 font-normal">同比:</span>
                          <span>{item.volumeYoy}</span>
                          <TrendingUp size={8} />
                        </div>
                        <div className="flex items-center justify-center gap-0.5 text-green-500 font-bold scale-90">
                          <span className="text-[9px] text-gray-400 font-normal">环比:</span>
                          <span>+0.8%</span>
                          <TrendingUp size={8} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-4">
                    <div className="text-center">
                      <div className="font-black text-gray-800 mb-1">{item.weight}</div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center gap-0.5 text-green-500 font-bold scale-90">
                          <span className="text-[9px] text-gray-400 font-normal">同比:</span>
                          <span>{item.weightYoy}</span>
                          <TrendingUp size={8} />
                        </div>
                        <div className="flex items-center justify-center gap-0.5 text-green-500 font-bold scale-90">
                          <span className="text-[9px] text-gray-400 font-normal">环比:</span>
                          <span>+1.5%</span>
                          <TrendingUp size={8} />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
