import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  removeFromCart,
  setCartQty,
  setProductNoteInCart,
  setComplementaryNoteInCart,
  setParcelBtnInCart,
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
import CustmizeModel from "./CustmizeModel";

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
  const [visibleNote, setVisibleNote] = useState(false);
  const [visibleComplentary, setVisibleComplentary] = useState(false);

  const [productNote, setProductNote] = useState("");
  const [complentaryNote, setComplentaryNote] = useState("");
  const [parcelBtn, setParcelBtn] = useState(item.is_parcel === 1);
  const [customizeModelVisible, setCustomizeModelVisible] = useState(false); 

  const setCartQtyHandler = () => {
    dispatch(setCartQty(cartItems, item.prod_id, quantity));
    if (quantity >= 1000) {
      setQuantity(1000);
    }
  };
  const handleQuantityKeyDown = (e) => {
    if (e.key === "Enter") {
      setCartQtyHandler();
    }
  };
  const setProdNoteOnBlur = () => {
    dispatch(setProductNoteInCart(cartItems, item.prod_id, productNote));
  };

  const setCompNoteOnBlur = () => {
    dispatch(
      setComplementaryNoteInCart(cartItems, item.prod_id, complentaryNote)
    );
  };

  const setParcelBtnBlur = () => {
    const newParcelBtn = parcelBtn === "1" ? "0" : "1";
    setParcelBtn(newParcelBtn);
    dispatch(setParcelBtnInCart(cartItems, item.prod_id, newParcelBtn));
    // dispatch(setParcelBtnInCart(cartItems, item.prod_id, parcelBtn));
  };

  // const setParcelBtnBlur = () => {
  //   const newParcelBtnValue = parcelBtn ? "0" : "1"; // Toggle the value
  //   setParcelBtn(newParcelBtnValue);
  //   dispatch(setParcelBtnInCart(cartItems, item.prod_id, newParcelBtnValue));
  // };

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
                    {/* {console.log(topping)} */}
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

            {item.prod_Customized_status == 1 ? (
              <CButton
                // onClick={() => openToppingModel(item.urno, item.category_heads)}
                onClick={() => setCustomizeModelVisible(!customizeModelVisible)}
              >
                  
                <u class="text-danger">C</u>ustomize
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
            onKeyDown={handleQuantityKeyDown} // Handle Enter key press
          />
          <br />
          <CButton
            className={parcelBtn === "1" ? "parcel-btn-selected" : ""}
            onClick={setParcelBtnBlur}
          >
            Parcel
          </CButton>
        </td>
        <td className="pt-3">
          <b className="rate-font">
            <i className="fa fa-inr"></i>
            {getTotalAmountForItem(item)} <br />
          </b>

          {/* item remove button */}
          <span
            className="btn btn-danger btn-remove"
            onClick={() => dispatch(removeFromCart(cartItems, item.urno))}
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

      <CustmizeModel
        customizeModelVisible={customizeModelVisible}
        onClose={() => setCustomizeModelVisible(false)} // Close the modal when onClose is called
      />   
    </>
  );
};

export default CartItem;
