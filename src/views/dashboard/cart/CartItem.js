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
            {item.category_name} | @ {item.prod_rate} <br />
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
            {/* {item.prod_rate.toFixed(2)}{" "} */}
            {getTotalAmountForItem(item)} <br />
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
