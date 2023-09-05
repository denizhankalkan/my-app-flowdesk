import React, { useState, useEffect } from 'react';
import { Table } from '../components/shared/Table';
import { sortingTrades } from '../helpers/sortingTrades';
import { TradesHeader } from './StyledComponents';

interface Trade {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
}

export interface RecentTradesProps {
  data: Trade[];
}

type SortField = 'time' | 'price' | 'qty';

const RecentTrades: React.FC<RecentTradesProps> = ({ data }) => {
  const [sortedTrades, setSortedTrades] = useState<Trade[]>([...data]);
  const [sortField, setSortField] = useState<SortField | null>(null);

  useEffect(() => {
    setSortedTrades([...data]);
  }, [data]);

  const sortTrades = (field: string) => {
    const sortField = field.toLowerCase() as SortField;
    const sorted = sortingTrades(sortedTrades, sortField, sortField);
    setSortedTrades(sorted);
    setSortField(sortField);
  };

  const headers = ['ID', 'Price', 'Quantity', 'Quote Quantity', 'Time', 'Is Buyer Maker', 'Is Best Match'];
  const rows = sortedTrades.map((trade) => [
    trade.id,
    trade.price,
    trade.qty,
    trade.quoteQty,
    new Date(trade.time).toLocaleString(),
    trade.isBuyerMaker ? 'Yes' : 'No',
    trade.isBestMatch ? 'Yes' : 'No'
  ]);

  return (
    <div>
      <TradesHeader>Recent Trades</TradesHeader>
      <Table headers={headers} rows={rows} onHeaderClick={sortTrades} sortableFields={['Price', 'Quantity', 'Time']} />
    </div>
  );
};

export default RecentTrades;
