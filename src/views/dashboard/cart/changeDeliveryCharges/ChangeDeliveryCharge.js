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


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { submitDeliveryData } from "../../../../action/actions";

const ChangeDeliveryCharge = () => {
  const dispatch = useDispatch();

  // State to control the visibility of the modal
  const [visible, setVisible] = useState(false);

  // Selected customer data from Redux store
  const selectedCustomer = useSelector(
    (state) => state.customer.selectedCustomer
  );

  // Form input states
  const [receiverName, setReceiverName] = useState("");
  const [receiverMobile, setReceiverMobile] = useState("");
  const [deliveryAmount, setDeliveryAmount] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString().split('T')[0]);
  const [deliveryTiming, setDeliveryTiming] = useState(getCurrentTime());

  const [receiverAd, setReceiverAd] = useState("");

  // State to store the submitted data
  const [submittedHomeDeliveryData, setSubmittedHomeDeliveryData] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  dispatch(submitDeliveryData(submittedHomeDeliveryData));



  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12
    const timeString = `${padZero(formattedHours)}:${padZero(minutes)} ${amOrPm}`;
    return timeString;
  }

  function padZero(value) {
    return value < 10 ? `0${value}` : `${value}`;
  }


  const handleCopyDetails = () => {
    if (selectedCustomer) {
      setReceiverName(selectedCustomer.json.customer_name || "");
      setReceiverMobile(selectedCustomer.json.mobile || "");
      setReceiverAd(selectedCustomer?.json?.address || "");
    }
  };

  // Function to submit the form
  const submitChangeDeliveryForm = () => {
    const submittedHomeDeliveryData = {
      receiverName,
      receiverMobile,
      deliveryAmount,
      deliveryDate,
      deliveryTiming,
      receiverAd,
    };
    setSubmittedHomeDeliveryData(submittedHomeDeliveryData);
    setFormSubmitted(true); // Set formSubmitted to true after submitting
    toast("Change Delivery Charges information");
  };

  // Function to close the modal
  const handleModalClose = () => {
    setVisible(false);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setDeliveryTiming(getCurrentTime());
    }, 60000); 

    return () => clearInterval(interval);
  }, []);


  const handleKeyPress = (event) => {
    if (event.altKey && event.key === "d") {
      setVisible(true);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div>
      {/* Display Receiver Name and Mobile */}
      <label>
        <b>Receiver :</b>
      </label>
      <span>
        {formSubmitted && (<>
          {submittedHomeDeliveryData.receiverName} {submittedHomeDeliveryData.receiverMobile}</>
        )}
      </span>{" "}
      <br />
      <label>
        <b>Address : </b>
      </label>
      <span> {formSubmitted && (<>{submittedHomeDeliveryData.receiverAd} </>)}</span> <br />
      <label>
        <b>DateTime : </b>
      </label>
      <span>
        {submittedHomeDeliveryData ? (
          <>
            {submittedHomeDeliveryData.deliveryDate}{" "}
            {submittedHomeDeliveryData.deliveryTiming}{" "}
          </>
        ) : (
          <span>{new Date().toLocaleDateString()}</span>
        )}
      </span>

      <br />

      {/* Button to open the modal */}
      <button
        className="btn btn-xs btn-warning text-white rounded-1 mt-1"
        onClick={() => setVisible(!visible)}
      >
        <i className="fa fa-pencil"></i> Change Delivery Details [ Alt + D ]
      </button>

      {/* Modal for changing delivery charges */}
      <CModal
        style={{ width: "630px" }}
        size="lg"
        backdrop="static"
        visible={visible}
        onClose={handleModalClose}
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
  value={deliveryAmount}
  onChange={(e) => setDeliveryAmount(+(e.target.value))} // Parse to float
  style={{ height: "35px", fontSize: "13px" }}
  type="number"
  maxLength="4"
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
                  value={deliveryDate}
                  className="form-control input-md rounded-0 font-size"
                  onKeyDown={(e) => e.preventDefault()} // Disable manual input
                />
              </CCol>
              <CCol sm={4}>
                <CFormSelect
                  onChange={(e) => setDeliveryTiming(e.target.value)}
                  className="rounded-0 font-size"
                  style={{ height: "35px", fontSize: "13px" }}
                  value={deliveryTiming}
                  readOnly
                >
                  <option value={getCurrentTime()}>{getCurrentTime()}</option>
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
                  placeholder="Delivery Address"
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
              submitChangeDeliveryForm();
              handleModalClose();
            }}
          >
            <i className="fa fa-plus"></i> Add Charges
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default ChangeDeliveryCharge;
