import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setToppings, clearAllToppings } from "../../../action/actions";
import { fetch } from "../../../utils";

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

const ToppingsModal = ({ openToppingModel, onClose }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const selectedOutletId = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );
  const [selectedUrno, setSelectedUrno] = useState();
  const [categoryHead, setCategoryHead] = useState("");


  const [selectedToppingsTotalPrice, setSelectedToppingsTotalPrice] = useState(0);
  const [toppingModel, setToppingModel] = useState(false);

  /// toppings //
  // New state variable to store the total price of the selected toppings
  const [submittedToppings, setSubmittedToppings] = useState(false);
  const [searchToppingQuery, setSearchToppingQuery] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [toppingsData, setToppingsData] = useState([]);
  const getToppingsData = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch("/api/products/all", "get", null, headers);
      const filteredToppings = response.data.prodAllList.filter(
        (item) => item.category_heads === "Toppings"
      );
      setToppingsData(filteredToppings);
      console.log('toppings list', filteredToppings)
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  useEffect(() => {
    getToppingsData();
  }, []);
  const filteredToppings = toppingsData.filter((topping) =>
    topping.prod_name.toLowerCase().includes(searchToppingQuery.toLowerCase())
  );


  // TOPPING MODAL
  // const openToppingModel = (urno, category_heads) => {
  //   setSelectedUrno(urno);
  //   setCategoryHead(category_heads);

  //   let displayToppings = cartItems.map((el) =>
  //     el.associated_prod_urno === urno
  //       ? toppingsData.find((top) => top.prod_id === el.prod_id)
  //       : null
  //   );

  //   displayToppings = displayToppings.filter(Boolean);

  //   setSelectedToppings([...displayToppings]);

  //   setToppingModel(true);
  // };

  // CHECK IF TOPPING EXISTS AND ADD OR REMOVE ACCORDINGLY ON ONCLICK
  const handleToppingClick = (topping) => {
    const isSelected = selectedToppings.some(
      (st) => st.prod_id === topping.prod_id
    );

    if (isSelected) {
      setSelectedToppings(
        selectedToppings.filter((top) => top.prod_id !== topping.prod_id)
      );
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  // FILTER TOPPINGS ACCORDING TO CATEGORY
  // const toppingsWithCategoryHead = filteredToppings
  //   .map((topping) => {
  //     if (topping.category_name === categoryHead) {
  //       return topping;
  //     } else {
  //       return null;
  //     }
  //   })
  //   .filter(Boolean);

  // GENERATE UNIQUE 4 DIGIT NUMBER FOR URNO
  function generateUniqueNumber() {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substr(2, 5); // Using 5 characters for randomness
    return `${timestamp.toString() + randomString}`;
  }

  // GENERATE PROD_RATE FOR PROD IN CART
  const getPriceForOutlet = (product) => {
    const outletId = selectedOutletId.toString();
    if (product.rate_chart && product.rate_chart[outletId]) {
      const rateForOutlet = product.rate_chart[outletId][0];
      if (rateForOutlet && rateForOutlet.prod_rate !== undefined) {
        return rateForOutlet.prod_rate;
      }
    }
    return "0";
  };


  // HANDLE SUBMIT FOR TOPPINGS
  const handleToppingsSubmit = () => {
    setSubmittedToppings(true);
    const cartItemData = selectedToppings.map((item) => {
      return {
        prod_id: item.prod_id,
        prod_code: item.prod_code,
        prod_sign: item.prod_sign,
        prod_name: item.prod_name,
        prod_description: item.prod_description,
        prod_rate: getPriceForOutlet(item),
        category_id: item.category_id,
        prod_KOT_status: item.prod_KOT_status,
        prod_Parcel_status: item.prod_Parcel_status,
        prod_Discount_status: item.prod_Discount_status,
        prod_Complementary_status: item.prod_Complementary_status,
        prod_Toppings_status: item.prod_Toppings_status,
        prod_Customized_status: item.prod_Customized_status,
        prod_Delivery_heads: item.prod_Delivery_heads,
        prod_image: item.prod_image,
        prod_Recommended: item.prod_Recommended,
        prod_OnlineListing: item.prod_OnlineListing,
        prod_TagsGroups: item.prod_TagsGroups,
        prod_DeActive: item.prod_DeActive,
        status: item.status,
        eby: item.eby,
        eat: item.eat,
        recipe_outcome_value: item.recipe_outcome_value,
        recipe_outcome_unit: item.recipe_outcome_unit,
        stock_status: item.stock_status,
        stock_current_value: item.stock_current_value,
        LHB_prod_id: item.LHB_prod_id,
        category_name: item.category_name,
        category_heads: item.category_heads,
        recipeCount: item.recipeCount,
        is_parcel: 0,
        is_complementary: 0,
        is_complementary_note: "",
        is_note: 0,
        is_prod_note: "",
        prod_qty: item.prod_qty,
        prod_discount: item.prod_discount,
        prod_discount_offered: item.prod_discount_offered,
        total_amount: item.prod_rate,
        KOT_pick: item.KOT_pick,
        KOT_ready: item.KOT_ready,
        KOT_dispatch: item.KOT_dispatch,
        urno: generateUniqueNumber(),
        associated_prod_urno: null,
        toppings: [],
        customized: item.customized,
      };
    });
    dispatch(setToppings(selectedUrno, cartItemData, selectedOutletId));
    // setToppingModel(false); // Close the toppings model after submitting
    setSelectedToppings([]);
  };

  // Function to calculate the total price of the selected toppings
  // useEffect(() => {
  //   const totalToppingPrice = cartItems.filter((topp) => topp.associated_prod_urno === 0).reduce((toppingTotal, productToppings) => {
  //     const productToppingTotal = productToppings.toppings.reduce(
  //       (acc, topping) => {
  //         const toppingInfo = cartItems.find(
  //           (t) => t.urno === topping
  //         );
  //         console.log('toppingInfo', toppingInfo)
  //         return acc + (toppingInfo ? toppingInfo.prod_rate : 0);
  //       },
  //       0
  //     );
  //     console.log('prod totping', productToppingTotal)
  //     return toppingTotal + productToppingTotal;
  //   }, 0);
  //   setSelectedToppingsTotalPrice(totalToppingPrice);
  //   console.log("selected toping price", totalToppingPrice)
  // }, [selectedToppings, toppingsData]);



  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === "c") {
        // dispatch(clearAllToppings(cartItems, selectedUrno));
        // setToppingModel(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };

  }, [selectedUrno]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === "Enter") {
        handleToppingsSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedToppings]);



  return (
    <>
      <CModal
        size="lg"
        // visible={toppingModel}
        // onClose={() => setToppingModel(false)}
        visible={openToppingModel}
        onClose={onClose}
        className="topping-modals"
      >
        <CModalHeader className="p-3" onClose={onClose}>
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
                {filteredToppings.length} Found
              </span>
            </CInputGroup>
          </CCol>
        </CModalHeader>
        <CModalBody style={{ padding: "5px!important" }}>
          <div className="toppings-btn-style">
            {filteredToppings.map((topping) => (
              <label key={topping.prod_id}>
                <span className="toppingstyle">{topping.prod_name}</span>
                <button
                  className={`btn btn-sm pull-right ${
                    // selectedToppings[topping.prod_id]?.includes(topping.prod_id)
                    selectedToppings &&
                      selectedToppings.find(
                        (object) => object.prod_id === topping.prod_id
                      )
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
                  <span className="show_price">{topping.rate_chart[selectedOutletId][0].prod_rate}</span>
                </button>
              </label>
            ))}
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="danger"
            onClick={() => {
              dispatch(clearAllToppings(cartItems, selectedUrno));
              // setToppingModel(false);
            }}
          >
            Clear All [Alt + C]
          </CButton>
          <CButton color="success" onClick={handleToppingsSubmit}>
            Submit [Alt + Enter]
          </CButton>
          <CButton color="light" onClick={() => setToppingModel(false)}>
            Cancel [Esc]
          </CButton>
        </CModalFooter>
      </CModal>

    </>
  );
};

export default ToppingsModal;
