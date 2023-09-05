type SortField = 'time' | 'price' | 'qty';

interface Trade {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
}

export const sortingTrades = (trades: Trade[], field: SortField, currentField: SortField | null) => {
  if (currentField === field) {
    return [...trades.reverse()];
  }

  const sorted = [...trades].sort((a, b) => {
    let aValue: number, bValue: number;

    if (field === 'time') {
      aValue = a[field];
      bValue = b[field];
    } else {
      aValue = parseFloat(a[field]);
      bValue = parseFloat(b[field]);
    }

    return aValue - bValue;
  });

  return sorted;
};
