export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return 'NPR 0';
  
  if (amount >= 10000000) {
    return `NPR ${(amount / 10000000).toFixed(2)} Crore`;
  } else if (amount >= 100000) {
    return `NPR ${(amount / 100000).toFixed(2)} Lakh`;
  }
  
  return `NPR ${amount.toLocaleString('en-IN')}`;
};

export const formatNepaliNumber = (amount) => {
  if (!amount && amount !== 0) return '0';
  return `NPR ${amount.toLocaleString('en-IN')}`;
};