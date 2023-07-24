import { CFormInput, CFormSelect, CRow, CCol, CContainer } from "@coreui/react";
import { FaShoppingCart } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { fetch } from "../../utils";
import CustomerSearchBox from "./CustomerSearchBox";
import CartSection from "./CartSection";
import { useSelector } from "react-redux";


const CustomerSearch = () => {
  const cartItems = useSelector((state) => state.cart.cartItems); // cart list

  return (
    <>
      <div className="custormer-search p-1" style={{ background: "white" }}>
        {/* customer search box */}
        <CustomerSearchBox />
        {/* cart list */}
        <CartSection cartItems={cartItems} /> 
    
        {/* <div className="select-table">
          <CContainer>
            <CRow>
              <CCol sm={3} className="font-size">
                Table No :
              </CCol>
              <CCol sm={3}>
                <CFormSelect aria-label="Default select example">
                  <option>0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="2">3</option>
                  <option value="2">4</option>
                  <option value="2">5</option>
                </CFormSelect>
              </CCol>
            </CRow>
          </CContainer>
        </div> */}

        {/* pricing table */}
        {/* <hr />
        <div className="bil-table mt-3"> 
          <CContainer>
            <CRow>
              <CCol sm={6} className="font-size">
                Sub Total
              </CCol>
              <CCol sm={6} style={{ textAlign: "right" }} className="font-size">
              <i className="fa fa-inr"></i> 0.00
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={6} className="font-size">
                Discount
              </CCol>
              <CCol sm={6} style={{ textAlign: "right" }} className="font-size">
              <i className="fa fa-inr"></i> 0.00
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={6} className="font-size">
                Tax GST (2.5% SGST)
              </CCol>
              <CCol sm={6} style={{ textAlign: "right" }} className="font-size">
              <i className="fa fa-inr"></i> 0.00
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={6} className="font-size">
                Tax GST (2.5% CGST)
              </CCol>
              <CCol sm={6} style={{ textAlign: "right" }} className="font-size">
              <i className="fa fa-inr"></i> 0.00
              </CCol>
            </CRow>

            <CRow>
              <CCol sm={6} className="font-size">
                <button className="btn pay-btn" type="button">
                  PAY <font size="1">[ Shift + Enter ]</font>
                </button>
              </CCol>
              <CCol sm={6} style={{ textAlign: "right" }} className="font-size">
                <h4 className="total-price">
                  <i className="fa fa-inr"></i> 0.00
                </h4>
                <small>0 Item(s)</small>
              </CCol>
            </CRow>
            <hr style={{ margin: "4px 0" }} />
            <CRow>
              <CCol sm={6} className="font-size">
                Tax GST (2.5% CGST)
              </CCol>
              <CCol sm={6} style={{ textAlign: "right" }} className="font-size">
                Rs 0.00
              </CCol>
            </CRow>
          </CContainer>
        </div> */}
      </div>
    </>
  );
};

export default CustomerSearch;