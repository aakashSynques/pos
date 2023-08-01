// import React from 'react'

// const CustomersSearch = () => {
//   return (
//     <div>CustomersSearch</div>
//   )
// }

// export default CustomersSearch


import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  CInputGroup,
  CFormInput,
  CRow,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";
import { fetch } from "../../../utils";
import RegisterCustomerModal from "./RegisterCustomerModal";
import EditCustomerProfile from "./EditCustomerProfile";

const CustomersSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [customerSearchResults, setCustomerSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null); // New state to track the selected customer
  const [addNewCustomer, setAddNewCustomer] = useState(false);
  const [editCustomer, setEditCustomer] = useState(false);

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

  const handleSelectCustomer = (customerName) => {
    setQuery(customerName);

    // Set the selected customer when the customer is clicked
    const selectedCustomer = customerSearchResults.find(
      (customer) => customer.value === customerName
    );
    setSelectedCustomer(selectedCustomer);
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
    <div>
      {selectedCustomer ? ( // Render the selected customer data if a customer is selected
        <div className="customer-sarch-sec">
          <CRow>
            <CCol sm={6}>
              <div className="cust-name">
                <b>{selectedCustomer.json.customer_name}</b>
              </div>
              <div>
                <label className="cust-label">
                  {selectedCustomer.json.cust_type_name}
                </label>{" "}
                - {selectedCustomer.json.mobile}
              </div>
            </CCol>
            <CCol sm={6}>
              <div class="text-right" style={{ float: "right" }}>
                <div class="btn-group">
                  <button
                    class="btn btn-xs btn-warning"
                    title=""
                    data-toggle="tooltip"
                    data-html="true"
                    data-original-title="Accounts<br>[ Shift + A ]"
                  >
                    <i class="fa fa-money"></i>
                  </button>
                  <button
                    onClick={() => setEditCustomer(!editCustomer)}
                    class="btn btn-xs btn-primary "
                    title=""
                    data-toggle="tooltip"
                    data-html="true"
                    data-original-title="Profile Edit<br>[ Shift + E ]"
                  >
                    <i class="fa fa-edit"></i>
                  </button>
                  <button
                    class="btn btn-xs btn-danger"
                    title=""
                    data-toggle="tooltip"
                    data-html="true"
                    data-original-title="Clear Selected Accounts<br>[ Shift + C ]"
                    onClick={() => setSelectedCustomer(null)}
                  >
                    <i class="fa fa-times"></i>
                  </button>
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

      {/* register new customer model */}
      <RegisterCustomerModal
        visible={addNewCustomer}
        onClose={() => setAddNewCustomer(false)}
      />

      {/* Edit customer model */}
      <EditCustomerProfile
        visible={editCustomer}
        onClose={() => setEditCustomer(false)}
      />
    </div>
  );
};

export default CustomersSearch;
