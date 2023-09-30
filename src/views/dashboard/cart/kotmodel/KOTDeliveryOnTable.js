import {
  CButton,
  CCol,
  CContainer,
  CFormSelect,
  CRow,
  CModal,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalTitle,
  CFormLabel,
} from "@coreui/react";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';

import { setSelectedTableValue } from "../../../../action/actions";




const DeliveryOnTable = ({
  selectedCustomer,
  cartItems,
}) => {
  const selectedTableValue = useSelector((state) => state.table.selectedTableValue);
  const dispatch = useDispatch();
  const handleTableValueChange = (e) => {
    const newValue = e.target.value;
    dispatch(setSelectedTableValue(newValue));
  };
  const [visible, setVisible] = useState(false);
  const customerSearchInputRef = useRef(null);


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === "k") {
        handleKOTBtn();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  const handleKOTBtn = () => {
    if (selectedCustomer) {
      setVisible(!visible);
    } else {
      toast.error("Enter Customer Name First");
      if (customerSearchInputRef.current) {
        customerSearchInputRef.current.focus(); // Focus on the input element
      }
    }
  };



  return (
    <>
      <CContainer>
        <CRow className="py-1">
          <CCol sm={6}>
            <b>Table No. </b>

            <CFormSelect
              aria-label="Default select example"
              className="form-control rounded-0"
              style={{ width: "80px", float: "right", height: "33px" }}
              value={selectedTableValue}
              onChange={handleTableValueChange}
            >

              <option value="">-</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
            </CFormSelect>
          </CCol>

          <CCol sm={6}>
            {cartItems.length > 0 && (
              <CButton
                className="btn btn-info btn-sm btn-block text-left text-white w-100"
                type="button"
                style={{ backgroundColor: "#5bc0de" }}
                onClick={handleKOTBtn}
              >
                Create KOT <font size="1">[ Alt + K ]</font>
              </CButton>
            )}
          </CCol>


        </CRow>
      </CContainer>




      {/* Kot model */}
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        className="bills-model-width"
      >
        <CModalHeader onClose={() => setVisible(false)} className="py-2">
          <CModalTitle>KOTs Sales Summary</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol sm={6}>
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
                    <font size="2"> - {selectedCustomer.json.mobile}</font>{" "}
                    <br />
                  </>
                )}
              </font>
            </CCol>
            <CCol sm={6}>
              <h6 className="text-end pt-2">On Table : {selectedTableValue}</h6>
            </CCol>
          </CRow>

          <CRow className="bill-head-bg mt-0 ">
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
                <CCol sm={7} xs={7} className="kot-border-b">
                  <font size="3" className="font-size-14">{item.prod_name}</font>
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
                    <small className="text-danger" style={{ fontSize: "10px" }}>
                      Compli: {item.is_complementary_note}, &nbsp;
                    </small>
                  )}
                </CCol>

                <CCol sm={1} xs={1} className="text-center kot-border-b">
                  <font className="font-size"> {item.prod_qty}</font>
                </CCol>
                <CCol sm={2} xs={2} className="text-center kot-border-b">
                  <font className="font-size">  <i className="fa fa-inr"></i> {item.prod_rate}</font>
                </CCol>
                <CCol sm={2} xs={2} className="text-right kot-border-b ">
                  <font className="font-size"><i className="fa fa-inr"></i> {item.prod_rate}</font>
                </CCol>
              </>
            ))}
          </CRow>

          <CRow className="kot-border-top mt-2">
            <font size="2" className="font-w-5">Note :</font>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            className="btn-sm rounded-1"
            onClick={() => setVisible(false)}
          >
            Close
          </CButton>
          <CButton className="btn btn-sm btn-success rounded-1">
            Create KOT & Save
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DeliveryOnTable;




