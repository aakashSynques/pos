import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../action/actions"; // Import the removeFromCart action
import { CFormInput, CFormSelect, CRow, CCol, CContainer } from "@coreui/react";

const CartSection = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  console.log(cartItems);

  // Use a separate state object to store the quantity for each product
  const [productQuantities, setProductQuantities] = useState({});

  // Function to update the quantity for a specific product in the cart
  const updateQuantity = (productId, quantity) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  // Function to increment the quantity for a specific product
  const incrementQuantity = (productId) => {
    const currentQuantity = productQuantities[productId] || 1;
    updateQuantity(productId, currentQuantity + 1);
  };

  // Function to decrement the quantity for a specific product
  const decrementQuantity = (productId) => {
    const currentQuantity = productQuantities[productId] || 1;
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  // Function to calculate the total amount for a specific product based on its quantity
  const getTotalAmount = (productId) => {
    const quantity = productQuantities[productId] || 1;
    const item = cartItems.find((item) => item.prod_id === productId);
    if (item) {
      return item.prod_rate * quantity;
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

  
   // Function to get the total number of items in the cart
    const getTotalItems = () => {
      let totalItems = 0;
      cartItems.forEach((item) => {
        totalItems += productQuantities[item.prod_id] || 1;
      });
      return totalItems;
  };

  // const getTotalItems = () => {
  //   const totalItems = 0;
  //   cartItems.forEach((item) => {
  //     totalItems += productQuantities[item.prod_id] || 1;
  //   });
  //   return totalItems;
  // };
  
  

  

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
                    {item.category_name} | {item.prod_rate}
                  </small>
                </td>
                <td className="incree-decreement">
                  {/* Use the productQuantities object to get the quantity for each product */}
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
                <td>
                  <i className="fa fa-inr"></i>
                  {/* {item.prod_rate}  */}
                  {getTotalAmount(item.prod_id)}

                 {/* item remove button */}
                  <span
                    className="btn btn-danger btn-remove"
                    onClick={() => dispatch(removeFromCart(item.prod_id))}
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
              <i className="fa fa-inr"></i> 0.00
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={6} className="font-size">
                Tax GST (2.5% CGST)
              </CCol>
              <CCol sm={6} style={{ textAlign: "right" }} className="font-size">
              <i className="fa fa-inr"></i> 0.00
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
                  <i className="fa fa-inr"></i> {getSubTotalAmount()}
                </h4>
                <small>{getTotalItems()} Item(s) </small>
              </CCol>
            </CRow>
            <hr style={{ margin: "4px 0" }} />
            <CRow>
              <CCol sm={6} className="font-size">
                Tax GST (2.5% CGST)
              </CCol>
              <CCol sm={6} style={{ textAlign: "right" }} className="font-size">
                Rs 0.00
              </CCol>
            </CRow>
          </CContainer>
      </div>
      

    </div>
  );
};

export default CartSection;
