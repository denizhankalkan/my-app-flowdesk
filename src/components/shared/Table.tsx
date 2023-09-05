import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { StyledTable, SortIconWrapper } from '../StyledComponents';

type TableProps = {
  headers: string[];
  rows: ReactNode[][];
  onHeaderClick?: (field: string) => void;
  sortableFields?: string[];
};

export const Table: React.FC<TableProps> = ({ headers, rows, onHeaderClick, sortableFields }) => (
  <StyledTable>
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index} onClick={() => onHeaderClick?.(header)}>
            {header}
            {sortableFields?.includes(header) && 
                <SortIconWrapper>
                  <FontAwesomeIcon icon={faSort} />
                </SortIconWrapper>}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </StyledTable>
);
