import React from 'react';

interface Data {
  id: number;
  price: string;
  qty: string;
}

interface RecentTradesTableProps {
  data: Data[];
}

const RecentTradesTable: React.FC<RecentTradesTableProps> = ({ data }) => {
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
        {data.map((data) => (
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.price}</td>
            <td>{data.qty}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecentTradesTable;
