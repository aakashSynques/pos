// actions.js
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SET_CART_QTY,
    SET_COMPLEMENTARY_NOTE,
    SET_PRODUCT_NOTE,
    SET_TOPPING_URNO,
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
  const removeCartItem = (cartItemsArray, productId) => {
    return cartItemsArray.filter((item) => item.prod_id !== productId);
  };
  
  const setProdNote = (cartItemsArray, productId, productNote) => {
    const updatedItems = cartItemsArray.map((item) =>
      item.prod_id === productId
        ? {
            ...item,
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
  
  // const setToppingOnProd = (cartItemsArray, productId, selectedToppings) => {
  //   const updatedItems = cartItemsArray.map((item) =>
  //     item.prod_id === productId
  //       ? {
  //           ...item,
  //           // toppings: [...selectedToppings],
  //           toppings: selectedToppings[productId] || [],
  //         }
  //       : item
  //   );
  //   return updatedItems;
  // };
  
  const setToppingOnProd = (cartItemsArray, productUrno, selectedToppings) => {
    let updatedCart = cartItemsArray.filter(
      (item) => item.associated_prod_urno != productUrno
    );
    updatedCart = cartItemsArray.map((item) =>
      item.urno == productUrno
        ? {
            ...item,
            toppings: [],
          }
        : item
    );
  
    let cartWithNewToppings = updatedCart.map((cartItem) => {
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
    console.log(cartWithNewToppings);
    return cartWithNewToppings;
    // cartWithNewToppings = cartWithNewToppings.map((item) =>
    //   item.urno === productUrno
    //     ?
    //       selectedToppings.map((topping)=>{
  
    //         ...item,
    //         toppings: item.toppings.concat(item.urno),
    //       }
  
    //       )
    //       : item
  
    // );
  };
  
  // cartWithNewToppings = cartWithNewToppings.map((item) =>
  // item.urno === productUrno
  //   ? {
  //       ...item,
  //       toppings: item.toppings.concat(item.urno),
  //     }
  //   : item
  // );
  
  // helper functions end
  
  export const addToCart = (cartItemsArray, cartItem) => ({
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
  
  export const setProductNoteInCart = (
    cartItemsArray,
    productId,
    productNote
  ) => ({
    type: SET_PRODUCT_NOTE,
    payload: setProdNote(cartItemsArray, productId, productNote),
  });
  
  export const setComplementaryNoteInCart = (
    cartItemsArray,
    productId,
    complentaryNote
  ) => ({
    type: SET_COMPLEMENTARY_NOTE,
    payload: setCompNote(cartItemsArray, productId, complentaryNote),
  });
  
  export const setToppings = (cartItemsArray, productUrno, selectedToppings) => ({
    type: SET_TOPPING_URNO,
    payload: setToppingOnProd(cartItemsArray, productUrno, selectedToppings),
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
  








  import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  removeFromCart,
  setCartQty,
  setProductNoteInCart,
  setComplementaryNoteInCart,
} from "../../../action/actions";

import {
  CFormInput,
  CFormSelect,
  CRow,
  CCol,
  CContainer,
  CCollapse,
  CButton,
  CForm,
  CFormTextarea,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCard,
  CCardBody,
  CLink,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import { Button } from "bootstrap";

const CartItem = ({
  item,
  cartItems,
  getTotalAmountForItem,
  openToppingModel,
  submittedToppings,
  selectedToppings,
  toppingsData,
}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.prod_qty);
  // const [selectedToppings, setSelectedToppings] = useState([]); // State for selected toppings in this item
  const [visibleNote, setVisibleNote] = useState(false);
  const [visibleComplentary, setVisibleComplentary] = useState(false);

  const [productNote, setProductNote] = useState("");
  const [complentaryNote, setComplentaryNote] = useState("");
  // console.log(productNote, complentaryNote);

  const setCartQtyHandler = () => {
    dispatch(setCartQty(cartItems, item.prod_id, quantity));
    if (quantity >= 1000) {
      setQuantity(1000);
    }
  };

  // const handleToppingClick = (topping) => {
  //   const isSelected = selectedToppings.includes(topping.prod_id);
  //   if (isSelected) {
  //     setSelectedToppings(
  //       selectedToppings.filter((id) => id !== topping.prod_id)
  //     );
  //   } else {
  //     setSelectedToppings([...selectedToppings, topping.prod_id]);
  //   }
  // };

  // Function to calculate the total price of the selected toppings
  // console.log(item);
  const setProdNoteOnBlur = () => {
    dispatch(setProductNoteInCart(cartItems, item.prod_id, productNote));
  };

  const setCompNoteOnBlur = () => {
    dispatch(
      setComplementaryNoteInCart(cartItems, item.prod_id, complentaryNote)
    );
  };

  return (
    <>
      <tr key={item.prod_id}>
        <td>
          <b>{item.prod_name}</b> <br />
          <small>
            {item.category_name} | @  {item.prod_rate.toFixed(2)}{" "}   <br />
            {/* selected topping list */}
            {item.toppings &&
              item.toppings.map((toppingUrno) => {
                const topping = cartItems.find((t) => t.urno === toppingUrno);
                return (
                  <div key={toppingUrno}>
                    {console.log(topping)}
                    {topping ? (
                      <span>
                        {topping.prod_name} | @ <i className="fa fa-inr"></i>
                        {topping.prod_rate}
                      </span>
                    ) : null}
                  </div>
                );
              })}
          </small>
          <div className="toppings-btn">
            <CButton onClick={() => setVisibleNote(!visibleNote)}>
              <u class="text-danger">N</u>ote
            </CButton>
            <CButton onClick={() => setVisibleComplentary(!visibleComplentary)}>
              <u class="text-danger">C</u>omplementary
            </CButton>
            {item.prod_Toppings_status == 1 ? (
              <CButton
                onClick={() => openToppingModel(item.urno, item.category_heads)}
              >
                <u class="text-danger">T</u>oppings
              </CButton>
            ) : null}
          </div>
        </td>
        {/* {setQuantity(item.prod_qty)} */}
        {/* {console.log(item.prod_qty)} */}
        <td className="incree-decreement">
          <input
            type="text"
            className="w-25 text"
            value={quantity}
            onBlur={setCartQtyHandler}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <br />
          <button> Parcel</button>
        </td>
        <td className="pt-3">
          <b className="rate-font">
            <i className="fa fa-inr"></i>
           
            {getTotalAmountForItem(item)} <br />
          </b>

          {/* item remove button */}
          <span
            className="btn btn-danger btn-remove"
            onClick={() => dispatch(removeFromCart(cartItems, item.prod_id))}
          >
            <i className="fa fa-times"></i>
          </span>
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <CCollapse visible={visibleNote}>
            <CFormTextarea
              placeholder="Product Note"
              className="cart-note"
              rows={1}
              value={productNote}
              onChange={(e) => {
                setProductNote(e.target.value);
              }}
              onBlur={setProdNoteOnBlur}
            ></CFormTextarea>
          </CCollapse>
          <CCollapse visible={visibleComplentary}>
            <CFormTextarea
              placeholder="Complementary Note"
              className="cart-note"
              rows={1}
              value={complentaryNote}
              onChange={(e) => {
                setComplentaryNote(e.target.value);
              }}
              onBlur={setCompNoteOnBlur}
            ></CFormTextarea>
          </CCollapse>
        </td>
      </tr>
    </>
  );
};

export default CartItem;



// actions.js
export const setSelectedToppingsWithPrice = (productUrno, selectedToppings) => ({
    type: "SET_SELECTED_TOPPINGS_WITH_PRICE",
    payload: { productUrno, selectedToppings },
  });
  


  // reducer.js
case "SET_SELECTED_TOPPINGS_WITH_PRICE":
    return {
      ...state,
      selectedToppingsWithPrice: {
        ...state.selectedToppingsWithPrice,
        [action.payload.productUrno]: action.payload.selectedToppings,
      },
    };

    


    const setToppingOnProd = (cartItemsArray, productUrno, selectedToppings) => {
        // ... your existing code
        
        // Calculate the total price for the selected toppings
        const totalPrice = selectedToppings.reduce(
          (total, topping) => total + topping.prod_rate,
          0
        );
        
        // Dispatch action to update selected toppings and their total price
        dispatch(setSelectedToppingsWithPrice(productUrno, { toppings: selectedToppings, totalPrice }));
        
        // ... the rest of your code
};
      


// Inside CartItem component
import { useSelector } from "react-redux";

const CartItem = ({ item, /* other props */ }) => {
  // ... your existing code
  
  const selectedToppingsWithPrice = useSelector(state => state.selectedToppingsWithPrice[item.urno] || { toppings: [], totalPrice: 0 });
  
  // Calculate the total amount including selected topping prices
  const totalAmountWithToppings = getTotalAmountForItem(item) + selectedToppingsWithPrice.totalPrice;
  
  // ... rest of your component
  
  return (
    // ... your JSX
  );
};

export default CartItem;

      