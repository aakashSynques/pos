// actions.js
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART_QTY,
  SET_NEW_CART,
  SET_COMPLEMENTARY_NOTE,
  SET_PRODUCT_NOTE,
  SET_TOPPING_URNO,
  SET_IS_PARCEL,
  UPDATE_CUSTOMIZED,
  SET_OUTLET_LIST,
  SET_USER,
  LOGOUT_USER,
  SET_SELECTED_OUTLET_ID,
  SET_SELECTED_OUTLET_DATA,
  UPDATE_CART_ITEMS,
  SET_SELECTED_CUSTOMER,
  CLEAR_SELECTED_CUSTOMER,
  SELECT_DELIVERY,
  CLEAR_CART_ITEMS,
  SET_RECENT_BOOKINGS,
  SET_SUBMITTED_PICKUP_DATE_TIME,
  SET_ALL_PRODUCTS,
  SET_INPUT_FIELD_FOCUS,
  SET_INPUT_FIELD_BLUR,
  SET_CUSTOMER_ACCOUNT_JSON,
  SET_CART_SUM_UP,
  SET_SELECTED_CUSTOMER_JSON,
  UPDATE_TOTAL_CASH,
  UPDATE_PAY_MODE_TOTALS,
  GET_SAVE_SALE_DATA,
  SET_SELECTED_TABLE_VALUE,
  SUBMIT_DELIVERY_DATA,
  SET_PENDING_KOT_DATA,
  SET_PRODUCT_RATE,
  SET_NEWPSID_DISCARD,
  SET_DISCARD_BUTTON_ACTIVE
} from "./actionTypes";

// helper functions start

const addCartItem = (cartItemsArray, cartItem) => {
  const existingCartItem =
    cartItemsArray.length > 0 &&
    cartItemsArray.find(
      (item) =>
        item.prod_id === cartItem.prod_id && Array.isArray(item.customized)
    );
  // console.log("existingCartItem: ", existingCartItem);

  if (existingCartItem) {
    return cartItemsArray.map((item) =>
      item.prod_id === cartItem.prod_id
        ? { ...item, prod_qty: item.prod_qty + 1 }
        : item
    );
  }
  return [...cartItemsArray, { ...cartItem, prod_qty: 1 }];
};

const setQuantity = (cartItemsArray, productId, quantity) => {
  if (quantity == 0 || quantity == "") {
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
  return selectedOutlet;
};

const setIsNote = (cartItemsArray, productId, visibleNote) => {
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
          is_note: 1,
          is_prod_note: productNote,
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

  // console.log("selectedToppings: ", selectedToppings);
  let toppingsWithInfo = selectedToppings.map(
    (toppingObj) =>
      toppingObj.prod_rate != 0 && {
        ...toppingObj,
        prod_qty: 1,
        associated_prod_urno: productUrno,
      }
  );
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

const setUpdateCustomize = (cartItemsArray, productId, customjsonData) => {
  const updatedCartItems = cartItemsArray.map((item) =>
    item.prod_id === productId
      ? {
          ...item,
          customized: customjsonData,
        }
      : item
  );
  return updatedCartItems;
};

const setClearCustomization = (cartItemsArray, productId) => {
  const updatedCartItems = cartItemsArray.map((item) =>
    item.prod_id === productId
      ? {
          ...item,
          customized: [],
        }
      : item
  );

  return updatedCartItems;
};

// helper functions end

export const clearSelectedCustomer = () => ({
  type: CLEAR_SELECTED_CUSTOMER,
});

export const addToCart = (cartItemsArray, cartItem) => ({
  type: ADD_TO_CART,
  payload: addCartItem(cartItemsArray, cartItem),
});

export const setNewCart = (newCart) => ({
  type: SET_NEW_CART,
  payload: newCart,
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

export const setupdateCustomizInCart = (
  cartItemsArray,
  productId,
  customjsonData
) => ({
  type: UPDATE_CUSTOMIZED,
  payload: setUpdateCustomize(cartItemsArray, productId, customjsonData),
});

export const setClearCustomizationInCart = (
  cartItemsArray,
  productId,
  customjsonData
) => ({
  type: UPDATE_CUSTOMIZED,
  payload: setClearCustomization(cartItemsArray, productId),
});

export const setOutletList = (outletList) => ({
  type: SET_OUTLET_LIST,
  payload: outletList,
});

// login
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

// select outlet

export const setSelectedOutletId = (outletId) => {
  return {
    type: SET_SELECTED_OUTLET_ID,
    payload: outletId,
  };
};

export const setSelectedOutletData = (outletId, allOutlets) => {
  return {
    type: SET_SELECTED_OUTLET_DATA,
    payload: selectedOutletData(outletId, allOutlets),
  };
};

export const updateCartItems = (newCartItems) => {
  return {
    type: UPDATE_CART_ITEMS,
    payload: newCartItems,
  };
};

export const selectDelivery = (deliveryName) => {
  return {
    type: SELECT_DELIVERY,
    payload: deliveryName,
  };
};

export const clearCartItems = () => ({
  type: CLEAR_CART_ITEMS,
});

export const setSubmittedPickUpDateTime = (date, time) => {
  return {
    type: SET_SUBMITTED_PICKUP_DATE_TIME,
    payload: { date, time },
  };
};



export const setRecentBookings = (recentBookings) => {
  return { type: SET_RECENT_BOOKINGS, payload: recentBookings };
};

export const setAllProducts = (products) => {
  return { type: SET_ALL_PRODUCTS, payload: products };
};

export const setInputFocused = () => {
  return {
    type: SET_INPUT_FIELD_FOCUS,
  };
};

export const setOnBlur = () => {
  return {
    type: SET_INPUT_FIELD_BLUR,
  };
};

export const setSelectedCustomer = (customerData) => ({
  type: SET_SELECTED_CUSTOMER,
  payload: customerData,
});

export const setCustomerAccountJson = (customerAccJson) => ({
  type: SET_CUSTOMER_ACCOUNT_JSON,
  payload: customerAccJson,
});

export const setCartSumUp = (cartSumUp) => ({
  type: SET_CART_SUM_UP,
  payload: cartSumUp,
});
export const setSelectedCustomerJson = (customerJson) => ({
  type: SET_SELECTED_CUSTOMER_JSON,
  payload: customerJson,
});


export const updateTotalCash = (totalCash) => ({
  type: UPDATE_TOTAL_CASH,
  payload: totalCash,
});

export const updatePayModeTotalsAction = (payModeTotals) => ({
    type: UPDATE_PAY_MODE_TOTALS,
    payload: payModeTotals,
});

export const getSaveSaleData = (getSaveSale) => ({
  type : GET_SAVE_SALE_DATA,
  payload: getSaveSale,
});



export const setSelectedTableValue = (tableValue) => ({ 
    type: SET_SELECTED_TABLE_VALUE,
    payload: tableValue,
});

export const submitDeliveryData = (homedeliverydata) => ({
  type: SUBMIT_DELIVERY_DATA,
  payload: homedeliverydata,
});


export const setPendingKotData = (kotdata) => {
  return {
    type: SET_PENDING_KOT_DATA,
    payload: kotdata,
  };
};


export const setPsid = (psid) => ({
  type: 'SET_NEWPSID_DISCARD',
  payload: psid,
});



export const setDiscardButtonActive = (isActive) => {
  return {
    type: SET_DISCARD_BUTTON_ACTIVE,
    payload: isActive,
  };
};




export const setProductRateInCart = (cartItems, prodId, newRate) => {
  // Find the index of the item in the cart
  const itemIndex = cartItems.findIndex((item) => item.prod_id === prodId);

  // Create a copy of the cart items array to avoid mutating the state directly
  const updatedCartItems = [...cartItems];

  // Update the product rate for the item at the specified index
  if (itemIndex !== -1) {
    updatedCartItems[itemIndex].prod_rate = newRate;
  }

  // Return an action to update the cart with the new rate
  return {
    type: SET_PRODUCT_RATE,
    cartItems: updatedCartItems,
  };
};