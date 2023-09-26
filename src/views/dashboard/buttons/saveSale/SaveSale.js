import { CButton } from "@coreui/react";
import React, { useEffect } from "react";
import { fetch } from "../../../../utils";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SaveSale = () => {
  const selectedCustomer = useSelector(
    (state) => state.customer.selectedCustomer
  );

  const cartSumUp = useSelector((state) => state.cart.cartSumUp);
  const selectedCustomersJson = useSelector(
    (state) => state.customer.selectedCustomerJson
  );
  const cartItems = useSelector((state) => state.cart.cartItems);


  const handleSaveSale = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const body = {
        productsInCart: cartItems,
        selectedCustomerJson: selectedCustomersJson,
        cartSumUp: cartSumUp,
        psid: 0,
      };
      const response = await fetch(
        "/api/sales/saveSales",
        "post",
        body,
        headers
      );

      if (response.status === 200) {
        toast.success("Sale submitted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      } else {
        toast.error("Failed to submit sale. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
    } catch (err) {
      console.error("Error ", err);
      toast.error("An error occurred while submitting the sale.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.shiftKey && event.key === "S") {
        handleSaveSale();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <CButton
        className="light-outlet light-outlet2"
        style={{ background: "#f0ad4e" }}
        onClick={handleSaveSale}
        disabled={!selectedCustomer && cartItems} // Disable the button if no customer is selected and cart is empty
      >
        <b>Save Sale</b>
        <p>[Shift + S]</p>
      </CButton>
    </div>
  );
};

export default SaveSale;
