import { SET_CUSTOMER_ACCOUNT_JSON } from "../action/actionTypes";
const initialState = {
  customerAcc: [],
  // Other initial state properties related to your feature
};

const customerAccReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMER_ACCOUNT_JSON:
      return {
        ...state,
        customerAcc: action.payload,
      };
    default:
      return state;
  }
};

export default customerAccReducer;
