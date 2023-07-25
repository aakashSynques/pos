import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../action/actions"; // Import the removeFromCart action
import { ToastContainer, toast } from "react-toastify";
import {
  CFormInput,
  CFormSelect,
  CRow,
  CCol,
  CContainer,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CLink,
} from "@coreui/react";

const CartSection = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  // console.log(cartItems);
  const [toppingModel, setToppingModel] = useState(false);
  // Use a separate state object to store the quantity for each product
  const [productQuantities, setProductQuantities] = useState({});
  const [cartItemsData, setCartItemsData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Function to update the quantity for a specific product in the cart
  const updateQuantity = (productId, quantity) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const createCartItemsObject = () => {
    const cartItemsData = cartItems.map((item) => ({
      prod_id: item.prod_id,
      prod_code: item.prod_code,
      prod_sign: item.prod_sign,
      prod_name: item.prod_name,
      prod_description: item.prod_description,
      prod_rate: item.prod_rate,
      category_id: item.category_id,
      prod_KOT_status: item.prod_KOT_status,
      prod_Parcel_status: item.prod_Parcel_status,
      prod_Discount_status: item.prod_Discount_status,
      prod_Complementary_status: item.prod_Complementary_status,
      prod_image: item.prod_image,
      prod_Customized_status: item.prod_Customized_status,
      prod_Delivery_heads: item.prod_Delivery_heads,
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
      is_parcel: item.is_parcel,
      is_complementary: item.is_complementary,
      is_complementary_note: item.is_complementary_note,
      is_note: item.is_note,
      is_prod_note: item.is_prod_note,
      prod_qty: item.prod_qty,
      prod_discount: item.prod_discount,
      prod_discount_offered: item.prod_discount_offered,
      total_amount: item.prod_rate,
      KOT_pick: item.KOT_pick,
      KOT_ready: item.KOT_ready,
      KOT_dispatch: item.KOT_dispatch,
      urno: item.urno,
      associated_prod_urno: item.associated_prod_urno,
      toppings: item.toppings,
      customized: item.customized,
    }));
    return cartItemsData;
  };

  useEffect(() => {
    // Call the function to create the cartItemsData and store it in the state
    const data = createCartItemsObject();
    console.log("cart:",data);
    // Set the cartItemsData state
    setCartItemsData(data);
  }, [cartItems, productQuantities]);

// Function to increment the quantity for a specific product
const incrementQuantity = (productId) => {
  // Check if the product is already in the cart
  const currentQuantity = productQuantities[productId] || 0;
  // If the product is already in the cart, increase the quantity by 1
  if (currentQuantity > 0) {
    const updatedQuantity = currentQuantity + 1;
    updateQuantity(productId, updatedQuantity);
  } else {
    // If the product is not in the cart, add it with a quantity of 1
    const newQuantity = 1;
    updateQuantity(productId, newQuantity);
  }
  // Show success notification using react-toastify
  toast.success("Product Quantity", {
    position: "top-right",
    autoClose: 1000, // Auto close the notification after 1 second
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

  // Function to decrement the quantity for a specific product
  const decrementQuantity = (productId) => {
    const currentQuantity = productQuantities[productId] || 1;
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
    toast.success("Product Quantity", {
      position: "top-right",
      autoClose: 1000, // Auto close the notification after 8 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };


  const getTotalAmount = (productId) => {
    const quantity = productQuantities[productId] || 1;
    const item = cartItems.find((item) => item.prod_id === productId);
    if (item) {
      // Calculate the total amount based on the selected outlet price and quantity
      return getPriceForOutlet(item) * quantity;
    }
    return 0;
  };

  

  // count sub total total ammout product
  const getSubTotalAmount = () => {
    let subTotal = 0;
    cartItems.forEach((item) => {
      subTotal += getTotalAmount(item.prod_id);
    });
    return subTotal;
  };

  
// calculate SGST rate
const calculateSGST = () => {
  const subtotalAmount = getSubTotalAmount();
  const sgstRate = 2.5; // SGST rate (2.5%)
  const sgstAmount = (Math.round(subtotalAmount * sgstRate)) / 100;
  return sgstAmount;
};

// calculate SGST rate
const calculateCGST = () => {
  const subtotalAmount = getSubTotalAmount();
  const cgstRate = 2.5; // SGST rate (2.5%)
  const cgstAmount = (Math.round(subtotalAmount * cgstRate)) / 100;
  return cgstAmount;
  };
  
 // Calculate the final amount
 const calculateFinalAmount = () => {
  const subtotal = getSubTotalAmount();
  const sgst = calculateSGST();
   const cgst = calculateCGST();
   const finalammount = (subtotal + sgst + cgst)
  return finalammount;
};

  // Function to get the total number of items in the cart
  const getTotalItems = () => {
    let totalItems = 0;
    cartItems.forEach((item) => {
      totalItems += productQuantities[item.prod_id] || 1;
    });
    return totalItems;
  };

  // getoutlet price
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

  const selectedOutletId = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );
  // console.log(selectedOutletId)

  // Update the total amount whenever the product quantities change
  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += getTotalAmount(item.prod_id);
    });
    setTotalAmount(total);
  }, [cartItems, productQuantities]);

  // Function to handle the removal of an item from the cart
  const handleRemoveFromCart = (productId) => {
    // Find the item to get its name
    const item = cartItems.find((item) => item.prod_id === productId);
    if (item) {
      // Dispatch the removeFromCart action to remove the item from the cart
      dispatch(removeFromCart(productId));
      // Show success notification using react-toastify
      toast.warning(`${item.prod_name} - Item removed from the cart!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    // const selectedDeliveryMode = useSelector(
    //   (state) => state.delivery.selectedDeliveryMode
    // );

  };

  return (
    <div className="cartlist">
      {cartItems.length > 0 ? (
        <table className="table cart-table mt-3">
          <thead>
            <tr style={{ background: "#efefef" }}>
              <th>Product Name</th>
              <th>Qty</th>
              <th>Amt</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.prod_id}>
                <td>
                  <b>{item.prod_name}</b> <br />
                  <small>
                    {/* {item.category_name} |
                    {getPriceForOutlet(item)} */}
                    {item.category_name} | @{getPriceForOutlet(item)}
                  </small>
                  <div className="toppings-btn">
                    <CButton>Note</CButton>
                    <CButton>Complementary</CButton>
                    <CButton onClick={() => setToppingModel(!toppingModel)}>
                      Toppings
                    </CButton>
                  </div>
                </td>

                <td className="incree-decreement">
                  {/* Use the incrementQuantity and decrementQuantity functions to update the quantity */}
                  <span
                    className="btn p-1"
                    onClick={() => decrementQuantity(item.prod_id)}
                  >
                    -
                  </span>
                  &nbsp; {productQuantities[item.prod_id] || 1} &nbsp;
                  <span
                    className="btn p-1"
                    onClick={() => incrementQuantity(item.prod_id)}
                  >
                    +
                  </span>
                </td>

                <td className="pt-3">
                  <i className="fa fa-inr"></i>
                  {getTotalAmount(item.prod_id)}

                  {/* item remove button */}
                  <span
                    className="btn btn-danger btn-remove"
                    onClick={() => handleRemoveFromCart(item.prod_id)}
                  >
                    <i className="fa fa-times"></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div
          className="product-list"
          style={{ margin: "110px 0", textAlign: "center", border: "none" }}
        >
          No items in the cart.
        </div>
      )}

      {/* price Table   */}
      <hr />
      <div className="bil-table mt-3">
        <CContainer>
          <CRow>
            <CCol sm={6} className="font-size">
              Sub Total
            </CCol>
            <CCol sm={6} style={{ textAlign: "right" }} className="font-size">
              <i className="fa fa-inr"></i> {getSubTotalAmount()}
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6} className="font-size">
              Discount
            </CCol>
            <CCol sm={6} style={{ textAlign: "right" }} className="font-size">
              <i className="fa fa-inr"></i> 0.00
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6} className="font-size">
              Tax GST (2.5% SGST)
            </CCol>
            <CCol sm={6} style={{ textAlign: "right" }} className="font-size">
              <i className="fa fa-inr"></i>  {calculateSGST()}
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6} className="font-size">
              Tax GST (2.5% CGST)
            </CCol>
            <CCol sm={6} style={{ textAlign: "right" }} className="font-size">
              <i className="fa fa-inr"></i> {calculateCGST()}
            </CCol>
          </CRow>

          <CRow>
            <CCol sm={6} className="font-size">
              <button className="btn pay-btn" type="button">
                PAY <font size="1">[ Shift + Enter ]</font>
              </button>
            </CCol>
            <CCol sm={6} style={{ textAlign: "right" }} className="font-size">
              <h4 className="total-price">
                <i className="fa fa-inr"></i> {calculateFinalAmount()}
              </h4>
              <small>{getTotalItems()} Item(s) </small>
            </CCol>
          </CRow>
          <hr style={{ margin: "4px 0" }} />
          <CRow>
            <CCol sm={6} className="font-size">
            Delivery Mode [F2]
            </CCol>
            <CCol sm={6} style={{ textAlign: "right" }} className="font-size">
            {/* <div>
      {selectedDeliveryMode ? (
        <div>
          <h3>Selected Delivery Mode:</h3>
          <p>{selectedDeliveryMode}</p>
        </div>
      ) : (
        <div>No delivery mode selected.</div>
      )}
    </div> */} counter
            </CCol>
          </CRow>
        </CContainer>
      </div>

      {/* toppings model */}

      <CModal
        size="lg"
        visible={toppingModel}
        onClose={() => setToppingModel(false)}
      >
        <CModalHeader onClose={() => setToppingModel(false)}>
          <CModalTitle>Apply Toppings</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="toppings-btn-style">
            <label>
              Mojito Toppings
              <button className="btn btn-sm pull-right">
                <span class="badge">
                  <i class="fa fa-plus"></i>
                </span>
                &nbsp;
                <i class="fa fa-inr"></i>
                <span class="show_price"> 0.000</span>
              </button>
            </label>
            <label>
              Mojito Toppings
              <button className="btn btn-sm pull-right">
                <span class="badge">
                  <i class="fa fa-plus"></i>
                </span>
                &nbsp;
                <i class="fa fa-inr"></i>
                <span class="show_price"> 0.000</span>
              </button>
            </label>
            <label>
              Mojito Toppings
              <button className="btn btn-sm pull-right">
                <span class="badge">
                  <i class="fa fa-plus"></i>
                </span>
                &nbsp;
                <i class="fa fa-inr"></i>
                <span class="show_price"> 0.000</span>
              </button>
            </label>
            <label>
              Mojito Toppings
              <button className="btn btn-sm pull-right">
                <span class="badge">
                  <i class="fa fa-plus"></i>
                </span>
                &nbsp;
                <i class="fa fa-inr"></i>
                <span class="show_price"> 0.000</span>
              </button>
            </label>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default CartSection;
