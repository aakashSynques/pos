import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART_QTY,
  SET_PRODUCT_NOTE,
  SET_COMPLEMENTARY_NOTE,
  SET_TOPPING_URNO,
  SET_IS_PARCEL,
  UPDATE_CUSTOMIZED,
  CLEAR_CART_ITEMS,
  SET_CART_SUM_UP
} from "../action/actionTypes";

const initialState = {
  sidebarShow: true,
  cartItems: [],
  cartSumUp: null,
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
    case SET_PRODUCT_NOTE:
      return {
        ...state,
        cartItems: action.payload,
      };
    case SET_COMPLEMENTARY_NOTE:
      return {
        ...state,
        cartItems: action.payload,
      };
    case SET_TOPPING_URNO:
      return {
        ...state,
        cartItems: action.payload,
      };
    case SET_IS_PARCEL:
      return {
        ...state,
        cartItems: action.payload,
      };

    case UPDATE_CUSTOMIZED:
      return {
        ...state,
        cartItems: action.payload,
      };

      case CLEAR_CART_ITEMS:
      return {
        ...state,
        cartItems: [], // Clear the cart items
      };
    
      case SET_CART_SUM_UP:
      return {
        ...state,
        cartSumUp: action.payload,
      };
    

    default:
      return state;
  }
};

export default cartReducer;



