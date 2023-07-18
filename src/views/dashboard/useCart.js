
import { useState } from "react";
export function useCart() {
  const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        console.log("Adding to cart:", product);
    setCartItems([...cartItems, product]);
  };
  return { cartItems, addToCart };
}

