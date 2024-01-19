import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();

  if (!(createdAt instanceof Date) || isNaN(createdAt.getTime())) {
    // If createdAt is not a valid Date, return current time in 'HH:mm' format
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

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

  // If none of the conditions are met, return the current time in 'HH:mm' format
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
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

export const getJoinedDate = (date: Date | string | null | undefined): string => {
  if (!date || isNaN(new Date(date).getTime())) {
    return 'Invalid Date';
  }

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const month = dateObj.toLocaleString('default', { month: 'short' });
  const year = dateObj.getFullYear();

  const joinedDate: string = `${month} ${year}`;

  return joinedDate;
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}
interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {

  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true }
  );
}
export const removeKeysFromQuery = ({ params, keysToRemove }: RemoveUrlQueryParams) => {

  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  })

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true }
  );
}