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
import PrintContent from "./PrintContent"; // Import the PrintContent component.
import IPAddressData from "./IPAddressData"; // Import the IPAddressData component
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import {
  clearCartItems,
  clearSelectedCustomer,
  setCartSumUp,
  setSelectedCustomerJson,
} from "../../../../action/actions";
import { BASE_URL } from "../../../../config";
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
  const dispatch = useDispatch();
  const handlePrint = () => {
    if (componentRef.current) {
      componentRef.current.onPrint();
    }
  };
  useEffect(() => {
    const newSocket = io.connect(BASE_URL);
    setSocket(newSocket);
  }, []);
  const selectedDelivery = useSelector(
    (state) => state.delivery.selectedDelivery
  );
  const selectedOutletId = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );
  const selectedOutletObj = useSelector(
    (state) => state.selectedOutlet.selectedOutlet
  );
  const selectedTableValue = useSelector((state) => state.table.selectedTableValue);
  const submittedHomeDeliveryData = useSelector((state) => state.table.submittedHomeDeliveryData);
  const getDeliveryAmout = +submittedHomeDeliveryData?.deliveryAmount || 0;
  const deliveryAmount = + getDeliveryAmout.toFixed(2);

  const submittedPickUpDateTime = useSelector(
    (state) => state.pickup.submittedPickUpDateTime
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
  const [submissionInProgress, setSubmissionInProgress] = useState(false);
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [extrainfo, setExtrainfo] = useState(""); // Define extrainfo state
  const paymentAmountInputRef = useRef(null);
  const taxableAmount = subtotal; // The total amount before taxes
  const sgstRate = 0.025; // SGST tax rate (2.5%)
  const cgstRate = 0.025; // CGST tax rate (2.5%)
  const sgstAmount = taxableAmount * sgstRate; // Calculate SGST amount
  const cgstAmount = taxableAmount * cgstRate; // Calculate CGST amount
  const alltax = sgstAmount + cgstAmount;
  const [paymentAmounts, setPaymentAmounts] = useState({});
  const setPayment = (paymentMode) => {
    if (selectedPayments.includes(paymentMode)) {
      setSelectedPayments(
        selectedPayments.filter((mode) => mode !== paymentMode)
      );
      // Remove the payment amount for this mode
      setPaymentAmounts((prevAmounts) => {
        const updatedAmounts = { ...prevAmounts };
        delete updatedAmounts[paymentMode];
        return updatedAmounts;
      });
    } else {
      setSelectedPayments([...selectedPayments, paymentMode]);
    }
  };
  useEffect(() => {
    if (selectedPayments.length > 0 && paymentAmountInputRef.current) {
      paymentAmountInputRef.current.focus();
    }
  }, [selectedPayments]);

  const getPaymentModeName = (paymentModeId) => {
    switch (paymentModeId) {
      case 1:
        return "Cash";
      case 4:
        return "PayTm";
      case 5:
        return "NEFT ";
      case 16:
        return "Cheque ";
      case 25:
        return "HDFC CC ";
      case 26:
        return "HDFC QR";
      case 27:
        return "Swiggy Dineout";
      default:
        return "Unknown";
    }
  };
  const finalizeOrder = async () => {
    try {
      setSubmissionInProgress(true);
      const token = localStorage.getItem("pos_token");
      const url = `${BASE_URL}/api/sales/finalizeSales`; // Use the BASE_URL here

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
      resetPaymentState();
      await onClose();
      await socket.emit("add-order", responseData);

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
  } else if (selectedDelivery == "Home Delivery") {
    deliveryId = 4;
  } else {
    null;
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
    devileryCharges: +submittedHomeDeliveryData?.deliveryAmount,
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
    deliveryTableNo: selectedTableValue,  //kot table number
    deliveryDate: submittedPickUpDateTime?.date || submittedHomeDeliveryData?.deliveryDate,
    deliveryTime: submittedPickUpDateTime?.time || submittedHomeDeliveryData?.deliveryTiming,
    receiverName: submittedHomeDeliveryData?.receiverName,
    receiverMobileNo: submittedHomeDeliveryData?.receiverMobile,
    deliveryAddress: submittedHomeDeliveryData?.receiverAd,
    deliveryModeDetails: "",
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

    payDetails: selectedPayments.map((paymentMode) => ({
      payMode: paymentMode,
      payExtraInfo: extrainfo,
      payAmount: paymentAmounts[paymentMode] || 0, // Use the value from paymentAmounts
    })),
  };

  dispatch(setCartSumUp(cartSumUp));
  dispatch(setSelectedCustomerJson(selectedCustomersJson));

  const iframeRef = useRef(null);
  const [url, setUrl] = useState(null);
  const randomValue = Math.random(); // Generate a random value

  const handleRemovePaymentMode = (paymentMode) => {
    setSelectedPayments((prevSelectedPayments) =>
      prevSelectedPayments.filter((mode) => mode !== paymentMode)
    );

    setPaymentAmounts((prevAmounts) => {
      const updatedAmounts = { ...prevAmounts };
      delete updatedAmounts[paymentMode];
      return updatedAmounts;
    });
  };

  const resetPaymentState = () => {
    setSelectedPayments([]);
    setPaymentAmounts({});
  };

  const [remainingBalance, setRemainingBalance] = useState(finalPayAmount);
  let paymentAmountSum = 0;
  const handlePaymentAmountKeyDown = (e, paymentMode) => {
    if (e.key === "Enter") {
      const updatedPaymentAmounts = {
        ...paymentAmounts,
        [paymentMode]: parseFloat(e.target.value) || 0,
      };
      setPaymentAmounts(updatedPaymentAmounts);
      console.log('updatedPaymentAmounts', updatedPaymentAmounts);

      paymentAmountSum = Object.values(updatedPaymentAmounts).reduce(
        (sum, amount) => sum + parseFloat(amount || 0),
        0
      );
      const balance = paymentAmountSum - finalPayAmount;
      setRemainingBalance(balance)
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        if (selectedPayments.length > 0) {
          finalizeOrder();
        } else {
          toast.error("Please select at least one payment mode.");
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPayments]);

  const buttonRef = useRef(null);
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }, []);

  return (
    <>
      <CContainer>
        <CModal
          visible={visible}
          onClose={onClose}
          className="bills-model-width"
        >
          <CModalHeader onClose={onClose} tabindex="-1" className="pt-2 pb-2">
            <CModalTitle>Sales Summary</CModalTitle>
          </CModalHeader>
          <CModalBody className="pt-1">
            <span>
              <font size="2">
                {selectedCustomer && (
                  <>
                    <font className="font-size-14 font-w-5">Customer Details:</font>{" "}
                    <font className="font-size-14 font-w-5">{selectedCustomer.json.customer_name}</font> <br />
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

              <CRow className="pt-2">
                {cartItems.map((item) => (
                  !item.associated_prod_urno ? (
                    <>
                      <CCol sm={7} xs={7} className="kot-border-b">

                        {item.customized && item.customized.photo_path && (
                          <img
                            src={URL.createObjectURL(item.customized.photo_path[0])}
                            alt="Customized"
                            style={{ maxWidth: "50px", float: "left", marginRight: "10px" }}
                          />
                        )}
                        {item.prod_Customized_status === 1 ? (
                          <>
                            <font size="3" className="font-size-14 text-uppercase">
                              {item.customized.flavor_name &&
                                item.customized.shape_name &&
                                item.customized.choice_name &&
                                item.customized.size_name
                                ? `${item.customized.flavor_name} | ${item.customized.shape_name} | ${item.customized.choice_name} | ${item.customized.size_name}`
                                : item.prod_name}
                            </font>{" "}
                            <br />
                            <small className="pull-left font-size-3">
                              <strong>Message on Cake:</strong>{" "}
                              <span>{item.customized.message_on_cake}</span>{" "}
                              <br />
                              <strong>Message on Card:</strong>{" "}
                              <span>{item.customized.message_on_cake}</span>
                            </small>
                          </>
                        ) : (
                          <>
                            <font size="3" className="font-size-14">{item.prod_name}
                            </font><br />
                            <span>
                              {item.prod_Toppings_status === 1 && (
                                <>
                                  {
                                    item.toppings &&
                                    item.toppings.map((toppingUrno, index) => {
                                      const topping = cartItems.find((t) => t.urno === toppingUrno);
                                      return (
                                        <font size="1" color="gray" key={index}>
                                          {topping ? (
                                            <font size="1" color="gray">
                                              {index > 0 && " + "}{topping.prod_name.trim()}
                                            </font>
                                          ) : null}
                                        </font>
                                      );
                                    })
                                  }

                                </>
                              )}
                            </span>
                          </>
                        )}

                        <small>
                          {item.is_parcel === 1 && (
                            <font size="1" className="text-primary pull right">
                              Parcel &nbsp;
                            </font>
                          )}

                          {item.is_complementary === 1 && (
                            <font size="1" className="text-primary pull right">
                              Complementary &nbsp;
                            </font>
                          )}
                        </small>

                        <br />
                        <small
                          className="text-danger"
                          style={{ fontSize: "10px" }}
                        >
                          {item.is_note === 1 && (
                            <>Note : {item.is_prod_note}, &nbsp;</>
                          )}

                          {item.is_complementary === 1 && (
                            <>{item.is_complementary_note}, &nbsp;</>
                          )}
                        </small>
                      </CCol>

                      <CCol sm={1} xs={1} className="text-center kot-border-b">
                        <font className="font-size-14">{item.prod_qty}</font>
                      </CCol>
                      <CCol sm={2} xs={2} className="text-center kot-border-b">
                        <font className="font-size-14"><i className="fa fa-inr"></i> {item.prod_rate.toFixed(2)}</font>
                      </CCol>
                      <CCol sm={2} xs={2} className="text-right kot-border-b">
                        <font className="font-size-14"> <i className="fa fa-inr"></i> {item.prod_rate.toFixed(2)}</font>
                      </CCol>
                    </>
                  ) : null // If associated_prod_urno is present, return null (don't render the item)
                ))}
              </CRow>
            </span>

            <CRow className="billing-note">
              <CCol sm={5}>
                <font className="font-size-2 font-w-5">Delivery Mode</font> <br />
                <small>{selectedDelivery}
                  {deliveryId == 2 && (<>
                    : {selectedTableValue}
                  </>
                  )}

                  {deliveryId === 3 && (
                    <> <br />
                      <font className="font-size-2 font-w-5">DateTime : </font>

                      {submittedPickUpDateTime ? (
                        <span className="font-size-2">
                          {submittedPickUpDateTime.date}&nbsp;
                          {submittedPickUpDateTime.time}
                        </span>
                      ) : (
                        <span>{new Date().toLocaleString() + ""}</span>
                      )}
                    </>
                  )}
                  {deliveryId == 4 && (
                    <> <br />
                      <font className="font-size-2 font-w-5">DateTime : </font>
                      <span className="font-size-2"> {submittedHomeDeliveryData?.deliveryDate} {submittedHomeDeliveryData?.deliveryTiming} </span> <br />
                      <font className="font-size-2 font-w-5">Receiver : </font>
                      <span className="font-size-2">   {submittedHomeDeliveryData?.receiverName}   ({submittedHomeDeliveryData?.receiverMobile}) </span> <br />
                      <font className="font-size-2 font-w-5">Address: </font>
                      <span className="font-size-2">   {submittedHomeDeliveryData?.receiverAd}</span>
                    </>
                  )}

                </small> <br />

                <font className="font-size-14 font-w-5">Note</font>
              </CCol>

              <CCol sm={7} style={{ backgroundColor: "white" }}>
                <CRow>
                  <CCol sm={4}>
                    <font className="font-size-14 font-w-5">Total</font>
                  </CCol>
                  <CCol sm={4} className="text-left">
                    <font size="2" className="font-size-14"> {totalItem} Item(s)</font>
                  </CCol>
                  <CCol sm={4} className="text-right">
                    <font className="font-size-14"> <i className="fa fa-inr"></i> {subtotal.toFixed(2)}</font>
                  </CCol>
                </CRow>


                {deliveryId === 4 && (
                  <>
                    <CRow>
                      <CCol sm={6}>
                        <font className="font-size-14 font-w-5">Delivery Charges </font>
                      </CCol>
                      <CCol sm={6} className="text-right">
                        <font className="font-size-14 font-w-5" style={{ color: "#a94442" }}> <i className="fa fa-inr"></i> {""}
                          {deliveryAmount.toFixed(2)}
                        </font>
                      </CCol>
                    </CRow>
                  </>
                )}

                <CRow className="pt-1">
                  <CCol sm={7} className="font-size-14">
                    Tax GST (2.5% SGST)
                  </CCol>
                  <CCol sm={5} className="text-right font-size-14">
                    <i className="fa fa-inr"></i> {totalSGST.toFixed(2)}
                  </CCol>
                </CRow>
                <CRow className="pt-1 font-size-14">
                  <CCol sm={7}>Tax GST (2.5% CGST)</CCol>
                  <CCol sm={5} className="text-right">
                    <i className="fa fa-inr"></i> {totalCGST.toFixed(2)}
                  </CCol>
                </CRow>

                <hr className="borders" />
                <CRow className="pb-1 text-success">
                  <CCol sm={7}>
                    <font className="font-size font-w-5" style={{ color: "#26B99A" }}>
                      Payable Amount
                    </font>
                  </CCol>
                  <CCol sm={5} className="text-right">
                    <font className="font-size font-w-5" style={{ color: "#26B99A" }}>
                      <i className="fa fa-inr"></i> {finalPayAmount.toFixed(2)}
                    </font>
                  </CCol>
                </CRow>
                <hr className="borders" />
                {selectedPayments.length === 0 && (
                  <center className="font-size-2 p-1 m-1" style={{ color: "#a94442" }}>
                    "**Please select the payment mode."
                  </center>
                )}
                <CRow>
                  {selectedPayments.length > 0 &&
                    selectedPayments.map((paymentMode) => (
                      <>
                        <CCol sm={1}>
                          {" "}
                          <CButton
                            className="btn-invisible p-0"
                            onClick={() => handleRemovePaymentMode(paymentMode)}
                          >
                            <i className="fa fa-trash fa-xs"></i>
                          </CButton>
                        </CCol>
                        <CCol sm={3}>
                          <font className="font-size-14 font-w-5">{getPaymentModeName(paymentMode)}</font>
                        </CCol>
                        <CCol sm={5}>
                          <input
                            type="text"
                            className="form-control input-sm rounded-0 extra-info"
                            placeholder="Extra information"
                            value={extrainfo}
                            onChange={(e) => setExtrainfo(e.target.value)}
                          />
                        </CCol>
                        <CCol sm={3} style={{ margin: "2px 0" }}>
                          <input
                            type="text"
                            style={{ height: '25px' }}
                            ref={paymentAmountInputRef}
                            value={paymentAmounts[paymentMode] || ""}
                            className="form-control input-sm rounded-0 p-1 text-end font-size-2"
                            onChange={(e) =>
                              setPaymentAmounts({
                                ...paymentAmounts,
                                [paymentMode]: e.target.value,
                              })
                            }
                            onKeyDown={(e) =>
                              handlePaymentAmountKeyDown(e, paymentMode)
                            }
                          />

                        </CCol>
                      </>
                    ))}
                </CRow>
                <hr className="mt-2 m-0 p-0" />
                {selectedPayments.length > 0 && (
                  <CRow className="text-end pt-2">
                    <CCol sm={12}>
                      <b>
                        {remainingBalance < 0
                          ? <span className="text-danger">Balance : &nbsp;&nbsp; <i class="fa fa-inr"></i> {Math.abs(remainingBalance).toFixed(2)}</span>
                          : remainingBalance > 0
                            ? <span className="text-success">Advance : &nbsp;&nbsp;  <i class="fa fa-inr"></i> {remainingBalance.toFixed(2)}</span>
                            : <span className="text-primary"><i class="fa fa-inr"></i> {remainingBalance.toFixed(2)}</span>}
                      </b>

                    </CCol>
                  </CRow>
                )}
              </CCol>
            </CRow>
          </CModalBody>

          <CModalFooter style={{ display: "block" }} className="p-0">
            <CRow className="pt-2">
              <CCol sm={8} className="pay-mode-btn p-0">
                <CButton
                  type="button"
                  color={selectedPayments.includes(1) ? "success" : "light"}
                  onClick={() => setPayment(1)}
                  tabindex="0"

                >
                  Cash
                </CButton>
                <CButton
                  type="button"
                  color={selectedPayments.includes(26) ? "success" : "light"}
                  onClick={() => setPayment(26)}
                >
                  HDFC QR
                </CButton>

                <CButton
                  type="button"
                  color={selectedPayments.includes(25) ? "success" : "light"}
                  onClick={() => setPayment(25)}
                >
                  HDFC CC
                </CButton>

                <CButton
                  type="button"
                  color={selectedPayments.includes(4) ? "success" : "light"}
                  onClick={() => setPayment(4)}
                >
                  PayTm
                </CButton>

                <CButton
                  type="button"
                  color={selectedPayments.includes(27) ? "success" : "light"}
                  onClick={() => setPayment(27)}
                >
                  Swiggy Dineout
                </CButton>
                <CButton
                  type="button"
                  color={selectedPayments.includes(5) ? "success" : "light"}
                  onClick={() => setPayment(5)}
                >
                  NEFT
                </CButton>
                <CButton
                  type="button"
                  color={selectedPayments.includes(16) ? "success" : "light"}
                  onClick={() => setPayment(16)}
                >
                  Cheque
                </CButton>

                {/* Add more payment buttons as needed */}

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
                <CButton
                  color="success"
                  style={{ fontSize: "10px", width: "100%" }}
                  disabled={!selectedPayments.length || submissionInProgress}
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

      <span className="d-none">
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
      </span>

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
