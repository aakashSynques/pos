import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { CInputGroup, CFormInput } from "@coreui/react";
import { fetch } from "../../utils";

export default function CustomerSearchBox() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [customerSearchResults, setCustomerSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductSearch();
  }, [query]);

  const getProductSearch = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const body = { query };
      setLoading(true);
      const response = await fetch("/api/customers/search/POS", "post", body, headers);
      setCustomerSearchResults(response.data.suggestions);
      console.log(response.data)
      setLoading(false);
    } catch (err) {
      // setError("An error occurred while fetching customer data.");
      setLoading(false);
    }
  };

  const handleSelectCustomer = (customerName) => {
    setQuery(customerName);
  };

  const filteredItems = useMemo(() => {
    if (query === "") return customerSearchResults;
    // Check if customerSearchResults is an array before filtering
    if (Array.isArray(customerSearchResults)) {
      return customerSearchResults.filter(
        (customer) =>
          customer.json.customer_name.toLowerCase().includes(query.toLowerCase())
      );
    }
    return []; // Return an empty array if customerSearchResults is not an array
  }, [query, customerSearchResults]);

  return (
    <div>
      <CInputGroup>
        <CFormInput
          type="text"
          placeholder="Search Customer Name"
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
          filteredItems.map((customer) => (
            <div
              key={customer.json.cust_id}
              className="product-list" // Corrected the class name here
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
        {!loading && query !== "" && filteredItems.length === 0 && (
          <div className="product-list"> {/* Corrected the class name here */}
            No customers found matching the search query.
          </div>
        )}
        {/* {error && <div>Error: {error}</div>} */}
      </div>
    </div>
  );
}
