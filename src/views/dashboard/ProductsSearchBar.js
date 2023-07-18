import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { CInputGroup, CFormInput } from "@coreui/react";
import { fetch } from "../../utils";
import { useCart } from "./useCart"; // Import the custom hook

const ProductsSearchBar = () => {
  const [query, setQuery] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [productSearch, setProductSearch] = useState([]);
  const { addToCart } = useCart(); // Use the custom hook

  useEffect(() => {
    // Fetch and set the JSON data to allItems state (if needed)
    setAllItems(); // Set the JSON data to allItems state
  }, []);

  const getProductSearch = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch("/api/products/all", "get", null, headers);
      setProductSearch(response.data.prodAllList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductSearch();
  }, []);

  const filteredItems = useMemo(() => {
    if (query === "") return productSearch;
    return productSearch.filter(
      (product) =>
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
              <div key={product.prod_id} className="product-list">
                <Link onClick={() => addToCart(product)}>
                  <div>
                    <b>{product.prod_name}</b>
                    <br />
                    <small className="pull-left">
                      Code : {product.prod_code} {product.category_name}
                    </small>
                  </div>
                  <div className="product-price">
                    {/* Display the product price here */}
                  </div>
                  <br />
                </Link>
              </div>
            ))}
          {/* Render a message if no items match the search query */}
          {query !== "" && filteredItems.length === 0 && (
            <div className="product-list">
              No items found matching the search query.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsSearchBar;
