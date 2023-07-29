import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, setCartQty } from "../../action/actions"; // Import the removeFromCart action
import { ToastContainer, toast } from "react-toastify";
import { fetch } from "../../utils";

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
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";

const CartSection = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  console.log(cartItems, "cart in cartsection");

  const dispatch = useDispatch();
  // console.log(cartItems);
  const [toppingModel, setToppingModel] = useState(false);
  // Use a separate state object to store the quantity for each product
  const [quantity, setQuantity] = useState();
  const [totalAmount, setTotalAmount] = useState(0);

  const selectedOutletId = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );

  // Function to calculate the total amount for each item based on quantity and rate
  const getTotalAmountForItem = (item) => {
    const rate = item.prod_rate; // Assuming the rate is available in the product object
    return rate;
  };
  // Function to get the subtotal amount of all products in the cart
  const getSubTotalAmount = () => {
    let subTotal = 0;
    cartItems.forEach((item) => {
      const totalAmount = getTotalAmountForItem(item);
      subTotal += totalAmount;
    });
    return subTotal;
  };

  // Constant variable for SGST rate
  const SGST_RATE = 0.025;
  // Function to calculate the SGST amount for each item
  const getSGSTAmountForItem = (item) => {
    const rate = item.prod_rate; // Assuming the rate is available in the product object
    return rate * SGST_RATE;
  };
  // Function to get the total SGST amount for all products in the cart
  const getTotalSGSTAmount = () => {
    let totalSGST = 0;
    cartItems.forEach((item) => {
      const SGSTAmount = getSGSTAmountForItem(item);
      totalSGST += SGSTAmount;
    });
    return totalSGST;
  };

  // Constant variable for CGST rate
  const CGST_RATE = 0.025;
  // Function to calculate the CGST amount for each item
  const getCGSTAmountForItem = (item) => {
    const rate = item.prod_rate; // Assuming the rate is available in the product object
    return rate * CGST_RATE;
  };
  // Function to get the total CGST amount for all products in the cart
  const getTotalCGSTAmount = () => {
    let totalCGST = 0;
    cartItems.forEach((item) => {
      const CGSTAmount = getCGSTAmountForItem(item);
      totalCGST += CGSTAmount;
    });
    return totalCGST;
  };
  // Function to calculate the final pay amount
  const getFinalPayAmount = () => {
    const subtotal = getSubTotalAmount();
    const totalTaxes = getTotalSGSTAmount() + getTotalCGSTAmount();
    const finalPayAmount = subtotal + totalTaxes;
    return finalPayAmount;
  };

  // Function to calculate the total quantity of all products in the cart
  const getTotalItmes = () => {
    const totalQuantity = cartItems.reduce(
      (total, item) => total + item.prod_qty,
      0
    );
    return parseInt(totalQuantity, 10);
  };

  // /////////////////// quantity update /////////////////////

  useEffect(() => {
    setQuantity(quantity);
  }, [quantity]);
  const qtyRef = useRef();

  const handleKeyUp = (event) => {
    //key code for enter
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
      qtyRef.current.blur();
    }
  };

  /// toppings ///
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
      console.log(filteredToppings);
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

  const handleToppingClick = (topping) => {
    const isSelected = selectedToppings.includes(topping.prod_id);
    if (isSelected) {
      setSelectedToppings(
        selectedToppings.filter((id) => id !== topping.prod_id)
      );
    } else {
      setSelectedToppings([...selectedToppings, topping.prod_id]);
    }
  };

 





  return (
    <div className="cartlist pt-2">
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
                    {item.category_name} | @ {item.prod_rate}{" "}
                  </small>
                  <div className="toppings-btn">
                    <CButton>
                      <u class="text-danger">N</u>ote
                    </CButton>
                    <CButton>
                      <u class="text-danger">C</u>omplementary
                    </CButton>
                    <CButton onClick={() => setToppingModel(!toppingModel)}>
                      <u class="text-danger">T</u>oppings
                    </CButton>
                  </div>
                </td>
                {/* {setQuantity(item.prod_qty)} */}
                {console.log(item.prod_qty)}
                <td className="incree-decreement">
                  <input
                    type="text"
                    className="w-25 text "
                    // value={item.prod_id}
                    defaultValue={item.prod_qty}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(setCartQty(cartItems, item.prod_id, quantity));
                      }
                    }}
                    onChange={(e) => setQuantity(e.target.value)}
                    onKeyUp={handleKeyUp}
                    ref={qtyRef}
                    maxLength={"4"}
                  />
                  <br />
                  <button> Parcel</button>
                </td>
                <td className="pt-3">
                  <b className="rate-font">
                    <i className="fa fa-inr"></i> {item.prod_rate}
                  </b>

                  {/* item remove button */}
                  <span
                    className="btn btn-danger btn-remove"
                    onClick={() =>
                      dispatch(removeFromCart(cartItems, item.prod_id))
                    }
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
              <i className="fa fa-inr"></i>
              {getSubTotalAmount()} {/* Display the calculated subtotal */}
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
              <i className="fa fa-inr"></i>
              {getTotalSGSTAmount().toFixed(2)}{" "}
              {/* Display the calculated SGST amount */}
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6} className="font-size">
              Tax GST (2.5% CGST)
            </CCol>
            <CCol sm={6} style={{ textAlign: "right" }} className="font-size">
              <i className="fa fa-inr"></i>
              {getTotalCGSTAmount().toFixed(2)}{" "}
              {/* Display the calculated CGST amount */}
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
                <i className="fa fa-inr"></i>
                {getFinalPayAmount().toFixed(2)}{" "}
                {/* Display the final pay amount */}
              </h4>
              <small>{getTotalItmes()} Item(s) </small>
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
    </div> */}
              counter
            </CCol>
          </CRow>
        </CContainer>
      </div>

      {/* toppings model */}
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
                    selectedToppings.includes(topping.prod_id)
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
                      {topping.prod_rate}
                  </span>
                </button>
              </label>
            ))}
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="danger">Clear All [Alt + C]</CButton>
          <CButton color="success">Submit [Alt + Enter]</CButton>
          <CButton color="light" onClick={() => setToppingModel(false)}>
            Cancel [Esc]
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default CartSection;
