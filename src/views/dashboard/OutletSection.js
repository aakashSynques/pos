import { CButton } from "@coreui/react";
import React from "react";
import AssignOutLet from "../outlet/AssignOutLet";
import { useState } from "react";
import PendingTabModal from "./invoices/pendingComponent/PendingTabModal";
import PendingPrintModal from "./invoices/pendingComponent/PendingPrintModal";
import Pending from "./invoices/bookingtables/Pending";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import RecentTabModal from "./invoices/RecentTabModal";
import PendingSaleModal from "./buttons/PendingSaleBtn/PendingSaleModal";
import OnGoingTabModal from "./invoices/OnGoingKotModel/OnGoingTabModal";
import CollectioStatusModal from "./buttons/collectionStatusBtn/CollectioStatusModal";
import SaveSale from "./buttons/saveSale/SaveSale";
import ClearSaleBtn from "./buttons/ClearSaleBtn";
import { fetch } from "../../utils";
import NewSale from "./buttons/newSaleBtn/NewSale";
import DiscardSaleBtn from "./buttons/DiscardSaleBtn";
import ChangeOutlet from "../outlet/ChangeOutlet";

// import { setInputFocused } from "../../action/actions";

const OutletOptions = ({ outletName }) => {
  const [booking, setBooking] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);
  const [pendingBooking, setPendingBooking] = useState([]);

  const [pendingButtonModal, setPendingButtonModal] = useState(false);
  const [kotModal, setKotModal] = useState(false);
  const [collectionModal, setCollectionModal] = useState(false);

  const [printBooking, setPrintBooking] = useState(false);

  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const isInputFocused = useSelector((state) => state.inputFocus.isInputFocus);

  const outlet_id = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );

  const recentBooking = useSelector(
    (state) => state.recentBooking.recentBookings
  );

  const getSaveSale = useSelector((state) => state.getSaveSale.getSaveSaleData);
  const pendingKotData = useSelector((state) => state.table.pendingKotData);

  const getAllPendingBookings = async () => {
    try {
      // const token = localStorage.getItem("pos_token");
      // const headers = {
      //   Authorization: `Bearer ${token}`,
      // };
      // setLoading(true);
      // const response = await axios.post(
      //   "http://posapi.q4hosting.com/api/order/pending",

      //   { outlet_id },
      //   { headers }
      // );

      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const body = {
        outlet_id,
      };
      setLoading(true);
      const response = await fetch("/api/order/pending", "POST", body, headers);

      setPendingBooking(response.data.get_pending_booking);
      setLoading(false);
      setNetworkError(false);
    } catch (err) {
      if (err.response.data.message == "No pending Booking Orders Found.") {
        setNetworkError(true);
        setLoading(false);
      } else if (err.response.data.message == "Outlet Id Required.") {
        setLoading(true);
      } else {
        setNetworkError(true);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // getAllRecentInvoices();
    getAllPendingBookings();
  }, [outlet_id]);

  const getTodayRecentSale = () => {
    let todayRecentLength = [];
    recentBooking &&
      recentBooking.forEach(({ sales_json }) => {
        try {
          if (sales_json.cartSumUp.deliveryMode) {
            const deliveryMode = sales_json.cartSumUp.deliveryMode;
            if (deliveryMode > 0) {
              const pickUpTab = deliveryMode ? deliveryMode : null;
              todayRecentLength.push(pickUpTab);
            }
          }
        } catch (error) {
          console.error("Error parsing sales_json:", error);
        }
      });
    const filteredTodayDelivery = todayRecentLength.filter(Boolean);
    return filteredTodayDelivery; // Return the array of payMode values
  };

  const todayRecentDelivery = getTodayRecentSale();

  const getTodayPendingDelivery = () => {
    let todayPendingLength = [];

    pendingBooking.forEach(({ booking_json }) => {
      try {
        if (booking_json.cartSumUp.deliveryMode) {
          const deliveryMode = booking_json.cartSumUp.deliveryMode;
          if (deliveryMode.length > 0) {
            const pickUpTab = deliveryMode ? deliveryMode : null;
            todayPendingLength.push(pickUpTab);
          }
        }
      } catch (error) {
        console.error("Error parsing booking_json:", error);
      }
    });

    const filteredTodayDelivery = todayPendingLength.filter(Boolean);

    return filteredTodayDelivery; // Return the array of payMode values
  };
  const todayDelivery = getTodayPendingDelivery();

  useEffect(() => {
    const handleKeyDownPendingSales = (event) => {
      if (!isInputFocused) {
        if (event.shiftKey && event.key === "L") {
          setPendingButtonModal(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDownPendingSales);

    return () => {
      window.removeEventListener("keydown", handleKeyDownPendingSales);
    };
  }, [isInputFocused]);

  useEffect(() => {
    const handleKeyDownPendingKot = (event) => {
      if (!isInputFocused) {
        if (event.shiftKey && event.key === "K") {
          setKotModal(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDownPendingKot);

    return () => {
      window.removeEventListener("keydown", handleKeyDownPendingKot);
    };
  }, [isInputFocused]);

  useEffect(() => {
    const handleKeyDownCounterSale = (event) => {
      if (!isInputFocused) {
        if (event.shiftKey && event.key === "R") {
          setBooking(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDownCounterSale);

    return () => {
      window.removeEventListener("keydown", handleKeyDownCounterSale);
    };
  }, [isInputFocused]);

  useEffect(() => {
    const handleKeyDownBookingSale = (event) => {
      if (!isInputFocused) {
        if (event.shiftKey && event.key === "B") {
          setBookingModal(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDownBookingSale);
    return () => {
      window.removeEventListener("keydown", handleKeyDownBookingSale);
    };
  }, [isInputFocused]);

  // dispatch(clearCartItems());
  // dispatch(clearSelectedCustomer());

  return (
    <>
      <div className="outlet-btn">
        <AssignOutLet />
{/* 
        <ChangeOutlet /> */}
        <br />


        {/* new sale button */}
        <NewSale />

        {/* save sale button componet */}
        <SaveSale />

        <CButton
          className="light-outlet light-outlet2"
          style={{ background: "#f0ad4e" }}
          onClick={() => setPendingButtonModal(!pendingButtonModal)}
        >
          <b>Pending Sale(s)</b>
          <span
            className="badge"
            style={{
              padding: "4px",
              marginLeft: "4%",
              borderRadius: "50px",
              fontSize: "12px",
              color: "#f0ad4e",
              backgroundColor: "white",
            }}
          >{getSaveSale.length}</span>
          <p>[Shift + L]</p>
        </CButton>




        <CButton
          className="light-outlet"
          style={{ background: "#f0ad4e" }}
          onClick={() => setKotModal(!kotModal)}
        >
          <b>Pending KOT(s)</b>
          <span
            className="badge"
            style={{
              padding: "4px",
              marginLeft: "4%",
              borderRadius: "50px",
              fontSize: "12px",
              color: "#f0ad4e",
              backgroundColor: "white",
            }}
          >{pendingKotData.length} </span>
          <p>[Shift + K]</p>
        </CButton>



        <CButton
          className="light-outlet"
          style={{ background: "#f0ad4e" }}
          onClick={() => setBooking(!booking)}
        >
          <b>Recent Sale(s)</b>
          <span
            className="badge"
            style={{
              padding: "4px",
              marginLeft: "4%",
              borderRadius: "50px",
              fontSize: "12px",
              color: "#f0ad4e",
              backgroundColor: "white",
            }}
          >
            {" "}
            {todayRecentDelivery.length}
          </span>
          <p>[Shift + R]</p>
        </CButton>

        <CButton
          className="light-outlet"
          style={{ background: "#f0ad4e" }}
          onClick={() => setBookingModal(!bookingModal)}
        >
          <b>Booking Sale</b>
          <span
            className="badge"
            style={{
              padding: "4px",
              marginLeft: "4%",
              borderRadius: "50px",
              fontSize: "12px",
              color: "#f0ad4e",
              backgroundColor: "white",
            }}
          >
            {" "}
            {todayDelivery.length}
          </span>
          <p>[Shift + B]</p>
        </CButton>

        <CButton
          className="white-outlet"
          onClick={() => setCollectionModal(!collectionModal)}
        >
          <b>Collection Status</b>
        </CButton>

        <CButton className="white-outlet">
          <b>Expenses/Purchase Status</b>
        </CButton>

        {/* claer sale component    */}
        <ClearSaleBtn />

        {/* Discard save sale */}
        <DiscardSaleBtn />

      </div>




      <PendingSaleModal
        pendingButtonModal={pendingButtonModal}
        setPendingButtonModal={setPendingButtonModal}
      />

      <RecentTabModal
        booking={booking}
        setBooking={setBooking}
        recentBooking={recentBooking}
      />
      <OnGoingTabModal kotModal={kotModal} setKotModal={setKotModal} />
      <PendingTabModal
        bookingModal={bookingModal}
        setBookingModal={setBookingModal}
        printBooking={printBooking}
        pendingBooking={pendingBooking}
      />
      {/* <OnGoingTabModal kotModal={kotModal} setKotModal={setKotModal} /> */}
      <CollectioStatusModal
        collectionModal={collectionModal}
        setCollectionModal={setCollectionModal}
      />
    </>
  );
};

export default OutletOptions;
