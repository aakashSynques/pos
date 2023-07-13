import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CFormInput,
} from "@coreui/react";
import jsonData from "./data.json"; // Import the JSON data

export default function ProductsSearchBar() {
  const [query, setQuery] = useState("");
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    setAllItems(jsonData); // Set the JSON data to allItems state
  }, []);

  const filteredItems = useMemo(() => {
    if (query === "") return [];
    return allItems.filter(
      (item) => item.prod_name.toLowerCase().search(query.toLowerCase()) !== -1
    );
  }, [query, allItems]);

  return (
    <div>
      <div>
        {/* <input
          type="text"
          placeholder="Enter item to be searched"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        /> */}
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
          {filteredItems.map((item) => (
            <div key={item.prod_id} className="porduct-list">
              <Link to={`${item.prod_name}`}>
                {/* <h6 className="pull-left">{item.prod_name}</h6> 
              <small> 
                Code : {item.prod_code} {item.category_name}
              </small> */}
                <div>
                  <b>{item.prod_name}</b>
                  <br />
                  <small className="pull-left">
                    Code : {item.prod_code} {item.category_name}{" "}
                  </small>
                </div>
                <div className="product-price">
                  <i className="fa fa-inr"></i> {item.rate_chart.prod_rate}
                </div>
                <br />
              </Link>

              {/* <div>
              <div class="pull-left">
                <span class="fa-stack fa-xs text-success" style={{ marginRight: "5px" }}>
                  <i class="fa fa-square-o fa-stack-2x"></i><i class="fa fa-circle fa-stack-1x"></i>
                </span>
              </div>
              <div class="pull-left">
                <b>VEG CHEESE PIZZA 7</b><br /><small>Code:1.1  | PIZZA </small>
              </div>
              <div class="pull-right">
                <i class="fa fa-inr"></i> 200.000<br />
              </div>
            </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
