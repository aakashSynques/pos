import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CButton } from "@coreui/react";
import { clearCartItems, clearSelectedCustomer } from "../../../action/actions";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import the CSS for styling
import { fetch } from "../../../utils";
import { toast } from "react-toastify";
import { setPsid, setDiscardButtonActive } from "../../../action/actions";

const DiscardSaleBtn = () => {
  const dispatch = useDispatch();
  const psid = useSelector((state) => state.getSaveSale.psid);
  const discardButtonActive = useSelector((state) => state.getSaveSale.discardButtonActive);

  const deletePendingSale = async (psid) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure to discard the current cart from the pending list?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const token = localStorage.getItem("pos_token");
              const headers = { Authorization: `Bearer ${token}` };
              await fetch(`/api/sales/deletePenddingSaleData/${psid}`, "delete", null, headers);
              dispatch(setPsid(null));
              dispatch(setDiscardButtonActive(false));
              dispatch(clearCartItems());
              dispatch(clearSelectedCustomer());
              toast.success("Pending sale data deleted successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
              });
            } catch (err) {
              console.error("Error deleting sale data:", err);

              toast.error("Error deleting pending sale data. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
              });
            }
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

  return (
    <CButton
      className="light-outlet light-outlet3"
      style={{ background: discardButtonActive ? "#d9534f" : "#d9534f" }}
      onClick={() => deletePendingSale(psid)}
      disabled={!discardButtonActive}
    >
      {psid}
      <b>Discard Sale</b>
      <p>[Shift + Ctrl + Delete]</p>
    </CButton>
  );
};

export default DiscardSaleBtn;