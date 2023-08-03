import React, { useState, useEffect } from "react";
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

const EditCustomerProfile = ({
  visible,
  onClose,
  customerData: initialData,
}) => {
  const [customerData, setCustomerData] = useState(initialData);

  useEffect(() => {
    setCustomerData(initialData);
  }, [initialData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleUpdateCustomer = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const requestBody = JSON.stringify({
        // Update the fields as needed for the API
        cust_id: customerData.cust_id, // Include the customer ID in the request body
        rnc_type: customerData.cust_type_id,
        rnc_full_name: customerData.customer_name,
        rnc_mobile_no: customerData.mobile,
        rnc_email: customerData.email,
        rnc_address: customerData.address,
        rnc_pincode: customerData.pan_no,
        rnc_extra_note: customerData.extra_note,
        rnc_alt_mobile_no: customerData.alt_mobile,
        rnc_pan_no: customerData.pan_no,
        rnc_gst_no: customerData.gst_no,
        // Add any additional fields or modify as per API requirements
      });

      const response = await fetch(
        `http://posapi.q4hosting.com/api/customers/edit`, // Assuming the API endpoint for updating a customer requires the customer's ID
        {
          method: "PUT",
          headers,
          body: requestBody,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        alert("Customer details updated successfully!");
        console.log("Response data:", responseData);
        onClose();
      } else {
        const responseData = await response.json();
        alert("Failed to update customer details: " + responseData.message);
      }
    } catch (error) {
      console.error("Error occurred while updating customer details:", error);
      alert("Failed to update customer details. Please try again later.");
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
        <CModalTitle style={{ fontSize: "16px" }}>
          Update Customer Details
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
          {/* select account type */}
          <CInputGroup size="sm" className="mb-2">
            <CInputGroupText id="inputGroup-sizing-sm">
              <i className="fa fa-file-text-o"></i>
            </CInputGroupText>
            <CFormSelect
              aria-label="Default select example"
              name="cust_type_id"
              onChange={handleInputChange}
              value={customerData.cust_type_id}
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
              name="customer_name"
              value={customerData.customer_name}
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
              name="mobile"
              value={customerData.mobile}
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
              name="alt_mobile"
              value={customerData.alt_mobile}
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
              name="extra_note"
              value={customerData.extra_note}
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
              value={customerData.pan_no}
              name="pan_no"
              aria-label="Sizing example input"
              placeholder="PAN No."
              aria-describedby="inputGroup-sizing-sm"
              onChange={handleInputChange}
            />
          </CInputGroup>
        </CModalBody>
      <CModalFooter>
        <CButton color="success" onClick={handleUpdateCustomer}>
          Update Details
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EditCustomerProfile;
