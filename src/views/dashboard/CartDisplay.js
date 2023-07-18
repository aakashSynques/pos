import React from "react";
import { useCart } from "./useCart"; // Import the custom hook

const CartDisplay = () => {
  const { cartItems } = useCart(); // Use the custom hook to access the cart state
  console.log("Cart Items:", cartItems); // Log the cartItems data to the console
  return (
    <div>
      <h2>Cart List</h2>
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

export default CartDisplay;
