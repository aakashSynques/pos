import { SET_SELECTED_CUSTOMER, CLEAR_SELECTED_CUSTOMER  } from "../action/actionTypes";
const initialState = {
  selectedCustomer: null,
  // Other initial state properties related to your feature
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_CUSTOMER:
          return {
            ...state,
            selectedCustomer: action.payload,
        };
        case CLEAR_SELECTED_CUSTOMER:
          return {
            ...state,
            selectedCustomer: null,
          };
        // ...other cases
        default:
          return state;
      }
};

export default customerReducer;