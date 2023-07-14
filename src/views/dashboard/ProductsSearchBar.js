import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CFormInput,
} from "@coreui/react";
import jsonData from "./data.json"; // Import the JSON data
import { fetch } from "../../utils";

export default function ProductsSearchBar() {
  const [query, setQuery] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [productSearch, setProductSearch] = useState([]); // api data

  useEffect(() => {
    setAllItems(jsonData); // Set the JSON data to allItems state
  }, []);

  const getProductSearch = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch("/api/products/all", "get", null, headers);
      setProductSearch(response.data.prodAllList);
      console.log(response.data.prodAllList);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProductSearch();
  }, []);

  const filteredItems = useMemo(() => {
    if (query === "") return productSearch; // Return the entire list if query is empty
    return productSearch.filter((product) =>
      product.prod_name.toLowerCase().search(query.toLowerCase()) !== -1
    );
  }, [query, productSearch]);

  return (
    <div>
      <div>
        <CInputGroup>
          <CFormInput
            type="text"
            placeholder="Search Product Code OR Name"
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
            filteredItems.map((product) => (
              <div key={product.prod_id} className="porduct-list">
                <Link to={`${product.prod_name}`}>
                  <div>
                    <b>{product.prod_name}</b>
                    <br />
                    <small className="pull-left">
                      Code : {product.prod_code} {product.category_name}
                    </small>
                  </div>
                  <div className="product-price">
                    {/* <i className="fa fa-inr"></i> {item.rate_chart.prod_rate} */}
                  </div>
                  <br />
                </Link>
              </div>
            ))}
          {/* Render a message if no items match the search query */}
          {query !== "" && filteredItems.length === 0 && (
            <div className="porduct-list">
              No items found matching the search query.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}