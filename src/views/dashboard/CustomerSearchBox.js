import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CFormInput,
} from "@coreui/react";
import { fetch } from "../../utils";

export default function CustomerSearchBox() {
  const [query, setQuery] = useState("");
  const [customerSearchResults, setCustomerSearchResults] = useState([]);

  useEffect(() => {
    getProductSearch();
  }, [query]);

  const getProductSearch = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const body = { query };
      const response = await fetch("http://posapi.q4hosting.com/api/customers/search/POS", "post", body, headers);
      setCustomerSearchResults(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectCustomer = (customerName) => {
    setQuery(customerName);
  };

  const filteredItems = useMemo(() => {
    if (query === "") return customerSearchResults;
    return customerSearchResults.filter((customer) =>
      customer.json.customer_name.toLowerCase().includes(query.toLowerCase())
    );
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
        {query !== "" &&
          filteredItems.map((customer) => (
            <div
              key={customer.json.cust_id}
              className="porduct-list"
              onClick={() => handleSelectCustomer(customer.json.customer_name)}
            >
              <Link to={`${customer.value}`}>
                <div>
                  <b>{customer.json.customer_name}</b>
                  <br />
                  <small className="pull-left">
                    Customer Type: {customer.data.cust_type_name}
                  </small>
                </div>
                <br />
              </Link>
            </div>
          ))}
        {query !== "" && filteredItems.length === 0 && (
          <div className="porduct-list">
            No customers found matching the search query.
          </div>
        )}
      </div>
    </div>
  );
}