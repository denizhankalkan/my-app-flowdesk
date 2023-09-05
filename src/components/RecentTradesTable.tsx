import React, { useState,useEffect } from 'react';
import { StyledTable, SortIconWrapper, TradesHeader } from './StyledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

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

  const sortTrades = (field: SortField) => {
    if (sortField === field) {
      setSortedTrades([...sortedTrades.reverse()]);
      return;
    }
  
    const sorted = [...sortedTrades].sort((a, b) => {
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
  
    setSortedTrades(sorted);
    setSortField(field);
  };
  
  return (
    <div>
      <TradesHeader>Recent Trades</TradesHeader>
      {data ? (
      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
               <th onClick={() => sortTrades('price')}>Price
                <SortIconWrapper>
                  <FontAwesomeIcon icon={faSort} />
                </SortIconWrapper>
            </th>
            <th onClick={() => sortTrades('qty')}>Quantity
                <SortIconWrapper>
                  <FontAwesomeIcon icon={faSort} />
                </SortIconWrapper>
            </th>
            <th>Quote Quantity</th>
            <th onClick={() => sortTrades('time')}>Time
                <SortIconWrapper>
                 <FontAwesomeIcon icon={faSort} />
                </SortIconWrapper>
            </th>
            <th>Is Buyer Maker</th>
            <th>Is Best Match</th>
          </tr>
        </thead>
        <tbody>
          {sortedTrades.map((trade, index) => (
            <tr key={index}>
              <td>{trade.id}</td>
              <td>{trade.price}</td>
              <td>{trade.qty}</td>
              <td>{trade.quoteQty}</td>
              <td>{new Date(trade.time).toLocaleString()}</td>
              <td>{trade.isBuyerMaker ? 'Yes' : 'No'}</td>
              <td>{trade.isBestMatch ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
       ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default RecentTrades;
