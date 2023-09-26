import {
  CCardHeader,
  CLink,
  CCardBody,
  CCard,
  CButton,
  CModal,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CModalBody,
  CNavItem,
  CNav,
  CNavLink,
  CTabContent,
  CTabPane,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import Pending from "./bookingtables/Pending";
import Delivered from "./bookingtables/Delivered";
import Future from "./bookingtables/Future";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import PendingPrintModal from "./pendingComponent/PendingPrintModal";
import PendingTabModal from "./pendingComponent/PendingTabModal";
import { fetch } from "../../../utils";

const PendingBooking = () => {
  const [bookingModal, setBookingModal] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState();
  const [activeKey, setActiveKey] = useState(1);
  const [pendingBooking, setPendingBooking] = useState([]);
  const [printBooking, setPrintBooking] = useState(false);
  const [booking, setBooking] = useState(false);

  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  const outlet_id = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );

  const getAllPendingBookings = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const body = {
        outlet_id
      }
      setLoading(true);
      const response = await fetch(
        "/api/order/pending",
        "POST",
        body,
        headers
      );

      setPendingBooking(response.data.get_pending_booking);
      setLoading(false);
      setNetworkError(false);
    } catch (err) {
      console.log(err);
      if (err.response.data.message == "No pending Booking Orders Found.") {
        // console.log("No pending Booking Orders Found.");
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
    getAllPendingBookings();
  }, [outlet_id]);

  
  
  const clickPendingInvoiceLink = (booking_no, booking_json, booking_id) => {
    setPrintBooking(!printBooking);
    setInvoiceDetails({ [booking_no]: booking_json, booking_id });
  };
  return (
    <>
      <CCard className="invoice-card">
        <CCardHeader className="invoice-card">
          Pending Booking(s)
          <CLink
            className="text-primary pull-right"
            onClick={() => setBookingModal(!bookingModal)}
          >
            <i className="fa fa-external-link fa-xs"></i>
          </CLink>
        </CCardHeader>
        {networkError === true && (
          <CCardBody style={{ display: "flex" }}>
            <div>
              <div className="text-danger medium-text" style={{fontSize: "12px"}}>No Pending Invoices..</div>
            </div>
          </CCardBody>
        )}
        {loading === true && (
          <CCardBody style={{ display: "flex" }}>
            <BeatLoader
              color="red"
              loading={true}
              size={8}
              style={{ marginTop: "1%", marginRight: "2%" }}
            />

            <div className="text-danger medium-text" style={{fontSize: "12px"}}>
                Loading Pending Invoices..
              </div>
          </CCardBody>
        )}
        {loading === false && networkError === false && (
          <div className="pending-booking">
            <table width="100%" className="table table-bordered ongoing">
              <tbody>
                {pendingBooking
                  .slice(0, 10)
                  .map(({ booking_json, booking_no, booking_id }) => {
                    return (
                      <tr key={booking_no}>
                        <td style={{ width: "75%" }}>
                          <Link
                            to=""
                            className="text-primary text-link" style={{fontSize: "12px"}}
                            onClick={() =>
                              clickPendingInvoiceLink(
                                booking_no,
                                booking_json,
                                booking_id
                              )
                            }
                          >
                            {booking_no}
                            <br />
                          </Link>
                          <small className="text-sm">
                            {booking_json.selectedCustomerJson.customer_name} {""} <span style={{ fontSize: "8px" }}>({booking_json.selectedCustomerJson.mobile})</span>
                          </small>
                        </td>
                        <td>
                          {booking_json.cartSumUp.deliveryMode == "1" ? (
                            <strong
                              className="status-btn"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1em",
                                color: "white",
                                backgroundColor: "#f0ad4e",
                                height: "2%",
                                width: "2%",
                              }}
                            >
                              Cs
                            </strong>
                          ) : booking_json.cartSumUp.deliveryMode == "2" ? (
                            <strong
                              className="status-btn"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1em",
                                color: "white",
                                backgroundColor: "#28819e",
                                height: "2%",
                                width: "2%",
                              }}
                            >
                              OT
                            </strong>
                          ) : booking_json.cartSumUp.deliveryMode == "3" ? (
                            <strong
                              className="status-btn"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1em",
                                color: "white",
                                backgroundColor: "#1a82c3",
                                height: "2%",
                                width: "2%",
                              }}
                            >
                              PickUp
                            </strong>
                          ) : booking_json.cartSumUp.deliveryMode == "4" ? (
                            <strong
                              className="status-btn"
                              style={{
                                fontWeight: "bold",
                                fontSize: "10px",
                                color: "white",
                                backgroundColor: "#d9534f",
                                height: "2%",
                                width: "2%",
                                padding: "0px 3px 0px 3px",
                              }}
                            >
                            Home Delivery
                            </strong>
                          ) : null}
                          <br />
                          <p style={{
                            lineHeight: "12px",
                            marginBottom: "0"
                          }}>{booking_json.cartSumUp.deliveryDate}</p>
                          <p style={{
                            lineHeight: "12px",
                            marginBottom: "0"
                          }}>{booking_json.cartSumUp.deliveryTime}</p>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </CCard>{" "}
      {/* booking order model */}
      {/* booking order model */}
      <PendingTabModal
        bookingModal={bookingModal}
        setBookingModal={setBookingModal}
        printBooking={printBooking}
        pendingBooking={pendingBooking}
      />
      {/* Print booking order model */}
      <PendingPrintModal
        printBooking={printBooking}
        setPrintBooking={setPrintBooking}
        invoiceDetails={invoiceDetails}
      />
    </>
  );
};
export default PendingBooking;
