import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  const units = [
    { value: 31536000, label: 'year' },
    { value: 2592000, label: 'month' },
    { value: 86400, label: 'day' },
    { value: 3600, label: 'hour' },
    { value: 60, label: 'minute' },
    { value: 1, label: 'second' },
  ];

  for (const unit of units) {
    const count = Math.floor(timeDifference / unit.value);
    if (count > 0) {
      return count === 1
        ? `1 ${unit.label} ago`
        : `${count} ${unit.label}s ago`;
    }
  }

  return 'just now';
};

export const getFormatValue = (value: number): string => {
  const BILLION = 1e9;
  const MILLION = 1e6;
  const THOUSAND = 1e3;

  if (value >= BILLION) {
    return `${(value / BILLION).toFixed(1)}B`;
  } else if (value >= MILLION) {
    return `${(value / MILLION).toFixed(1)}M`;
  } else if (value >= THOUSAND) {
    return `${(value / THOUSAND).toFixed(1)}K`;
  } else {
    return `${value}`;
  }
};