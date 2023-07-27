import React, { useState, useEffect, useMemo, useRef } from "react";
import { CInputGroup, CFormInput } from "@coreui/react";
import { fetch } from "../../utils";
import { useDispatch, useSelector, connect } from "react-redux";
import { addToCart } from "../../action/actions"; // Import the addToCart action
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
  // console.log(selectedOutletId)
  const getProductSearch = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch("/api/products/all", "get", null, headers);
      setProductSearch(response.data.prodAllList);
      console.log(response.data.prodAllList);
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
    // const outletId = selectedOutletId.toString();
    const outletId = selectedOutletId;
    if (query === "") return productSearch;
    // const filterProduct = [];
    // productSearch.map((p) => {
    //   if (p.rate_chart?.[Number(selectedOutletId)]?.[0]?.prod_rate > 0) {
    //     filterProduct.push(p);
    //   }
    // });
    const filterProduct = productSearch.filter((p) => {
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

  // Dispatch the addToCart action with the product and its prod_price
  const handleAddToCart = (product) => {
    // const { cartItems } = product;
    console.log(cartItemsArray, "70");
    dispatch(
      addToCart({
        // cartItemsArray,
        ...product,
        prod_price: getPriceForOutlet(product),
      })
    );

    // tostify notification
    toast.success(`${product.prod_name} - added to cart !`, {
      position: "top-right",
      autoClose: 8000, // Auto close the notification after 8 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // //////////////////// click outside ///////////////////////////
  const [clickedOut, setClickedOut] = useState(false);
  const ref = useRef(null);
  const onClickOutside = () => {
    setQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      // setClickedOut(false);
    };
  }, [onClickOutside]);

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







  // const getProductSearch = async () => {
  //   try {
  //     const token = localStorage.getItem("pos_token");
  //     const headers = { Authorization: `Bearer ${token}` };
  //     const response = await fetch("/api/products/all", "get", null, headers);
  //     setProductSearch(response.data.prodAllList);
  //     console.log(response.data.prodAllList);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //   }
  // };

  useEffect(() => {
    getProductSearch();
  }, []);


 

  return (
    <div>
      <div>
        <CInputGroup className="change-focus">
          <CFormInput
            id="product-search-input" // Add an id to the input element for referencing
            type="text"
            autocomplete="off"
            placeholder="Search Product Code OR Name... [Shift + P]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </CInputGroup>
        <div className="product-list-abslute" ref={ref}>
        <div className="cat-head"><i class="fa fa-arrow-circle-right"></i> Kitchen</div>
          {query !== "" &&
            filteredItems.map((product) => (
              <div key={product.prod_id} className="product-list">
                <button
                  onClick={() => {
                    handleAddToCart(product);
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
                    {getPriceForOutlet(product)}
                  </div>

                  <br />
                </button>
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

const mapStateToProps = (state) => ({
  selectedOutlet: state.outlets.selectedOutletId
    ? state.outlets.outlets.find(
        (outlet) => outlet.outlet_id === state.outlets.selectedOutletId
      )
    : null,
  cartItems: state.cart.cartItems,
});
// export default connect(mapStateToProps)(ProductsSearchBar);
export default connect(mapStateToProps)(ProductsSearchBar);
