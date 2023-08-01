import React, { useState} from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CFormTextarea,
  CFormSelect,
} from "@coreui/react";

const RegisterCustomerModal = ({ visible, onClose }) => {
  
  const [customerData, setCustomerData] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleRegisterNewCustomer = () => {
    // Perform validation before registering new customer
    if (!customerData.fullName || !customerData.mobileNo) {
      alert("Name and Mobile Number are required.");
      return;
    }

    onClose();
  };

  return (
    <CModal
      size="sm"
      visible={visible}
      onClose={onClose}
      className="register-model"
    >
      <CModalHeader onClose={onClose}>
        <CModalTitle style={{ fontSize: "16px" }}>New Customer</CModalTitle>
      </CModalHeader>
      <CModalBody>
        
        {/* select account type */}
        <CInputGroup size="sm" className="mb-2">
          <CInputGroupText id="inputGroup-sizing-sm">
            <i className="fa fa-file-text-o"></i>
          </CInputGroupText>
          <CFormSelect aria-label="Default select example">
            <option value="1">Customer</option>
            <option value="2">Employee (BNS)</option>
          </CFormSelect>
        </CInputGroup>

        {/* enter full name */}
        <CInputGroup size="sm" className="mb-2">
          <CInputGroupText id="inputGroup-sizing-sm">
            <i className="fa fa-user"></i>
          </CInputGroupText>
          <CFormInput
            name="fullName"
            value={customerData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </CInputGroup>

        {/* Enter mobile Number */}
        <CInputGroup size="sm" className="mb-2">
          <CInputGroupText id="inputGroup-sizing-sm">
            <i className="fa fa-phone"></i>
          </CInputGroupText>
          <CFormInput
            name="mobileNo"
            value={customerData.mobileNo}
            onChange={handleInputChange}
            placeholder="Mobile No."
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </CInputGroup>

        {/* Enter Alternative mobile number */}
        <CInputGroup size="sm" className="mb-2">
          <CInputGroupText id="inputGroup-sizing-sm">
            <i className="fa fa-phone"></i>
          </CInputGroupText>
          <CFormInput
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Alternative Mobile No."
          />
        </CInputGroup>

        {/* Enter Email  */}
        <CInputGroup size="sm" className="mb-2">
          <CInputGroupText id="inputGroup-sizing-sm">
            <i className="fa fa-envelope"></i>
          </CInputGroupText>
          <CFormInput
            aria-label="Sizing example input"
            placeholder="Email"
            aria-describedby="inputGroup-sizing-sm"
          />
        </CInputGroup>

        {/* enter address text area */}
        <CInputGroup size="sm" className="mb-2">
          <CInputGroupText id="inputGroup-sizing-sm">
            <i className="fa fa-map-marker"></i>
          </CInputGroupText>
          <CFormTextarea
            id="floatingTextarea"
            placeholder="Full Address"
          ></CFormTextarea>
        </CInputGroup>

          {/* Enter Pin code */}
        <CInputGroup size="sm" className="mb-2">
          <CInputGroupText id="inputGroup-sizing-sm">
            <i className="fa fa-map-marker"></i>
          </CInputGroupText>
          <CFormInput
            placeholder="Pincode"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </CInputGroup>

          {/* Enter Note */}
        <CInputGroup size="sm" className="mb-2">
          <CInputGroupText id="inputGroup-sizing-sm">
            <i className="fa fa-pencil"></i>
          </CInputGroupText>
          <CFormInput
            placeholder="Extra Note"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </CInputGroup>

        {/* Enter PAN NO. */}
        <CInputGroup size="sm" className="mb-2">
          <CInputGroupText id="inputGroup-sizing-sm">
            <i className="fa fa-credit-card"></i>
          </CInputGroupText>
          <CFormInput
            aria-label="Sizing example input"
            placeholder="PAN No."
            aria-describedby="inputGroup-sizing-sm"
          />
        </CInputGroup>
      </CModalBody>
      <CModalFooter>
        <CButton color="success" onClick={handleRegisterNewCustomer}>Register New</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default RegisterCustomerModal;

