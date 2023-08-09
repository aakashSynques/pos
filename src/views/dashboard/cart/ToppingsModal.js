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
  // const openToppingModel = (urno, category_heads) => {
  //   setToppingModel(true);
  //   console.log(urno);
  //   setSelectedUrno(urno);
  //   setCategoryHead(category_heads);
  // };

  // const handleToppingClick = (topping) => {
  //   const isSelected = selectedToppings.some(
  //     (st) => st.prod_id === topping.prod_id
  //   );
  //   console.log(isSelected);

  //   if (isSelected) {
  //     setSelectedToppings(
  //       selectedToppings.filter((top) => top.prod_id !== topping.prod_id)
  //     );
  //   } else {
  //     setSelectedToppings([...selectedToppings, topping]);
  //   }
  // };
  // console.log(selectedToppings);

  // const toppingsWithCategoryHead = filteredToppings
  //   .map((topping) => {
  //     if (topping.category_name === categoryHead) {
  //       return topping;
  //     } else {
  //       return null;
  //     }
  //   })
  //   .filter(Boolean);

  // // GENERATE UNIQUE 4 DIGIT NUMBER FOR URNO
  // function generateUniqueNumber() {
  //   const random4Digit = Math.floor(1000 + Math.random() * 9000);
  //   return random4Digit.toString(); // Convert to string
  // }

  // // HANDLE SUBMIT FOR TOPPINGS
  // const handleToppingsSubmit = () => {
  //   setSubmittedToppings(true);

  //   const cartItemData = selectedToppings.map((item) => {
  //     return {
  //       prod_id: item.prod_id,
  //       prod_code: item.prod_code,
  //       prod_sign: item.prod_sign,
  //       prod_name: item.prod_name,
  //       prod_description: item.prod_description,
  //       prod_rate: getPriceForOutlet(item),
  //       category_id: item.category_id,
  //       prod_KOT_status: item.prod_KOT_status,
  //       prod_Parcel_status: item.prod_Parcel_status,
  //       prod_Discount_status: item.prod_Discount_status,
  //       prod_Complementary_status: item.prod_Complementary_status,
  //       prod_Toppings_status: item.prod_Toppings_status,
  //       prod_Customized_status: item.prod_Customized_status,
  //       prod_Delivery_heads: item.prod_Delivery_heads,
  //       prod_image: item.prod_image,
  //       prod_Recommended: item.prod_Recommended,
  //       prod_OnlineListing: item.prod_OnlineListing,
  //       prod_TagsGroups: item.prod_TagsGroups,
  //       prod_DeActive: item.prod_DeActive,
  //       status: item.status,
  //       eby: item.eby,
  //       eat: item.eat,
  //       recipe_outcome_value: item.recipe_outcome_value,
  //       recipe_outcome_unit: item.recipe_outcome_unit,
  //       stock_status: item.stock_status,
  //       stock_current_value: item.stock_current_value,
  //       LHB_prod_id: item.LHB_prod_id,
  //       category_name: item.category_name,
  //       category_heads: item.category_heads,
  //       recipeCount: item.recipeCount,
  //       is_parcel: item.is_parcel,
  //       is_complementary: item.is_complementary,
  //       is_complementary_note: "",
  //       is_note: item.is_note,
  //       is_prod_note: "",
  //       prod_qty: item.prod_qty,
  //       prod_discount: item.prod_discount,
  //       prod_discount_offered: item.prod_discount_offered,
  //       total_amount: item.prod_rate,
  //       KOT_pick: item.KOT_pick,
  //       KOT_ready: item.KOT_ready,
  //       KOT_dispatch: item.KOT_dispatch,
  //       urno: generateUniqueNumber(),
  //       associated_prod_urno: 0,
  //       toppings: [],
  //       customized: item.customized,
  //     };
  //   });
  //   console.log(cartItemData, selectedUrno, "cartItemData");
  //   dispatch(setToppings(cartItems, selectedUrno, cartItemData));
  //   setToppingModel(false); // Close the toppings model after submitting
  //   setSelectedToppings([]);
  // };

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
