import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSelectedCustomer } from "../../../action/actions";



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

const RegisterCustomerModal = ({
  visible,
  onClose,
  onSuccess,
  searchQuery,
}) => {
  const dispatch = useDispatch();


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registerCustomerData, setRegisterCustomerData] = useState({
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

  useEffect(() => {
    if (searchQuery) {
      if (!isNaN(searchQuery)) {
        setRegisterCustomerData({
          ...registerCustomerData,
          rnc_mobile_no: searchQuery,
        });
      } else {
        setRegisterCustomerData({
          ...registerCustomerData,
          rnc_full_name: searchQuery,
        });
      }
    }
  }, [searchQuery]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (
      (name === "rnc_mobile_no" && value.length > 10) ||
      (name === "rnc_alt_mobile_no" && value.length > 10)
    ) {
      return;
    }

    setRegisterCustomerData({
      ...registerCustomerData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setRegisterCustomerData({
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
      const requestBody = JSON.stringify(registerCustomerData);
      const response = await fetch(
        "http://posapi.q4hosting.com/api/customers/add",
        {
          method: "POST",
          headers,
          body: requestBody,
        }
      );

      const responseData = await response.json();
      dispatch(setSelectedCustomer(responseData)); // Use the actual customer data from the response

      // Check if the request was successful
      if (responseData.ok) {
        onClose();
        toast.success("Customer Registered Successfully!");
     
         setRegisterCustomerData({
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
        setError("Failed to register customer: " + responseData.message);
      }

    } catch (error) {
      setError("Failed to register customer.");
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
              value={registerCustomerData.rnc_type}
            >
              <option style={{ fontSize: "13px" }}>--select customer type--</option>
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
              // style={{ textTransform: "uppercase" }}
              name="rnc_full_name"
              value={registerCustomerData.rnc_full_name}
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
              value={registerCustomerData.rnc_mobile_no}
              placeholder="Mobile No."
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={handleInputChange}
              maxLength="10"
            />
          </CInputGroup>

          {/* Enter Alternative mobile number */}
          <CInputGroup size="sm" className="mb-2">
            <CInputGroupText id="inputGroup-sizing-sm">
              <i className="fa fa-phone"></i>
            </CInputGroupText>
            <CFormInput
              type="number"
              maxLength="10"
              name="rnc_alt_mobile_no"
              value={registerCustomerData.rnc_alt_mobile_no}
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
              value={registerCustomerData.rnc_email}
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
              value={registerCustomerData.rnc_address}
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
              value={registerCustomerData.rnc_pincode}
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
              value={registerCustomerData.rnc_extra_note}
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
              value={registerCustomerData.rnc_pan_no}
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





