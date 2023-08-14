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
import Pendding from "./bookingtables/Delivered";
import Pending from "./bookingtables/Pending";
import Delivered from "./bookingtables/Delivered";
import Future from "./bookingtables/Future";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const PendingBooking = () => {
  const [booking, setBooking] = useState(false);
  const [activeKey, setActiveKey] = useState(1);
  const [pendingBooking, setPendingBooking] = useState([]);

  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  const outlet_id = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );

  const getAllPendingBookings = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      // console.log(outlet_id, "39");
      setLoading(true);
      const response = await axios.post(
        "http://posapi.q4hosting.com/api/order/pending",
        { outlet_id },
        { headers }
      );
      setPendingBooking(response.data.get_pending_booking);
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
    getAllPendingBookings();
  }, [outlet_id]);

  return (
    <>
      <CCard className="invoice-card">
        <CCardHeader className="invoice-card">
          Pending Booking(s)
          <CLink
            className="text-primary pull-right"
            onClick={() => setBooking(!booking)}
          >
            <i className="fa fa-external-link fa-xs"></i>
          </CLink>
        </CCardHeader>
        {networkError === true && (
          <CCardBody style={{ display: "flex" }}>
            <div>
              <medium className="text-danger">No Pending Invoices..</medium>
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

            <div>
              <medium className="text-danger">
                Loading Pending Invoices..
              </medium>
            </div>
          </CCardBody>
        )}
        {loading === false && networkError === false && (
          <div className="pending-booking">
            <table width="100%" className="table table-bordered ongoing">
              <tbody>
                {pendingBooking
                  .slice(0, 10)
                  .map(({ booking_json, booking_no }) => {
                    let parsedbooking_json = null;
                    try {
                      parsedbooking_json = JSON.parse(booking_json);
                      // console.log(parsedbooking_json, "98");
                    } catch (error) {
                      // return false;
                      console.error("Error parsing sales_json:", error);
                    }
                    // const total = Number(parsedbooking_json.cartSumUp.grandTotal);
                    return (
                      <tr>
                        <td style={{ width: "60%" }}>
                          <Link to="" className="text-primary text-link">
                            {booking_no}
                            <br />
                          </Link>
                          <small className="text-sm" style={{ fontSize: "px" }}>
                            {
                              parsedbooking_json.selectedCustomerJson
                                .customer_name
                            }
                            <br />(
                            {parsedbooking_json.selectedCustomerJson.mobile})
                          </small>
                        </td>
                        <td>
                          {parsedbooking_json.cartSumUp.deliveryMode == "1" ? (
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
                          ) : parsedbooking_json.cartSumUp.deliveryMode ==
                            "2" ? (
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
                          ) : parsedbooking_json.cartSumUp.deliveryMode ==
                            "3" ? (
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
                          ) : parsedbooking_json.cartSumUp.deliveryMode ==
                            "4" ? (
                            <strong
                              className="status-btn"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1em",
                                color: "white",
                                backgroundColor: "#d9534f",
                                height: "2%",
                                width: "2%",
                              }}
                            >
                              <small>Home Delivery</small>
                            </strong>
                          ) : null}
                          <br />
                          <font>
                            {parsedbooking_json.cartSumUp.deliveryDate}
                          </font>
                          <br />
                          <font>
                            {parsedbooking_json.cartSumUp.deliveryTime}
                          </font>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </CCard>

      {/* booking order model */}

      <CModal size="xl" visible={booking} onClose={() => setBooking(false)}>
        <CModalHeader onClose={() => setBooking(false)}>
          <CModalTitle>Booking Orders</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CNav variant="pills" role="tablist">
            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                Today's Pending Delivery <span className="badge"> 20</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                Today's Delivered Booking <span className="badge"> 0</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 3}
                onClick={() => setActiveKey(3)}
              >
                Future Booking(s) <span className="badge"> 8</span>
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane
              role="tabpanel"
              aria-labelledby="home-tab"
              visible={activeKey === 1}
            >
              <Pending />
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="profile-tab"
              visible={activeKey === 2}
            >
              <Delivered />
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="contact-tab"
              visible={activeKey === 3}
            >
              <Future />
            </CTabPane>
          </CTabContent>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
export default PendingBooking;
