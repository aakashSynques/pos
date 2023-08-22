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
import { useEffect } from "react";

function PendingPrintModal({ printBooking, setPrintBooking, invoiceDetails }) {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef();

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const selectedOutletObj = useSelector(
    (state) => state.selectedOutlet.selectedOutlet
  );

  const booking_no = invoiceDetails && Object.keys(invoiceDetails)[0];
  const cartSumUp = invoiceDetails && invoiceDetails[booking_no].cartSumUp;
  // console.log(invoiceDetails, "38 invoice");

  const productsInCart =
    invoiceDetails && invoiceDetails[booking_no].productsInCart;
  const selectedCustomerJson =
    invoiceDetails && invoiceDetails[booking_no].selectedCustomerJson;

  const deliveryMode = cartSumUp && cartSumUp.deliveryMode;
  const payModes =
    cartSumUp && cartSumUp.payDetails
      ? cartSumUp && cartSumUp.payDetails[0].payMode
      : undefined;

  const grandTotal = Number(cartSumUp && cartSumUp.grandTotal).toFixed(2);
  const gst =
    selectedCustomerJson && selectedCustomerJson.gst_no
      ? selectedCustomerJson && selectedCustomerJson.gst_no
      : undefined;

  return (
    <>
      <CModal
        width="30%"
        visible={printBooking}
        onClose={() => setPrintBooking(false)}
      >
        <div ref={componentRef}>
          <CModalBody>
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
                <p>
                  {selectedOutletObj && selectedOutletObj.outlet_contact_no}
                </p>
                <p
                  style={{
                    borderBottomStyle: "dashed",
                    marginTop: "-3%",
                    borderColor: "black",
                    marginBottom: "1%",
                    borderWidth: "1px",
                  }}
                >
                  {deliveryMode == "4" ? "BOOKING ORDER" : "TAX INVOICE"}
                </p>
              </div>
              <CContainer>
                <CRow xs={2}>
                  <React.Fragment>
                    <CCol className="text-start">
                      <span>Booking#:</span>
                      <br />
                      <strong>{booking_no}</strong>
                      <p>{cartSumUp && cartSumUp.eat}</p>
                    </CCol>
                    <CCol className="text-end">
                      <p>
                        {selectedCustomerJson &&
                          selectedCustomerJson.customer_name}
                        <br />
                        {selectedCustomerJson && selectedCustomerJson.mobile}
                        {gst == undefined ? (
                          ""
                        ) : (
                          <span>
                            <br />
                            GST No: {gst}
                          </span>
                        )}
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
                              on Table :{" "}
                              {cartSumUp && cartSumUp.deliveryTableNo}
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
                  <CCol xs={11} className="text-start">
                    Discription
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
                          <CCol xs={11} className="text-start">
                            <CRow>
                              <CCol xs={10} className=" text-start">
                                {item.customized === undefined ? (
                                  <>
                                    <span>{item.prod_name}</span> <br />
                                    {item.is_prod_note ? (
                                      <>
                                        <strong
                                          style={{
                                            fontSize: "1.1em",
                                            padding: "2px",
                                          }}
                                        >
                                          <span>Product Note: </span>
                                        </strong>
                                        <span>{item.is_prod_note}</span>
                                      </>
                                    ) : null}
                                  </>
                                ) : (
                                  <>
                                    {item.customized.photo_path ? (
                                      <img
                                        src={
                                          "http://pos.q4hosting.com" +
                                          item.customized.photo_path[0]?.slice(
                                            14
                                          )
                                        }
                                        alt="Customized Cake"
                                        style={{
                                          width: "20%",
                                          height: "90%",
                                          float: "left",
                                          marginRight: "2%",
                                        }}
                                      />
                                    ) : null}
                                    {item.customized.flavor_name} |{" "}
                                    {item.customized.shape_name} |{" "}
                                    {item.customized.choice_name} |{" "}
                                    {item.customized.size_name}
                                    <br />
                                    {item.customized ? (
                                      <>
                                        {item.customized.message_on_cake ==
                                        "" ? null : (
                                          <>
                                            <strong
                                              style={{
                                                fontSize: "1.1em",
                                                padding: "2px",
                                              }}
                                            >
                                              {" "}
                                              Message on Cake:
                                            </strong>
                                            <span>
                                              {item.customized.message_on_cake}
                                            </span>
                                          </>
                                        )}

                                        <br />
                                        {item.is_prod_note == "" ? null : (
                                          <>
                                            <strong
                                              style={{
                                                fontSize: "1.1em",
                                                padding: "2px",
                                              }}
                                            >
                                              Product Note:
                                            </strong>
                                            <span>{item.is_prod_note}</span>
                                          </>
                                        )}
                                      </>
                                    ) : null}
                                  </>
                                )}
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
                        </React.Fragment>
                      );
                    })}
                  <p
                    style={{
                      borderBottomStyle: "dashed",
                      marginTop: "0%",
                      borderColor: "black",
                      borderWidth: "1px",
                    }}
                  ></p>
                </CRow>

                <CRow>
                  <CCol
                    xs={3}
                    className="text-start"
                    style={{ marginTop: "-2.5%" }}
                  >
                    {cartSumUp && cartSumUp.items} <span>Item(s)</span>
                  </CCol>
                  <p
                    style={{
                      borderBottomStyle: "dashed",
                      borderColor: "black",
                      borderWidth: "1px",
                    }}
                  ></p>
                </CRow>
                <CRow>
                  <CCol xs={10} className="text-end ">
                    Booking Total
                  </CCol>
                  <CCol xs={2} className="text-center ">
                    {grandTotal}
                    <p
                      style={{
                        borderBottomStyle: "dashed",
                        borderColor: "black",
                        borderWidth: "1px",
                      }}
                    ></p>
                  </CCol>
                  {payModes === undefined ? (
                    <>
                      <CCol xs={12} className="text-end ">
                        Advance Paid By : 0.00
                      </CCol>
                      <CCol xs={12} className="text-end ">
                        Remaining Balance : {grandTotal}
                      </CCol>
                    </>
                  ) : cartSumUp && cartSumUp.payDetails ? (
                    cartSumUp.payDetails.map((p) => (
                      <React.Fragment key={p.payMode}>
                        <CCol xs={10} className="text-end">
                          Advance Paid By{" "}
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
                        <CCol xs={12} className="text-end">
                          Remaining Balance:{" "}
                          {(grandTotal - Number(p.payAmount)).toFixed(2)}
                        </CCol>
                      </React.Fragment>
                    ))
                  ) : null}

                  <p
                    style={{
                      borderBottomStyle: "dashed",
                      borderColor: "black",
                      borderWidth: "1px",
                    }}
                  ></p>
                </CRow>

                <CRow>
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

                      <CCol xs={10} className="text-start mb-1">
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: "1em",
                            padding: "2px",
                          }}
                        >
                          Devilery Charges :
                        </span>{" "}
                        {cartSumUp &&
                          Number(cartSumUp.devileryCharges).toFixed(2)}
                        (included)
                      </CCol>
                    </CRow>
                  ) : (
                    ""
                  )}

                  {deliveryMode == "3" ? null : (
                    <p
                      style={{
                        borderBottomStyle: "dashed",
                        borderColor: "black",
                        borderWidth: "1px",
                        marginBottom: "3px",
                      }}
                    ></p>
                  )}
                </CRow>

                {cartSumUp && cartSumUp.deliveryMode && (
                  <CRow>
                    {deliveryMode === "3"}
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
                        Booking Person -
                        {cartSumUp && cartSumUp.salesUser.user_name}
                      </span>
                    ) : (
                      <span>
                        Sales Person -{" "}
                        {cartSumUp && cartSumUp.salesUser.user_name}
                      </span>
                    )}
                  </CCol>
                </CRow>
              </CContainer>
            </CTabContent>
          </CModalBody>
          {/* 
          {isVisible ? (
            <CCardBody>
              <CTabContent>
                <CContainer>
                  <CRow>
                    <CCol className="text-center">
                      <strong>Thanks Visit Again</strong>
                    </CCol>
                  </CRow>
                </CContainer>
              </CTabContent>
            </CCardBody>
          ) : (
            "hasib"
          )} */}
        </div>

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

export default PendingPrintModal;
