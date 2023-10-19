import React, { useState, useEffect, useMemo, useRef } from "react";
import { fetch } from "../../utils";
import { useDispatch, useSelector, connect } from "react-redux";
import { addToCart, setAllProducts } from "../../action/actions"; // Import the addToCart action
import classnames from "classnames";
import Autosuggest from 'react-autosuggest';
// Determine the text color class based on the value of prod_sign
const getTextColorClass = (prod_sign) => {
  return classnames({
    "text-success": prod_sign === 1,
    "text-danger": prod_sign === 2,
    "text-warning": prod_sign === 3,
  });
};
const ProductsSearchBar = () => {
  const [query, setQuery] = useState("");
  const [productSearch, setProductSearch] = useState([]);
  const dispatch = useDispatch(); // Use the useDispatch hook from React-Redux
  const cartItemsArray = useSelector((state) => state.cart.cartItems);
  const selectedOutletId = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );
  const allProds = useSelector((state) => state.allProducts);
  const getProductSearch = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch("/api/products/all", "get", null, headers);
      setProductSearch(response.data.prodAllList);
      dispatch(setAllProducts(response.data.prodAllList));

    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  useEffect(() => {
    getProductSearch();
  }, []);
  // product search state
  const filteredItems = useMemo(() => {
    const outletId = selectedOutletId;
    if (query === "") return productSearch;
    const filterProduct = productSearch && productSearch.filter((p) => {
      const outletData = p.rate_chart?.[outletId]?.[0];
      return outletData && outletData.stock_availability > 0;
    });
    const filterSearchProduct = filterProduct.filter((product) => {
      const prodName = product.prod_name || "";
      const prodCode = product.prod_code || "";
      return (
        prodName.toLowerCase().includes(query.toLowerCase()) ||
        prodCode.toLowerCase().includes(query.toLowerCase())
      );
    });
    return filterSearchProduct;
  }, [query, selectedOutletId, productSearch]);

  // groud by category heads
  const groupedItems = useMemo(() => {
    const grouped = {};
    for (const product of filteredItems) {
      const categoryHeads = product.category_heads;
      if (!grouped[categoryHeads]) {
        grouped[categoryHeads] = [];
      }
      grouped[categoryHeads].push(product);
    }
    return grouped;
  }, [filteredItems]);

  const getPriceForOutlet = (product) => {
    const outletId = selectedOutletId.toString();
    if (product.rate_chart && product.rate_chart[outletId]) {
      const rateForOutlet = product.rate_chart[outletId][0];
      if (rateForOutlet && rateForOutlet.prod_rate !== undefined) {
        return rateForOutlet.prod_rate;
      }
    }
    return "prod rate";
  };

  function generateUniqueNumber() {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substr(2, 5); // Using 5 characters for randomness
    return `${timestamp.toString() + randomString}`;
  }
  // Dispatch the addToCart action with the product and its prod_price
  const handleAddToCart = (productId) => {
    const outletId = selectedOutletId.toString();
    const selectedProductForCart = filteredItems.filter(
      (item) => item.prod_id === productId
    );
    const cartItemData = selectedProductForCart.map((item) => ({
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
      total_amount: getPriceForOutlet(item),
      KOT_pick: 0,
      KOT_ready: 0,
      KOT_dispatch: 0,
      urno: generateUniqueNumber(),
      associated_prod_urno: null,
      toppings: [],
      customized: [],
    }));
    dispatch(addToCart(cartItemsArray, ...cartItemData));
    console.log("cart arrya", dispatch(addToCart(cartItemsArray, ...cartItemData)));
  };

  // Autosuggest state
  const [suggestions, setSuggestions] = useState([]);
  const onInputChange = (_, { newValue }) => {
    setQuery(newValue);
  };
  const onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const filteredSuggestions = productSearch.filter((product) => {
      return (
        product.prod_name.toLowerCase().includes(inputValue) ||
        product.prod_code.toLowerCase().includes(inputValue)
      );
    });
    setSuggestions(filteredSuggestions);
  };
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  const onSuggestionSelected = (_, { suggestion }) => {
    handleAddToCart(suggestion.prod_id);
    setQuery("");
  };
  const inputRef = useRef(null);
  const [hoveredSuggestion, setHoveredSuggestion] = useState(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const focusedSuggestionIndexRef = useRef(0);
  const focusFirstSuggestion = () => {
    if (suggestions.length > 1) {
      focusedSuggestionIndexRef.current = -1;
      setHoveredSuggestion(suggestions[0]);
    }
  };
  // Handle suggestion item hover
  const handleSuggestionHover = (suggestion) => {
    focusedSuggestionIndexRef.current = suggestions.indexOf(suggestion);
    setHoveredSuggestion(suggestion);
  };
  // Handle suggestion item selection
  const handleSuggestionSelect = (suggestion) => {
    setSelectedSuggestion(suggestion);
    handleAddToCart(suggestion.prod_id);
    setQuery("");
  };
  useEffect(() => {
    focusFirstSuggestion();
  }, [suggestions]);

  // short cut key
  const handleArrowKeyPress = (event) => {
    if (suggestions.length === 1) return;
    const moveSuggestion = (step) => {
      focusedSuggestionIndexRef.current =
        (focusedSuggestionIndexRef.current + step + suggestions.length) % suggestions.length;
      setHoveredSuggestion(suggestions[focusedSuggestionIndexRef.current]);
    };
    if (event.key === "ArrowDown") {
      moveSuggestion(1);
    } else if (event.key === "ArrowUp") {
      moveSuggestion(-1);
    } else if (["Enter", "Tab"].includes(event.key) && hoveredSuggestion) {
      handleSuggestionSelect(hoveredSuggestion);
    }
  };
  useEffect(() => {
    const handleShortcutKeyPress = (event) => {
      if (event.shiftKey && event.key === "P") {
        event.preventDefault();
        const searchInput = document.getElementById("product-search-input");
        searchInput && searchInput.focus();
      }
    };
    document.addEventListener("keydown", handleShortcutKeyPress);
    return () => {
      document.removeEventListener("keydown", handleShortcutKeyPress);
    };
  }, []);
  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("keydown", handleArrowKeyPress);
    }
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleArrowKeyPress);
      }
    };
  }, [handleArrowKeyPress]);


  const groupedSuggestions = [];
  Object.keys(groupedItems).forEach((categoryHead) => {
    groupedSuggestions.push({
      isGroupHeader: true,
      categoryHead,
    });
    groupedItems[categoryHead].forEach((innerSuggestion) => {
      groupedSuggestions.push(innerSuggestion);
    });
  });

  return (
    <div className="product-serach-input p-1">
      <Autosuggest
        suggestions={groupedSuggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.prod_name}
        renderSuggestion={(suggestion) => {
          if (suggestion.isGroupHeader) {
            return (
              <div className="bg-success text-white" style={{padding: "2px, 10px"}}><i className="fa fa-arrow-circle-right"></i>&nbsp;{suggestion.categoryHead}</div>
            );
          } else {
            return (
              <div
                className={`product-list suggestion-item ${suggestion === hoveredSuggestion ? "focused" : ""}`}
                onMouseEnter={() => handleSuggestionHover(suggestion)}
                onMouseLeave={() => handleSuggestionHover(null)}
                onClick={() => handleSuggestionSelect(suggestion)}
              >
                <div className="pull-left fa-stack fa-xs prod-sign">
                  <span className={`fa-stack fa-xs ${getTextColorClass(suggestion.prod_sign)}`}>
                    <i className="fa fa-square-o fa-stack-2x"></i>
                    <i className="fa fa-circle fa-stack-1x"></i>
                  </span>
                </div>
                <div className="pull-left">
                  <b className="product-name">{suggestion.prod_name}</b>
                  <br />
                  <small className="product-details">
                    Code: {suggestion.prod_code} {suggestion.category_name}
                  </small>
                </div>
                <div className="product-price">
                  <i className="fa fa-inr"></i>
                  {getPriceForOutlet(suggestion)}
                </div>
                <br />
              </div>
            );
          }
        }}
        inputProps={{
          id: "product-search-input",
          placeholder: "Search Product Code OR Name... [Shift + P]",
          value: query,
          onChange: onInputChange,
          autoComplete: "off",
          className: "search-input-style",
          ref: inputRef,
        }}
        onSuggestionSelected={onSuggestionSelected}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedOutlet: state.outlets.selectedOutletId
    ? state.outlets.outlets.find(
      (outlet) => outlet.outlet_id === state.outlets.selectedOutletId
    )
    : null,
  cartItems: state.cart.cartItems,
});
export default connect(mapStateToProps)(ProductsSearchBar);




