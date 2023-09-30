import React, { useEffect, useRef, useState } from "react";
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
import axios from "axios";

function RecentPrintModal({
  printBooking,
  setPrintBooking,
  invoiceDetails,
  salesid,
  setSalesid,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef();
  const iframeRef = useRef(null);

  const selectedOutletObj = useSelector(
    (state) => state.selectedOutlet.selectedOutlet
  );
  const recentBooking = useSelector(
    (state) => state.recentBooking.recentBookings
  );
  const randomValue = Math.random(); // Generate a random value

  const invoice_no = invoiceDetails && Object.keys(invoiceDetails)[0];
  const cartSumUp = invoiceDetails && invoiceDetails[invoice_no].cartSumUp;

  const productsInCart =
    invoiceDetails && invoiceDetails[invoice_no].productsInCart;
  const selectedCustomerJson =
    invoiceDetails && invoiceDetails[invoice_no].selectedCustomerJson;

  const deliveryMode = cartSumUp && cartSumUp.deliveryMode;
  const payModes =
    cartSumUp && cartSumUp.payDetails
      ? cartSumUp && cartSumUp.payDetails[0].payMode
      : undefined;

  const [iframeOpen, setIframeOpen] = useState(false);
  const [url, setUrl] = useState(null);
  const handlePrint = (e) => {
    if (salesid) {
      setPrintBooking(!true);
      setIframeOpen(!true);
      setUrl(
        `http://pos.q4hosting.com/posinvolce/printSales/${salesid}/NOKOT?random=${randomValue}`
      );
      fetch(
        `http://pos.q4hosting.com/posinvolce/printSales/${salesid}/NOKOT?random=${randomValue}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          //  body: formBody,
        }
      ).catch((error) => {
        console.error("something wrong:", error);
      });
    }
  };

  return (
    <>
      <CModal
        width="30%"
        visible={printBooking}
        onClose={() => setPrintBooking(false)}
      >
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
              <CRow>
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
                            style={{
                              fontSize: "13px!important",
                              padding: "2px",
                            }}
                          >
                            Counter Sale
                            <br />
                          </strong>
                        ) : deliveryMode == "2" ? (
                          <strong
                            style={{
                              fontSize: "13px!important",
                              padding: "2px",
                            }}
                          >
                            on Table : {cartSumUp && cartSumUp.deliveryTableNo}
                            <br />
                          </strong>
                        ) : deliveryMode == "3" ? (
                          <strong
                            style={{
                              fontSize: "13px!important",
                              padding: "2px",
                            }}
                          >
                            Pick Up
                            <br />
                          </strong>
                        ) : deliveryMode == "4" ? (
                          <strong
                            style={{
                              fontSize: "13px!important",
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
                { }
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
                  productsInCart.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <CCol xs={1} className="pt-2">
                          {item.prod_qty}
                        </CCol>
                        <CCol xs={9} className="text-start pt-2">
                          {item.prod_Customized_status == 1 ? (
                            <>
                              <b>
                                {item.customized.flavor_name &&
                                  item.customized.shape_name &&
                                  item.customized.choice_name &&
                                  item.customized.size_name
                                  ? `${item.customized.flavor_name} | ${item.customized.shape_name} | ${item.customized.choice_name} | ${item.customized.size_name}`
                                  : item.prod_name}
                              </b>{" "}
                              <br />
                              <small>
                                <strong>Message on Cake:</strong>{" "}
                                <span>{item.customized.message_on_cake}</span>{" "}
                                <br />
                                <strong>Message on Card:</strong>{" "}
                                <span>{item.customized.message_on_cake}</span>
                              </small>
                            </>
                          ) : (
                            <b>{item.prod_name}</b>
                          )}
                          <br />

                          <small
                            className="pull-right"
                            style={{
                              position: "relative",
                              fontSize: "10px",
                              top: "-10px",
                            }}
                          >
                            {item.is_parcel === 1 && <font>Parcel &nbsp;</font>}
                            {item.is_complementary === 1 && (
                              <font>Complementary &nbsp;</font>
                            )}
                          </small>
                          <small>
                            {item.is_note === 1 && (
                              <>
                                <strong>Product Note:</strong>{" "}
                                <span>{item.is_prod_note}</span>
                              </>
                            )}{" "}
                            <br />
                            {item.is_complementary === 1 && (
                              <>
                                <strong>Complementry Note:</strong>{" "}
                                <span>{item.is_complementary_note}</span>
                              </>
                            )}
                          </small>
                        </CCol>
                        <CCol xs={2} className="text-center pt-2">
                          {Number(item.prod_rate).toFixed(2)}
                        </CCol>
                      </React.Fragment>
                    );
                  })}
              </CRow>

              <p
                style={{
                  borderBottomStyle: "dashed",
                  marginTop: "1%",
                  borderColor: "black",
                  borderWidth: "1px",
                }}
              ></p>

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
                          {p.payMode == "1" ? (
                            <strong
                              style={{
                                fontSize: "1.1em",
                                padding: "2px",
                              }}
                            >
                              Cash
                              <br />
                            </strong>
                          ) : p.payMode == "4" ? (
                            <strong
                              style={{
                                fontSize: "1em",
                                padding: "2px",
                              }}
                            >
                              PayTm
                              <br />
                            </strong>
                          ) : p.payMode == "6" ? (
                            <strong
                              style={{
                                fontSize: "1em",
                                padding: "2px",
                              }}
                            >
                              Wallet
                              <br />
                            </strong>
                          ) : p.payMode == "24" ? (
                            <strong
                              style={{
                                fontSize: "1em",
                                padding: "2px",
                              }}
                            >
                              Rzp
                              <br />
                            </strong>
                          ) : p.payMode == "25" ? (
                            <strong
                              style={{
                                fontSize: "1em",
                                padding: "2px",
                              }}
                            >
                              HDFC CC*
                              <br />
                            </strong>
                          ) : p.payMode == "26" ? (
                            <strong
                              style={{
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
                  {deliveryMode == "3" && (
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
                      {deliveryMode == "3" ? "Pick Up:" : ""}
                    </span>
                    {deliveryMode == "3" ? (
                      <span>
                        {cartSumUp && cartSumUp.deliveryDate}{" "}
                        {cartSumUp && cartSumUp.deliveryTime}
                      </span>
                    ) : (
                      ""
                    )}
                  </CCol>
                  {deliveryMode == "3" ? (
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




              {deliveryMode == "4" ? (
                <CRow className="print-model-border">
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
                    <font className="font-size-14 font-w-6"></font>
                    {" "}
                    : {cartSumUp && cartSumUp.deliveryAddress}
                  </CCol>

                </CRow>
              ) : (
                ""
              )}

              <CRow className="print-model-border">
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
            </CContainer>
          </CTabContent>
        </CModalBody>
        <CModalFooter>
          <CContainer>
            <CRow>
              <CCol>
                {/* <ReactToPrint
                  trigger={() => (
                    <CButton
                      style={{ background: "#26b99a", border: "none" }}
                      onClick={handleClick}
                    >
                      <i className="fa fa-print"></i> {""}Print
                    </CButton>
                  )}
                  content={() => componentRef.current}
                /> */}
                <CButton
                  style={{ background: "#26b99a", border: "none" }}
                  onClick={() => {
                    handlePrint();
                    setIframeOpen(!true);
                  }}
                >
                  <i className="fa fa-print"></i> {""}Print
                </CButton>
              </CCol>

              <CCol className="text-end">
                <CButton
                  color="secondary"
                  onClick={() => {
                    setPrintBooking(!true);
                    setIframeOpen(true);
                  }}
                >
                  Close
                </CButton>
              </CCol>
            </CRow>
          </CContainer>
        </CModalFooter>
      </CModal>
      {printBooking || iframeOpen ? null : (
        <>
          <iframe
            ref={iframeRef}
            src={url}
            width="1"
            height="1"
            style={{ visibility: "hidden" }}
          ></iframe>
        </>
      )}
    </>
  );
}

export default RecentPrintModal;
