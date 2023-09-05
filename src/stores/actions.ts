import { SET_ACTIVE_TABLE } from './actionTypes';

export const setActiveTable = (tableType: string) => ({
  type: SET_ACTIVE_TABLE,
  payload: tableType,
});
