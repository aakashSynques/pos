import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToppings, clearAllToppings } from "../../../action/actions";
import { fetch } from "../../../utils";
import CartItem from "./CartItem";
import PayBillsModels from "./billing/PayBillsModels";
import AnyNotes from "./AnyNotes";
import { ToastContainer, toast } from "react-toastify";
import {
  CFormInput,
  CRow,
  CCol,
  CContainer,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CInputGroup,
} from "@coreui/react";
import KOTDeliveryOnTable from "./kotmodel/KOTDeliveryOnTable";
import ChangePickUpModel from "./changePickUpDeliver/ChangePickUpModel";
import ChangeDeliveryCharge from "./changeDeliveryCharges/ChangeDeliveryCharge";
import BookingModels from "./billing/BookingModels";
const CartSection = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const selectedOutletId = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );
  const selectedCustomer = useSelector(
    (state) => state.customer.selectedCustomer
  );
  const selectedDelivery = useSelector(
    (state) => state.delivery.selectedDelivery
  );

  const submittedPickUpDateTime = useSelector(
    (state) => state.pickup.submittedPickUpDateTime
  );

  const submittedHomeDeliveryData = useSelector((state) => state.table.submittedHomeDeliveryData);
  const dispatch = useDispatch();
  const [paybillsModel, setPayBillsModel] = useState(false);
  const [bookingModels, setBookingModels] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isCartEmpty, setCartEmpty] = useState(true);
  const [visiblePicKUp, setVisiblePickUp] = useState(false);

  useEffect(() => {
    setCartEmpty(cartItems.length === 0);
  }, [cartItems]);

  const getTotalAmountForItem = (item) => {
    const rate = item.prod_rate;
    return rate;
  };

  // Function to get the subtotal amount of all products in the cart
  const getSubTotalAmount = () => {
    let subTotal = 0;
    cartItems.forEach((item) => {
      const totalAmount = getTotalAmountForItem(item);
      subTotal += totalAmount;
    });
    return subTotal;
  };

  // Constant variable for SGST rate
  const SGST_RATE = 0.025;
  const getSGSTAmountForItem = (item) => {
    const rate = item.prod_rate;
    return rate * SGST_RATE;
  };
  // Function to get the total SGST amount for all products in the cart
  const getTotalSGSTAmount = () => {
    let totalSGST = 0;
    cartItems.forEach((item) => {
      const SGSTAmount = getSGSTAmountForItem(item);
      totalSGST += SGSTAmount;
    });
    return totalSGST;
  };

  // Constant variable for CGST rate
  const CGST_RATE = 0.025;
  const getCGSTAmountForItem = (item) => {
    const rate = item.prod_rate;
    return rate * CGST_RATE;
  };
  // Function to get the total CGST amount for all products in the cart
  const getTotalCGSTAmount = () => {
    let totalCGST = 0;
    cartItems.forEach((item) => {
      const CGSTAmount = getCGSTAmountForItem(item);
      totalCGST += CGSTAmount;
    });
    return totalCGST;
  };

  // Calculate total items in the cart
  const getTotalItemsInCart = () => {
    let totalItems = 0;
    cartItems.forEach((item) => {
      totalItems += item.prod_qty;
    });
    return totalItems;
  };
  const getDeliveryAmout = +submittedHomeDeliveryData?.deliveryAmount || 0;
  const deliveryAmount = getDeliveryAmout.toFixed(2);

  // Function to calculate the final pay amount
  const getFinalPayAmount = () => {
    const subtotal = getSubTotalAmount();
    const totalTaxes = getTotalSGSTAmount() + getTotalCGSTAmount();
    const deliveryCharges = +deliveryAmount;
    const finalPayAmounttotal = subtotal + totalTaxes + deliveryCharges;
    const finalPayAmount = Math.round(finalPayAmounttotal);
    return finalPayAmount;
  };

  const getroundAmt = () => {
    const subtotal = getSubTotalAmount();
    const totalTaxes = getTotalSGSTAmount() + getTotalCGSTAmount();
    const finalPayAmounttotal = subtotal + totalTaxes;
    const finalPayAmount = Math.round(finalPayAmounttotal);
    const roundedAmountDifference = finalPayAmounttotal - finalPayAmount; // Calculate the difference
    return roundedAmountDifference.toFixed(3);
  };

  // /////////////////// quantity update /////////////////////
  useEffect(() => {
    setQuantity(quantity);
  }, [quantity]);
  const qtyRef = useRef();

  let deliveryId;
  if (selectedDelivery == "Counter Sale") {
    deliveryId = 1;
  } else if (selectedDelivery == "On Table") {
    deliveryId = 2;
  } else if (selectedDelivery == "PickUp") {
    deliveryId = 3;
  } else if (selectedDelivery == "Home Delivery") {
    deliveryId = 4;
  } else {
    null
  }





  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && event.shiftKey) {
        if (!isCartEmpty) {
          if (selectedCustomer) {
            setPayBillsModel(true);
            setBookingModel(true);
          } else {
            toast.error("Enter Customer Name First");
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartEmpty, selectedCustomer]);


    return (
    <div className="cartlist">
      <div
        className="table-height"
        style={{ overflowY: "auto", overflowX: "auto" }}
      >
        {cartItems.length > 0 ? (
          <table className="table cart-table">
            <thead>
              <tr style={{ background: "#efefef" }}>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Amt</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(
                (item) =>
                  item.associated_prod_urno === null && (
                    <CartItem
                      key={item.prod_id}
                      cartItems={cartItems}
                      item={item}
                      // getTotalAmountForItem={getTotalAmountForItem}
                      // openToppingModel={openToppingModel} // Pass the function as a prop
                      // selectedToppings={selectedToppings} // Pass the selectedToppings as a prop
                      // submittedToppings={submittedToppings} // Pass the submittedToppings as a prop
                      // toppingsData={toppingsData} // Pass the toppingsData as a prop
                    />
                  )
              )}
            </tbody>
          </table>
        ) : (
          <div className="empty-cart">
            <h6 style={{ fontSize: "20px" }}>No, Product Found in cart</h6>
            <i className="fa fa-shopping-cart"></i>
          </div>
        )}
      </div>

      {deliveryId == 2 && (
        <>
          <hr style={{ margin: "0px" }} />
          <KOTDeliveryOnTable
            selectedCustomer={selectedCustomer}
            cartItems={cartItems}
            subtotal={getSubTotalAmount()}

          />
        </>
      )}

      {/* price Table   */}
      <hr style={{ margin: "0px" }} />
      <div className="bil-table mt-2">
        <CContainer>
          <CRow>
            <CCol sm={6} className="font-size">
              Sub Total
            </CCol>
            <CCol sm={6} style={{ textAlign: "right" }} className="font-size">
              <i className="fa fa-inr"></i>
              {getSubTotalAmount().toFixed(2)}
              {/* Display the calculated subtotal */}
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6} className="font-size">
              Discount <i className="fa fa-plus-circle"></i>
              <small> [Shift + D] </small>
            </CCol>
            <CCol sm={6} className="font-size text-end">
              <i className="fa fa-inr"></i> 0.00
            </CCol>
          </CRow>
          {deliveryId == 4 ? (
            <CRow>
              <CCol sm={6} className="font-size">
                Delivery Charges  <i className="fa fa-plus-circle"></i>
                <small> [Alt + D] </small>
              </CCol>
              <CCol sm={6} style={{ color: "#a94442" }} className="font-size text-end font-w-5" >{""}
                <i className="fa fa-inr"></i>  {deliveryAmount}

              </CCol>
            </CRow>
          ) : null}
          <CRow>
            <CCol sm={6} className="font-size">
              Tax GST (2.5% SGST)
            </CCol>
            <CCol sm={6} style={{ textAlign: "right" }} className="font-size">
              <i className="fa fa-inr"></i>
              {getTotalSGSTAmount().toFixed(2)}{" "}
              {/* Display the calculated SGST amount */}
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6} className="font-size">
              Tax GST (2.5% CGST)
            </CCol>
            <CCol sm={6} style={{ textAlign: "right" }} className="font-size">
              <i className="fa fa-inr"></i>
              {getTotalCGSTAmount().toFixed(2)}{" "}
              {/* Display the calculated CGST amount */}
            </CCol>
          </CRow>

          <CRow>
            <CCol sm={8} className="font-size">
              <CRow>
                <div className="col-sm-6">
                  <button
                    className="btn pay-btn"
                    style={{ backgroundColor: "#26B99A" }}
                    type="button"
                    onClick={() => setPayBillsModel(!paybillsModel)}
                    disabled={isCartEmpty || !selectedCustomer}
                  >
                    PAY <font size="1">[ Shift + Enter ]</font>
                  </button>
                </div>

                {deliveryId == 3 || deliveryId == 4 ? (
                  <div className="col-sm-6 font-size pl-0">
                    <button
                      className="btn pay-btn btn-warning"
                      type="button"
                      onClick={() => setBookingModels(!bookingModels)}
                      disabled={isCartEmpty || !selectedCustomer}
                    >
                      BOOKING <font size="1"></font>
                    </button>
                  </div>
                ) : null}
              </CRow>
            </CCol>

            <CCol sm={4} style={{ textAlign: "right" }} className="font-size">
              <h4 className="total-price">
                <i className="fa fa-inr"></i>
                {getFinalPayAmount().toFixed(2)}{" "}
              </h4>
              <small>
                {getTotalItemsInCart()} Item(s) RoundOff{" "}
                <i className="fa fa-inr"></i> {getroundAmt()}
              </small>
            </CCol>
          </CRow>


          <hr style={{ margin: "4px 0" }} />

          <CRow>
            <CCol sm={4} className="font-size">
              Delivery Mode [F2]
            </CCol>
            <CCol sm={8} style={{ fontSize: "14px" }} className="font-size">
              <span className="pull-right">{selectedDelivery}</span> <br />
              <span className="pull-right">
                {deliveryId == 3 ? (
                  <>
                    <label>
                      <strong>DateTime :</strong>
                    </label>

                    {submittedPickUpDateTime ? (
                      <span>
                        {submittedPickUpDateTime.date}&nbsp;
                        {submittedPickUpDateTime.time}
                      </span>
                    ) : (
                      <span>{new Date().toLocaleString() + ""}</span>
                    )}
                    <br />
                    <CButton
                      className="btn btn-xs btn-warning pull-right mt-1 text-white rounded-1"
                      onClick={() => setVisiblePickUp(!visiblePicKUp)}
                    >
                      <i className="fa fa-pencil"></i> Change [ Alt + D ]
                    </CButton>
                  </>
                ) : null}
              </span>


              {deliveryId == 4 ? (
                <div className="pull-left pt-2">
                  <ChangeDeliveryCharge />
                </div>
              ) : null}
            </CCol>
            <CCol sm={12}>
              <AnyNotes />
            </CCol>
          </CRow>
        </CContainer>
      </div>
      {/* pay bills model */}
      <PayBillsModels
        visible={paybillsModel}
        onClose={() => setPayBillsModel(false)}
        cartItems={cartItems}
        subtotal={getSubTotalAmount()}
        totalSGST={getTotalSGSTAmount()}
        totalCGST={getTotalCGSTAmount()}
        finalPayAmount={getFinalPayAmount()}
        totalItem={getTotalItemsInCart()}
        selectedCustomer={selectedCustomer}
      />




      <BookingModels
        visible={bookingModels}
        onClose={() => setBookingModels(false)}
        cartItems={cartItems}
        subtotal={getSubTotalAmount()}
        totalSGST={getTotalSGSTAmount()}
        totalCGST={getTotalCGSTAmount()}
        finalPayAmount={getFinalPayAmount()}
        totalItem={getTotalItemsInCart()}
        selectedCustomer={selectedCustomer}

      />

      <ChangePickUpModel
        visiblePicKUp={visiblePicKUp}
        onClose={() => setVisiblePickUp(false)}
      />

  
    </div>
  );
};

export default CartSection;




