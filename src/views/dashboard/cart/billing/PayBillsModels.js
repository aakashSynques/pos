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

const PayBillsModels = ({ visible, onClose, onSuccess }) => {
  return (
    <>
      <CContainer className="bills-model-width">
        <CModal visible={visible} onClose={onClose}>
          <CModalHeader onClose={onClose} className="pt-2 pb-2">
            <CModalTitle>Sales Summary</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <span>
              <font size="2">
                <b>Customer Details:</b> <b>AAKASH</b>
                <br />
                <font size="2">
                  <CFormLabel className="label-default cust-label">
                    Customer Account
                  </CFormLabel>
                </font>
                <font size="1"> - 1234567890</font> <br />
              </font>

              <CRow className="bill-head-bg mt-2 mb-2">
                <CCol sm={6} xs={6}>
                  <b>Product Details</b>
                </CCol>
                <CCol sm={2} xs={2} className="text-center">
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
                <CCol sm={6} xs={6}>
                  VEG CHEESE PIZZA 7
                  {/* <font size="1" className="text-primary pull-right">
                  (Parcel)
                </font> */}
                </CCol>
                <CCol sm={2} xs={2} className="text-center">
                  1
                </CCol>
                <CCol sm={2} xs={2} className="text-center">
                  <i className="fa fa-inr"></i> 200.00
                </CCol>
                <CCol sm={2} xs={2} className="text-right">
                  <i className="fa fa-inr"></i> 200.00
                </CCol>
              </CRow>
            </span>

            <CRow className="billing-note">
              <CCol sm={5}>
                <b>Delivery Mode</b> <br />
                <b>PickUp</b> <br />
                <b>DateTime: 2023-08-05 12:00 PM</b> <br />
                <b>Note</b>
              </CCol>

              <CCol sm={7} style={{ backgroundColor: "white" }}>
                <hr className="borders" />
                <CRow>
                  <CCol sm={4}>
                    <b>Total</b>
                  </CCol>
                  <CCol sm={4} className="text-left">
                    1 Item(s)
                  </CCol>
                  <CCol sm={4} className="text-right">
                    <i className="fa fa-inr"></i> 200.00
                  </CCol>
                </CRow>

                <CRow className="pt-1">
                  <CCol sm={7}>Tax GST (2.5% SGST) </CCol>
                  <CCol sm={5} className="text-right">
                    <i className="fa fa-inr"></i> 5.00
                  </CCol>
                </CRow>
                <CRow className="pt-1">
                  <CCol sm={7}>Tax GST (2.5% CGST)</CCol>
                  <CCol sm={5} className="text-right">
                    <i className="fa fa-inr"></i> 5.00
                  </CCol>
                </CRow>

                <hr className="borders" />
                <CRow className="pb-1 text-success">
                  <CCol sm={7}>
                    <b size="2">Payable Amount</b>
                  </CCol>
                  <CCol sm={5} className="text-right">
                    <b>
                      {" "}
                      <i className="fa fa-inr"></i> 210.00
                    </b>
                  </CCol>
                </CRow>
                <hr className="borders" />
                <center className="alert text-danger p-1 m-1">
                  ** Please select the payment mode.
                </center>
                {/* <CRow>
                  <CCol sm={1}>
                    <CButton className="btn-invisible">
                      <i className="fa fa-trash fa-xs"></i>
                    </CButton>
                  </CCol>
                  <CCol sm={3}>
                    <b>Cash</b>
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
                  <CCol sm={3}>
                    <input
                      type="number"
                      className="form-control p-0 text-end rounded-0"
                      autocomplete="off"
                      value="0"
                    />
                  </CCol>
                </CRow> */}
                <CRow>
                  <CCol sm={1}>
                    <CButton className="btn-invisible p-0">
                      <i className="fa fa-trash fa-xs"></i>
                    </CButton>
                  </CCol>
                  <CCol sm={2 }><b>Cash</b></CCol>
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
                  <CCol sm={3}>
                  <input
                      type="number"
                      className="form-control p-0 text-end rounded-0"
                      autocomplete="off"
                      value="0"
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter style={{ display: "block" }} className="p-0">
            <CRow className="pt-2">
              {/* payment mode button */}
              <CCol sm={8} className="pay-mode-btn p-0">
                <CButton type="button" color="light" tabIndex="0">
                  Cash
                </CButton>
                <CButton type="button" color="light">
                  HDFC QR{" "}
                </CButton>
                <CButton type="button" color="light">
                  HDFC CC{" "}
                </CButton>
                <CButton type="button" color="light">
                  Plutus CC{" "}
                </CButton>
                <CButton type="button" color="light">
                  PayTm{" "}
                </CButton>
                <CButton type="button" color="light">
                  PhonePe{" "}
                </CButton>
                <CButton type="button" color="light">
                  Swiggy Dineout{" "}
                </CButton>
                <CButton type="button" color="light">
                  NEFT{" "}
                </CButton>
                <CButton type="button" color="light">
                  Cheque{" "}
                </CButton>
                <CButton type="button" color="light">
                  Wallet{" "}
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
                <CButton
                  color="success"
                  style={{ fontSize: "10px", width: "100%" }}
                >
                  <b>FINALIZE ORDER </b>
                  <br />[ Ctrl + Enter ]
                </CButton>
              </CCol>
            </CRow>
          </CModalFooter>
        </CModal>
      </CContainer>
    </>
  );
};

export default PayBillsModels;
