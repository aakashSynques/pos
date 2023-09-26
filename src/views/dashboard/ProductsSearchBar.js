import React, { useState, useEffect, useMemo, useRef } from "react";
import { CInputGroup, CFormInput } from "@coreui/react";
import { fetch } from "../../utils";
import { useDispatch, useSelector, connect } from "react-redux";
import { addToCart, setAllProducts } from "../../action/actions"; // Import the addToCart action
import { ToastContainer, toast } from "react-toastify";
import classnames from "classnames";


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
    const filterProduct =productSearch && productSearch.filter((p) => {
      const outletData = p.rate_chart?.[outletId]?.[0];
      return outletData && outletData.stock_availability > 0;
    });

    const filterSearchProduct = filterProduct.filter(
      (product) =>
        product.prod_name.toLowerCase().search(query.toLowerCase()) !== -1 ||
        product.prod_code.toLowerCase().search(query.toLowerCase()) !== -1
    );
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


  // GENERATE UNIQUE 4 DIGIT NUMBER FOR URNO
  function generateUniqueNumber() {
    // const random4Digit = Math.floor(1000 + Math.random() * 9000);
    // return random4Digit.toString(); // Convert to string
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
      // is_parcel: "",
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
      // toppings: item.toppings,
      toppings: [],
      // customized: item.customized,
      customized: [],
    }));

    console.log('cart item deta', cartItemData)
    dispatch(addToCart(cartItemsArray, ...cartItemData));
  };

    // ... Your existing code ...



  // //////////////////// click outside ///////////////////////////
  const [clickedOut, setClickedOut] = useState(false);
  const ref = useRef(null);
  const onClickOutside = () => {
    // setQuery("");
    setClickedOut(true);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
        setClickedOut(true);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  // -------------------------product search sortcut key Shit+P-------------------------------
  // useEffect to handle the shortcut key (Shift + P) for focusing on the input element
  useEffect(() => {
    const handleShortcutKeyPress = (event) => {
      if (event.shiftKey && event.key === "P") {
        // Prevent the default behavior of the "P" key (prevents it from appearing in the input box)
        event.preventDefault();
        // Focus on the search bar input element
        const searchInput = document.getElementById("product-search-input");
        if (searchInput) {
          searchInput.focus();
        }
      }
    };
    document.addEventListener("keydown", handleShortcutKeyPress);
    return () => {
      document.removeEventListener("keydown", handleShortcutKeyPress);
    };
  }, []);
  const isInputValid = (inputValue) => {
    const specialCharactersRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return !specialCharactersRegex.test(inputValue);
  };



  const [focusedItemIndex, setFocusedItemIndex] = useState(0);
  const handleArrowNavigation = (event) => {
    if (filteredItems.length === 0) return;
    if (event.key === "ArrowUp" && focusedItemIndex > 0) {
      setFocusedItemIndex(focusedItemIndex - 1);
    } else if (
      event.key === "ArrowDown" &&
      focusedItemIndex < filteredItems.length - 1
    ) { 
      setFocusedItemIndex(focusedItemIndex + 1);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleArrowNavigation);
    return () => {
      document.removeEventListener("keydown", handleArrowNavigation);
    };
  }, [focusedItemIndex, filteredItems]);

 



  return (
    <div>
      <CInputGroup className="change-focus">
        <CFormInput
          autoComplete="off"
          id="product-search-input" // Add an id to the input element for referencing
          type="text"
          placeholder="Search Product Code OR Name... [Shift + P]"
          value={query}
          // onChange={(e) => setQuery(e.target.value)}
          onClick={() => setClickedOut(false)}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (isInputValid(inputValue)) {
              setQuery(inputValue);
            } else {
              console.log(err);
            }

          }}
        />
      </CInputGroup>
      <div className="product-list-abslute" ref={ref}>  
        {query !== "" &&
          Object.entries(groupedItems).map(([categoryHeads, products]) => (
            <div key={categoryHeads}>
              <div
                className="bg-success text-white"
                style={{ padding: "2px 10px" }}
              >
                <i className="fa fa-arrow-circle-right"></i>&nbsp;
                {categoryHeads}
              </div>
              {products
                .filter((product) => getPriceForOutlet(product) !== 0) // Exclude products with prod_rate equal to 0
                .map((product, index) => (
                  <div className={`product-list ${focusedItemIndex === index ? "focused" : ""}`} key={product.prod_id}>
                    <button
                      // key={product.prod_id}
                      onClick={() => {
                        handleAddToCart(product.prod_id);
                        setQuery("");
                      }}
                    >
                      <div className="pull-left fa-stack fa-xs prod-sign">
                        <span
                          className={`fa-stack fa-xs ${getTextColorClass(
                            product.prod_sign
                          )}`}
                        >
                          <i className="fa fa-square-o fa-stack-2x"></i>
                          <i className="fa fa-circle fa-stack-1x"></i>
                        </span>
                      </div>

                      <div className="pull-left">
                        <b className="pull-left">{product.prod_name}</b>
                        <br />
                        <small className="pull-left">
                          Code : {product.prod_code} {product.category_name}
                        </small>
                      </div>

                      <div className="product-price">
                        <i className="fa fa-inr"></i>
                        {getPriceForOutlet(product).toFixed(3)}
                        {/* {getTotalSGSTAmount().toFixed(3)} */}
                      </div>
                      <br />
                    </button>
                  </div>
                ))}
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




