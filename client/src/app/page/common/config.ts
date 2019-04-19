import { InjectionToken } from '@angular/core';
import { Filter } from './filter';

export const DURATION = new InjectionToken<number>('duration');
const duration = 10000;

export const FILTERS = new InjectionToken<Filter[]>('filters-mock');
const filters: Filter[] = [
  {
    id: 0,
    name: 'type',
    isCalendar: false,
    defaultValue: -1,
    options: [
      { name: 'Show all tasks', value: -1 },
      { name: 'Show delegates tasks only', value: 0 },
      { name: 'Show assigned to me tasks only', value: 1 },
      { name: 'Show resolved tasks only', value: 2 }
    ],
  },
  {
    id: 1,
    name: 'status',
    isCalendar: false,
    defaultValue: -1,
    options: [
      { name: 'Filter by Status', value: -1 },
      { name: 'High', value: 0 },
      { name: 'Normal', value: 1 },
      { name: 'Low', value: 2 },
    ],
  },
  {
    id: 2,
    name: 'date',
    isCalendar: true,
    defaultValue: -1,
    options: [
      { name: 'Filter by Date', value: -1 },
      { name: 'date', value: 0 },
    ],
  }
];

export const appConfigProviders = [
  {
    provide: FILTERS,
    useValue: filters
  },
  {
    provide: DURATION,
    useValue: duration
  }
];