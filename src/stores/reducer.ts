import { SET_ACTIVE_TABLE } from './actionTypes';

const initialState = {
  activeTable: 'RECENT_TRADES',
};
const tableReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ACTIVE_TABLE:
      return { ...state, activeTable: action.payload };
    default:
      return state;
  }
};

export default tableReducer;
