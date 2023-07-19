import React from "react";

const Cart = ({ cartItems }) => {
  return (
    <div>
      <h2>Cart Items</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.prod_id}>
            {item.prod_name} - {item.prod_code}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
