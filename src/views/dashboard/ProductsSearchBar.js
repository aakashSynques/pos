// import React, { useState, useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { CInputGroup, CFormInput } from "@coreui/react";
// import { fetch } from "../../utils";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../action/actions"; // Import the addToCart action

// const ProductsSearchBar = () => {
//   const [query, setQuery] = useState("");
//   const [allItems, setAllItems] = useState([]);
//   const [productSearch, setProductSearch] = useState([]);
//   const dispatch = useDispatch(); // Use the useDispatch hook from React-Redux

//   useEffect(() => {
//     // Fetch and set the JSON data to allItems state (if needed)
//     setAllItems(); // Set the JSON data to allItems state
//   }, []);

//   const getProductSearch = async () => {
//     try {
//       const token = localStorage.getItem("pos_token");
//       const headers = { Authorization: `Bearer ${token}` };
//       const response = await fetch("/api/products/all", "get", null, headers);
//       setProductSearch(response.data.prodAllList);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getProductSearch();
//   }, []);

//   const filteredItems = useMemo(() => {
//     if (query === "") return productSearch;
//     return productSearch.filter(
//       (product) =>
//         product.prod_name.toLowerCase().search(query.toLowerCase()) !== -1
//     );
//   }, [query, productSearch]);

//   return (
//     <div>
//       <div>
// <CInputGroup>
//   <CFormInput
//     type="text"
//     placeholder="Search Product Code OR Name"
//     value={query}
//     onChange={(e) => setQuery(e.target.value)}
//     style={{
//       fontSize: "12px",
//       borderRadius: 0,
//     }}
//   />
// </CInputGroup>

//         <div className="product-list-abslute">
//           {query !== "" &&
//             filteredItems.map((product) => (
//               <div key={product.prod_id} className="product-list">
//                 <span onClick={() => dispatch(addToCart(product))}>
//                   <b>{product.prod_name}</b>
//                   <br />
//                   <small className="pull-left">
//                     Code : {product.prod_code} {product.category_name}
//                   </small>
//                   <div className="product-price">
//                     <i class="fa fa-inr"></i> 200
//                   </div>
//                   <br />
//                 </span>
//               </div>
//             ))}
//           {/* Render a message if no items match the search query */}
//           {query !== "" && filteredItems.length === 0 && (
//             <div className="product-list">
//               No items found matching the search query.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsSearchBar;

// ProductsSearchBar.js

import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { CInputGroup, CFormInput } from "@coreui/react";
import { fetch } from "../../utils";
import { useDispatch } from "react-redux";
import { addToCart } from "../../action/actions"; // Import the addToCart action

const ProductsSearchBar = ({ selectedOutlet }) => {
  const [query, setQuery] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [productSearch, setProductSearch] = useState([]);
  const dispatch = useDispatch(); // Use the useDispatch hook from React-Redux

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
      console.log(response.data.prodAllList);
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

  // Function to get the price for the selected outlet
  const getPriceForOutlet = (product) => {
    // Use the selectedOutlet data to get the correct price
    if (selectedOutlet) {
      const outletId = selectedOutlet.outlet_id;
      // Check if the selected outlet's ID is present in the product's rate chart
      if (product.rate_chart[outletId] && product.rate_chart[outletId][0]) {
        return product.rate_chart[outletId][0].prod_rate;
      }
    }
    // If no selected outlet or price not available, fallback to the default price
    return product.prod_rate;
  };

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
                <span onClick={() => dispatch(addToCart(product))}>
                  <b>{product.prod_name}</b>
                  <br />
                  <small className="pull-left">
                    Code : {product.prod_code} {product.category_name}
                  </small>
                  <div className="product-price">
                    <i className="fa fa-inr"></i> {getPriceForOutlet(product)}
                  </div>
                  <br />
                </span>
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
