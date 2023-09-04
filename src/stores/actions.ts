import { SET_ACTIVE_TABLE } from './actionTypes';

export const setActiveTable = (tableType: string) => ({
  type: SET_ACTIVE_TABLE,
  payload: tableType,
});

// import { createAction } from '@reduxjs/toolkit';

// export const setCurrencyPair = createAction<string>('table/setCurrencyPair');
// export const setCurrentTableType = createAction<'ticker' | 'trades'>('table/setCurrentTableType');
