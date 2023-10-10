// import React, { useEffect } from "react";
// import { CButton } from "@coreui/react";
// import { clearCartItems, clearSelectedCustomer } from "../../../action/actions";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css"; // Import the CSS for styling

// const ClearSaleBtn = () => {
//   const dispatch = useDispatch();
//   const selectedCustomer = useSelector((state) => state.customer.selectedCustomer);
//   const cartItems = useSelector((state) => state.cart.cartItems);

//   const handleClearSale = () => {
//     const confirmed = window.confirm("Are you sure you want to clear the sale?");
//     if (confirmed) {
//       dispatch(clearCartItems());
//       dispatch(clearSelectedCustomer());
//       toast.success("Sale cleared successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//       });
//     }
//   };

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.shiftKey && event.key === "Delete") {
//         handleClearSale();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   return (
//     <div>
//       <CButton
//         className="light-outlet light-outlet3"
//         style={{ background: "#d9534f" }}
//         onClick={handleClearSale}
//         disabled={!selectedCustomer && cartItems.length === 0} 
//       >
//         <b>Clear Sale</b>
//         <p>[Shift + Delete]</p>
//       </CButton>
//     </div>
//   );
// };

// export default ClearSaleBtn;



import React, { useEffect } from "react";
import { CButton } from "@coreui/react";
import { clearCartItems, clearSelectedCustomer } from "../../../action/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import the CSS for styling

const ClearSaleBtn = () => {
  const dispatch = useDispatch();
  const selectedCustomer = useSelector((state) => state.customer.selectedCustomer);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleClearSale = () => {
    confirmAlert({
      title: "Confirm Clear Sale",
      message: "Are you sure you want to clear the sale?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(clearCartItems());
            dispatch(clearSelectedCustomer());
            toast.success("Sale cleared successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
            });
          },
        },
        {
          label: "No",
          onClick: () => {
            toast.error("Pending sales not deleted", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
            });
          },
        },
      ],
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.shiftKey && event.key === "Delete") {
        handleClearSale();
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
        className="light-outlet light-outlet3"
        style={{ background: "#d9534f" }}
        onClick={handleClearSale}
        disabled={!selectedCustomer && cartItems.length === 0}
      >
        <b>Clear Sale</b>
        <p>[Shift + Delete]</p>
      </CButton>
    </div>
  );
};

export default ClearSaleBtn;
