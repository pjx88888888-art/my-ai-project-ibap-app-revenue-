/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MainTab = 'income' | 'quality' | 'operation';
export type SubTab = 'overview' | 'flow' | 'product' | 'customer';
export type MetricType = 'income' | 'volume' | 'weight';
export type TimeDimension = 'day' | 'month';

export interface MetricData {
  label: string;
  date: string;
  value: string;
  unit: string;
  yoy: string;
  isUp: boolean;
  status?: 'green' | 'yellow-green';
}

export interface BusinessMetric {
  name: string;
  daily: {
    value: string;
    yoy: string;
    isUp: boolean;
    ratio: string;
  };
  monthly: {
    value: string;
    yoy: string;
    isUp: boolean;
    ratio: string;
    status?: 'green' | 'red' | 'yellow';
  };
}

export interface BusinessUnit {
  id: number;
  name: string;
  color: string;
  metrics: BusinessMetric[];
}
