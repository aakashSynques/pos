import { GET_SAVE_SALE_DATA, SET_NEWPSID_DISCARD, SET_DISCARD_BUTTON_ACTIVE  } from "../action/actionTypes";

const initialState = {
  getSaveSaleData: [],
  psid: [null],
  discardButtonActive: false,


};

const saveSaleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SAVE_SALE_DATA:
      return {
        ...state,
        getSaveSaleData: action.payload,
      };

      case SET_NEWPSID_DISCARD:
        return {
          ...state,
          psid: action.payload,
        };

        case SET_DISCARD_BUTTON_ACTIVE:
      return {
        ...state,
        discardButtonActive: action.payload,
      };

    default:
      return state;
  }
};

export default saveSaleReducer;

