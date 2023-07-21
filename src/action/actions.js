// actions.js
import { ADD_TO_CART, REMOVE_FROM_CART, SET_SELECTED_OUTLET_ID } from "./actionTypes";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

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