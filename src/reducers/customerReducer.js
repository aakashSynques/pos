import {
  SET_SELECTED_CUSTOMER,
  CLEAR_SELECTED_CUSTOMER,
  SET_SELECTED_CUSTOMER_JSON,
  SET_TOTAL_DUE_BALANCE
} from "../action/actionTypes";
const initialState = {
  selectedCustomer: null,
  selectedCustomerJson: null,
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

    case SET_SELECTED_CUSTOMER_JSON:
      return {
        ...state,
        selectedCustomerJson: action.payload,
      };
    
   
 
  
    // ...other cases
    default:
      return state;
  }
};

export default customerReducer;
