import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CButton } from "@coreui/react";
import { fetch } from "../../../../utils";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../config";
import io from 'socket.io-client';
import { setPsid } from "../../../../action/actions";
import { setDiscardButtonActive } from "../../../../action/actions";
const SaveSale = () => {
  const dispatch = useDispatch();
  // const [psid, setPsid] = useState(null);
  const selectedCustomer = useSelector((state) => state.customer.selectedCustomer);
  const cartSumUp = useSelector((state) => state.cart.cartSumUp);
  const selectedCustomersJson = useSelector((state) => state.customer.selectedCustomerJson);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [socket, setSocket] = useState(null);

  // const [discardButtonActive, setDiscardButtonActive] = useState(false);


  useEffect(() => {
    const newSocket = io.connect(BASE_URL);
    setSocket(newSocket);
  }, []);

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

      const responseData = await response;
      const psidValue = responseData.data.order_json.psid;
      // setPsid(psidValue);
      dispatch(setPsid(psidValue));
      dispatch(setDiscardButtonActive(true)); // Set discardButtonActive to true



      await socket.emit("add-order", responseData);
      if (responseData.status === 200) {

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
      toast.error("An error occurred while submitting the sale.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };



  return (
    <div>
      <CButton
        className="light-outlet light-outlet2"
        style={{ background: "#f0ad4e" }}
        onClick={handleSaveSale}
        disabled={!selectedCustomer || cartItems.length === 0}
      >
        <b>Save Sale</b>
        <p>[Shift + S]</p>
      </CButton>


    </div>
  );
};

export default SaveSale;
