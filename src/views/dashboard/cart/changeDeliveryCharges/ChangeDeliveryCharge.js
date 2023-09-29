import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CContainer,
  CFormInput,
  CRow,
  CCol,
  CFormSelect,
  CFormTextarea,
} from "@coreui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ChangeDeliveryCharge = () => {
  const [visible, setVisible] = useState(false);
  const selectedCustomer = useSelector(
    (state) => state.customer.selectedCustomer
  );

  const [receiverName, setReceiverName] = useState("");
  const [receiverMobile, setReceiverMobile] = useState("");
  const [deliveryAmount, setDeliveryAmount] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTiming, setDeliveryTiming] = useState("");
  const [receiverAd, setReceiverAd] = useState("");
  //   const [editableCustomerAddress, setEditableCustomerAddress] = useState(""); // New state variable
  const [submittedData, setSubmittedData] = useState(null); // State to store the submitted data

  const handleCopyDetails = () => {
    if (selectedCustomer) {
      setReceiverName(selectedCustomer.json.customer_name || "");
      setReceiverMobile(selectedCustomer.json.mobile || "");
      // const customerAddress = selectedCustomer?.json?.address || "";
      setReceiverAd(selectedCustomer?.json?.address) || "";
    }
  };

  const submitChangeDeliveryFrom = () => {
    const submittedData = {
      receiverName,
      receiverMobile,
      deliveryAmount,
      deliveryDate,
      deliveryTiming,
      receiverAd,
    };
    setSubmittedData(submittedData);
    toast("Change Delivery Charges information");
  };

  const handleModalClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <label>
        <b>Receiver :</b>
      </label>
      <span>
        {receiverName} {receiverMobile}
      </span>{" "}
      <br />
      <label>
        <b>Address : </b>
      </label>
      <span>{receiverAd}</span> <br />
      <label>
        <b>DateTime : </b>
      </label>
      <span>
        {deliveryDate && deliveryTiming ? (
          <span>
            {deliveryDate} {deliveryTiming}
          </span>
        ) : (
          <span>{new Date().toLocaleString()}</span>
        )}
      </span>
      <br />
      <button
        className="btn btn-xs btn-warning text-white rounded-1 mt-1"
        onClick={() => setVisible(!visible)}
      >
        <i className="fa fa-pencil"></i> Change Delivery Details [ Alt + D ]
      </button>
      <CModal
        style={{ width: "630px" }}
        size="lg"
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>Change Delivery Charges</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer>
            <CRow>
              <CCol sm={4}>
                <label>Delivery Amount</label>
              </CCol>
              <CCol sm={3}>
                <CFormInput
                  onChange={(e) => setDeliveryAmount(e.target.value)}
                  style={{ height: "35px", fontSize: "13px" }}
                  type="number"
                  maxlength="4"
                  className="form-control input-xs rounded-0 font-size"
                />
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol sm={4}>
                <label>Delivery Date</label>
              </CCol>
              <CCol sm={4}>
                <CFormInput
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  style={{ height: "35px", fontSize: "13px" }}
                  type="date"
                  className="form-control input-md rounded-0 font-size"
                  autocomplete="off"
                  onkeydown="return false"
                />
              </CCol>
              <CCol sm={4}>
                <CFormSelect
                  onChange={(e) => setDeliveryTiming(e.target.value)}
                  className="rounded-0 font-size"
                  style={{ height: "35px", fontSize: "13px" }}
                >
                  <option value="">Select Timing</option>
                  <option value="Early Morning">Early Morning</option>
                  <option value="09:45 AM">09:45 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:15 AM">10:15 AM</option>
                  <option value="10:45 AM">10:45 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:15 AM">11:15 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="11:45 AM">11:45 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="12:15 PM">12:15 PM</option>
                  <option value="12:30 PM">12:30 PM</option>
                  <option value="12:45 PM">12:45 PM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="01:15 PM">01:15 PM</option>
                  <option value="01:30 PM">01:30 PM</option>
                  <option value="01:45 PM">01:45 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="02:15 PM">02:15 PM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="02:45 PM">02:45 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="03:15 PM">03:15 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                  <option value="03:45 PM">03:45 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="04:15 PM">04:15 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                  <option value="04:45 PM">04:45 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="05:15 PM">05:15 PM</option>
                  <option value="05:30 PM">05:30 PM</option>
                  <option value="05:45 PM">05:45 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                  <option value="06:15 PM">06:15 PM</option>
                  <option value="06:30 PM">06:30 PM</option>
                  <option value="06:45 PM">06:45 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
                  <option value="07:15 PM">07:15 PM</option>
                  <option value="07:30 PM">07:30 PM</option>
                  <option value="07:45 PM">07:45 PM</option>
                  <option value="08:00 PM">08:00 PM</option>
                  <option value="08:15 PM">08:15 PM</option>
                  <option value="08:30 PM">08:30 PM</option>
                  <option value="08:45 PM">08:45 PM</option>
                  <option value="09:00 PM">09:00 PM</option>
                  <option value="09:15 PM">09:15 PM</option>
                  <option value="09:30 PM">09:30 PM</option>
                  <option value="09:45 PM">09:45 PM</option>
                  <option value="10:00 PM">10:00 PM</option>
                  <option value="10:15 PM">10:15 PM</option>
                  <option value="10:30 PM">10:30 PM</option>
                  <option value="10:45 PM">10:45 PM</option>
                  <option value="11:00 PM">11:00 PM</option>
                  <option value="11:15 PM">11:15 PM</option>
                  <option value="11:30 PM">11:30 PM</option>
                  <option value="Midnight 12 Timing">Midnight 12 Timing</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol sm={4}>
                <label>Receiver Details</label>
                <label
                  className="label label-info"
                  style={{ cursor: "pointer" }}
                  onClick={handleCopyDetails}
                >
                  <i className="fa fa-plus"></i> Copy Customer Details
                </label>
              </CCol>
              <CCol sm={4}>
                <CFormInput
                  style={{ height: "35px", fontSize: "13px" }}
                  type="text"
                  value={receiverName}
                  placeholder="Receiver Name"
                  className="form-control input-xs rounded-0 font-size"
                  onChange={(e) => setReceiverName(e.target.value)}
                />
              </CCol>
              <CCol sm={4}>
                <CFormInput
                  style={{ height: "35px", fontSize: "13px" }}
                  type="text"
                  value={receiverMobile}
                  placeholder="Receiver Mobile No."
                  className="form-control input-xs rounded-0 font-size"
                  onChange={(e) => setReceiverMobile(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol sm={4}>
                <label>Delivery Address</label>
              </CCol>
              <CCol sm={8}>
                <CFormTextarea
                  value={receiverAd}
                  style={{ fontSize: "13px" }}
                  className="rounded-1"
                  placeholder="Leave a comment here"
                  onChange={(e) => setReceiverAd(e.target.value)}
                ></CFormTextarea>
              </CCol>
            </CRow>
          </CContainer>
        </CModalBody>
        <CModalFooter>
          <CButton
            className="btn btn-success py-1 rounded-1"
            onClick={() => {
              submitChangeDeliveryFrom();
              handleModalClose(); // Close the modal after submitting
            }}
          >
            <i className="fa fa-plus"></i> Add Charge's
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default ChangeDeliveryCharge;