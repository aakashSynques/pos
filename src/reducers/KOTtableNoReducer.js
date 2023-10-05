
import { SET_SELECTED_TABLE_VALUE, SUBMIT_DELIVERY_DATA, SET_PENDING_KOT_DATA } from "../action/actionTypes";

const initialState = {
  selectedTableValue: '',
  submittedHomeDeliveryData: null,
  pendingKotData: [],

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

      case SET_PENDING_KOT_DATA:
        return {
          ...state,
          pendingKotData: action.payload,
        };


      
    default:
      return state;
  }
};

export default KOTtableNoReducer;
