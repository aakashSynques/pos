import React, { useState, useEffect, useMemo } from "react";
import { CInputGroup, CFormInput } from "@coreui/react";
import { fetch } from "../../utils";
import { useDispatch, useSelector, connect } from "react-redux";
import { addToCart } from "../../action/actions"; // Import the addToCart action
import { ToastContainer, toast } from "react-toastify";
const ProductsSearchBar = () => {
  const [query, setQuery] = useState("");
  const [productSearch, setProductSearch] = useState([]);
  const dispatch = useDispatch(); // Use the useDispatch hook from React-Redux
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
      console.log(response.data.prodAllList)
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
    // console.log(selectedOutletId)
    console.log(outletId);
    if (query === "") return productSearch;
    const filterProduct = [];
    productSearch.map((p) => {
      if (p.rate_chart?.[Number(selectedOutletId)]?.[0]?.prod_rate > 0) {
        filterProduct.push(p);
      }
    });
    const filterSearchProduct = filterProduct.filter(
      (product) =>
        product.prod_name.toLowerCase().search(query.toLowerCase()) !== -1 ||
        product.prod_code.toLowerCase().search(query.toLowerCase()) !== -1
    );
    console.log(outletId);
    console.log("filterSearchProduct", filterSearchProduct);
    return filterProduct;
  }, [query]);

  // product search state
// const filteredItems = useMemo(() => {
//   if (query === "") return productSearch;

//   const outletId = selectedOutletId;
//   const filteredProductSearch = productSearch.filter((product) => {
//     // Get the rate chart for the selected outlet
//     const rateChart = product.rate_chart?.[outletId]?.[0];
//     // Check if the rate chart exists and the stock availability is greater than 0
//     return rateChart && rateChart.stock_availability > 0 &&
//       (product.prod_name.toLowerCase().includes(query.toLowerCase()) ||
//       product.prod_code.toLowerCase().includes(query.toLowerCase()));
//   });

//   return filteredProductSearch;
// }, [query, productSearch, selectedOutletId]);


// // Filter products based on search query and stock availability for selected outlet
// const filteredItems = useMemo(() => {
//   if (query === "") return productSearch;

//   const outletId = selectedOutlet?.outlet_id;
//   const filteredProducts = productSearch.filter((product) => {
//     const stockAvailability = product.rate_chart?.[outletId]?.[0]?.stock_availability;
//     return (
//       (product.prod_name.toLowerCase().includes(query.toLowerCase()) ||
//         product.prod_code.toLowerCase().includes(query.toLowerCase())) &&
//       stockAvailability !== 0
//     );
//   });

//   return filteredProducts;
// }, [query, productSearch, selectedOutlet]);
  


  //&& product.rate_chart[outletId] &&  product.rate_chart[outletId][0].prod_rate > 0

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
    dispatch(addToCart({ ...product, prod_price: getPriceForOutlet(product) }));
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
                <button onClick={() => handleAddToCart(product)}>
                  
                  <b className="pull-left">{product.prod_name}</b>
                  <br />
                  <small className="pull-left">
                    Code : {product.prod_code} {product.category_name}
                  </small>
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
