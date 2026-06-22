/**
 * Format a number as Indian Rupees with en-IN locale.
 * e.g. 150000 → "₹1,50,000"
 */
export function formatINR(value) {
  if (value === null || value === undefined) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Compact format: 1500000 → "₹15L", 50000 → "₹50K"
 */
export function formatINRCompact(value) {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000)   return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000)     return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
}

/**
 * For chart tick labels — compact with K suffix
 * e.g. 50000 → "₹50K"
 */
export function formatINRTick(value) {
  const abs = Math.abs(value);
  if (abs >= 100000) return `₹${(abs / 100000).toFixed(0)}L`;
  if (abs >= 1000)   return `₹${(abs / 1000).toFixed(0)}K`;
  return `₹${abs}`;
}
