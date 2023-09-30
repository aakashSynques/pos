
import { SET_SELECTED_TABLE_VALUE, SUBMIT_DELIVERY_DATA } from "../action/actionTypes";

const initialState = {
  selectedTableValue: '',
  submittedHomeDeliveryData: null,
};

const KOTtableNoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_TABLE_VALUE:
      return {
        ...state,
        selectedTableValue: action.payload,
      };
      case SUBMIT_DELIVERY_DATA:
      return {
        ...state,
        submittedHomeDeliveryData: action.payload,
      };
      
    default:
      return state;
  }
};

export default KOTtableNoReducer;
