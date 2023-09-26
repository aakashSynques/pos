import { SET_ALL_PRODUCTS } from "../action/actionTypes";

const initialState = {
  allProducts: [],
};

const allProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };
    default:
      return state;
  }
};

export default allProductReducer;
