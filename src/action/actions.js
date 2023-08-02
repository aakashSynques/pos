// actions.js
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART_QTY,
  SET_SELECTED_OUTLET_ID,
  PDATE_CART_ITEMS,
} from "./actionTypes";

// helper functions start

const addCartItem = (cartItemsArray, cartItem) => {
  const existingCartItem =
    cartItemsArray.length > 0 &&
    cartItemsArray.find((item) => item.prod_id === cartItem.prod_id);

  if (existingCartItem) {
    return cartItemsArray.map((item) =>
      item.prod_id === cartItem.prod_id
        ? { ...item, prod_qty: item.prod_qty + 1 }
        : item
    );
  }
  console.log(cartItemsArray, ...cartItemsArray, "28");
  return [...cartItemsArray, { ...cartItem, prod_qty: 1 }];
};

// const setQuantity = (cartItemsArray, productId, quantity) => {
//   if (quantity == 0 || quantity == "") {
//     const filt = cartItemsArray.filter((item) => item.prod_id !== productId);
//     console.log("filt");
//     return filt;
//   }
//   else if (quantity >= 1000) {
//     console.log("1000");
//     return cartItemsArray.map((item) =>
//       item.prod_id === productId ? { ...item, prod_qty: 1000 } : item
//     );
//   }
//   else {
//     console.log("else");
//     return cartItemsArray.map((item) =>
//       item.prod_id === productId ? { ...item, prod_qty: quantity } : item
//     );
//   }
// };

// const setQuantity = (cartItemsArray, productId, quantity) => {
//   if (quantity === 0 || quantity === "") {
//     // If quantity is 0 or empty, remove the product from the cart
//     const filteredItems = cartItemsArray.filter((item) => item.prod_id !== productId);
//     return filteredItems;
//   } else {
//     // Otherwise, update the quantity and calculate the new prod_rate
//     const updatedItems = cartItemsArray.map((item) =>
//       item.prod_id === productId
//         ? {
//             ...item,
//             prod_qty: quantity,
//             prod_rate: item.prod_rate * (quantity / item.prod_qty), // Update the prod_rate based on the new quantity
//           }
//         : item
//     );
//     return updatedItems;
//   }
// };

const setQuantity = (cartItemsArray, productId, quantity) => {
  if (quantity == 0 || quantity == "") {
    // If quantity is 0 or empty, remove the product from the cart
    const filteredItems = cartItemsArray.filter(
      (item) => item.prod_id !== productId
    );
    return filteredItems;
  }
  // else if (quantity >= 1000) {
  //   // Show a confirmation box if quantity exceeds 1000
  //   const isConfirmed = window.confirm(
  //     "Are you sure you want to add 1000 quantity?"
  //   );
  //   if (isConfirmed) {
  //     // Update the quantity and prod_rate if confirmed
  //     const updatedItems = cartItemsArray.map((item) =>
  //       item.prod_id === productId
  //         ? {
  //             ...item,
  //             prod_qty: 1000, // price limit
  //             prod_rate: item.prod_rate * (1000 / item.prod_qty),
  //           }
  //         : item
  //     );
  //     return updatedItems;
  //   }
  // else {
  //   // If not confirmed, do not update the quantity
  //   return cartItemsArray;
  // }
  // }
  else {
    // Update the quantity and prod_rate if it's a regular quantity update
    const updatedItems = cartItemsArray.map((item) =>
      item.prod_id === productId
        ? {
            ...item,
            prod_qty: quantity,
            prod_rate: item.prod_rate * (quantity / item.prod_qty),
          }
        : item
    );
    return updatedItems;
  }
};
const removeCartItem = (cartItemsArray, productId) => {
  return cartItemsArray.filter((item) => item.prod_id !== productId);
};
// helper functions end

export const addToCart = (cartItemsArray, [cartItem]) => ({
  type: ADD_TO_CART,
  payload: addCartItem(cartItemsArray, cartItem),
});

export const setCartQty = (cartItemsArray, productId, quantity) => ({
  type: SET_CART_QTY,
  payload: setQuantity(cartItemsArray, productId, quantity),
});

export const removeFromCart = (cartItemsArray, productId) => ({
  type: REMOVE_FROM_CART,
  payload: removeCartItem(cartItemsArray, productId),
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
