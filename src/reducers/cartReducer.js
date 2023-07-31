import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART_QTY,
  PDATE_CART_ITEMS,
} from "../action/actionTypes";

const initialState = {
  sidebarShow: true,
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: action.payload,
        // cartItems: [...state.cartItems, action.payload],
      };
    case SET_CART_QTY:
      return {
        ...state,
        cartItems: action.payload,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
