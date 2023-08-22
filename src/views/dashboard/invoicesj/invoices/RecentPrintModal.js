import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import {
  CCardHeader,
  CLink,
  CCardBody,
  CCard,
  CModal,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CModalBody,
  CNavItem,
  CNav,
  CNavLink,
  CTabContent,
  CTabPane,
  CButton,
  CContainer,
  CRow,
  CCol,
} from "@coreui/react";
import { useSelector } from "react-redux";

function RecentPrintModal({ printBooking, setPrintBooking, invoiceDetails }) {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef();

  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  const selectedOutletObj = useSelector(
    (state) => state.selectedOutlet.selectedOutlet
  );

  const invoice_no = invoiceDetails && Object.keys(invoiceDetails)[0];
  const cartSumUp = invoiceDetails && invoiceDetails[invoice_no].cartSumUp;
  console.log(invoiceDetails, "38 invoice");
  console.log(isVisible);
  const productsInCart =
    invoiceDetails && invoiceDetails[invoice_no].productsInCart;
  const selectedCustomerJson =
    invoiceDetails && invoiceDetails[invoice_no].selectedCustomerJson;

  const deliveryMode = cartSumUp && cartSumUp.deliveryMode;
  const payModes =
    cartSumUp && cartSumUp.payDetails
      ? cartSumUp && cartSumUp.payDetails[0].payMode
      : undefined;

  return (
    <>
      <CModal
        width="30%"
        visible={printBooking}
        onClose={() => setPrintBooking(false)}
      >
        <CModalBody ref={componentRef}>
          <CTabContent className="text-center">
            <div>
              <strong style={{ fontSize: "1.5em" }}>
                {selectedOutletObj && selectedOutletObj.outlet_business_name}
              </strong>
              <br />
              <span>
                {selectedOutletObj && selectedOutletObj.outlet_address},{" "}
                {selectedOutletObj && selectedOutletObj.outlet_city} -
              </span>
              <br />
              <span>{selectedOutletObj && selectedOutletObj.outlet_zip}</span>
              <p>{selectedOutletObj && selectedOutletObj.outlet_contact_no}</p>
              <p
                style={{
                  borderBottomStyle: "dashed",
                  marginTop: "-3%",
                  borderColor: "black",
                  marginBottom: "1%",
                  borderWidth: "1px",
                }}
              >
                {deliveryMode == "4" ? " BILL OF SUPPLY" : "TAX INVOICE"}
              </p>
            </div>
            <CContainer>
              <CRow xs={2}>
                <React.Fragment>
                  <CCol className="text-start">
                    <span>Invoice#:</span>
                    <br />
                    <strong>{invoice_no}</strong>
                    <p>{cartSumUp && cartSumUp.eat}</p>
                  </CCol>
                  <CCol className="text-end">
                    <p>
                      {selectedCustomerJson &&
                        selectedCustomerJson.customer_name}
                      <br />
                      {selectedCustomerJson && selectedCustomerJson.mobile}
                      <br />
                      <span className="text-start">
                        {deliveryMode == "1" ? (
                          <strong
                            className="status-btn"
                            style={{
                              fontWeight: "bold",
                              fontSize: "1.1em",
                              padding: "2px",
                            }}
                          >
                            Counter Sale
                            <br />
                          </strong>
                        ) : deliveryMode == "2" ? (
                          <strong
                            className="status-btn"
                            style={{
                              fontWeight: "bold",
                              fontSize: "1em",
                              padding: "2px",
                            }}
                          >
                            on Table : {cartSumUp && cartSumUp.deliveryTableNo}
                            <br />
                          </strong>
                        ) : deliveryMode == "3" ? (
                          <strong
                            className="status-btn"
                            style={{
                              fontWeight: "bold",
                              fontSize: "1em",
                              padding: "2px",
                            }}
                          >
                            Pick Up
                            <br />
                          </strong>
                        ) : deliveryMode == "4" ? (
                          <strong
                            className="status-btn"
                            style={{
                              fontWeight: "bold",
                              fontSize: "1em",
                              padding: "2px",
                            }}
                          >
                            Home Delivery
                          </strong>
                        ) : null}
                      </span>
                    </p>
                  </CCol>
                  <p
                    style={{
                      borderBottomStyle: "dashed",
                      marginTop: "-2%",
                      borderColor: "black",
                      borderWidth: "1px",
                      marginBottom: "6px",
                    }}
                  />
                </React.Fragment>
              </CRow>
              <CRow className="text-start">
                {}
                <CCol xs={1}>Qty</CCol>
                <CCol xs={9} className="text-start">
                  Discription
                </CCol>
                <CCol xs={2} className=" text-center">
                  Rate
                </CCol>
                <p
                  style={{
                    borderBottomStyle: "dashed",
                    marginTop: "1%",
                    borderColor: "black",
                    borderWidth: "1px",
                  }}
                ></p>
              </CRow>

              <CRow>
                {productsInCart &&
                  productsInCart.map((item) => {
                    return (
                      <React.Fragment>
                        <CCol xs={1}>{item.prod_qty}</CCol>
                        <CCol xs={9} className="text-start">
                          <CRow>
                            <CCol xs={10} className=" text-start">
                              {item.prod_name}
                            </CCol>
                            <CCol xs={2} className="text-end ">
                              {item.is_parcel == "0" ? (
                                <strong
                                  style={{
                                    fontSize: "1.1em",
                                    padding: "2px",
                                  }}
                                ></strong>
                              ) : item.is_parcel == "1" ? (
                                <strong
                                  className="status-btn"
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "1em",
                                    padding: "2px",
                                    color: "gray",
                                  }}
                                >
                                  (Parcel)
                                </strong>
                              ) : null}
                            </CCol>
                          </CRow>
                        </CCol>
                        <CCol xs={2} className="text-center">
                          {Number(item.prod_rate).toFixed(2)}
                        </CCol>
                      </React.Fragment>
                    );
                  })}
                <p
                  style={{
                    borderBottomStyle: "dashed",
                    marginTop: "1%",
                    borderColor: "black",
                    borderWidth: "1px",
                  }}
                ></p>
              </CRow>

              <CRow>
                <CCol xs={3} className="text-start">
                  {cartSumUp && cartSumUp.items} <span>Item(s)</span>
                </CCol>
                <CCol xs={7} className="text-end ">
                  Sub Total
                </CCol>
                <CCol xs={2} className="text-center ">
                  {Number(cartSumUp && cartSumUp.subTotal).toFixed(2)}
                  <p
                    style={{
                      borderBottomStyle: "dashed",
                      borderColor: "black",
                      borderWidth: "1px",
                    }}
                  ></p>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs={10} className="text-end ">
                  {cartSumUp && cartSumUp.taxsplitGST[0].taxPercent}%{" "}
                  {cartSumUp && cartSumUp.taxsplitGST[0].taxType} on GST
                </CCol>
                <CCol xs={2} className="text-center ">
                  {Number(cartSumUp && cartSumUp.taxsplitGST[0].tax).toFixed(2)}
                </CCol>
              </CRow>
              <CRow>
                <CCol xs={10} className="text-end ">
                  {cartSumUp && cartSumUp.taxsplitGST[1].taxPercent}%{" "}
                  {cartSumUp && cartSumUp.taxsplitGST[1].taxType} on GST
                </CCol>
                <CCol xs={2} className="text-center ">
                  {Number(cartSumUp && cartSumUp.taxsplitGST[1].tax).toFixed(2)}

                  <p
                    style={{
                      borderBottomStyle: "dashed",
                      borderColor: "black",
                      borderWidth: "1px",
                    }}
                  ></p>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs={10} className="text-end ">
                  Bill Total
                </CCol>
                <CCol xs={2} className="text-center ">
                  {Number(cartSumUp && cartSumUp.grandTotal).toFixed(2)}
                </CCol>
                {deliveryMode == "4" ? (
                  <CRow>
                    <CCol xs="auto">
                      <span
                        className="text-start"
                        style={{
                          fontWeight: "bold",
                          fontSize: "1em",
                          padding: "2px",
                        }}
                      >
                        Home Delivery : {cartSumUp && cartSumUp.deliveryDate}{" "}
                        {cartSumUp && cartSumUp.deliveryTime}
                      </span>
                    </CCol>
                    <CCol xs="auto" className="text-start ">
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "1em",
                          padding: "2px",
                        }}
                      >
                        Receiver
                      </span>{" "}
                      : {cartSumUp && cartSumUp.receiverName}{" "}
                      {cartSumUp && cartSumUp.receiverMobileNo}
                    </CCol>
                    <CCol xs="auto" className="text-start ">
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "1em",
                          padding: "2px",
                        }}
                      >
                        At Location
                      </span>{" "}
                      : {cartSumUp && cartSumUp.deliveryAddress}
                    </CCol>
                    <CCol xs={10} className="text-start ">
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "1em",
                          padding: "2px",
                        }}
                      >
                        Ref# :
                      </span>{" "}
                      {cartSumUp && cartSumUp.up_biz_id}
                    </CCol>
                  </CRow>
                ) : (
                  ""
                )}

                <p
                  style={{
                    borderBottomStyle: "dashed",
                    borderColor: "black",
                    borderWidth: "1px",
                    marginBottom: "3px",
                  }}
                ></p>
              </CRow>

              {cartSumUp && cartSumUp.note && (
                <CRow>
                  {deliveryMode == "1" &&
                  deliveryMode == "2" &&
                  deliveryMode == "3" ? (
                    <p
                      style={{
                        borderBottomStyle: "dashed",
                        borderColor: "black",
                        marginTop: "1%",
                        borderWidth: "1px",
                      }}
                    ></p>
                  ) : (
                    ""
                  )}
                  <CCol xs={10} className="text-start ">
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "1em",
                        padding: "2px",
                      }}
                    >
                      Note :
                    </span>
                    {cartSumUp && cartSumUp.note}
                  </CCol>
                  <p
                    style={{
                      borderBottomStyle: "dashed",
                      borderColor: "black",
                      borderWidth: "1px",
                    }}
                  ></p>
                </CRow>
              )}
              <CRow>
                {cartSumUp && cartSumUp.payDetails
                  ? cartSumUp.payDetails.map((p) => (
                      <React.Fragment key={p.payMode}>
                        <CCol xs={10} className="text-end">
                          Paid By{" "}
                          <span className="text-start">
                            {p.payMode === "1" ? (
                              <strong
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "1.1em",
                                  padding: "2px",
                                }}
                              >
                                Cash
                                <br />
                              </strong>
                            ) : p.payMode === "4" ? (
                              <strong
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "1em",
                                  padding: "2px",
                                }}
                              >
                                PayTm
                                <br />
                              </strong>
                            ) : p.payMode === "6" ? (
                              <strong
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "1em",
                                  padding: "2px",
                                }}
                              >
                                Wallet
                                <br />
                              </strong>
                            ) : p.payMode === "24" ? (
                              <strong
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "1em",
                                  padding: "2px",
                                }}
                              >
                                Rzp
                                <br />
                              </strong>
                            ) : p.payMode === "25" ? (
                              <strong
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "1em",
                                  padding: "2px",
                                }}
                              >
                                HDFC CC*
                                <br />
                              </strong>
                            ) : p.payMode === "26" ? (
                              <strong
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "1em",
                                  padding: "2px",
                                }}
                              >
                                HDFC QR
                              </strong>
                            ) : null}
                          </span>
                        </CCol>
                        <CCol xs={2} className="text-center">
                          {Number(p.payAmount).toFixed(2)}
                        </CCol>
                      </React.Fragment>
                    ))
                  : null}
              </CRow>
              {cartSumUp && cartSumUp.deliveryMode && (
                <CRow>
                  {deliveryMode === "3" && (
                    <p
                      style={{
                        borderBottomStyle: "dashed",
                        borderColor: "black",
                        marginTop: "1%",
                        borderWidth: "1px",
                        marginBottom: "3px",
                      }}
                    ></p>
                  )}
                  <CCol xs={10} className="text-start ">
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "1em",
                        padding: "2px",
                      }}
                    >
                      {deliveryMode === "3" ? "Pick Up:" : ""}
                    </span>
                    {deliveryMode === "3" ? (
                      <span>
                        {cartSumUp && cartSumUp.deliveryDate}{" "}
                        {cartSumUp && cartSumUp.deliveryTime}
                      </span>
                    ) : (
                      ""
                    )}
                  </CCol>
                  {deliveryMode === "3" ? (
                    <p
                      style={{
                        borderBottomStyle: "dashed",
                        borderColor: "black",
                        borderWidth: "1px",
                      }}
                    ></p>
                  ) : (
                    ""
                  )}
                </CRow>
              )}

              <CRow>
                <CCol xs={10} className="text-start ">
                  {deliveryMode == "4" ? (
                    <span>
                      Agent -{cartSumUp && cartSumUp.salesUser.user_name}
                    </span>
                  ) : (
                    <span>
                      Sales Person -{" "}
                      {cartSumUp && cartSumUp.salesUser.user_name}
                    </span>
                  )}
                </CCol>
              </CRow>

              <CRow>
                <CCol className="text-center ">
                  {isVisible ? (
                    <strong>Thanks Visit Again</strong>
                  ) : (
                    <strong>Error</strong>
                  )}
                </CCol>
              </CRow>
            </CContainer>
          </CTabContent>
        </CModalBody>
        <CModalFooter>
          <CContainer>
            <CRow xs={2}>
              <CCol>
                <ReactToPrint
                  trigger={() => (
                    <CButton
                      style={{ background: "#26b99a", border: "none" }}
                      onClick={handleClick}
                    >
                      <i className="fa fa-print"></i> {""}Print
                    </CButton>
                  )}
                  content={() => componentRef.current}
                />
              </CCol>

              <CCol className="text-end">
                <CButton
                  color="secondary"
                  onClick={() => setPrintBooking(false)}
                >
                  Close
                </CButton>
              </CCol>
            </CRow>
          </CContainer>
        </CModalFooter>
      </CModal>
    </>
  );
}

export default RecentPrintModal;
