
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { CInputGroup, CFormInput } from "@coreui/react";
import { fetch } from "../../utils";

const CustomerSearchBox = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [customerSearchResults, setCustomerSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});

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
      const response = await fetch("/api/customers/search/POS", "post", body, headers);

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

  const handleSelectCustomer = (customerName) => {
    setQuery(customerName);
  };

  const MAX_RESULTS = 50; // Limit the number of search results displayed
  const displayedItems = useMemo(() => {
    if (query === "") return customerSearchResults.slice(0, MAX_RESULTS);

    return customerSearchResults.filter(
      (customer) =>
        customer.json.customer_name.toLowerCase().includes(query.toLowerCase()) ||
        customer.json.mobile.toLowerCase().includes(query.toLowerCase())
    ).slice(0, MAX_RESULTS);
  }, [query, customerSearchResults]);





  // useEffect to handle the shortcut key (Shift + P) for focusing on the input element
  useEffect(() => {
    const handleShortcutKeyPressCustomer = (event) => {
      if (event.shiftKey && event.key === "C") {
        // Prevent the default behavior of the "P" key (prevents it from appearing in the input box)
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
      <CInputGroup className="change-focus">
        <CFormInput
          id="customer-search-input"
          type="text"
          placeholder="Search Customer Name [Shift + C]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            fontSize: "12px",
            borderRadius: 0,
          }}
        />
      </CInputGroup>
      <div className="product-list-abslute">
        {loading && <div>Loading...</div>}
        {!loading &&
          query !== "" &&
          displayedItems.map((customer) => (
            <div
              key={customer.json.cust_id}
              className="product-list"
              onClick={() => handleSelectCustomer(customer.value)}
            >
              <Link to={`/customer/${customer.json.cust_id}`}>
                <div>
                  <b>{customer.value}</b>
                  <br />
                  <small className="pull-left">
                    Customer Type: {customer.data.cust_type_name}
                  </small>
                </div>
                <br />
              </Link>
            </div>
          ))}
        {!loading && query !== "" && displayedItems.length === 0 && (
          <div className="product-list">
            No customers found matching the search query.
          </div>
        )}
        {/* {error && <div>Error: {error}</div>} */}
      </div>
    </div>
  );
};

export default CustomerSearchBox;

