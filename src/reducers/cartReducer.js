import { ADD_TO_CART, REMOVE_FROM_CART, PDATE_CART_ITEMS } from "../action/actionTypes";

const initialState = {
  sidebarShow: true,
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.prod_id !== action.payload
        ),
      };
    
      case "UPDATE_CART_ITEMS":
        return {
          ...state,
          cartItems: action.payload, // Replace cartItems with the new data
        };
    
    
    default:
      return state;
  }
};

export default cartReducer;