import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customerData, setCustomerData] = useState({
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const resetForm = () => {
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
    setError(null);
  };
  const handleRegisterNewCustomer = async () => {
    try {
      setLoading(true); // Set loading to true while submitting
      setError(null); // Reset the error state before submitting

      const token = localStorage.getItem("pos_token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Set the content type to JSON
      };
      const requestBody = JSON.stringify(customerData);
      // Prepare the request body with the customer data
      // const requestBody = JSON.stringify({
      //   // rnc_type: customerData.accountType,
      //   // rnc_full_name: customerData.fullName,
      //   // rnc_mobile_no: customerData.mobileNo,
      //   // rnc_email: customerData.email,
      //   // rnc_address: customerData.address,
      //   // rnc_pincode: customerData.pincode,
      //   // rnc_extra_note: customerData.extraNote,
      //   // rnc_alt_mobile_no: customerData.altMobileNo,
      //   // rnc_pan_no: customerData.panNo,
      //   // rnc_gst_no: customerData.rnc_gst_no
      //   rnc_type: customerData.accountType,
      //   rnc_full_name: customerData.fullName,
      //   rnc_mobile_no: customerData.mobileNo,
      //   ...(customerData.email && { rnc_email: customerData.email }),
      //   ...(customerData.address && { rnc_address: customerData.address }),
      //   ...(customerData.pincode && { rnc_pincode: customerData.pincode }),
      //   ...(customerData.extraNote && { rnc_extra_note: customerData.extraNote }),
      //   ...(customerData.altMobileNo && { rnc_alt_mobile_no: customerData.altMobileNo }),
      //   ...(customerData.panNo && { rnc_pan_no: customerData.panNo }),
      //   ...(customerData.rnc_gst_no && { rnc_gst_no: customerData.rnc_gst_no }),
      // });
      // console.log(requestBody)

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
        // alert("Customer registered successfully!");
        console.log("Response data:", responseData);
        onClose(); // Close the modal on successful registration
        onSuccess(responseData); // Call the handleRegisterSuccess function here
        toast.success("Customer Registered Successfully!");

     

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
        setError(null); // Reset the error state
      } else {
        // Handle the case where the API returns an error
        const responseData = await response.json();
        setError("Failed to register customer: " + responseData.message);
        // alert("Failed to register customer: " + responseData.message);
      }
    } catch (error) {
      setError("Failed to register customer.");
      // alert("Failed to register customer. Please try again later.");
    } finally {
      setLoading(false); // Set loading back to false after submission attempt
    }
  };

  return (
    <CModal
      size="sm"
      visible={visible}
      // onClose={onClose}
      className="register-model"
      onClose={() => {
        onClose();
        resetForm();
      }}
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
              name="rnc_type"
              onChange={handleInputChange}
              value={customerData.rnc_type}
            >
              <option>------</option>
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
              name="rnc_full_name"
              value={customerData.rnc_full_name}
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
              type="number"
              name="rnc_mobile_no"
              value={customerData.rnc_mobile_no}
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
              type="number"
              min={10}
              name="rnc_alt_mobile_no"
              value={customerData.rnc_alt_mobile_no}
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
              type="email"
              name="rnc_email"
              value={customerData.rnc_email}
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
              name="rnc_address"
              value={customerData.rnc_address}
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
              name="rnc_pincode"
              value={customerData.rnc_pincode}
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
              name="rnc_extra_note"
              value={customerData.rnc_extra_note}
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
              value={customerData.rnc_pan_no}
              name="rnc_pan_no"
              aria-label="Sizing example input"
              placeholder="PAN No."
              aria-describedby="inputGroup-sizing-sm"
              onChange={handleInputChange}
            />
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          {loading && (
            <span className="pull-left text-success">
              Wait Saving Details...
            </span>
          )}
          {error && <span className="pull-left text-danger">{error}</span>}

          <CButton color="success" onClick={handleRegisterNewCustomer}>
            Register New
          </CButton>
        </CModalFooter>
        <ToastContainer position="bottom-right" />{" "}
        {/* Move this to a higher level */}
      </CForm>
    </CModal>
  );
};

export default RegisterCustomerModal;
