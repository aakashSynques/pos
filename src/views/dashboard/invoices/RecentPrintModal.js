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
        width="50%"
        className="bills-model-width"
        visible={printBooking}
        onClose={() => setPrintBooking(false)}
      >
        <CModalBody>
          <CTabContent className="text-center">
            <div>
              <b>
                {selectedOutletObj && selectedOutletObj.outlet_business_name}
              </b>
              <br />

              <small className="font-size-14 text-black">
                {selectedOutletObj && selectedOutletObj.outlet_address},{" "}
                {selectedOutletObj && selectedOutletObj.outlet_city} - {selectedOutletObj && selectedOutletObj.outlet_zip}
              </small>
              <br />

              <small className="font-size-14 text-black">{selectedOutletObj && selectedOutletObj.outlet_contact_no}</small>
              <p              >
                {deliveryMode == "4" ? " BILL OF SUPPLY" : "TAX INVOICE"}
              </p>
            </div>
            <CContainer>
              <CRow className="print-model-border">
                <React.Fragment>
                  <CCol className="text-start">
                    <small className="font-size-14 text-black">Invoice#:</small>
                    <br />
                    <b className="font-size-2">{invoice_no}</b><br />
                    <small className="font-size-14 text-black">{cartSumUp && cartSumUp.eat}</small>
                  </CCol>

                  <CCol className="text-end">
                    <font>
                      <small className="font-size-14 text-black">{selectedCustomerJson &&
                        selectedCustomerJson.customer_name}
                        <br />
                        {selectedCustomerJson && selectedCustomerJson.mobile}</small>
                      <br />
                      <span className="text-start">
                        {deliveryMode == "1" ? (
                          <small
                            style={{
                              fontSize: "13px!important",
                              padding: "2px",
                            }}
                          >
                            Counter Sale
                            <br />
                          </small>
                        ) : deliveryMode == "2" ? (
                          <small
                            style={{
                              fontSize: "13px!important",
                              padding: "2px",
                            }}
                          >
                            on Table : {cartSumUp && cartSumUp.deliveryTableNo}
                            <br />
                          </small>
                        ) : deliveryMode == "3" ? (
                          <small
                            style={{
                              fontSize: "13px!important",
                              padding: "2px",
                            }}
                          >
                            Pick Up
                            <br />
                          </small>
                        ) : deliveryMode == "4" ? (
                          <small
                            style={{
                              fontSize: "13px!important",
                              padding: "2px",
                            }}
                          >
                            Home Delivery
                          </small>
                        ) : null}
                      </span>
                    </font>
                  </CCol>
                </React.Fragment>
              </CRow>
              <CRow className="text-start print-model-border">
                { }
                <CCol xs={1}>Qty</CCol>
                <CCol xs={9} className="text-start">
                  <small className="font-size-14 text-black">     Discription</small>
                </CCol>
                <CCol xs={2} className=" text-center">
                  <small className="font-size-14 text-black"> Rate</small>
                </CCol>
              </CRow>

              <CRow className="text-start print-model-border">
                {productsInCart &&
                  productsInCart.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <CCol xs={1}>
                          <small className="font-size-14 text-black">{item.prod_qty}</small>
                        </CCol>
                        <CCol xs={9} className="text-start">
                          {item.prod_Customized_status == 1 ? (
                            <>
                              <font>
                                {item.customized.flavor_name &&
                                  item.customized.shape_name &&
                                  item.customized.choice_name &&
                                  item.customized.size_name
                                  ? `${item.customized.flavor_name} | ${item.customized.shape_name} | ${item.customized.choice_name} | ${item.customized.size_name}`
                                  : item.prod_name}
                              </font>{" "}
                              <br />
                              <small className="font-size-14 text-black">
                                <strong>Message on Cake:</strong>{" "}
                                <span>{item.customized.message_on_cake}</span>{" "}
                                <br />
                                <strong>Message on Card:</strong>{" "}
                                <span>{item.customized.message_on_cake}</span>
                              </small>
                            </>
                          ) : (
                            <small className="font-size-14 text-black">{item.prod_name}</small>
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

                          <small className="font-size-14 text-black">
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
                        <CCol xs={2} className="text-center">
                          <small className="font-size-14 text-black"> {Number(item.prod_rate).toFixed(2)}</small>
                        </CCol>
                      </React.Fragment>
                    );
                  })}
              </CRow>


              <CRow className="text-start print-model-border">
                <CCol xs={1} className="text-start">
                  <small className="font-size-14 text-black"> {cartSumUp && cartSumUp.items}</small>
                </CCol>
                <CCol xs={2} className="text-start">
                  <small className="font-size-14 text-black">  Item(s)</small>
                </CCol>

                <CCol xs={7} className="text-end ">
                  <small className="font-size-14 text-black">Sub Total</small>
                </CCol>
                <CCol xs={2} className="text-end">
                  <small className="font-size-14 text-black"> {Number(cartSumUp && cartSumUp.subTotal).toFixed(2)}</small><br />

                </CCol>

              </CRow>
              <CRow>
                <CCol xs={10} className="text-end ">
                  <small className="font-size-14 text-black">    {cartSumUp && cartSumUp.taxsplitGST[0].taxPercent}%{" "}
                    {cartSumUp && cartSumUp.taxsplitGST[0].taxType} on GST</small>
                </CCol>
                <CCol xs={2} className="text-end print-model-border">
                  <small className="font-size-14 text-black">   {Number(cartSumUp && cartSumUp.taxsplitGST[0].tax).toFixed(2)}</small>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs={10} className="text-end ">
                  <small className="font-size-14 text-black">  {cartSumUp && cartSumUp.taxsplitGST[1].taxPercent}%{" "}
                    {cartSumUp && cartSumUp.taxsplitGST[1].taxType} on GST</small>
                </CCol>
                <CCol xs={2} className="text-end ">
                  <small className="font-size-14 text-black">{Number(cartSumUp && cartSumUp.taxsplitGST[1].tax).toFixed(2)}</small>


                </CCol>
              </CRow>
              <CRow>
                <CCol xs={10} className="text-end">
                  <small className="font-size-14 text-black">   Bill Total</small>
                </CCol>
                <CCol xs={2} className="text-end print-model-border">
                  <small className="font-size-14 text-black">  {Number(cartSumUp && cartSumUp.grandTotal).toFixed(2)}</small>
                </CCol>

                <span className="print-model-border"></span>
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
                        <small className="font-size-14 text-black"> Paid By{" "}</small>
                        <small className="text-start">
                          {p.payMode == "1" ? (
                            <> Cash</>
                          ) : p.payMode == "4" ? (
                            <> PayTm</>
                          ) : p.payMode == "6" ? (
                            <>Wallet</>
                          ) : p.payMode == "24" ? (
                            <>Rzp</>
                          ) : p.payMode == "25" ? (
                            <> HDFC CC*
                              <br /></>

                          ) : p.payMode == "26" ? (
                            <> HDFC QR</>
                          ) : null}
                        </small>
                      </CCol>
                      <CCol xs={2} className="text-center">
                        <small className="font-size-14 text-black"> {Number(p.payAmount).toFixed(2)}</small>
                      </CCol>
                    </React.Fragment>
                  ))
                  : null}
              </CRow>

              {/* {cartSumUp && cartSumUp.deliveryMode && (
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
              )} */}




              {deliveryMode == "4" ? (
                <div >
                  <div className="text-start ">
                    <b className="font-size-14 font-w-5">
                      Home Delivery : {cartSumUp && cartSumUp.deliveryDate}{" "}  {cartSumUp && cartSumUp.deliveryTime}
                    </b>
                  </div>

                  <div className="text-start ">
                    <span className="font-size-14 font-w-5" >
                      Receiver
                    </span>{" "}
                    :
                    {" "}<small className="font-size-14">{cartSumUp && cartSumUp.receiverName}{" "} {cartSumUp && cartSumUp.receiverMobileNo}</small> <br />
                  </div>
                  <div className="text-start ">
                    <font className="font-size-14 font-w-6"></font>
                    {" "}
                    <span className="font-size-14 font-w-5" >
                      At Location
                    </span>{" "}
                    : <small className="font-size-14">{cartSumUp && cartSumUp.deliveryAddress}</small>
                  </div>

                </div>
              ) : (
                ""
              )}

              <CRow className="print-model-border">
                <div className="text-start p-0">
                  {deliveryMode == "4" ? (
                    <small className="font-size-14 text-black">
                      Agent -{cartSumUp && cartSumUp.salesUser.user_name}
                    </small>
                  ) : (
                    <small className="font-size-14 text-black">
                      Sales Person - {" "}
                      {cartSumUp && cartSumUp.salesUser.user_name}
                    </small>
                  )}
                </div>
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
                <CButton className="btn btn-sm font-size-2"
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
                  className="btn btn-sm font-size-2"
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
