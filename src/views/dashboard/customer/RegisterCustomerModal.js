import React, { useState } from "react";
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
  CForm,
} from "@coreui/react";

const RegisterCustomerModal = ({ visible, onClose, onSuccess }) => {
  const [customerData, setCustomerData] = useState({
    accountType: "", // Change this field name from rnc_type to accountType
    rnc_full_name: "",
    rnc_mobile_no: "",
    rnc_email: "",
    rnc_address: "",
    rnc_pincode: "",
    rnc_extra_note: "",
    rnc_alt_mobile_no: "",
    rnc_pan_no: "",
    rnc_gst_no: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleRegisterNewCustomer = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Set the content type to JSON
      };

      // Prepare the request body with the customer data
      const requestBody = JSON.stringify({
        rnc_type: customerData.accountType,
        rnc_full_name: customerData.fullName,
        rnc_mobile_no: customerData.mobileNo,
        rnc_email: customerData.email,
        rnc_address: customerData.address,
        rnc_pincode: customerData.pincode,
        rnc_extra_note: customerData.extraNote,
        rnc_alt_mobile_no: customerData.altMobileNo,
        rnc_pan_no: customerData.panNo,
        rnc_gst_no: customerData.rnc_gst_no, // Include the rnc_gst_no field if needed
        // cust_type_id: 1, // Add the cust_type_id field with the appropriate value
      });

      // Make the API call
      const response = await fetch(
        "http://posapi.q4hosting.com/api/customers/add",
        {
          method: "POST",
          headers,
          body: requestBody,
        }
      );

      // Check if the request was successful
      if (response.ok) {
        const responseData = await response.json();
        alert("Customer registered successfully!");
        console.log("Response data:", responseData);
        onClose(); // Close the modal on successful registration
        onSuccess();
        // Reset the form input fields to their initial values
        setCustomerData({
          rnc_type: "",
          rnc_full_name: "",
          rnc_mobile_no: "",
          rnc_email: "",
          rnc_address: "",
          rnc_pincode: "",
          rnc_extra_note: "",
          rnc_alt_mobile_no: "",
          rnc_pan_no: "",
          rnc_gst_no: "",
        });
        z
      } else {
        // Handle the case where the API returns an error
        const responseData = await response.json();
        alert("Failed to register customer: " + responseData.message);
      }
    } catch (error) {
      console.error("Error occurred while registering customer:", error);
      alert("Failed to register customer. Please try again later.");
    }
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
      <CForm>
        <CModalBody>
          {/* select account type */}
          <CInputGroup size="sm" className="mb-2">
            <CInputGroupText id="inputGroup-sizing-sm">
              <i className="fa fa-file-text-o"></i>
            </CInputGroupText>
            <CFormSelect
              aria-label="Default select example"
              name="accountType"
              onChange={handleInputChange}
              value={customerData.accountType}
            >
              <option>-----</option>
              <option value="1">Customer</option>
              <option value="4">Employee (BNS)</option>
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
              placeholder="Full Name"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={handleInputChange}
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
              placeholder="Mobile No."
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={handleInputChange}
            />
          </CInputGroup>

          {/* Enter Alternative mobile number */}
          <CInputGroup size="sm" className="mb-2">
            <CInputGroupText id="inputGroup-sizing-sm">
              <i className="fa fa-phone"></i>
            </CInputGroupText>
            <CFormInput
              name="altMobileNo"
              value={customerData.altMobileNo}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Alternative Mobile No."
              onChange={handleInputChange}
            />
          </CInputGroup>

          {/* Enter Email  */}
          <CInputGroup size="sm" className="mb-2">
            <CInputGroupText id="inputGroup-sizing-sm">
              <i className="fa fa-envelope"></i>
            </CInputGroupText>
            <CFormInput
              name="email"
              value={customerData.email}
              aria-label="Sizing example input"
              placeholder="Email"
              aria-describedby="inputGroup-sizing-sm"
              onChange={handleInputChange}
            />
          </CInputGroup>

          {/* enter address text area */}
          <CInputGroup size="sm" className="mb-2">
            <CInputGroupText id="inputGroup-sizing-sm">
              <i className="fa fa-map-marker"></i>
            </CInputGroupText>
            <CFormTextarea
              name="address"
              value={customerData.address}
              id="floatingTextarea"
              placeholder="Full Address"
              onChange={handleInputChange}
            ></CFormTextarea>
          </CInputGroup>

          {/* Enter Pin code */}
          <CInputGroup size="sm" className="mb-2">
            <CInputGroupText id="inputGroup-sizing-sm">
              <i className="fa fa-map-marker"></i>
            </CInputGroupText>
            <CFormInput
              name="pincode"
              value={customerData.pincode}
              placeholder="Pincode"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={handleInputChange}
            />
          </CInputGroup>

          {/* Enter Note */}
          <CInputGroup size="sm" className="mb-2">
            <CInputGroupText id="inputGroup-sizing-sm">
              <i className="fa fa-pencil"></i>
            </CInputGroupText>
            <CFormInput
              name="extraNote"
              value={customerData.extraNote}
              placeholder="Extra Note"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={handleInputChange}
            />
          </CInputGroup>

          {/* Enter PAN NO. */}
          <CInputGroup size="sm" className="mb-2">
            <CInputGroupText id="inputGroup-sizing-sm">
              <i className="fa fa-credit-card"></i>
            </CInputGroupText>
            <CFormInput
              value={customerData.panNo}
              name="panNo"
              aria-label="Sizing example input"
              placeholder="PAN No."
              aria-describedby="inputGroup-sizing-sm"
              onChange={handleInputChange}
            />
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={handleRegisterNewCustomer}>
            Register New
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  );
};

export default RegisterCustomerModal;
