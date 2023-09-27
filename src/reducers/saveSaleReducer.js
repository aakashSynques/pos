import { GET_SAVE_SALE_DATA } from "../action/actionTypes";

const initialState = {
  getSaveSaleData: [],
};

const saveSaleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SAVE_SALE_DATA:
      return {
        ...state,
        getSaveSaleData: action.payload,
      };
    default:
      return state;
  }
};

export default saveSaleReducer;

