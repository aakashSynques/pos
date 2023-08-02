// import React, { useState} from "react";
// import {
//   CModal,
//   CModalHeader,
//   CModalTitle,
//   CModalBody,
//   CModalFooter,
//   CButton,
//   CInputGroup,
//   CInputGroupText,
//   CFormInput,
//   CFormTextarea,
//   CFormSelect,
// } from "@coreui/react";

// const EditCustomerProfile = ({ visible, onClose }) => {

//   const [customerData, setCustomerData] = useState({});

//   return (
//     <CModal
//       size="sm"
//       visible={visible}
//       onClose={onClose}
//       className="register-model"
//     >
//       <CModalHeader onClose={onClose}>
//         <CModalTitle style={{ fontSize: "16px" }}>Update Customer Details</CModalTitle>
//       </CModalHeader>
//       <CModalBody>

//         {/* select account type */}
//         <CInputGroup size="sm" className="mb-2">
//           <CInputGroupText id="inputGroup-sizing-sm">
//             <i className="fa fa-file-text-o"></i>
//           </CInputGroupText>
//           <CFormSelect aria-label="Default select example">
//             <option value="1">Customer</option>
//             <option value="2">Employee (BNS)</option>
//           </CFormSelect>
//         </CInputGroup>

//         {/* enter full name */}
//         <CInputGroup size="sm" className="mb-2">
//           <CInputGroupText id="inputGroup-sizing-sm">
//             <i className="fa fa-user"></i>
//           </CInputGroupText>
//           <CFormInput
//             name="fullName"

//             placeholder="Full Name"
//             aria-label="Sizing example input"
//             aria-describedby="inputGroup-sizing-sm"
//           />
//         </CInputGroup>

//         {/* Enter mobile Number */}
//         <CInputGroup size="sm" className="mb-2">
//           <CInputGroupText id="inputGroup-sizing-sm">
//             <i className="fa fa-phone"></i>
//           </CInputGroupText>
//           <CFormInput
//             name="mobileNo"

//             placeholder="Mobile No."
//             aria-label="Sizing example input"
//             aria-describedby="inputGroup-sizing-sm"
//           />
//         </CInputGroup>

//         {/* Enter Alternative mobile number */}
//         <CInputGroup size="sm" className="mb-2">
//           <CInputGroupText id="inputGroup-sizing-sm">
//             <i className="fa fa-phone"></i>
//           </CInputGroupText>
//           <CFormInput
//             aria-label="Sizing example input"
//             aria-describedby="inputGroup-sizing-sm"
//             placeholder="Alternative Mobile No."
//           />
//         </CInputGroup>

//         {/* Enter Email  */}
//         <CInputGroup size="sm" className="mb-2">
//           <CInputGroupText id="inputGroup-sizing-sm">
//             <i className="fa fa-envelope"></i>
//           </CInputGroupText>
//           <CFormInput
//             aria-label="Sizing example input"
//             placeholder="Email"
//             aria-describedby="inputGroup-sizing-sm"
//           />
//         </CInputGroup>

//         {/* enter address text area */}
//         <CInputGroup size="sm" className="mb-2">
//           <CInputGroupText id="inputGroup-sizing-sm">
//             <i className="fa fa-map-marker"></i>
//           </CInputGroupText>
//           <CFormTextarea
//             id="floatingTextarea"
//             placeholder="Full Address"
//           ></CFormTextarea>
//         </CInputGroup>

//           {/* Enter Pin code */}
//         <CInputGroup size="sm" className="mb-2">
//           <CInputGroupText id="inputGroup-sizing-sm">
//             <i className="fa fa-map-marker"></i>
//           </CInputGroupText>
//           <CFormInput
//             placeholder="Pincode"
//             aria-label="Sizing example input"
//             aria-describedby="inputGroup-sizing-sm"
//           />
//         </CInputGroup>

//           {/* Enter Note */}
//         <CInputGroup size="sm" className="mb-2">
//           <CInputGroupText id="inputGroup-sizing-sm">
//             <i className="fa fa-pencil"></i>
//           </CInputGroupText>
//           <CFormInput
//             placeholder="Extra Note"
//             aria-label="Sizing example input"
//             aria-describedby="inputGroup-sizing-sm"
//           />
//         </CInputGroup>

//         {/* Enter PAN NO. */}
//         <CInputGroup size="sm" className="mb-2">
//           <CInputGroupText id="inputGroup-sizing-sm">
//             <i className="fa fa-credit-card"></i>
//           </CInputGroupText>
//           <CFormInput
//             aria-label="Sizing example input"
//             placeholder="PAN No."
//             aria-describedby="inputGroup-sizing-sm"
//           />
//         </CInputGroup>
//       </CModalBody>
//       <CModalFooter>
//         <CButton color="success">Update Details</CButton>
//       </CModalFooter>
//     </CModal>
//   );
// };

// export default EditCustomerProfile;

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
} from "@coreui/react";
import { fetch } from "../../../utils";

const EditCustomerProfile = ({ visible, onClose, customerData }) => {
  const [updatedCustomerData, setUpdatedCustomerData] = useState(
    customerData ? { ...customerData } : {}
  );

  // Function to handle input field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle the update of customer details
  const handleUpdateCustomer = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Set the content type to JSON
      };

      // Prepare the request body with the updated customer data
      const requestBody = JSON.stringify(updatedCustomerData);
      // Make the API call
      const response = await fetch(
        `http://posapi.q4hosting.com/api/customers/edit/${updatedCustomerData.cust_id}`,
        {
          method: "PUT",
          headers,
          body: requestBody,
        }
      );
      console.log(response);
      // Check if the request was successful
      if (response.ok) {
        const responseData = await response.json();
        console.log("Customer updated successfully!", responseData);
        onClose(); // Close the modal on successful update
        // Optionally, you can perform additional actions or show a success message.
      } else {
        // Handle the case where the API returns an error
        const responseData = await response.json();
        console.log("Failed to update customer: " + responseData.message);
      }
    } catch (error) {
      console.error("Error occurred while updating customer:", error);
      // Handle any errors that occurred during the API call
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
        {/* Display the customer data in input fields */}
        <CInputGroup size="sm" className="mb-2">
          <CInputGroupText id="inputGroup-sizing-sm">
            <i className="fa fa-file-text-o"></i>
          </CInputGroupText>
          <CFormSelect
            aria-label="Default select example"
            name="rnc_type"
            value={updatedCustomerData.rnc_type}
            onChange={handleInputChange}
          >
            <option value="1">Customer</option>
            <option value="2">Employee (BNS)</option>
          </CFormSelect>
        </CInputGroup>
        {/* Other input fields */}
        <CInputGroup size="sm" className="mb-2">
          <CInputGroupText id="inputGroup-sizing-sm">
            <i className="fa fa-user"></i>
          </CInputGroupText>
          <CFormInput
            name="rnc_full_name"
            value={updatedCustomerData.rnc_full_name}
            placeholder="Full Name"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleInputChange}
          />
        </CInputGroup>
        {/* Add other input fields for mobileNo, email, address, pincode, etc. */}
        {/* ... */}
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
