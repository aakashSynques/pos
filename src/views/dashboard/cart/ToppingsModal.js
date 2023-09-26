import React from "react";

import {
  CFormInput,
  CCol,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CInputGroup,
} from "@coreui/react";

const ToppingsModal = ({
  toppingModel,
  setToppingModel,
  selectedToppings,
  searchToppingQuery,
  setSearchToppingQuery,
  toppingsWithCategoryHead,
  handleToppingClick,
  handleToppingsSubmit,
  setCategoryHead,
}) => {
  return (
    <CModal
      size="lg"
      visible={toppingModel}
      onClose={() => setToppingModel(false)}
      className="topping-modals"
    >
      <CModalHeader className="p-3" onClose={() => setToppingModel(false)}>
        <CCol sm={4}>
          <CModalTitle>Apply Toppings</CModalTitle>
        </CCol>
        <CCol sm={8}>
          <CInputGroup>
            <span
              className="input-group-addon"
              style={{ backgroundColor: "#eee" }}
            >
              {selectedToppings.length} Applied
            </span>
            <CFormInput
              type="text"
              placeholder="search....."
              value={searchToppingQuery}
              onChange={(e) => setSearchToppingQuery(e.target.value)}
              className="input-group-addon"
            />
            <span
              className="input-group-addon"
              style={{ backgroundColor: "#ffc210" }}
            >
              <i className="fa fa-search"></i>
              {toppingsWithCategoryHead.length} Found
            </span>
          </CInputGroup>
        </CCol>
      </CModalHeader>
      <CModalBody style={{ padding: "5px!important" }}>
        <div className="toppings-btn-style">
          {toppingsWithCategoryHead.map((topping) => (
            <label key={topping.prod_id}>
              <span className="toppingstyle">{topping.prod_name}</span>
              <button
                className={`btn btn-sm pull-right ${
                  selectedToppings[topping.prod_id]?.includes(topping.prod_id)
                    ? "btn-success-bg"
                    : ""
                }`}
                onClick={() => handleToppingClick(topping)}
              >
                <span className="badge">
                  <i className="fa fa-plus"></i>
                </span>
                &nbsp;
                <i className="fa fa-inr"></i>
                <span className="show_price">
                  {/* {selectedToppings.includes(topping.prod_id)
                      ? topping.prod_rate
                      : "0"} */}
                  {topping.prod_rate.toFixed(3)}
                </span>
              </button>
            </label>
          ))}
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger">Clear All [Alt + C]</CButton>
        <CButton color="success" onClick={handleToppingsSubmit}>
          Submit [Alt + Enter]
        </CButton>
        <CButton color="light" onClick={() => setToppingModel(false)}>
          Cancel [Esc]
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ToppingsModal;
