// actions.js
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_SELECTED_OUTLET_ID,
  PDATE_CART_ITEMS,
} from "./actionTypes";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

// export const addToCart = (product) => {
//   const { cartItemsArray } = product;
//   console.log(cartItemsArray, "27 act");
//   const existingCartItem =
//     cartItemsArray.length > 0 &&
//     cartItemsArray.find((cartItem) => cartItem.prod_id === product.prod_id);

//   if (existingCartItem) {
//     return cartItemsArray.map((cartItem) =>
//       cartItem.prod_id === product.prod_id
//         ? { ...cartItem, prod_qty: cartItem.prod_qty + 1 }
//         : cartItem
//     );
//   }
//   return [...cartItemsArray, { ...product, prod_qty: product.prod_qty + 1 }];
// };

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const setOutletList = (outletList) => ({
  type: "SET_OUTLET_LIST",
  payload: outletList,
});

export const setDeliveryList = (deliveryList) => ({
  type: "SET_DELIVERY_LIST",
  payload: deliveryList,
});

// login
export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});

export const logoutUser = () => ({
  type: "LOGOUT_USER",
});

// select outlet

export const setSelectedOutletId = (outletId) => {
  return {
    type: "SET_SELECTED_OUTLET_ID",
    payload: outletId,
  };
};

// select delivery mode
export const setSelectedDeliveryMode = (deliveryMode) => ({
  type: "SET_SELECTED_DELIVERY_MODE",
  payload: deliveryMode,
});

export const updateCartItems = (newCartItems) => {
  return {
    type: "UPDATE_CART_ITEMS",
    payload: newCartItems,
  };
};
