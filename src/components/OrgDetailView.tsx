/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, X, MoreHorizontal } from 'lucide-react';
import { TimeDimension } from '../types';

interface OrgDetailViewProps {
  onBack: () => void;
  onClose: () => void;
  region: string;
  timeDimension: TimeDimension;
  detailSource?: 'overview' | 'business' | 'key-metrics';
}

export default function OrgDetailView({ 
  onBack, 
  onClose, 
  region, 
  timeDimension,
  detailSource = 'overview'
}: OrgDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'cn-sales' | 'cn-origin' | 'os-origin'>('cn-sales');
  const [activeSubFilter, setActiveSubFilter] = useState('all');
  const [activePeriod, setActivePeriod] = useState<'daily' | 'monthly' | 'yearly'>('daily');

  useEffect(() => {
    if (timeDimension === 'month' || (timeDimension === 'day' && detailSource === 'business')) {
      setActivePeriod('monthly');
    } else {
      setActivePeriod('daily');
    }
  }, [timeDimension, detailSource]);

  const getMetrics = () => {
    if (activeTab === 'os-origin') {
      return ['国际收入占全网国际收入比', '国际收入占全网国际收入占比差', '单票收入', '单票重量'];
    }
    return [
      '国际收入占全网国际收入比',
      '国际收入占全网国际收入占比差',
      '国际标品收入同比',
      '国际供应链收入占地区国际业务比',
      '国际供应链收入占地区国际业务占比差',
      '单票收入',
      '单票重量'
    ];
  };

  const metrics = getMetrics();

  const data = [
    { name: '深莞区', values: ['12.5%', '0.5%', '1.2%', '10.2%', '0.8%', '81.96', '6.94'] },
    { name: '广佛区', values: ['10.2%', '0.2%', '0.8%', '8.5%', '0.5%', '82.45', '7.12'] },
    { name: '上海区', values: ['8.5%', '0.1%', '0.5%', '6.2%', '0.3%', '79.32', '6.85'] },
    { name: '福建区', values: ['6.2%', '0.3%', '0.2%', '4.1%', '0.1%', '75.12', '6.50'] },
    { name: '北京区', values: ['5.5%', '0.2%', '0.4%', '3.8%', '0.2%', '72.10', '6.20'] },
    { name: '苏南区', values: ['4.8%', '0.1%', '0.3%', '3.5%', '0.1%', '70.50', '6.10'] },
    { name: '湖南区', values: ['4.2%', '0.2%', '0.2%', '3.2%', '0.1%', '68.20', '5.90'] },
    { name: '浙北区', values: ['3.9%', '0.1%', '0.1%', '2.8%', '0.1%', '67.50', '5.80'] },
    { name: '湖北区', values: ['3.5%', '0.1%', '0.1%', '2.5%', '0.1%', '66.10', '5.70'] },
    { name: '浙南区', values: ['3.2%', '0.1%', '0.1%', '2.2%', '0.1%', '65.20', '5.60'] },
  ];

  return (
    <div className="max-w-[450px] mx-auto bg-[#f4f7fc] min-h-screen overflow-hidden flex flex-col">
      <div className="bg-[#1b63d6] pt-4 pb-4 px-4 relative">
        <div className="flex justify-between items-center">
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
            <button onClick={onClose} className="text-white p-1">
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'cn-sales', label: '国内-销售口径' },
            { id: 'cn-origin', label: '国内-始发口径' },
            { id: 'os-origin', label: '海外-始发口径' },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${activeTab === tab.id ? 'bg-[#1b63d6] text-white' : 'bg-gray-100 text-gray-500'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
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
      </div>

      <div className="flex-1 overflow-y-auto p-3 pt-0">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-white/50">
          <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
            <div className="text-sm font-bold text-gray-800">组织详情</div>
            <div className="relative z-50">
              <button
                onClick={() => {
                  if (timeDimension === 'day' && detailSource !== 'business') {
                    setActivePeriod(activePeriod === 'daily' ? 'monthly' : activePeriod === 'monthly' ? 'yearly' : 'daily');
                  } else {
                    setActivePeriod(activePeriod === 'monthly' ? 'yearly' : 'monthly');
                  }
                }}
                className="flex items-center gap-1 bg-blue-50 text-[#1b63d6] px-2 py-1 rounded-md text-[10px] font-bold"
              >
                {timeDimension === 'day' && detailSource !== 'business' ? (
                  activePeriod === 'daily' ? '日-当日' : activePeriod === 'monthly' ? '日-月累计' : '日-年累计'
                ) : (
                  activePeriod === 'monthly' ? '月-当月' : '月-年统计'
                )}
                <span className="text-[8px]">⇅</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px] table-auto">
              <thead>
                <tr className="bg-[#f8f9fb] text-gray-500">
                  <th className="px-4 py-3 sticky left-0 bg-[#f8f9fb] z-10 w-24">组织</th>
                  {metrics.map(m => (
                    <th key={m} className="px-4 py-3 text-right whitespace-nowrap">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.map((row, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-4 font-bold text-gray-700 sticky left-0 bg-white z-10 whitespace-nowrap">
                      {row.name}
                    </td>
                    {metrics.map((m, mIdx) => {
                      const metricIndex = [
                        '国际收入占全网国际收入比',
                        '国际收入占全网国际收入占比差',
                        '国际标品收入同比',
                        '国际供应链收入占地区国际业务比',
                        '国际供应链收入占地区国际业务占比差',
                        '单票收入',
                        '单票重量'
                      ].indexOf(m);
                      return (
                        <td key={mIdx} className="px-4 py-4 text-right whitespace-nowrap">{row.values[metricIndex]}</td>
                      );
                    })}
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
