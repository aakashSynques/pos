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
import { useSelector } from "react-redux";
import ReactToPrint from "react-to-print";

const PrintContent = React.forwardRef(({ selectedCustomer }, ref) => {
  const selectedOutletObj = useSelector(
    (state) => state.selectedOutlet.selectedOutlet
  );
  // const invoice_no = invoiceDetails && Object.keys(invoiceDetails)[0];
 




  return (
    <div ref={ref} >
            <div className="text-center">
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
                  marginTop: "1%",
                  borderColor: "black",
                  marginBottom: "1%",
                  borderWidth: "1px",
                }}
              >
                {/* {deliveryMode == "4" ? " BILL OF SUPPLY" : "TAX INVOICE"} */}
                 <b>TAX INVOICE</b> 
              </p>
            </div>

            <CContainer>
              <CRow>
              <CCol className="text-start">
                    <span>Invoice#: </span>
                    <br />
                    <strong>BNS/I2/2324/2206</strong>
                    <p>{new Date().toLocaleString()}</p>
                  </CCol>
                  <CCol className="text-end">
                    <p>
                      {selectedCustomer && selectedCustomer.json.customer_name}
                      <br />
                      {selectedCustomer && selectedCustomer.json.mobile}
                      <br />
                      <span className="text-start">delivery mode </span>
                    </p>
                  </CCol>
                  <p
                    style={{
                      borderBottomStyle: "dashed",
                      marginTop: "1%",
                      borderColor: "black",
                      borderWidth: "1px",
                      marginBottom: "6px",
                    }}
                  />
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
                        <CCol xs={1}>1</CCol>
                        <CCol xs={9} className="text-start">
                          <CRow>
                            <CCol xs={10} className=" text-start">
                              prode name
                            </CCol>
                          </CRow>
                        </CCol>
                        <CCol xs={2} className="text-center">
                          {/* {Number(item.prod_rate).toFixed(2)} */}
                          200.00
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
                <CCol xs={3} className="text-start">
                   <span>Item(s)</span>
                </CCol>
                <CCol xs={7} className="text-end ">
                  Sub Total
                </CCol>
                <CCol xs={2} className="text-end ">
                  500.00
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
                  {/* {cartSumUp && cartSumUp.taxsplitGST[0].taxPercent}%{" "}
                  {cartSumUp && cartSumUp.taxsplitGST[0].taxType}  */}
                  2.5% SGST on GST
                </CCol>
                <CCol xs={2} className="text-end ">
                  {/* {Number(cartSumUp && cartSumUp.taxsplitGST[0].tax).toFixed(2)} */}
                  7.50

                 
                </CCol>
              </CRow>
              <CRow>
                <CCol xs={10} className="text-end ">
                  {/* {cartSumUp && cartSumUp.taxsplitGST[0].taxPercent}%{" "}
                  {cartSumUp && cartSumUp.taxsplitGST[0].taxType}  */}
                  2.5% CGST on GST
                </CCol>
                <CCol xs={2} className="text-end ">
                  {/* {Number(cartSumUp && cartSumUp.taxsplitGST[0].tax).toFixed(2)} */}
                  7.50
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
                  <h5><b>Bill Total</b></h5> 
                </CCol>
                <CCol xs={2} className="text-end ">
                  {/* {Number(cartSumUp && cartSumUp.grandTotal).toFixed(2)} */}
                <h5><b>315.00</b></h5>  
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
              <CRow className="persion-details">
                  <p>Sales Person : Naveen</p>
                  <p>Laxmi Hot Bakers Private Limited</p>
                  <p>Laxmi Hot Bakers Private Limited</p>
                  <p>GSTN - 123456788 </p>
                  <p>PAN - AA2143</p>
                  <p>Fssai- 12345678</p>
                  <p>CIN - U123455W</p>
                  <p>HSN - u840</p>

                  <p className="text-center">Thank You , Visit Again , www.bakenshake.in</p>
              </CRow>
             

            </CContainer>


            
    </div>
  );
});

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
  const selectedDelivery = useSelector(
    (state) => state.delivery.selectedDelivery
  );

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isPaymentSelected, setIsPaymentSelected] = useState(false); // Step 1

  const setPayment = (paymentMode) => {
    setSelectedPayment(paymentMode);
    setIsPaymentSelected(true); // Step 2
  };
  const printComponentRef = useRef();


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
            {isPaymentSelected ? null : "** Please select the payment mode."}
          </center>
                <CRow>
                  {selectedPayment && (
                    <>
                      <CCol sm={1}>
                        <CButton className="btn-invisible p-0">
                          <i className="fa fa-trash fa-xs"></i>
                        </CButton>
                      </CCol>
                      <CCol sm={3}>
                        <b>{selectedPayment === 1 ? "Cash" : ""}</b>
                      </CCol>
                      <CCol sm={5}>
                        <input
                          type="text"
                          className="form-control input-sm rounded-0"
                          placeholder="Extra information"
                          autocomplete="off"
                          style={{
                            height: "21px",
                            border: "none",
                            fontSize: "13px",
                          }}
                        />
                      </CCol>
                      <CCol sm={3} className="text-right">
                        <input
                          type="number"
                          maxlength="6"
                          className="form-control p-0 text-end rounded-0"
                          autocomplete="off"
                        />
                      </CCol>
                    </>
                  )}
                </CRow>

                <hr
                  className="mt-2"
                  style={{ margin: "0px", padding: "0px" }}
                ></hr>
                <CRow className="p-2">
                  <CCol md="1" sm="1" xs="1" className="text-left">
                    &nbsp;
                  </CCol>
                  <CCol
                    sm={7}
                    className="text-right"
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    Balance
                  </CCol>
                  <CCol md="4" sm="4" xs="4" className="text-right">
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "red",
                      }}
                    >
                      <i className="fa fa-inr"></i> 200.00
                    </span>
                  </CCol>
                </CRow>
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
                {/* <CButton
                  color="success"
                  style={{ fontSize: "10px", width: "100%" }}
                >
                  <b>FINALIZE ORDER </b>
                  <br />[ Ctrl + Enter ]
                </CButton> */}
                 <ReactToPrint
  trigger={() => (
    <CButton
      color="success"
      style={{ fontSize: "10px", width: "100%" }}
    >
      <b>FINALIZE ORDER </b>
      <br />[ Ctrl + Enter ]
    </CButton>
  )}
  content={() => printComponentRef.current}
/>
              </CCol>
            </CRow>
          </CModalFooter>
        </CModal>
      </CContainer>



      <div>
        <PrintContent
          ref={printComponentRef}
          selectedCustomer={selectedCustomer}
          // cartItems={cartItems}
          // selectedDelivery={selectedDelivery}
          // subtotal={subtotal}
          // totalSGST={totalSGST}
          // totalCGST={totalCGST}
          // finalPayAmount={finalPayAmount}
          // totalItem={totalItem}
          // selectedPayment={selectedPayment}
        />
      </div>
    </>
  );
};

export default PayBillsModels;
