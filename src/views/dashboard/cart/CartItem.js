import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  removeFromCart,
  setCartQty,
  setProductNoteInCart,
  setComplementaryNoteInCart,
  setParcelBtnInCart,
  setIsNoteInCart,
  setIsComplementaryNoteInCart,
  setProductRateInCart
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
  const [quantity, setQuantity] = useState(+item.prod_qty);
  const [visibleNote, setVisibleNote] = useState(item.is_note);
  const [visibleComplentary, setVisibleComplentary] = useState(false);

  const [productNote, setProductNote] = useState(item.is_prod_note);
  const [complentaryNote, setComplentaryNote] = useState("");
  const [parcelBtn, setParcelBtn] = useState(item.is_parcel === 1);
  const [customizeModelVisible, setCustomizeModelVisible] = useState(false);
  // const [originalProdRate, setOriginalProdRate] = useState(item.prod_rate);
  const [originalProdRate, setOriginalProdRate] = useState(parseFloat(+item.prod_rate));
  const [isEditing, setIsEditing] = useState(false);


  const handleProductRateChange = (newRate) => {
    dispatch(setProductRateInCart(cartItems, item.prod_id, newRate));
    setIsEditing(false);
  };




  useEffect(() => {
    setProductNote(item.is_prod_note);
  }, [item.is_prod_note]);

  useEffect(() => {
    setVisibleNote(item.is_note);
  }, [item.is_note]);

  useEffect(() => {
    setQuantity(+item.prod_qty);
  }, [item.prod_qty]);

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

  let customizeProd_text;
  if (Array.isArray(item.customized)) {
    customizeProd_text = item.prod_name;
  } else {
    customizeProd_text = `${item.customized.flavor_name} | ${item.customized.shape_name} | ${item.customized.choice_name} | ${item.customized.size_name}`;
  }


  return (
    <>
      <tr key={item.prod_id}>
        <td style={{ paddingBottom: "13px!important" }} className="pb-2">
          {item.customized && item.customized.photo_path && (
            <img
              src={URL.createObjectURL(item.customized.photo_path[0])}
              alt="Customized"
              style={{ maxWidth: "100px", float: "left", marginRight: "10px" }}
            />
          )}
          <strong style={{ fontSize: "14px", fontWeight: "600" }} className="mb-3">{customizeProd_text}</strong> <br />
          <small className="font-size-3">
            {item.category_name} | @
            {originalProdRate}

            <br />
            {/* selected topping list */}
            {item.toppings &&
              item.toppings.map((toppingUrno) => {
                const topping = cartItems.find((t) => t.urno === toppingUrno);
                return (
                  <div key={toppingUrno}>
                    {topping ? (
                      <span>
                        {topping.prod_name} | @ <i className="fa fa-inr"></i>
                        {topping.prod_rate}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            {item.customized && (
              <>
                {item.customized.message_on_cake && (
                  <>
                    <span style={{ fontWeight: "bold" }}>
                      Message on Cake:{" "}
                    </span>
                    <span>{item.customized.message_on_cake}</span>
                    <br />
                  </>
                )}
                {item.customized.message_on_card && (
                  <>
                    <span style={{ fontWeight: "bold" }}>Message on Card:</span>
                    <span> {item.customized.message_on_card}</span>
                  </>
                )}
              </>
            )}

          </small>

          <div className="toppings-btn">
            <CButton
              style={{
                backgroundColor: item.is_note === 1 ? "#26B99A" : "",
                borderColor: item.is_note === 1 ? "#4cae4c" : "",
                color: item.is_note === 1 ? "white" : "",
              }}
              onClick={() => noteClickHandler(cartItems, item.prod_id)}
            >
              <u className="text-danger">N</u>ote
            </CButton>

            <CButton
              style={{
                backgroundColor: item.is_complementary === 1 ? "#26B99A" : "",
                borderColor: item.is_complementary === 1 ? "#4cae4c" : "",
                color: item.is_complementary === 1 ? "white" : "",
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
                  color: item.toppings.length > 0 ? "white" : "",
                }}
                onClick={() => openToppingModel(item.urno, item.category_heads)}
              >
                <u className="text-danger">T</u>oppings
              </CButton>
            ) : null}

            {item.prod_Customized_status == 1 ? (
              <CButton
                style={{
                  backgroundColor: Array.isArray(item.customized)
                    ? ""
                    : "#26B99A",
                  borderColor: Array.isArray(item.customized) ? "" : "#4cae4c",
                  color: Array.isArray(item.customized) ? "" : "white",
                }}
                onClick={() => setCustomizeModelVisible(!customizeModelVisible)}
              >
                <u className="text-danger">C</u>ustomize
              </CButton>
            ) : null}

          </div>
        </td>

        <td className="incree-decreement">
          <input
            type="text"
            className="w-25 text"
            value={quantity}
            onBlur={setCartQtyHandler}
            onChange={(e) => setQuantity(+e.target.value)}
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
          {item.prod_Customized_status === 1 ? (
            isEditing ? (
              <input
                type="number"
                value={originalProdRate}
                onChange={(e) => setOriginalProdRate(parseFloat(e.target.value))}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleProductRateChange(parseFloat(e.target.value));
                  }
                }}
                onBlur={() => setIsEditing(false)}
              />
            ) : (
              <span className="rate-font" onClick={() => setIsEditing(true)}>
                <i className="fa fa-times text-danger"></i> <b className="rate-font"> {item.prod_rate.toFixed(2)}</b>
              </span>
            )
          ) : (
            <b className="rate-font">{item.prod_rate.toFixed(2)}</b>
          )}






          {/* item remove button */}
          <span
            className="btn btn-danger btn-remove"
            onClick={() => dispatch(removeFromCart(cartItems, item.urno))}
          >
            <i className="fa fa-trash fa-xs"></i>
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
        productId={item.prod_id}
        onClose={() => setCustomizeModelVisible(false)} // Close the modal when onClose is called
        item={item}
        setVisibleNote={setVisibleNote}
      />
    </>
  );
};

export default CartItem;
