/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TrendingUp, TrendingDown, HelpCircle, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface MetricRow {
  name: string;
  unit: string;
  daily: {
    value: string;
    yoy: string;
    isUp: boolean;
  };
  monthly: {
    value: string;
    yoy: string;
    isUp: boolean;
  };
  yearly: {
    value: string;
    yoy: string;
    isUp: boolean;
  };
}

const KEY_METRICS: MetricRow[] = [
  {
    name: '国际收入占全网国际收入比',
    unit: '%',
    daily: { value: '12.45', yoy: '1.2%', isUp: true },
    monthly: { value: '11.82', yoy: '0.8%', isUp: true },
    yearly: { value: '10.56', yoy: '1.5%', isUp: true },
  },
  {
    name: '国际收入占全网国际收入占比差',
    unit: '%',
    daily: { value: '0.45', yoy: '0.1%', isUp: true },
    monthly: { value: '0.42', yoy: '0.05%', isUp: true },
    yearly: { value: '0.36', yoy: '0.08%', isUp: true },
  },
  {
    name: '国际标品收入同比',
    unit: '%',
    daily: { value: '5.45', yoy: '0.5%', isUp: true },
    monthly: { value: '5.82', yoy: '0.3%', isUp: true },
    yearly: { value: '4.56', yoy: '0.2%', isUp: true },
  },
  {
    name: '国际供应链收入占地区国际业务比',
    unit: '%',
    daily: { value: '10.45', yoy: '0.8%', isUp: true },
    monthly: { value: '10.82', yoy: '0.6%', isUp: true },
    yearly: { value: '9.56', yoy: '0.9%', isUp: true },
  },
  {
    name: '国际供应链收入占地区国际业务占比差',
    unit: '%',
    daily: { value: '0.25', yoy: '0.02%', isUp: true },
    monthly: { value: '0.22', yoy: '0.01%', isUp: true },
    yearly: { value: '0.16', yoy: '0.03%', isUp: true },
  },
  {
    name: '单票收入',
    unit: '元',
    daily: { value: '81.96', yoy: '0.5%', isUp: true },
    monthly: { value: '82.45', yoy: '0.3%', isUp: true },
    yearly: { value: '79.32', yoy: '0.2%', isUp: true },
  },
  {
    name: '单票重量',
    unit: 'KG',
    daily: { value: '6.94', yoy: '0.3%', isUp: false },
    monthly: { value: '7.12', yoy: '0.1%', isUp: true },
    yearly: { value: '6.85', yoy: '0.4%', isUp: false },
  },
];

interface KeyMetricsSectionProps {
  onOpenDetail: () => void;
}

export default function KeyMetricsSection({ onOpenDetail }: KeyMetricsSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'cn' | 'os'>('all');

  const filteredMetrics = KEY_METRICS.filter(metric => {
    if (activeTab === 'all') {
      return [
        '国际收入占全网国际收入比',
        '单票收入',
        '单票重量'
      ].includes(metric.name);
    }
    if (activeTab === 'cn') {
      return [
        '国际收入占全网国际收入比',
        '国际收入占全网国际收入占比差',
        '国际标品收入同比',
        '国际供应链收入占地区国际业务比',
        '国际供应链收入占地区国际业务占比差',
        '单票收入',
        '单票重量'
      ].includes(metric.name);
    }
    if (activeTab === 'os') {
      return [
        '国际收入占全网国际收入比',
        '国际收入占全网国际收入占比差',
        '单票收入',
        '单票重量'
      ].includes(metric.name);
    }
    return true;
  });

  return (
    <div className="bg-white mx-3 mb-6 rounded-2xl p-4 shadow-xl relative z-10 border border-white/20">
      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-50">
        <div className="flex items-center gap-2">
          <div className="bg-blue-50 p-1 rounded-lg">
            <TrendingUp size={16} className="text-[#1b63d6]" />
          </div>
          <span className="text-sm font-bold text-gray-800">关键指标</span>
          <HelpCircle size={14} className="text-gray-300" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-0.5 text-[10px] font-bold">
            {(['all', 'cn', 'os'] as const).map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-md transition-all ${activeTab === tab ? 'bg-white text-[#1b63d6] shadow-sm' : 'text-gray-500'}`}
              >
                {tab === 'all' ? '全部' : tab === 'cn' ? '国内地区' : '海外地区'}
              </button>
            ))}
          </div>
          <div
            onClick={onOpenDetail}
            className="text-gray-400 text-[10px] flex items-center cursor-pointer hover:text-[#1b63d6] transition-colors"
          >
            详情 <ChevronRight size={10} className="ml-0.5" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px]">
          <thead>
            <tr className="text-[10px] text-gray-400 font-medium">
              <th className="text-left pb-3 font-medium bg-[#f8f9fb] px-2 py-1.5 rounded-l-lg">指标项</th>
              <th className="text-center pb-3 font-medium bg-[#f8f9fb] py-1.5">
                <div>当日</div>
                <div className="text-[8px] opacity-60">3月30日</div>
              </th>
              <th className="text-center pb-3 font-medium bg-[#f8f9fb] py-1.5">
                <div>月累计</div>
                <div className="text-[8px] opacity-60">3月1-30日</div>
              </th>
              <th className="text-center pb-3 font-medium bg-[#f8f9fb] py-1.5 rounded-r-lg">
                <div>年累计</div>
                <div className="text-[8px] opacity-60">1-3月</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredMetrics.map((metric, idx) => (
              <tr key={idx} className="group hover:bg-blue-50/20 transition-colors">
                <td className="py-4 px-2">
                  <div className="text-[11px] font-bold text-gray-700 leading-tight">{metric.name}</div>
                </td>
                <td className="py-4 text-center">
                  <div className="flex items-baseline justify-center gap-0.5">
                    <span className="text-xs font-extrabold text-gray-800">{metric.daily.value}</span>
                    <span className="text-[8px] text-gray-400 font-medium">{metric.unit}</span>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <div className="flex items-baseline justify-center gap-0.5 mb-0.5">
                    <span className="text-xs font-extrabold text-gray-800">{metric.monthly.value}</span>
                    <span className="text-[8px] text-gray-400 font-medium">{metric.unit}</span>
                  </div>
                  <div className={`text-[8px] font-bold flex items-center justify-center gap-0.5 ${metric.monthly.isUp ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.monthly.yoy}
                    {metric.monthly.isUp ? <TrendingUp size={8} /> : <TrendingDown size={8} />}
                  </div>
                </td>
                <td className="py-4 text-center">
                  <div className="flex items-baseline justify-center gap-0.5 mb-0.5">
                    <span className="text-xs font-extrabold text-gray-800">{metric.yearly.value}</span>
                    <span className="text-[8px] text-gray-400 font-medium">{metric.unit}</span>
                  </div>
                  <div className={`text-[8px] font-bold flex items-center justify-center gap-0.5 ${metric.yearly.isUp ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.yearly.yoy}
                    {metric.yearly.isUp ? <TrendingUp size={8} /> : <TrendingDown size={8} />}
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
