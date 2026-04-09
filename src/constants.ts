/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BusinessUnit } from './types';

export const BUSINESS_UNITS: BusinessUnit[] = [
  {
    id: 1,
    name: '国际快递',
    color: '#4A90E2',
    metrics: [
      {
        name: '收入',
        daily: { value: '456.78', yoy: '+5.2%', isUp: true, ratio: '15%' },
        monthly: { value: '89.34', yoy: '+3.1%', isUp: true, ratio: '16%', status: 'green' },
      },
      {
        name: '件量',
        daily: { value: '234.56', yoy: '+8.3%', isUp: true, ratio: '18%' },
        monthly: { value: '45.67', yoy: '+5.2%', isUp: true, ratio: '19%', status: 'yellow' },
      },
      {
        name: '重量',
        daily: { value: '123.45', yoy: '+2.1%', isUp: true, ratio: '22%' },
        monthly: { value: '2345.67', yoy: '+1.5%', isUp: true, ratio: '20%', status: 'red' },
      },
    ],
  },
  {
    id: 2,
    name: '国际电商',
    color: '#2E7FD0',
    metrics: [
      {
        name: '收入',
        daily: { value: '378.90', yoy: '-2.1%', isUp: false, ratio: '12%' },
        monthly: { value: '72.45', yoy: '+4.2%', isUp: true, ratio: '14%', status: 'yellow' },
      },
      {
        name: '件量',
        daily: { value: '189.23', yoy: '+6.5%', isUp: true, ratio: '14%' },
        monthly: { value: '38.56', yoy: '+3.8%', isUp: true, ratio: '16%', status: 'red' },
      },
      {
        name: '重量',
        daily: { value: '95.67', yoy: '+1.8%', isUp: true, ratio: '18%' },
        monthly: { value: '1890.45', yoy: '+2.3%', isUp: true, ratio: '17%', status: 'green' },
      },
    ],
  },
  {
    id: 3,
    name: '海外仓配',
    color: '#26B8D6',
    metrics: [
      {
        name: '收入',
        daily: { value: '289.56', yoy: '+9.3%', isUp: true, ratio: '9%' },
        monthly: { value: '55.67', yoy: '+6.1%', isUp: true, ratio: '11%', status: 'red' },
      },
      {
        name: '件量',
        daily: { value: '156.78', yoy: '+7.2%', isUp: true, ratio: '12%' },
        monthly: { value: '32.45', yoy: '+4.9%', isUp: true, ratio: '13%', status: 'green' },
      },
      {
        name: '重量',
        daily: { value: '78.90', yoy: '+3.4%', isUp: true, ratio: '15%' },
        monthly: { value: '1567.89', yoy: '+2.1%', isUp: true, ratio: '14%', status: 'yellow' },
      },
    ],
  },
  {
    id: 4,
    name: '本地运配',
    color: '#29B6F6',
    metrics: [
      {
        name: '收入',
        daily: { value: '312.34', yoy: '+4.6%', isUp: true, ratio: '10%' },
        monthly: { value: '61.23', yoy: '+5.7%', isUp: true, ratio: '12%', status: 'green' },
      },
      {
        name: '件量',
        daily: { value: '198.45', yoy: '+5.8%', isUp: true, ratio: '15%' },
        monthly: { value: '41.23', yoy: '+3.2%', isUp: true, ratio: '17%', status: 'yellow' },
      },
      {
        name: '重量',
        daily: { value: '89.12', yoy: '-1.2%', isUp: false, ratio: '17%' },
        monthly: { value: '1734.56', yoy: '+1.9%', isUp: true, ratio: '15%', status: 'red' },
      },
    ],
  },
  {
    id: 5,
    name: '国际运输',
    color: '#FFA726',
    metrics: [
      {
        name: '收入',
        daily: { value: '267.89', yoy: '-3.2%', isUp: false, ratio: '8%' },
        monthly: { value: '51.45', yoy: '+2.4%', isUp: true, ratio: '10%', status: 'green' },
      },
      {
        name: '件量',
        daily: { value: '134.56', yoy: '-1.5%', isUp: false, ratio: '10%' },
        monthly: { value: '28.34', yoy: '+1.8%', isUp: true, ratio: '11%', status: 'yellow' },
      },
      {
        name: '重量',
        daily: { value: '203.45', yoy: '+2.7%', isUp: true, ratio: '38%' },
        monthly: { value: '4089.23', yoy: '+3.1%', isUp: true, ratio: '36%', status: 'red' },
      },
    ],
  },
  {
    id: 6,
    name: '国际航线',
    color: '#EF7E63',
    metrics: [
      {
        name: '收入',
        daily: { value: '198.76', yoy: '+7.1%', isUp: true, ratio: '6%' },
        monthly: { value: '37.89', yoy: '+8.2%', isUp: true, ratio: '8%', status: 'green' },
      },
      {
        name: '件量',
        daily: { value: '89.45', yoy: '+4.2%', isUp: true, ratio: '7%' },
        monthly: { value: '17.67', yoy: '+5.3%', isUp: true, ratio: '9%', status: 'yellow' },
      },
      {
        name: '重量',
        daily: { value: '156.78', yoy: '+6.8%', isUp: true, ratio: '29%' },
        monthly: { value: '3123.45', yoy: '+4.5%', isUp: true, ratio: '28%', status: 'red' },
      },
    ],
  },
  {
    id: 7,
    name: '国际大宗',
    color: '#E89B9B',
    metrics: [
      {
        name: '收入',
        daily: { value: '187.65', yoy: '+6.3%', isUp: true, ratio: '6%' },
        monthly: { value: '35.67', yoy: '+9.1%', isUp: true, ratio: '7%', status: 'green' },
      },
      {
        name: '件量',
        daily: { value: '45.23', yoy: '+3.5%', isUp: true, ratio: '3%' },
        monthly: { value: '9.12', yoy: '+7.2%', isUp: true, ratio: '4%', status: 'yellow' },
      },
      {
        name: '重量',
        daily: { value: '234.56', yoy: '+5.4%', isUp: true, ratio: '44%' },
        monthly: { value: '4678.90', yoy: '+6.7%', isUp: true, ratio: '42%', status: 'red' },
      },
    ],
  },
];
