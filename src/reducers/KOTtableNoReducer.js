
import { SET_SELECTED_TABLE_VALUE } from "../action/actionTypes";

const initialState = {
  selectedTableValue: '',
};

const KOTtableNoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_TABLE_VALUE:
      return {
        ...state,
        selectedTableValue: action.payload,
      };
    default:
      return state;
  }
};

export default KOTtableNoReducer;
