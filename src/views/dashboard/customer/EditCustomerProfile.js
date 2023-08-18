import { ToastContainer, toast } from "react-toastify"; // Import toast and ToastContainer
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
  setSelectedCustomer, // Receive the prop here
}) => {
  const [customerData, setCustomerData] = useState(initialData);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Add state for success message
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state for submitting status

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
      setIsSubmitting(true); // Set submitting status
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
        rnc_extra_note: customerData.extra_note,
        rnc_alt_mobile_no: customerData.alt_mobile,
        rnc_pincode: customerData.pincode,
        rnc_pan_no: customerData.pan_no,
        rnc_gst_no: customerData.gst_no,

        // rnc_pan_no: customerData.pan_no !== null ? customerData.pan_no : undefined, // Exclude if null
        // rnc_pincode: customerData.pincode !== null ? customerData.pincode : undefined, // Exclude if null
      });

      const response = await fetch(
        `http://posapi.q4hosting.com/api/customers/edit`,
        {
          method: "PUT",
          headers,
          body: requestBody,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response data:", responseData);
        onClose();
        setErrorMessage(null); // Clear any previous error message
        setSuccessMessage("Wait Saving Details.."); // Set success message
        toast.success("Customer Details Updated Successfully!");

        // Set the updated customer name in the selectedCustomer state
        setSelectedCustomer((prevCustomer) => ({
          ...prevCustomer,
          json: {
            ...prevCustomer.json,
            customer_name: customerData.customer_name, // Update the customer name
            cust_type_id: customerData.cust_type_id,
            mobile: customerData.mobile,
            email: customerData.email,
            address: customerData.address,
            extra_note: customerData.extra_note,
            alt_mobile: customerData.alt_mobile,
            pincode: customerData.pincode,
            pan_no: customerData.pan_no,
            gst_no: customerData.gst_no,
          },
        }));
      } else {
        const responseData = await response.json();
        setErrorMessage("An error occurred while updating customer details.");
        setSuccessMessage(null); // Clear success message if there was an error
      }
    } catch (error) {
      console.error("Error occurred while updating customer details:", error);
      setErrorMessage("An error occurred while updating customer details.");
      setSuccessMessage(null); // Clear success message if there was an error
    } finally {
      setIsSubmitting(false);
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
            <option disabled>--Select --</option>
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
        {/* <CInputGroup size="sm" className="mb-2">
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
        </CInputGroup> */}

        <CInputGroup size="sm" className="mb-2">
          <CInputGroupText id="inputGroup-sizing-sm">
            <i className="fa fa-map-marker"></i>
          </CInputGroupText>
          <CFormInput
            type="number"
            value={customerData.pincode}
            name="pincode"
            aria-label="Sizing example input"
            placeholder="pincode"
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
            type="number"
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
        {errorMessage && (
          <span
            className="pull-left text-left text-danger"
            style={{ fontSize: "13px" }}
          >
            {errorMessage}
          </span>
        )}
        {isSubmitting ? (
          <span className="pull-left text-center text-success">
            Wait Saving Details...
          </span>
        ) : (
          <CButton color="success" onClick={handleUpdateCustomer}>
            Update Details
          </CButton>
        )}
      </CModalFooter>
      <ToastContainer position="bottom-right" />
    </CModal>
  );
};

export default EditCustomerProfile;
