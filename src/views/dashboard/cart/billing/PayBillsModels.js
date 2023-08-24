import {
  CModal,
  CButton,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CRow,
  CCol,
  CContainer,
  CFormInput,
} from "@coreui/react";
import React, { useState, useEffect, useRef } from "react";
import { useSelector,  useDispatch } from "react-redux";
import ReactToPrint from "react-to-print";
import PrintContent from "./PrintContent"; // Import the PrintContent component.
import IPAddressData from "./IPAddressData"; // Import the IPAddressData component
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  clearCartItems
} from "../../../../action/actions";




const PayBillsModels = ({
  visible,
  onClose,
  cartItems,
  subtotal,
  totalSGST,
  totalCGST,
  finalPayAmount,
  totalItem,
  selectedCustomer, // Access selectedCustomer prop
  anyNotesContent, // Receive the note content
}) => {
  const dispatch = useDispatch();


  const selectedDelivery = useSelector(
    (state) => state.delivery.selectedDelivery
  );
  console.log("delivery", selectedDelivery);
  const selectedOutletId = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );
  console.log("selected outlet", selectedOutletId);

  const selectedOutletObj = useSelector(
    (state) => state.selectedOutlet.selectedOutlet
  );
  console.log("selectedOutletObj:", selectedOutletObj && selectedOutletObj.eby);

  const ipAddressComponentRef = useRef(); // Create a ref to access the IPAddressData component
  const publicIp = ipAddressComponentRef.current?.getPublicIp(); // Access the getPublicIp function
  // user details
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  console.log("login user", user);

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isPaymentSelected, setIsPaymentSelected] = useState(false);
  const [payAmountValue, setPayAmountValue] = useState(""); // Add payAmount state
  const [submissionInProgress, setSubmissionInProgress] = useState(false);
  const handlePayAmountKeyDown = (e) => {
    if (e.key === "Enter") {
      setPayAmountValue(e.target.value);
    }
  };
  // console.log("pay amount", payAmountValue);

  const taxableAmount = subtotal; // The total amount before taxes
  const sgstRate = 0.025; // SGST tax rate (2.5%)
  const cgstRate = 0.025; // CGST tax rate (2.5%)
  const sgstAmount = taxableAmount * sgstRate; // Calculate SGST amount
  const cgstAmount = taxableAmount * cgstRate; // Calculate CGST amount
  const alltax = sgstAmount + cgstAmount;
  console.log("all tax", alltax);
  const resetPayment = () => {
    setSelectedPayment(null);
    setIsPaymentSelected(false);
    setPayAmountValue("");
  };

  const setPayment = (paymentMode) => {
    setSelectedPayment(paymentMode);
    setIsPaymentSelected(true); // Step 2
  };
  const printComponentRef = useRef();

  const finalizeOrder = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const url = "http://posapi.q4hosting.com/api/sales/finalizeSales";
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const requestBody = {
        productsInCart: [cartItems[0]], // Fill with actual cart items
        selectedCustomerJson: selectedCustomersJson, // Fill with selected customer data
        cartSumUp: cartSumUp, // Fill with cart summary data
        machine_id: 0,
        machine_mode: 0,
        machine_amount: 0,
        book_id: 0,
        psid: 0,
        dkotids: "",
      };
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        toast.success("Order finalized successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        }); 
        dispatch(clearCartItems());
        console.log('cler',clearCartItems())       
        const responseData = await response.json(); // Parse the error response
        console.error("Error Response Data:", responseData);
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Response:", responseData);
      printComponentRef.current = true;
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };


  let deliveryId;
  if (selectedDelivery == "Counter Sale")  { deliveryId = 1 }
  else if (selectedDelivery == "On Table") { deliveryId = 2 }
  else if (selectedDelivery == "PickUp") { deliveryId = 3 }
  else { deliveryId = 4 } console.log("id", deliveryId)


  const selectedCustomersJson =
    selectedCustomer && selectedCustomer.json
      ? {
          cust_id: selectedCustomer.json.cust_id,
          cust_type_id: selectedCustomer.json.cust_type_id,
          cust_type_name: selectedCustomer.json.cust_type_name,
          customer_name: selectedCustomer.json.customer_name,
          email: selectedCustomer.json.email,
          mobile: selectedCustomer.json.mobile,
          alt_mobile: selectedCustomer.json.alt_mobile,
          address: selectedCustomer.json.address,
          pincode: selectedCustomer.json.pincode,
          extra_note: selectedCustomer.json.extra_note,
          pan_no: selectedCustomer.json.pan_no,
          gst_no: selectedCustomer.json.gst_no,
          eat: selectedCustomer.json.eat,
          user_name: selectedCustomer.json.user_name,
        }
      : null;

  console.log("select cust", selectedCustomersJson);

  const cartSumUp = {
    invoice_id: 0,
    invoice_no: "",
    items: totalItem.toString(), // The number of items in the cart
    subTotal: subtotal.toString(),
    discountPercent: 0,
    discount: 0,
    discountType: "",
    deliveryCharges: 0,
    tax: alltax,
    taxsplitGST: [
      {
        taxType: "SGST",
        tax: sgstAmount.toFixed(2), // Convert to fixed decimal places if needed
        taxPercent: sgstRate * 100,
      },
      {
        taxType: "CGST",
        tax: cgstAmount.toFixed(2),
        taxPercent: cgstRate * 100,
      },
      {
        taxType: "IGST",
        tax: 0,
        taxPercent: 0,
      },
    ],
    roundoff: 0,
    grandTotal: finalPayAmount.toFixed(2),
    outlet_id: selectedOutletId,
    deliveryMode: deliveryId,
    deliveryTableNo: "",
    deliveryDate: "",
    deliveryTime: "",
    receiverName: "",
    receiverMobileNo: "",
    deliveryAddress: "",
    deliveryModeDetails: selectedPayment,
    note: "",
    discountNote: "",
    eby: selectedOutletObj && selectedOutletObj.eby,
    salesUser: user
      ? {
          user_id: user.user_id,
          user_name: user.user_name,
          user_mobile: user.user_mobile,
          user_email: user.user_email,
        }
      : null,
    Ip: publicIp,
    Browser: window.navigator.userAgent,
    ZSU_order_no: "",
    payDetails: [
      {
        payMode: selectedPayment, // Fill in the payment mode
        payExtraInfo: "",
        payAmount: payAmountValue, // Fill in the payment amount
      },
    ],
  };
  console.log("cartsumup", cartSumUp);

  return (
    <>
      <CContainer>
        <CModal
          visible={visible}
          onClose={onClose}
          className="bills-model-width"
        >
          <CModalHeader onClose={onClose} className="pt-2 pb-2">
            <CModalTitle>Sales Summary</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <span>
              <font size="2">
                {selectedCustomer && (
                  <>
                    <b>Customer Details:</b>{" "}
                    <b>{selectedCustomer.json.customer_name}</b> <br />
                    <font size="2">
                      <CFormLabel className="label-default cust-label">
                        {selectedCustomer.json.cust_type_name} Account
                      </CFormLabel>
                    </font>
                    <font size="1"> - {selectedCustomer.json.mobile}</font>{" "}
                    <br />
                  </>
                )}
              </font>
              <CRow className="bill-head-bg mt-2 mb-2">
                <CCol sm={7} xs={7}>
                  <b>Product Details</b>
                </CCol>
                <CCol sm={1} xs={1} className="text-center">
                  <b>Qty</b>
                </CCol>
                <CCol sm={2} xs={2} className="text-center">
                  <b>Rate</b>
                </CCol>
                <CCol sm={2} xs={2} className="text-right">
                  <b>Amount</b>
                </CCol>
              </CRow>

              <CRow className="pt-2 pb-2">
                {cartItems.map((item) => (
                  <>
                    <CCol sm={7} xs={7}>
                      <b>{item.prod_name}</b>
                      {item.is_parcel === 1 && (
                        <font size="1" className="text-primary pull-right">
                          Parcel &nbsp;
                        </font>
                      )}

                      {item.is_complementary === 1 && (
                        <font size="1" className="text-primary pull-right">
                          Complementary &nbsp;
                        </font>
                      )}
                      <br />
                      {item.is_note === 1 && (
                        <small className="text-danger">
                          Note : {item.is_prod_note}, &nbsp;
                        </small>
                      )}
                      {item.is_complementary === 1 && (
                        <small
                          className="text-danger"
                          style={{ fontSize: "10px" }}
                        >
                          Compli: {item.is_complementary_note}, &nbsp;
                        </small>
                      )}
                    </CCol>

                    <CCol sm={1} xs={1} className="text-center">
                      {item.prod_qty}
                    </CCol>
                    <CCol sm={2} xs={2} className="text-center">
                      <i className="fa fa-inr"></i> {item.prod_rate}
                    </CCol>
                    <CCol sm={2} xs={2} className="text-right">
                      <i className="fa fa-inr"></i> {item.prod_rate}
                    </CCol>
                  </>
                ))}
              </CRow>
            </span>

            <CRow className="billing-note">
              <CCol sm={5}>
                <b>Delivery Mode</b> <br />
                <div>{selectedDelivery}</div>
                <b>DateTime : </b> <div>{new Date().toLocaleString()}</div>
                <b>Note</b>
              </CCol>

              <CCol sm={7} style={{ backgroundColor: "white" }}>
                <hr className="borders" />
                <CRow>
                  <CCol sm={4}>
                    <b>Total</b>
                  </CCol>
                  <CCol sm={4} className="text-left">
                    {totalItem} Item(s)
                  </CCol>
                  <CCol sm={4} className="text-right">
                    <i className="fa fa-inr"></i> {subtotal}
                  </CCol>
                </CRow>

                <CRow className="pt-1">
                  <CCol sm={7}>Tax GST (2.5% SGST) </CCol>
                  <CCol sm={5} className="text-right">
                    <i className="fa fa-inr"></i> {totalSGST}
                  </CCol>
                </CRow>
                <CRow className="pt-1">
                  <CCol sm={7}>Tax GST (2.5% CGST)</CCol>
                  <CCol sm={5} className="text-right">
                    <i className="fa fa-inr"></i> {totalCGST}
                  </CCol>
                </CRow>

                <hr className="borders" />
                <CRow className="pb-1 text-success">
                  <CCol sm={7}>
                    <b size="2" style={{ color: "#26B99A" }}>
                      Payable Amount
                    </b>
                  </CCol>
                  <CCol sm={5} className="text-right">
                    <b style={{ color: "#26B99A" }}>
                      <i className="fa fa-inr"></i> {finalPayAmount}
                    </b>
                  </CCol>
                </CRow>
                <hr className="borders" />

                <center className="text-danger p-1 m-1">
                  {isPaymentSelected
                    ? null
                    : "** Please select the payment mode."}
                </center>
                <CRow>
                  {selectedPayment && (
                    <>
                      <CCol sm={1}>
                        <CButton
                          className="btn-invisible p-0"
                          onClick={() => resetPayment()}
                        >
                          <i className="fa fa-trash fa-xs"></i>
                        </CButton>
                      </CCol>
                      <CCol sm={3}>
                        <b>{selectedPayment === 1 ? "Cash" : ""}</b>
                      </CCol>
                      <CCol sm={5}>
                        <input
                          type="text"
                          className="form-control input-sm rounded-0 extra-info"
                          placeholder="Extra information"
                        />
                      </CCol>
                      <CCol sm={3} className="text-right">
                        <input
                          type="number"
                          value={payAmountValue}
                          className="form-control p-0 text-end rounded-0"
                          onChange={(e) => setPayAmountValue(e.target.value)} // Update payAmount state
                          onKeyDown={handlePayAmountKeyDown} // Handle Enter key press
                        />
                      </CCol>
                    </>
                  )}
                </CRow>

                <hr
                  className="mt-2"
                  style={{ margin: "0px", padding: "0px" }}
                ></hr>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter style={{ display: "block" }} className="p-0">
            <CRow className="pt-2">
              {/* payment mode button */}
              <CCol sm={8} className="pay-mode-btn p-0">
                <CButton
                  type="button"
                  color={selectedPayment === 1 ? "success" : "light"}
                  tabIndex="0"
                  onClick={() => setPayment(1)}
                >
                  Cash
                </CButton>
                <CButton type="button" color="light" onclick="setPayment(26)">
                  HDFC QR
                </CButton>

                <hr className="borders" />
                <CButton type="button" color="light">
                  <i className="fa fa-square text-success"></i> Machine (HDFC 1){" "}
                </CButton>
                <CButton type="button" color="light">
                  <i className="fa fa-square text-danger"></i> Machine (HDFC 2){" "}
                </CButton>
                <CButton type="button" color="light">
                  <i className="fa fa-square text-secondary"></i> Machine (HDFC
                  3){" "}
                </CButton>
                <CButton type="button" color="light">
                  <i className="fa fa-square text-primary"></i> Machine (HDFC 4){" "}
                </CButton>
              </CCol>
              <CCol sm={4} className="pr-1">
              <ReactToPrint
  trigger={() => (
    <CButton
      color="success"
      style={{ fontSize: "10px", width: "100%" }}
      disabled={submissionInProgress}
            onClick={() => finalizeOrder()} // Call the finalizeOrder function

    >
      {submissionInProgress ? (
        <>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        <>
          <b>FINALIZE ORDER</b>
          <br />[ Ctrl + Enter ]
        </>
      )}
      <ToastContainer />
    </CButton>
  )}
  content={() => printComponentRef.current}
  onBeforePrint={() => {
    setSubmissionInProgress(true); // Set submission in progress
    finalizeOrder(); // Call your submission function
  }}
  onAfterPrint={() => {
    // Handle any post-printing logic here
    setSubmissionInProgress(false); // Reset submission state if needed
  }}
/>

                                
          {/* <CButton
                  color="success"
                  style={{ fontSize: "10px", width: "100%" }}
                  onClick={finalizeOrder}
                  disabled={submissionInProgress} // Disable the button while submission is in progress
                >
                  {submissionInProgress ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Loading...</span>
                    </>
                  ) : (
                    <>
                      <b>FINALIZE ORDER</b>
                      <br />[ Ctrl + Enter ]
                    </>
                  )}
                  <ToastContainer />
                </CButton> */}
                                
                                {/* <ReactToPrint
                  trigger={() => (
                    <CButton
                      color="success"
                      style={{ fontSize: "10px", width: "100%" }}
                      onClick={() => finalizeOrder()} // Call the finalizeOrder function 
                   >
                      <b>FINALIZE ORDER </b>
                      <br />[ Ctrl + Enter ]
                    </CButton>
                  )}
                  content={() => printComponentRef.current} // Pass the ref of the PrintContent component
                /> */}
              </CCol>
            </CRow>
          </CModalFooter>
        </CModal>
      </CContainer>

      <IPAddressData ref={ipAddressComponentRef} />
      {/* {printComponentRef.current && (
        <PrintComponent cartSumUp={cartSumUp} />
      )} */}

      <div className="d-none">
        <PrintContent
          ref={printComponentRef}
          selectedCustomer={selectedCustomer}
          selectedDelivery={selectedDelivery}
          cartItems={cartItems}
          subtotal={subtotal}
          totalSGST={totalSGST}
          totalCGST={totalCGST}
          finalPayAmount={finalPayAmount}
        />
      </div>
    </>
  );
};

export default PayBillsModels;