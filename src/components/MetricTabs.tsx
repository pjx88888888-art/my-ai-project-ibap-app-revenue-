import { MetricType } from '../types';

interface MetricTabsProps {
  activeMetric: MetricType;
  setActiveMetric: (metric: MetricType) => void;
}

export default function MetricTabs({ activeMetric, setActiveMetric }: MetricTabsProps) {
  const metrics = [
    { id: 'income', label: '收入' },
    { id: 'volume', label: '件量' },
    { id: 'weight', label: '重量' },
  ] as { id: MetricType; label: string }[];

  return (
    <div className="flex gap-2 px-4 mb-4">
      {metrics.map((m) => (
        <button
          key={m.id}
          onClick={() => setActiveMetric(m.id)}
          className={`flex-1 text-center text-xs py-2 rounded-lg cursor-pointer transition-all font-bold ${
            activeMetric === m.id
              ? 'bg-white text-[#1b63d6] shadow-lg'
              : 'bg-white/15 text-white hover:bg-white/25'
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
