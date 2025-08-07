

export const formatNumber = (num) => {
  if (!num || num <= 0) return null;
  if (num >= 1_000_000) return `${Math.floor(num / 1_000_000)}M`;
  if (num >= 1_000) return `${Math.floor(num / 1_000)}k`;
  return `${num}`;
};
