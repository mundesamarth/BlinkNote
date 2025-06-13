import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatFileName(url: string): string {
  if (!url) return '';

  // Remove query params (e.g., ?AWSAccessKeyId=...)
  const fileWithExt = url.split('/').pop()?.split('?')[0] || '';

  // Remove the file extension (.pdf or any other)
  const fileNameOnly = fileWithExt.replace(/\.[^/.]+$/, '');

  // Format: My File Name
  return fileNameOnly
    .replace(/[-_]+/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
