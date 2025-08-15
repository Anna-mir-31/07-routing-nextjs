// lib/utils.ts
export const formatDate = (isoDate: string): string => {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
