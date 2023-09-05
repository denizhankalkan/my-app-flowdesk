import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RecentTrades, { RecentTradesProps } from '../components/RecentTradesTable';

const mockData: RecentTradesProps = {
  data: [
    { id: 1, price: '100', qty: '2', quoteQty: '200', time: 10000, isBuyerMaker: true, isBestMatch: true },
    { id: 2, price: '200', qty: '1', quoteQty: '200', time: 20000, isBuyerMaker: false, isBestMatch: true },
    { id: 3, price: '50', qty: '4', quoteQty: '200', time: 30000, isBuyerMaker: true, isBestMatch: false }
  ]
};

describe('<RecentTrades />', () => {
  it('sorts trades correctly when sort icon is clicked', () => {
     render(<RecentTrades {...mockData} />);

    const priceColumn = screen.getByText('Price');
    fireEvent.click(priceColumn);
    
    const firstRowPrice = '100';
    
    expect(firstRowPrice).toBe('50');
  });
});
