// actions.js
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART_QTY,
  SET_COMPLEMENTARY_NOTE,
  SET_PRODUCT_NOTE,
  SET_TOPPING_URNO,
  SET_IS_PARCEL,
} from "./actionTypes";

// helper functions start

const addCartItem = (cartItemsArray, cartItem) => {
  console.log(cartItem);
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

const setQuantity = (cartItemsArray, productId, quantity) => {
  if (quantity === "0" || quantity == "") {
    // If quantity is 0 or empty, remove the product from the cart
    const filteredItems = cartItemsArray.filter(
      (item) => item.prod_id !== productId
    );
    return filteredItems;
  } else {
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
const removeCartItem = (cartItemsArray, productUrno) => {
  const newFilteredArray = cartItemsArray.filter(
    (item) => item.associated_prod_urno !== productUrno
  );
  return newFilteredArray.filter((item) => item.urno !== productUrno);
};

const selectedOutletData = (outletId, allOutlets) => {
  const selectedOutlet = allOutlets.find(
    (outlet) => outlet.outlet_id === outletId
  );
  // console.log(selectedOutlet, "142");
  return selectedOutlet;
};

const setIsNote = (cartItemsArray, productId, visibleNote) => {
  console.log(visibleNote);
  const updatedItem = cartItemsArray.map((item) =>
    item.prod_id === productId
      ? {
          ...item,
          is_note: visibleNote ? 0 : 1,
        }
      : item
  );
  const updatedItems = updatedItem.map((item) =>
    item.prod_id === productId
      ? {
          ...item,
          is_prod_note: item.is_note === 0 ? "" : item.is_prod_note,
        }
      : item
  );
  return updatedItems;
};

const setProdNote = (cartItemsArray, productId, productNote) => {
  const updatedItems = cartItemsArray.map((item) =>
    item.prod_id === productId
      ? {
          ...item,
          is_prod_note: item.is_note === 1 ? productNote : "",
        }
      : item
  );
  return updatedItems;
};

const setCompNote = (cartItemsArray, productId, complentaryNote) => {
  const updatedItems = cartItemsArray.map((item) =>
    item.prod_id === productId
      ? {
          ...item,
          is_complementary_note: complentaryNote,
        }
      : item
  );
  return updatedItems;
};

const setIsCompNote = (cartItemsArray, productId, visibleComplentary) => {
  console.log(visibleComplentary);
  const updatedItem = cartItemsArray.map((item) =>
    item.prod_id === productId
      ? {
          ...item,
          is_complementary: visibleComplentary ? 0 : 1,
        }
      : item
  );
  const updatedItems = updatedItem.map((item) =>
    item.prod_id === productId
      ? {
          ...item,
          is_complementary_note:
            item.is_complementary === 0 ? "" : item.is_complementary_note,
        }
      : item
  );
  return updatedItems;
};

const setParcel = (cartItemsArray, productId, parcelBtn) => {
  const updatedItems = cartItemsArray.map((item) =>
    item.prod_id === productId
      ? {
          ...item,
          is_parcel: parcelBtn,
        }
      : item
  );
  return updatedItems;
};

const setToppingOnProd = (cartItemsArray, productUrno, selectedToppings) => {
  let updatedCart = cartItemsArray.filter(
    (item) => item.associated_prod_urno != productUrno
  );
  let newUpdatedCart = updatedCart.map((item) =>
    item.urno == productUrno
      ? {
          ...item,
          toppings: [],
        }
      : item
  );

  let cartWithNewToppings = newUpdatedCart.map((cartItem) => {
    return {
      ...cartItem,
    };
  });

  let toppingsWithInfo = selectedToppings.map((toppingObj) => ({
    ...toppingObj,
    prod_qty: 1,
    associated_prod_urno: productUrno,
  }));

  cartWithNewToppings.push(...toppingsWithInfo);
  cartWithNewToppings = cartWithNewToppings.map((item) =>
    item.urno === productUrno
      ? {
          ...item,
          toppings: item.toppings.concat(
            selectedToppings.map((topping) => topping.urno)
          ),
        }
      : item
  );
  return cartWithNewToppings;
};

const clearProdToppings = (cartItemsArray, productUrno) => {
  let updatedCart = cartItemsArray.filter(
    (item) => item.associated_prod_urno !== productUrno
  );

  let cartWithoutToppings = updatedCart.map((item) =>
    item.urno === productUrno
      ? {
          ...item,
          toppings: [],
        }
      : item
  );
  return cartWithoutToppings;
};



const setUpdateCustomize  = (cartItemsArray, productId, customjsonData) => {
  const updatedCartItems = cartItemsArray.map((item) =>
  item.prod_id === productId
    ? {
        ...item,
        customized : customjsonData,
      }
    : item
  );
  console.log('custom json data', customjsonData)
  console.log('updated item', updatedCartItems)

  return updatedCartItems;
};
// helper functions end

export const addToCart = (cartItemsArray, cartItem) => ({
  type: ADD_TO_CART,
  payload: addCartItem(cartItemsArray, cartItem),
});

export const setCartQty = (cartItemsArray, productId, quantity) => ({
  type: SET_CART_QTY,
  payload: setQuantity(cartItemsArray, productId, quantity),
});

export const removeFromCart = (cartItemsArray, productUrno) => ({
  type: REMOVE_FROM_CART,
  payload: removeCartItem(cartItemsArray, productUrno),
});

export const setProductNoteInCart = (
  cartItemsArray,
  productId,
  productNote
) => ({
  type: SET_PRODUCT_NOTE,
  payload: setProdNote(cartItemsArray, productId, productNote),
});

export const setIsNoteInCart = (cartItemsArray, productId, visibleNote) => ({
  type: SET_PRODUCT_NOTE,
  payload: setIsNote(cartItemsArray, productId, visibleNote),
});

export const setComplementaryNoteInCart = (
  cartItemsArray,
  productId,
  complentaryNote
) => ({
  type: SET_COMPLEMENTARY_NOTE,
  payload: setCompNote(cartItemsArray, productId, complentaryNote),
});

export const setIsComplementaryNoteInCart = (
  cartItemsArray,
  productId,
  visibleComplentary
) => ({
  type: SET_COMPLEMENTARY_NOTE,
  payload: setIsCompNote(cartItemsArray, productId, visibleComplentary),
});

export const setParcelBtnInCart = (cartItemsArray, productId, parcelBtn) => ({
  type: SET_IS_PARCEL,
  payload: setParcel(cartItemsArray, productId, parcelBtn),
});

export const setToppings = (cartItemsArray, productUrno, selectedToppings) => ({
  type: SET_TOPPING_URNO,
  payload: setToppingOnProd(cartItemsArray, productUrno, selectedToppings),
});

export const clearAllToppings = (cartItemsArray, productUrno) => ({
  type: SET_TOPPING_URNO,
  payload: clearProdToppings(cartItemsArray, productUrno),
});

export const setupdateCustomizInCart = (cartItemsArray, productId, customjsonData) => ({
  type: UPDATE_CUSTOMIZED,
  payload: setUpdateCustomize(cartItemsArray, productId, customjsonData),
  // payload: { cartItemsArray, productId, customjsonData },
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

export const setSelectedOutletData = (outletId, allOutlets) => {
  return {
    type: "SET_SELECTED_OUTLET_DATA",
    payload: selectedOutletData(outletId, allOutlets),
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
