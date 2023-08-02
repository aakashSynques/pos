import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { removeFromCart, setCartQty } from "../../action/actions";

import {
  CFormInput,
  CFormSelect,
  CRow,
  CCol,
  CContainer,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CLink,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";

const CartItem = ({ item, cartItems, getTotalAmountForItem }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.prod_qty);

  const setCartQtyHandler = () => {
    dispatch(setCartQty(cartItems, item.prod_id, quantity));
    if (quantity >= 1000) {
      setQuantity(1000);
    }
  };

  return (
    <tr key={item.prod_id}>
      <td>
        <b>{item.prod_name}</b> <br />
        <small>
          {item.category_name} | @ {item.prod_rate} <br />
          {/* selected topping list */}
          {/* {submittedToppings &&
            selectedToppings.map((toppingId) => {
              const topping = toppingsData.find((t) => t.prod_id === toppingId);
              return (
                <div key={toppingId}>
                  {topping ? (
                    <span>
                      {topping.prod_name} | @ <i className="fa fa-inr"></i>
                      {topping.prod_rate.toFixed(2)}
                    </span>
                  ) : null}
                </div>
              );
            })} */}
        </small>
        <div className="toppings-btn">
          <CButton>
            <u class="text-danger">N</u>ote
          </CButton>
          <CButton>
            <u class="text-danger">C</u>omplementary
          </CButton>
          {/* <CButton onClick={() => setToppingModel(!toppingModel)}>
            <u class="text-danger">T</u>oppings
          </CButton> */}
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
          {/* {item.prod_rate.toFixed(2)}{" "} */}
          {getTotalAmountForItem(item).toFixed(2)} <br />
          {/* {submittedToppings && (
          <b>Toppings : {selectedToppingsTotalPrice.toFixed(2)}</b>
        )} */}
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
  );
};

export default CartItem;
