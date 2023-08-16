import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  removeFromCart,
  setCartQty,
  setProductNoteInCart,
  setComplementaryNoteInCart,
  setParcelBtnInCart,
  setIsNoteInCart,
  setIsComplementaryNoteInCart,
} from "../../../action/actions";

import { CCollapse, CButton, CFormTextarea } from "@coreui/react";
import CustmizeModel from "./CustmizeModel";

const CartItem = ({
  item,
  cartItems,
  getTotalAmountForItem,
  openToppingModel,
}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.prod_qty);
  const [visibleNote, setVisibleNote] = useState(false);
  const [visibleComplentary, setVisibleComplentary] = useState(false);

  const [productNote, setProductNote] = useState(item.is_prod_note);
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
    const newParcelBtn = parcelBtn === 1 ? 0 : 1;
    setParcelBtn(newParcelBtn);
    dispatch(setParcelBtnInCart(cartItems, item.prod_id, newParcelBtn));
    // dispatch(setParcelBtnInCart(cartItems, item.prod_id, parcelBtn));
  };

  // const setParcelBtnBlur = () => {
  //   const newParcelBtnValue = parcelBtn ? "0" : "1"; // Toggle the value
  //   setParcelBtn(newParcelBtnValue);
  //   dispatch(setParcelBtnInCart(cartItems, item.prod_id, newParcelBtnValue));
  // };

  const noteClickHandler = (cartItems, prod_id) => {
    setVisibleNote(!visibleNote);
    if (item.is_note === 1) {
      setProductNote("");
    }
    dispatch(setIsNoteInCart(cartItems, prod_id, visibleNote));
  };

  const complentaryClickHandler = (cartItems, prod_id) => {
    setVisibleComplentary(!visibleComplentary);
    if (item.is_complementary === 1) {
      setComplentaryNote("");
    }
    dispatch(
      setIsComplementaryNoteInCart(cartItems, prod_id, visibleComplentary)
    );
  };

  const inputReference = useRef(null);
  useEffect(() => {
    if (visibleNote && inputReference.current) {
      inputReference.current.focus();
    }
    // inputReference.current.focus();
  }, []);
  console.log("visibleNote", visibleNote);

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
            <CButton
              style={{
                backgroundColor: item.is_note === 1 ? "#26B99A" : "",
                borderColor: item.is_note === 1 ? "#4cae4c" : "",
              }}
              onClick={() => noteClickHandler(cartItems, item.prod_id)}
            >
              <u className="text-danger">N</u>ote
            </CButton>
            <CButton
              style={{
                backgroundColor: item.is_complementary === 1 ? "#26B99A" : "",
                borderColor: item.is_complementary === 1 ? "#4cae4c" : "",
              }}
              onClick={() => complentaryClickHandler(cartItems, item.prod_id)}
            >
              <u className="text-danger">C</u>omplementary
            </CButton>

            {item.prod_Toppings_status == 1 ? (
              <CButton
                style={{
                  backgroundColor: item.toppings.length > 0 ? "#26B99A" : "",
                  borderColor: item.toppings.length > 0 ? "#4cae4c" : "",
                }}
                onClick={() => openToppingModel(item.urno, item.category_heads)}
              >
                <u className="text-danger">T</u>oppings
              </CButton>
            ) : null}

            {item.prod_Customized_status == 1 ? (
              <CButton
                // onClick={() => openToppingModel(item.urno, item.category_heads)}
                onClick={() => setCustomizeModelVisible(!customizeModelVisible)}
              >
                <u className="text-danger">C</u>ustomize
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
            className={
              parcelBtn === 1 ? "btn btn-success text-white" : "btn btn-light"
            }
            onClick={setParcelBtnBlur}
          >
            Parcel
          </CButton>
        </td>
        <td className="pt-3">
          <b className="rate-font">
            <i className="fa fa-inr"></i>
            {getTotalAmountForItem(item)} <br />
            {/* <input type="text" value={getTotalAmountForItem(item)} /> */}
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
        <td colspan="3" style={{ border: "0px" }}>
          <CCollapse visible={visibleNote}>
            <CFormTextarea
              placeholder="Product Note"
              className="cart-note"
              rows={1}
              // value={productNote}
              value={productNote}
              onChange={(e) => {
                setProductNote(e.target.value);
              }}
              onBlur={setProdNoteOnBlur}
              ref={inputReference}
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
              // autoFocus
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
