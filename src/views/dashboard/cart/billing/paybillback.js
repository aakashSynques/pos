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
import { useSelector, useDispatch } from "react-redux";
import ReactToPrint from "react-to-print";
import PrintContent from "./PrintContent"; // Import the PrintContent component.
import IPAddressData from "./IPAddressData"; // Import the IPAddressData component
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import {
  clearCartItems,
  clearSelectedCustomer,
  setCartSumUp,
  setSelectedCustomerJson
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
  const [socket, setSocket] = useState(null);
  const componentRef = useRef();

  const handlePrint = () => {
    if (componentRef.current) {
      componentRef.current.onPrint();
    }
  };

  useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io.connect("http://posapi.q4hosting.com"); // Replace with your server URL
    setSocket(newSocket);
  }, []);
  const dispatch = useDispatch();

  const selectedDelivery = useSelector(
    (state) => state.delivery.selectedDelivery
  );

  const selectedOutletId = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );

  const selectedOutletObj = useSelector(
    (state) => state.selectedOutlet.selectedOutlet
  );


  



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
 
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isPaymentSelected, setIsPaymentSelected] = useState(false);
  const [payAmountValue, setPayAmountValue] = useState(""); // Add payAmount state
  const [submissionInProgress, setSubmissionInProgress] = useState(false);
  const handlePayAmountKeyDown = (e) => {
    if (e.key === "Enter") {
      setPayAmountValue(e.target.value);
    }
  };

  const taxableAmount = subtotal; // The total amount before taxes
  const sgstRate = 0.025; // SGST tax rate (2.5%)
  const cgstRate = 0.025; // CGST tax rate (2.5%)
  const sgstAmount = taxableAmount * sgstRate; // Calculate SGST amount
  const cgstAmount = taxableAmount * cgstRate; // Calculate CGST amount
  const alltax = sgstAmount + cgstAmount;
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
      setSubmissionInProgress(true);
      const token = localStorage.getItem("pos_token");
      const url = "http://posapi.q4hosting.com/api/sales/finalizeSales";
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const requestBody = {
        productsInCart: cartItems,
        selectedCustomerJson: selectedCustomersJson,
        cartSumUp: cartSumUp,
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
    



      const responseData = await response.json(); // Parse the error response
      if (responseData.dataPost.salesid) {
        setUrl(
          `http://pos.q4hosting.com/posinvolce/printSales/${responseData.dataPost.salesid}/NOKOT?random=${randomValue}`
        );
      }
      if (!response.ok) {
        console.error("Error Response Data:", responseData);
        throw new Error("Network response was not ok");
      }
      dispatch(clearCartItems());
      dispatch(clearSelectedCustomer());
      // printComponentRef.current = true;
      await onClose();
      await socket.emit("add-order", responseData);
      // printComponentRef.current = {
      //   invoice_id: responseData.dataPost.invoice_id,
      //   invoice_no: responseData.dataPost.invoice_no,
      // };
      // handlePrint();
      // const invoiceId = responseData.dataPost.invoice_id;
      setSubmissionInProgress(false);
    } catch (error) {
      console.error("Error:", error);
      setSubmissionInProgress(false);
    }
  };

  let deliveryId;
  if (selectedDelivery == "Counter Sale") {
    deliveryId = 1;
  } else if (selectedDelivery == "On Table") {
    deliveryId = 2;
  } else if (selectedDelivery == "PickUp") {
    deliveryId = 3;
  } else {
    deliveryId = 4;
  }

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

  const cartSumUp = {
    invoice_id: 0,
    invoice_no: "",
    items: totalItem.toString(), // The number of items in the cart
    subTotal: subtotal.toString(),
    discountPercent: "0",
    discount: "0",
    discountType: "",
    devileryCharges: "0",
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



  const iframeRef = useRef(null);
  const [url, setUrl] = useState(null);
  const randomValue = Math.random(); // Generate a random value
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
                      <i className="fa fa-inr"></i> {item.prod_rate.toFixed(2)}
                    </CCol>
                    <CCol sm={2} xs={2} className="text-right">
                      <i className="fa fa-inr"></i> {item.prod_rate.toFixed(2)}
                    </CCol>
                  </>
                ))}
              </CRow>
            </span>

            <CRow className="billing-note">
              <CCol sm={5}>
                <b>Delivery Mode</b> <br />
                <div>{selectedDelivery}</div>
                {/* <b>DateTime : </b> <div>{new Date().toLocaleString()}</div> */}
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
                    <i className="fa fa-inr"></i> {subtotal.toFixed(2)}
                  </CCol>
                </CRow>

                <CRow className="pt-1">
                  <CCol sm={7}>Tax GST (2.5% SGST) </CCol>
                  <CCol sm={5} className="text-right">
                    <i className="fa fa-inr"></i> {totalSGST.toFixed(2)}
                  </CCol>
                </CRow>
                <CRow className="pt-1">
                  <CCol sm={7}>Tax GST (2.5% CGST)</CCol>
                  <CCol sm={5} className="text-right">
                    <i className="fa fa-inr"></i> {totalCGST.toFixed(2)}
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
                      <i className="fa fa-inr"></i> {finalPayAmount.toFixed(2)}
                    </b>
                  </CCol>
                </CRow>

                <CRow  className="dueAmt-style">
                  <CCol sm={8} className="text-right">
                    <label>
                      <input type="checkbox" /> Previous OverDue
                    </label>
                  </CCol>
                  <CCol sm={4} className="text-right">
                    <i className="fa fa-inr"></i>6766
                  </CCol>
                </CRow>

                <hr className="borders" />

                <center className="text-danger p-1 m-1">
                  {isPaymentSelected
                    ? null
                    : "**Please select the payment mode."}
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
                        {selectedPayment === 1 ? <b>Cash</b> : null}
                        {selectedPayment === 26 ? <b>HDFC QR</b> : null}
                        {selectedPayment === 30 ? <b>PayTm</b> : null}
                        {/* Add more conditions for additional payment modes */}
                      </CCol>
                      <CCol sm={5}>
                        {/* Conditionally render for selected payment modes */}
                        {selectedPayment === 1 ||
                        selectedPayment === 26 ||
                        selectedPayment === 30 ? (
                          <input
                            type="text"
                            className="form-control input-sm rounded-0 extra-info"
                            placeholder="Extra information"
                          />
                        ) : null}
                      </CCol>
                      <CCol sm={3} className="text-right">
                        {/* Conditionally render for selected payment modes */}
                        {selectedPayment === 1 ||
                        selectedPayment === 26 ||
                        selectedPayment === 30 ? (
                          <input
                            type="number"
                            value={payAmountValue}
                            className="form-control p-0 text-end rounded-0"
                            onChange={(e) => setPayAmountValue(e.target.value)} // Update payAmount state
                            onKeyDown={handlePayAmountKeyDown} // Handle Enter key press
                          />
                        ) : null}
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
                <CButton
                  type="button"
                  color={selectedPayment === 26 ? "success" : "light"}
                  onClick={() => setPayment(26)}
                >
                  HDFC QR
                </CButton>
                <CButton
                  type="button"
                  color={selectedPayment === 30 ? "success" : "light"}
                  onClick={() => setPayment(30)}
                >
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
                {/* <ReactToPrint */}
                {/* trigger={() => ( */}
                <CButton
                  color="success"
                  style={{ fontSize: "10px", width: "100%" }}
                  disabled={!selectedPayment || submissionInProgress}
                  onClick={() => finalizeOrder()}
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
              </CCol>
            </CRow>
          </CModalFooter>
        </CModal>
      </CContainer>

      <IPAddressData ref={ipAddressComponentRef} />

      <div className="d-none">
        <PrintContent
          ref={componentRef}
          selectedCustomer={selectedCustomer}
          selectedDelivery={selectedDelivery}
          cartItems={cartItems}
          subtotal={subtotal}
          totalSGST={totalSGST}
          totalCGST={totalCGST}
          finalPayAmount={finalPayAmount}
        />
      </div>
      <iframe
        ref={iframeRef}
        src={url}
        width="1"
        height="1"
        style={{ visibility: "hidden" }}
      ></iframe>
    </>
  );
};

export default PayBillsModels;
