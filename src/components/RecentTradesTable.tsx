// components/RecentTradesTable.tsx
import React from 'react';

interface Trade {
  id: number;
  price: string;
  qty: string;
}

interface RecentTradesTableProps {
  trades: Trade[];
}

const RecentTradesTable: React.FC<RecentTradesTableProps> = ({ trades }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {trades.map((trade) => (
          <tr key={trade.id}>
            <td>{trade.id}</td>
            <td>{trade.price}</td>
            <td>{trade.qty}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecentTradesTable;
