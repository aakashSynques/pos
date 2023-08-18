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
import PayBillsModels from "../cart/billing/PayBillsModels";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCustomer } from "../../../action/actions";

const CustomersSearch = () => {
  const dispatch = useDispatch();
  const selectedCustomer = useSelector(
    (state) => state.customer.selectedCustomer
  ); // Adjust the path based on your state structure
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [customerSearchResults, setCustomerSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});
  // const [selectedCustomer, setSelectedCustomer] = useState(null); // New state to track the selected customer
  const [addNewCustomer, setAddNewCustomer] = useState(false);
  const [editCustomerModel, setEditCustomerModel] = useState(false);
  const [accountModel, setAccountModel] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1); // Initialize focusedIndex
  const customerSearchInputRef = useRef(null); // Create a ref for the customer search input

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
      const body = {
        rand: 0.44369813330371355, // LIMIT PAIRAMETER
        query: query,
      };
      const response = await fetch(
        "/api/customers/search/POS",
        "post",
        body,
        headers
      );
      setCustomerSearchResults(response.data.suggestions);
      // Cache the results for the current query
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

  const handleUpdateCustomerData = (updatedData) => {
    setSelectedCustomer((prevCustomer) => ({
      ...prevCustomer,
      json: { ...prevCustomer.json, ...updatedData },
    }));
  };

  // Set the selected customer when the customer is clicked
  const handleSelectCustomer = (customerName) => {
    setQuery(customerName);
    const selectedCustomer = customerSearchResults.find(
      (customer) => customer.value === customerName
    );
    // setSelectedCustomer(selectedCustomer); // Local state update
    dispatch(setSelectedCustomer(selectedCustomer));
    console.log("selectedCustomer:", selectedCustomer.json);
  };
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

  const MAX_RESULTS = 1000; // Limit the number of search results displayed
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

  // const handleClearSelectedCustomer = () => {
  //   setSelectedCustomer(null);
  //   setFocusedIndex(-1); // Reset focused index
  //   console.log(setSelectedCustomer(null))
  // };

  const handleClearSelectedCustomer = () => {
    setSelectedCustomer(null);
    setFocusedIndex(-1); // Reset focused index
    console.log('clear customer')
  };

  useEffect(() => {
    const handleShortcutKeyPressCustomer = (event) => {
      if (event.shiftKey) {
        switch (event.key) {
          case "C":
            event.preventDefault();
            const searchInput = document.getElementById(
              "customer-search-input"
            );
            if (searchInput) {
              searchInput.focus();
            }
            break;
          case "E":
            event.preventDefault();
            if (selectedCustomer) {
              handleEditCustomer();
            }
            break;
          case "A":
            event.preventDefault();
            if (selectedCustomer) {
              setAccountModel(true);
            }
            break;
          default:
            break;
        }
      }
    };

    const handleShortcutKeyPressClear = (event) => {
      if (event.shiftKey && event.key === "C") {
        event.preventDefault();
        setQuery(""); // Clear the search input data
        // Focus on the search bar input element
        const searchInput = document.getElementById("customer-search-input");
        if (searchInput) {
          searchInput.focus();
        }
        handleClearSelectedCustomer(); // Call the function to clear selected customer
      }
    };
    document.addEventListener("keydown", handleShortcutKeyPressCustomer);
    document.addEventListener("keydown", handleShortcutKeyPressClear);
    return () => {
      document.removeEventListener("keydown", handleShortcutKeyPressCustomer);
      document.removeEventListener("keydown", handleShortcutKeyPressClear);
    };
  }, [selectedCustomer]);

  // Function to group customers by cust_type_name
  const groupCustomersByType = () => {
    const groupedCustomers = {};
    displayedItems.forEach((customer) => {
      const custType = customer.json.cust_type_name;
      if (!groupedCustomers[custType]) {
        groupedCustomers[custType] = [];
      }
      groupedCustomers[custType].push(customer);
    });
    return groupedCustomers;
  };
  const groupedCustomers = groupCustomersByType();

  const handleArrowKeyPress = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex === -1
          ? displayedItems.length - 1
          : Math.max(prevIndex - 1, 0)
      );
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex === displayedItems.length - 1
          ? 0
          : Math.min(prevIndex + 1, displayedItems.length - 1)
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (focusedIndex !== -1) {
        const selectedCustomer = displayedItems[focusedIndex];
        handleSelectCustomer(selectedCustomer.value);
        setFocusedIndex(-1); // Reset focus after selection
      }
    }
  };

  return (
    <>
      <div className="customer-sarch-sec">
        {selectedCustomer ? (
          <div>
            <CRow>
              <CCol sm={6}>
                <div className="cust-name">
                  <b>
                    {selectedCustomer.json.customer_name}
                    <i
                      className="fa fa-info-circle text-primary pl-2"
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
                <div className="text-right" style={{ float: "right" }}>
                  <div className="btn-group">
                    {/* customer account view button */}
                    <CTooltip
                      content="Account [Shift + A]"
                      placement="top"
                      style={customTooltipStyle}
                    >
                      <button
                        onClick={handleAccountModel}
                        style={{ "border-radius": "2px" }}
                        className="btn btn-xs btn-warning rounded-left"
                        title=""
                        data-toggle="tooltip"
                        data-html="true"
                        data-original-title="Accounts<br>[ Shift + A ]"
                      >
                        <i className="fa fa-money"></i>
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
                        className="btn btn-xs btn-primary "
                        title=""
                        data-toggle="tooltip"
                        data-html="true"
                        data-original-title="Profile Edit<br>[ Shift + E ]"
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                    </CTooltip>

                    {/* customer clear button */}
                    <CTooltip
                      content="Clear Selected Accounts  [Shift + C]"
                      placement="top"
                    >
                      <button
                        style={{ "border-radius": "2px" }}
                        className="btn btn-xs btn-danger"
                        title=""
                        data-toggle="tooltip"
                        data-html="true"
                        data-original-title="Clear Selected Accounts<br>[ Shift + C ]"
                        onClick={handleClearSelectedCustomer} // Update the click handler
                      >
                        <i className="fa fa-times"></i> clear
                      </button>
                    </CTooltip>
                  </div>
                </div>
              </CCol>
            </CRow>
          </div>
        ) : (
          <>
            <CInputGroup className="change-focus">
              <CFormInput
                id="customer-search-input"
                type="text"
                placeholder="Search Customer Name [Shift + C]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ref={customerSearchInputRef} // Make sure this is correctly placed
              />
            </CInputGroup>
            <div className="product-list-abslute" ref={ref}>
              {loading && <div style={{ background: "white" }}>Loading...</div>}
              {!loading &&
                query !== "" &&
                Object.entries(groupedCustomers).map(
                  ([custType, customers]) => (
                    <div key={custType}>
                      <div
                        className="bg-success text-white"
                        style={{ padding: "2px 10px" }}
                      >
                        <i className="fa fa-arrow-circle-right"></i>&nbsp;
                        {custType} List
                      </div>
                      {customers.map((customer, index) => (
                        <div
                          key={customer.json.cust_id}
                          className={`product-list ${
                            index === focusedIndex ? "focused" : ""
                          }`}
                          onClick={() => handleSelectCustomer(customer.value)}
                          onKeyDown={handleArrowKeyPress}
                          tabIndex={0}
                          aria-selected={
                            index === focusedIndex ? "true" : "false"
                          } // Add this line
                        >
                          <div>
                            <b>{customer.value}</b>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              {!loading && query !== "" && displayedItems.length === 0 && (
                <div className="product-list not-found-add-cust">
                  <span className="text-danger">
                    <i className="fa fa-exclamation-triangle"></i> Sorry, no
                    matching results.
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
            <CButton
              color="info"
              className="text-white mt-1 rounded-1"
              style={{ backgroundColor: "#5bc0de" }}
            >
              Walk-IN{" "}
              <span className="badge" color="info">
                0
              </span>
            </CButton>
          </>
        )}

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
            customerData={selectedCustomer.json}
            onUpdate={handleUpdateCustomerData}
            setSelectedCustomer={setSelectedCustomer} // Pass setSelectedCustomers here
          />
        )}
      </div>
    </>
  );
};

export default CustomersSearch;
