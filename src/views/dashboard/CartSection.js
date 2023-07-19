import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../action/actions"; // Import the removeFromCart action
import { CButton } from "@coreui/react";

const CartSection = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

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
                    <td><b>{item.prod_name}</b>  <br /> <small>{item.category_name}</small></td>
                    <td>1</td>
                    <td>
                    <i class="fa fa-inr"></i> 200
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
        <div className="product-list" style={{ margin: "110px 0", textAlign: "center", border: "none" }}>
          No items in the cart.
        </div>
      )}              

    </div>
  );
};

export default CartSection;