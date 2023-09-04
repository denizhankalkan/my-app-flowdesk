import styled from 'styled-components';

export const AppContainer = styled.div`
  background-size: cover;
  background-position: center;
  min-height: 100vh;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const Th = styled.th`
  border: 1px solid #ccc;
  padding: 10px;
`;

export const Td = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  width: calc(33.33% - 10px);
`;

export const Dropdown = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  width: calc(33.33% - 10px);
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-top: 1rem;
  margin-left: .5rem;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const SortIcon = styled.span`
  margin-left: 10px;
`;