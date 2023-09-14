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
    return [...trades].reverse();
  }

  const sorted = [...trades].sort((a, b) => {
    let aValue: number | string, bValue: number | string;

    if (field === 'time') {
      aValue = a.time;
      bValue = b.time;
    } else {
      aValue = parseFloat(a[field]);
      bValue = parseFloat(b[field]);
    }

    if (typeof aValue === 'undefined' || isNaN(aValue)) {
      return 1; 
    }
    if (typeof bValue === 'undefined' || isNaN(bValue)) {
      return -1; 
    }

    return aValue - bValue;
  });

  return sorted;
};
