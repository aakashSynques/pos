// src/store/cashReducer.js
import {
  UPDATE_TOTAL_CASH,
  UPDATE_PAY_MODE_TOTALS,
} from "../action/actionTypes";

const initialState = {
  totalCash: 0,
  payModeTotals: {},
};

const cashReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOTAL_CASH:
      return {
        ...state,
        totalCash: action.payload,
      };

    case UPDATE_PAY_MODE_TOTALS:
      return {
        ...state,
        payModeTotals: action.payload,
      };

    default:
      return state;
  }
};

export default cashReducer;
