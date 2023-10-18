import React, { useState, useEffect, useMemo, useRef } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedCustomer,
  clearSelectedCustomer,
  setInputFocused,
  setOnBlur,
  setCustomerAccountJson,
  clearSearchQuery,
} from "../../../action/actions";
import { toast } from "react-toastify";

const CustomersSearch = () => {
  const dispatch = useDispatch();
  // Adjust the path based on your state structure
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [customerSearchResults, setCustomerSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});
  // const [selectedCustomer, setSelectedCustomer] = useState(null); // New state to track the selected customer
  const [addNewCustomer, setAddNewCustomer] = useState(false);
  const [editCustomerModel, setEditCustomerModel] = useState(false);
  const [accountModel, setAccountModel] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0); // Initialize focusedIndex
  const customerSearchInputRef = useRef(null); // Create a ref for the customer search input
  const [walkingCustomerData, setWalkingCustomerData] = useState(null);

  const [handleWalkingClicked, sethandleWalkingClicked] = useState(false); // walk in button
  const buttonRef = useRef(null); // walk in button
  const isInputFocused = useSelector((state) => state.inputFocus.isInputFocus);

  const processPendingSale = useSelector(
    (state) => state.pendingSaleProcess.pandingSaleProcess
  )
 
  const selectedCustomer = useSelector(
    (state) => state.customer.selectedCustomer
  );

  
  const customTooltipStyle = {
    "--cui-tooltip-bg": "var(--cui-primary)",
  };

  const selectedOutletId = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getProductSearch();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const getProductSearch = async () => {
    if (query.trim() === "") {
      setCustomerSearchResults([]);
      return;
    }
    setLoading(true);
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
    dispatch(setSelectedCustomer(selectedCustomer));
  };

  const handleEditCustomer = () => {
    if (!selectedCustomer || !selectedCustomer.json) {
      return;
    }
    if (
      selectedCustomer?.json?.cust_type_id === 4 ||
      selectedCustomer?.json?.cust_type_id === 6 ||
      selectedCustomer?.json?.cust_type_id === 2
    ) {
      toast.error(
        "Can't edit details of this customer. List registered non-editable Customer!",
        {
          autoClose: 3000,
        }
      );
    } else {
      setEditCustomerModel(true);
    }
  };

  const MAX_RESULTS = 50; // Limit the number of search results displayed
  const displayedItems = useMemo(() => {
    if (query === "") {
      setLoading(false);
      return customerSearchResults.slice(0, MAX_RESULTS);
    }

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

  const handleClearSelectedCustomer = () => {
    dispatch(clearSelectedCustomer());
    setQuery("");
    setFocusedIndex(-1);
    if (customerSearchInputRef.current) {
      customerSearchInputRef.current.focus();
    }
  };

  // Function to handle when the shift + A key button is clicked for a selected customer
  const handleAccountModel = () => {
    if (!selectedCustomer) {
      return;
    } else {
      setAccountModel(true);
    }
  };
  useEffect(() => {
    const handleEscKeyPress = (event) => {
      if (accountModel && event.key === "Escape") {
        setAccountModel(false);
      }
    };

    window.addEventListener("keydown", handleEscKeyPress);

    return () => {
      window.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [accountModel, setAccountModel]);

  useEffect(() => {
    const handleShortcutKeyPressCustomer = (event) => {
      if (event.shiftKey && event.key === "A") {
        setAccountModel(true);
        if (selectedCustomer) {
          handleAccountModel();
        }
      }
    };

    window.addEventListener("keydown", handleShortcutKeyPressCustomer);

    return () => {
      window.removeEventListener("keydown", handleShortcutKeyPressCustomer);
    };
  }, [isInputFocused]);

  // Function to handle when the "Edit" button is clicked for a selected customer
  useEffect(() => {
    const handleShortcutKeyPressCustomerEdit = (event) => {
      if (event.shiftKey && event.key === "E") {
        handleEditCustomer();
      }
    };
    window.addEventListener("keydown", handleShortcutKeyPressCustomerEdit);
    return () => {
      window.removeEventListener("keydown", handleShortcutKeyPressCustomerEdit);
    };
  }, [isInputFocused, selectedCustomer]);

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
    } else if (event.key === "Tab" && displayedItems.length > -1) {
      event.preventDefault();
      if (focusedIndex !== -1) {
        const selectedCustomer = displayedItems[focusedIndex];
        handleSelectCustomer(selectedCustomer.value);
        setFocusedIndex(-1); // Reset focus after selection
      } else if (selectedCustomer) {
        event.preventDefault();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Tab") {
        handleTabKeyPress(event);
      } else {
        handleArrowKeyPress(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedIndex]);

  const handleTabKeyPress = (event) => {
    if (
      (event.key === "Tab" || event.key === "Enter") &&
      displayedItems.length > 0
    ) {
      event.preventDefault();
      if (focusedIndex !== -1) {
        const selectedCustomer = displayedItems[focusedIndex];
        handleSelectCustomer(selectedCustomer.value);
        setFocusedIndex(-1);
      }
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (customerSearchResults.length === 0 && query.trim() !== "") {
        setAddNewCustomer(true);
      }
    }, 20000);

    return () => clearTimeout(timeoutId);
  }, [query, customerSearchResults]);

  const clearSearchQuery = () => {
    setQuery("");
  };

  // Function to handle walk in API
  const handleWalkingCustomer = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const body = {
        outlet_id: selectedOutletId,
      };
      const response = await fetch(
        "/api/customers/new-walk-in-customer",
        "post",
        body,
        headers
      );
      if (response && response.data && response.data.cust_win_json) {
        const walkingCustomerData = response.data.cust_win_json;
        setWalkingCustomerData(walkingCustomerData);
        // setQuery(walkingCustomerData.customer_name);
        const walkingSelectedCustomer = {
          ...selectedCustomer,
          json: walkingCustomerData,
        };
        dispatch(setSelectedCustomer(walkingSelectedCustomer));
        // console.log("walking customer", setSelectedCustomer());
      } else {
        toast.error("Failed to retrieve walking customer data");
      }
    } catch (err) {
      console.error("Error retrieving walking customer data:", err);
      toast.error("An error occurred while fetching walking customer data.");
    }
  };
  // Function to handle when the shift + W walk in button is clicked for a selectedId

  const handleWalking = () => {
    handleWalkingCustomer();
  };
  useEffect(() => {
    const handleShortcutKeyPressWalking = (event) => {
      if (!isInputFocused && event.shiftKey && event.key === "W") {
        event.preventDefault();
        if (!selectedCustomer) {
          handleWalking();
        }
      }
    };

    window.addEventListener("keydown", handleShortcutKeyPressWalking);

    return () => {
      window.removeEventListener("keydown", handleShortcutKeyPressWalking);
    };
  }, [isInputFocused, selectedCustomer, handleWalking]);

  const handleInputFocus = () => {
    dispatch(setInputFocused());
  };

  const handleInputBlur = () => {
    dispatch(setOnBlur());
  };

  useEffect(() => {
    setFocusedIndex(0);
  }, [customerSearchResults]);

  // ============customer account api=================
  const customer_id = selectedCustomer && selectedCustomer.json.cust_id;
  const getAllAccountData = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const body = {
        cust_id: customer_id,
      };
      const response = await fetch(
        "/api/customers/getCustomerAccount",
        "post",
        body,
        headers
      );

      dispatch(setCustomerAccountJson(response.data.cust_acc_json));
    } catch (err) {
      console.error("Error ", err);
    }
  };
  useEffect(() => {
    if (customer_id && customer_id) {
      getAllAccountData();
    }
  }, [customer_id && customer_id]);

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
                    {selectedCustomer.json.extra_note && (
                      <i
                        className="fa fa-info-circle text-primary pl-2"
                        title={selectedCustomer.json.extra_note}
                        style={{ paddingLeft: "5px" }}
                      ></i>
                    )}
                  </b>
                </div>
                <div>
                  <label
                    className={`cust-label ${selectedCustomer.json.cust_type_id === 4
                      ? "bg-danger"
                      : selectedCustomer.json.cust_type_id === 6
                        ? "bg-success"
                        : selectedCustomer.json.cust_type_id === 2
                          ? "bg-info"
                          : "bg-grey"
                      }`}
                  >
                    {selectedCustomer.json.cust_type_name} Account
                  </label>{" "}

                  - <small> {selectedCustomer.json.mobile}</small>
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
                        className="btn btn-xs btn-warning rounded-left rounded-1"
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
                        style={{ borderRadius: "2px" }}
                        className="btn btn-xs btn-danger"
                        title=""
                        data-toggle="tooltip"
                        data-html="true"
                        data-original-title="Clear Selected Accounts<br>[ Shift + C ]"
                        onClick={handleClearSelectedCustomer} // Update the click handler
                      >
                        <i className="fa fa-times"></i>
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
                autoComplete="off"
                placeholder="Search Customer Name [Shift + C]"
                value={query}
                onChange={(e) => {
                  setLoading(true);
                  setQuery(e.target.value);
                }}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                ref={customerSearchInputRef}
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
                          className={`product-list ${index === focusedIndex ? "focused" : ""
                            }`}
                          onClick={() => handleSelectCustomer(customer.value)}
                          onKeyDown={handleArrowKeyPress}
                          tabIndex={0}
                          aria-selected={
                            index === focusedIndex ? "true" : "false"
                          }
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
            <CTooltip
              content="Walk-In Customer [Shift + W]"
              placement="top"
              style={customTooltipStyle}
            >
              <CButton
                color="info"
                className="text-white mt-1 rounded-1"
                style={{ backgroundColor: "#5bc0de" }}
                onClick={() => {
                  sethandleWalkingClicked(true);
                  handleWalking();
                }}
                ref={buttonRef}
              >
                Walk-IN{" "}
                <span className="badge" color="info">
                  0
                </span>
              </CButton>
            </CTooltip>
          </>
        )}

        {selectedCustomer && (
          <CustAccountsModel
            accountModel={accountModel}
            setAccountModel={setAccountModel}
            selectedCustomer={selectedCustomer}
          />
        )}

        <RegisterCustomerModal
          visible={addNewCustomer}
          onClose={() => {
            setAddNewCustomer(false);
            clearSearchQuery(); // Call the clearSearchQuery function here
          }}
          searchQuery={query} // Pass the search query
        />

        {/* Edit customer model */}
        {selectedCustomer && (
          <EditCustomerProfile
            visible={editCustomerModel}
            onClose={() => setEditCustomerModel(false)}
            customerData={selectedCustomer.json}
          />
        )}
      </div>
    </>
  );
};

export default CustomersSearch;