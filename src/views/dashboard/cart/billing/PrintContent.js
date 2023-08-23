import React from "react";
import { useSelector } from "react-redux";
import { CContainer, CRow, CCol } from "@coreui/react";
import ReactToPrint from "react-to-print";

const PrintContent = React.forwardRef(
  (
    {
      selectedCustomer,
      selectedDelivery,
      cartItems,
      subtotal,
      totalSGST,
      totalCGST,
      finalPayAmount,
    },
    ref
  ) => {
    const selectedOutletObj = useSelector(
      (state) => state.selectedOutlet.selectedOutlet
    );
    return (
      <div ref={ref} style={{ fontFamily: "math" }} className="pt-3 container">
        <div>
          <span>{new Date().toLocaleString()}</span>
        </div>
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
            <strong>TAX INVOICE</strong>
          </p>
        </div>

        <CContainer>
          <CRow>
            <CCol className="text-start">
              <span>Invoice#: </span>
              <br />
              <strong>..</strong>
              <p>{new Date().toLocaleString()}</p>
            </CCol>
            <CCol className="text-end">
              <p>
                {selectedCustomer && selectedCustomer.json.customer_name}
                <br />
                {selectedCustomer && selectedCustomer.json.mobile}
                <br />
                <span className="text-start">{selectedDelivery} </span>
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
            <CCol xs={2} className=" text-end">
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
            {cartItems.map((item) => (
              <>
                <CCol xs={1}>{item.prod_qty}</CCol>
                <CCol xs={9} className="text-start">
                  <CRow>
                    <CCol xs={10} className=" text-start">
                      {item.prod_name}
                    </CCol>
                  </CRow>
                </CCol>
                <CCol xs={2} className="text-end">
                  {item.prod_rate.toFixed(2)}
                </CCol>
              </>
            ))}
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
            <CCol xs={1} className="text-start">
              {cartItems.map((item) => (
                <span>{item.prod_qty} </span>
              ))}
            </CCol>
            <CCol sm={2}>
              <span>Item(s)</span>
            </CCol>
            <CCol xs={7} className="text-end ">
              Sub Total
            </CCol>
            <CCol xs={2} className="text-end ">
              {subtotal.toFixed(2)}
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
              2.5% SGST on GST
            </CCol>
            <CCol xs={2} className="text-end ">
              {totalSGST.toFixed(2)}
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={10} className="text-end ">
              2.5% CGST on GST
            </CCol>
            <CCol xs={2} className="text-end ">
              {totalCGST.toFixed(2)}
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
              <h5>
                <strong>Bill Total</strong>
              </h5>
            </CCol>
            <CCol xs={2} className="text-end ">
              <h5>
                <strong>{finalPayAmount.toFixed(2)}</strong>
              </h5>
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

            <p className="text-center">
              Thank , Visit Again , www.bakenshake.in
            </p>
          </CRow>
        </CContainer>
      </div>
    );
  }
);

export default PrintContent;