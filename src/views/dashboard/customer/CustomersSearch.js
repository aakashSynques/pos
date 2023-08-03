import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  CInputGroup,
  CFormInput,
  CRow,
  CCol,
  CButton,
  CTooltip,
} from "@coreui/react";
import { fetch } from "../../../utils";
import RegisterCustomerModal from "./RegisterCustomerModal";
import EditCustomerProfile from "./EditCustomerProfile";
import CustAccountsModel from "./CustAccountsModel";

const CustomersSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [customerSearchResults, setCustomerSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null); // New state to track the selected customer
  const [addNewCustomer, setAddNewCustomer] = useState(false);
  const [editCustomerModel, setEditCustomerModel] = useState(false);
  const [accountModel, setAccountModel] = useState(false);

  const customTooltipStyle = {
    "--cui-tooltip-bg": "var(--cui-primary)",
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getProductSearch();
    }, 100); // Debounce API call by 100ms

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const getProductSearch = async () => {
    if (query.trim() === "") {
      setCustomerSearchResults([]);
      return;
    }
    setLoading(true);
    // Check if the results are already cached
    if (cache[query]) {
      setCustomerSearchResults(cache[query]);
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const body = { query };
      const response = await fetch(
        "/api/customers/search/POS",
        "post",
        body,
        headers
      );
      setCustomerSearchResults(response.data.suggestions);
      // Cache the results for the current query
      console.log(response.data.suggestions);
      setCache((prevCache) => ({
        ...prevCache,
        [query]: response.data.suggestions,
      }));
    } catch (err) {
      setError("An error occurred while fetching customer data.");
    } finally {
      setLoading(false);
    }
  };

  // Set the selected customer when the customer is clicked
  const handleSelectCustomer = (customerName) => {
    setQuery(customerName);
    const selectedCustomer = customerSearchResults.find(
      (customer) => customer.value === customerName
    );
    setSelectedCustomer(selectedCustomer);
  };

  // // Function to handle the update of the selected customer data
  // const handleUpdateCustomerData = (updatedData) => {
  //   // Update the selected customer's data in the state
  //   setSelectedCustomer((prevCustomer) => ({
  //     ...prevCustomer,
  //     json: updatedData,
  //   }));
  // };

  // Function to handle when the "Edit" button is clicked for a selected customer
  const handleEditCustomer = () => {
    if (selectedCustomer) {
      setEditCustomerModel(true);
    }
  };
   // Function to handle when the "Edit" button is clicked for a selected customer
   const handleAccountModel = () => {
    if (selectedCustomer) {
      setAccountModel(true);
    }
  };
 


  const MAX_RESULTS = 50; // Limit the number of search results displayed
  const displayedItems = useMemo(() => {
    if (query === "") return customerSearchResults.slice(0, MAX_RESULTS);

    return customerSearchResults
      .filter(
        (customer) =>
          customer.json.customer_name
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          customer.json.mobile.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, MAX_RESULTS);
  }, [query, customerSearchResults]);

  // clickoutside to hide the search suggestions
  const ref = useRef(null);
  const onClickOutside = () => {
    setQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  // useEffect to handle the shortcut key (Shift + c) for focusing on the input element
  useEffect(() => {
    const handleShortcutKeyPressCustomer = (event) => {
      if (event.shiftKey && event.key === "C") {
        // Prevent the default behavior of the "c" key (prevents it from appearing in the input box)
        event.preventDefault();
        // Focus on the search bar input element
        const searchInput = document.getElementById("customer-search-input");
        if (searchInput) {
          searchInput.focus();
        }
      }
    };
    document.addEventListener("keydown", handleShortcutKeyPressCustomer);
    return () => {
      document.removeEventListener("keydown", handleShortcutKeyPressCustomer);
    };
  }, []);

  return (
    <div className="customer-sarch-sec">
      {selectedCustomer ? ( // Render the selected customer data if a customer is selected
        <div>
          <CRow>
            {/* selected customer display data */}
            <CCol sm={6}>
              <div className="cust-name">
                <b>
                  {selectedCustomer.json.customer_name}
                  <i
                    class="fa fa-info-circle text-primary pl-2"
                    title="EXTRA NOTE"
                  ></i>
                </b>
              </div>
              <div>
                <label className="cust-label">
                  {selectedCustomer.json.cust_type_name} Account
                </label>{" "}
                - {selectedCustomer.json.mobile}
              </div>
            </CCol>

            {/* customer Edit and update */}

            <CCol sm={6}>
              <div class="text-right" style={{ float: "right" }}>
                <div class="btn-group">
                  {/* customer account view button */}
                
                  <CTooltip
                    content="Account [Shift + A]"
                    placement="top"
                    style={customTooltipStyle}
                  >
                    <button
                      onClick={handleAccountModel}
                      style={{ "border-radius": "2px" }}
                      class="btn btn-xs btn-warning rounded-left"
                      title=""
                      data-toggle="tooltip"
                      data-html="true"
                      data-original-title="Accounts<br>[ Shift + A ]"
                    >
                      <i class="fa fa-money"></i>
                    </button>
                  </CTooltip>
                  {/* customer Edit button */}
                  <CTooltip
                    content="Profile Edit [Shift + E]"
                    placement="top"
                    style={customTooltipStyle}
                  >
                    <button
                      onClick={handleEditCustomer}
                      class="btn btn-xs btn-primary "
                      title=""
                      data-toggle="tooltip"
                      data-html="true"
                      data-original-title="Profile Edit<br>[ Shift + E ]"
                    >
                      <i class="fa fa-edit"></i>
                    </button>
                  </CTooltip>

                  {/* customer clear button */}
                  <CTooltip
                    content="Clear Selected Accounts  [Shift + C]"
                    placement="top"
                  >
                    <button
                      style={{ "border-radius": "2px" }}
                      class="btn btn-xs btn-danger"
                      title=""
                      data-toggle="tooltip"
                      data-html="true"
                      data-original-title="Clear Selected Accounts<br>[ Shift + C ]"
                      onClick={() => setSelectedCustomer(null)}
                    >
                      <i class="fa fa-times"></i>
                    </button>
                  </CTooltip>
                </div>
              </div>
            </CCol>
          </CRow>

          {/* Add other customer information as needed */}
        </div>
      ) : (
        // Render the search bar if no customer is selected
        <>
          <CInputGroup className="change-focus">
            <CFormInput
              id="customer-search-input"
              type="text"
              placeholder="Search Customer Name [Shift + C]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </CInputGroup>
          <CButton
            color="info"
            className="text-white mt-1 rounded-1"
            style={{ backgroundColor: "#5bc0de" }}
          >
            Walk-IN{" "}
            <span class="badge" color="info">
              0
            </span>
          </CButton>

          <div className="product-list-abslute" ref={ref}>
            {loading && <div style={{ background: "white" }}>Loading...</div>}
            {!loading &&
              query !== "" &&
              displayedItems.map((customer) => (
                <div
                  key={customer.json.cust_id}
                  className="product-list"
                  onClick={() => handleSelectCustomer(customer.value)}
                >
                  <div>
                    <b>{customer.value}</b>
                  </div>
                </div>
              ))}
            {!loading && query !== "" && displayedItems.length === 0 && (
              <div className="product-list not-found-add-cust">
                <span className="text-danger">
                  <i class="fa fa-exclamation-triangle"></i> Sorry, no matching
                  results.
                </span>{" "}
                <br />
                <button
                  className="btn btn-sm reg-new-btn"
                  onClick={() => setAddNewCustomer(!addNewCustomer)}
                >
                  <i className="fa fa-plus"></i> Register new account
                </button>{" "}
              </div>
            )}
          </div>
        </>
      )}

      {/* Customer account Mode */}
      {/* register new customer model */}
      <CustAccountsModel 
        visible={accountModel}
        onClose={() => setAccountModel(false)}
      />

      {/* register new customer model */}
      <RegisterCustomerModal
        visible={addNewCustomer}
        onClose={() => setAddNewCustomer(false)}
      />

      {/* Edit customer model */}
      {selectedCustomer && (
        <EditCustomerProfile
          visible={editCustomerModel}
          onClose={() => setEditCustomerModel(false)}
          customerData={selectedCustomer.json} // Pass the selected customer data to the EditCustomerProfile component
          // onUpdate={handleUpdateCustomerData} // Pass the update function to the EditCustomerProfile component
        />
      )}
    </div>
  );
};

export default CustomersSearch;
