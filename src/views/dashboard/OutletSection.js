// import {
//   CButton,
// } from "@coreui/react";
// import React from "react";
// import AssignOutLet from "../outlet/AssignOutLet";
// import DeliveryModeModal from "../outlet/DeliveryModeModal";

// const OutletOptions = ({ outletName }) => {
//   return (
//     <>
//       <div className="outlet-btn">
//         <AssignOutLet />
//         {/* <DeliveryModeModal /> */}
//         <br /> 
//         <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
//           <b>New Sale</b>
//           <p>[Shift + N]</p>
//         </CButton>
//         <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
//           <b>Save Sale</b>
//           <p>[Shift + S]</p>
//         </CButton>
//         <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
//           <b>Panding Sale(s)</b>
//           <p>[Shift + L]</p>
//         </CButton>
//         <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
//           <b>Pending KOT(s)</b>
//           <p>[Shift + K]</p>
//         </CButton>
//         <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
//           <b>Recent Sale(s)</b>
//           <p>[Shift + R]</p>
//         </CButton>
//         <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
//           <b>Booking Sale</b>
//           <p>[Shift + B]</p>
//         </CButton>
//         <CButton
//           className="light-outlet"
//           style={{ background: "#fff", color: "#000" }}
//         >
//           <b>Collection Status</b>
//         </CButton>
//         <CButton
//           className="light-outlet"
//           style={{ background: "#fff", color: "#000" }}
//         >
//           <b>Expenses/Purchase Status</b>
//         </CButton>
//         <CButton className="light-outlet" style={{ background: "#d9534f" }}>
//           <b>Clear Sale</b>
//           <p>[Shift + Delete]</p>
//         </CButton>
//         <CButton className="light-outlet" style={{ background: "#d9534f" }}>
//           <b>Discard Sale</b>
//           <p>[Shift + Ctrl + Delete]</p>
//         </CButton>
//       </div>
//     </>
//   );
// };

// export default OutletOptions;




import {
  CContainer,
  CRow,
  CCol,
  CCardHeader,
  CLink,
  CCardBody,
  CCard,
  CButton,
} from "@coreui/react";
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
// import OnGoingTabModal from "./invoices/OnGoingKotModel/OnGoingTabModal";
import CollectioStatusModal from "./collectionComponent/CollectioStatusModal";

const OutletOptions = ({ outletName }) => {
  const [booking, setBooking] = useState(false);
  const [recentBooking, setRecentBooking] = useState([]);

  const [bookingModal, setBookingModal] = useState(false);
  const [pendingBooking, setPendingBooking] = useState([]);

  const [kotModal, setKotModal] = useState(false);
  const [collectionModal, setCollectionModal] = useState(false);

  const [printBooking, setPrintBooking] = useState(false);

  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  const outlet_id = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );

  const getAllRecentInvoices = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setLoading(true);
      const response = await axios.post(
        "http://posapi.q4hosting.com/api/order/recent",
        { outlet_id },
        { headers }
      );
      // console.log(response, "52 recent");
      setRecentBooking(response.data.recentOrders);
      setLoading(false);
      setNetworkError(false);
    } catch (err) {
      console.log(err);
      if (err.response.data.message == "No Recent Orders Found.") {
        console.log("No Returned Orders Found.");
        setNetworkError(true);
        setLoading(false);
      } else if (err.response.data.message == "Outlet Id Required.") {
        setLoading(true);
        console.log(err);
      } else {
        console.log(err);
        setNetworkError(true);
        setLoading(false);
      }
    }
  };

  const getAllPendingBookings = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setLoading(true);
      const response = await axios.post(
        "http://posapi.q4hosting.com/api/order/pending",
        { outlet_id },
        { headers }
      );
      setPendingBooking(response.data.get_pending_booking);
      // console.log(response);
      setLoading(false);
      setNetworkError(false);
    } catch (err) {
      console.log(err);
      if (err.response.data.message == "No pending Booking Orders Found.") {
        console.log("No pending Booking Orders Found.");
        setNetworkError(true);
        setLoading(false);
      } else if (err.response.data.message == "Outlet Id Required.") {
        setLoading(true);
        console.log(err);
      } else {
        console.log(err);
        setNetworkError(true);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    getAllRecentInvoices();
    getAllPendingBookings();
  }, [outlet_id]);

  return (
    <>
      <div className="outlet-btn">
        <AssignOutLet />
        <br />
        <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
          <b>New Sale</b>
          <p>[Shift + N]</p>
        </CButton>
        <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
          <b>Save Sale</b>
          <p>[Shift + S]</p>
        </CButton>
        <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
          <b>Panding Sale(s)</b>
          <p>[Shift + L]</p>
        </CButton>
        <CButton
          className="light-outlet"
          style={{ background: "#f0ad4e" }}
          onClick={() => setKotModal(!kotModal)}
        >
          <b>Pending KOT(s)</b>
          <p>[Shift + K]</p>
        </CButton>
        <CButton
          className="light-outlet"
          style={{ background: "#f0ad4e" }}
          onClick={() => setBooking(!booking)}
        >
          <b>Recent Sale(s)</b>
          <p>[Shift + R]</p>
        </CButton>
        <CButton
          className="light-outlet"
          style={{ background: "#f0ad4e" }}
          onClick={() => setBookingModal(!bookingModal)}
        >
          <b>Booking Sale</b>
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
        <CButton className="light-outlet" style={{ background: "#d9534f" }}>
          <b>Clear Sale</b>
          <p>[Shift + Delete]</p>
        </CButton>
        <CButton className="light-outlet" style={{ background: "#d9534f" }}>
          <b>Discard Sale</b>
          <p>[Shift + Ctrl + Delete]</p>
        </CButton>
      </div>
      <RecentTabModal
        booking={booking}
        setBooking={setBooking}
        recentBooking={recentBooking}
      />
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
