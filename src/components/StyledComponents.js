import styled from 'styled-components';
import backgroundImage from '../asset/backgroundd.jpg'

  export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
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
    width: calc(13.33% - 10px);
    margin: 0 2rem 0 1rem
  `;

  export const Dropdown = styled.select`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: calc(13.33% - 10px);
    margin: 0 2rem 0 1rem
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
    justify-content: center;
    width: 100%;
    margin: 1rem .5rem 0 0;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
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

    th, td {
      color: #183153;
    }

    background-color: white;
  `;

  export const SortIcon = styled.span`
    margin-left: 10px;
  `;

  export const SortIconWrapper = styled.span`
    float: right;
  `;

  export const TableContainer = styled.span`
    display: flex;
    justify-content: center;
    margin-left: 10rem;
  `;

  export const TradesHeader = styled.h2`
    color: #183153;
  `;

  export const ContentContainer = styled.div`
    flex: 1;  
    overflow-y: auto;  
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  `;

  export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
  `;
