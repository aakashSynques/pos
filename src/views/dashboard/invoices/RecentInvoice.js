import axios from "axios";
import {
  CCardHeader,
  CLink,
  CCardBody,
  CCard,
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
  CButton,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import io from "socket.io-client";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RecentPrintModal from "./RecentPrintModal";
import RecentTabModal from "./RecentTabModal";
import useFetch from "../../../custom hooks/useFetch";
// import { setPrototypeOf } from "core-js/core/object";
import { setRecentBookings } from "../../../action/actions"; //recentinvoice
import { fetch } from "../../../utils";

const RecentInvoice = () => {
  const dispatch = useDispatch();
  let isFirstCall = true;
  const [newAddedOrder, setNewAddedOrder] = useState(0);
  const [booking, setBooking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const [printBooking, setPrintBooking] = useState(false);
  const outlet_id = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );
  const recentBooking = useSelector(
    (state) => state.recentBooking.recentBookings
  );
  const [invoiceDetails, setInvoiceDetails] = useState();

  const [socket, setSocket] = useState(null);
  const [salesid, setSalesid] = useState(null);

  // useEffect(() => {
  //   const newSocket = io.connect("http://posapi.q4hosting.com"); // Replace with your server URL
  //   setSocket(newSocket);
  // }, []);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("get-order", (data) => {
  //       const newOrderId = Date.now() + Math.random();
  //       setNewAddedOrder(newOrderId);
  //     });
  //   }
  // }, [socket]);

  // useEffect(() => {
  //   const newSocket = io.connect("http://posapi.q4hosting.com");
  //   newSocket.on("connect_error", (error) => {
  //     console.error("Socket connection error:", error);
  //   });

  //   setSocket(newSocket);
  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, []);



  const getAllRecentInvoices = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const body = {
        outlet_id,
      };
      const response = await fetch("/api/order/recent", "POST", body, headers);
      console.log('new res', response.data.recentOrders)

      dispatch(setRecentBookings(response.data.recentOrders));
      setLoading(false);
      setNetworkError(false);
    } catch (err) {
      dispatch(setRecentBookings([]));
      if (err.response.data?.message === "No Recent Orders Found.") {
        setNetworkError(true);
        setLoading(false);
      } else if (err.response.data?.message === "Outlet Id Required.") {
        if (isFirstCall) {
          setLoading(true);
          isFirstCall = false;
        }
      } else {
        setNetworkError(true);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    setNetworkError(false);
  }, [outlet_id]);

  useEffect(() => {
    if (outlet_id) {
      getAllRecentInvoices();
    }
  }, [outlet_id]);



  const relevantCartSumUpData = recentBooking.map((booking) => {
    if (booking.sales_json && booking.sales_json.cartSumUp) {
      const cartSumUp = booking.sales_json.cartSumUp;
      return {
        subtotal: parseFloat(cartSumUp.subTotal) || 0,
        grandTotal: parseFloat(cartSumUp.grandTotal) || 0,
        payDetails: cartSumUp.payDetails || [],
        tax: parseFloat(cartSumUp.tax) || 0,
      };
    }
    return null;
  });



  const grandTotalValues = relevantCartSumUpData.map(item => item.grandTotal);
  console.log('gd', grandTotalValues)

  const payAmountValues = relevantCartSumUpData.map(items => {
    return items.payDetails.reduce((total, item) => total + item.payAmount, 0);
  });
  const remainingBalances = grandTotalValues.map((grandTotal, index) => grandTotal - payAmountValues[index]);







  const clickInvoiceLink = (invoice_no, sales_json, salesid) => {
    setPrintBooking(!printBooking);
    setInvoiceDetails({ [invoice_no]: sales_json, salesid });
    setSalesid(salesid);
  };

  return (
    <>
      <CCard className="invoice-card">
        <CCardHeader className="invoice-card">
          Recent Invoice(s)
          <CLink
            className="text-primary pull-right"
            onClick={() => setBooking(!booking)}
          >
            <i className="fa fa-external-link fa-xs"></i>
          </CLink>
        </CCardHeader>

        {networkError === true && (
          <CCardBody style={{ display: "flex" }}>
            <div className="text-danger medium-text font-size-2">No Recent Invoices..</div>
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

            <div className="text-danger medium-text font-size-2">
              Loading Recent Invoices..
            </div>
          </CCardBody>
        )}

        {loading === false && networkError === false && (
          <div>
            <table width="100%" className="table table-bordered ongoing mb-0">
              <tbody>
                {recentBooking
                  .slice(0, 10)
                  .map(({ invoice_no, sales_json, salesid }) => {
                    return (
                      <tr key={invoice_no}>
                        <td>
                          {sales_json &&
                            sales_json.cartSumUp &&
                            sales_json.cartSumUp.deliveryMode &&
                            sales_json.cartSumUp.deliveryMode == "1" ? (
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
                          ) : sales_json &&
                            sales_json.cartSumUp &&
                            sales_json.cartSumUp.deliveryMode &&
                            sales_json.cartSumUp.deliveryMode == "2" ? (
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
                          ) : sales_json &&
                            sales_json.cartSumUp &&
                            sales_json.cartSumUp.deliveryMode &&
                            sales_json.cartSumUp.deliveryMode == "3" ? (
                            <strong
                              className="status-btn"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1em",
                                color: "white",
                                backgroundColor: "green",
                                height: "2%",
                                width: "2%",
                              }}
                            >
                              PU
                            </strong>
                          ) : sales_json &&
                            sales_json.cartSumUp &&
                            sales_json.cartSumUp.deliveryMode &&
                            sales_json.cartSumUp.deliveryMode == "4" ? (
                            <strong
                              className="status-btn"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1em",
                                color: "white",
                                backgroundColor: "#26b99a",
                                height: "2%",
                                width: "2%",
                              }}
                            >
                              HD
                            </strong>
                          ) : null}
                        </td>

                        <td>
                          <Link
                            to=""
                            className="text-primary text-link"
                            onClick={() =>
                              clickInvoiceLink(invoice_no, sales_json, salesid)
                            }
                          >
                            {invoice_no}
                            <br />
                          </Link>
                          <small>
                            {sales_json &&
                              sales_json.selectedCustomerJson &&
                              sales_json.selectedCustomerJson.customer_name &&
                              sales_json.selectedCustomerJson.customer_name}
                            (
                            {sales_json &&
                              sales_json.selectedCustomerJson &&
                              sales_json.selectedCustomerJson.mobile &&
                              sales_json.selectedCustomerJson.mobile}
                            )
                          </small>
                        </td>
                        <td align="right"
                          style={{
                            fontWeight: "bold",
                            color: "black",
                          }}
                        >
                          <i
                            className="fa fa-edit pull-left text-warning"
                            title="Edit Collection"
                          ></i>
                          <small className="text-end font-size-3">

                            <i className="fa fa-inr"></i>
                            {Number(
                              sales_json &&
                              sales_json.cartSumUp &&
                              sales_json.cartSumUp.grandTotal &&
                              sales_json.cartSumUp.grandTotal
                            ).toFixed(2)}
                          </small>{" "}
                          <br />

                          <span
                            className="label bg-success text-white rounded-1 text-end"
                            style={{
                              padding: "1px 5px",
                              fontSize: "10px",
                              float: "right",
                              lineHeight: "1",
                            }}
                          >
                            <i className="fa fa-inr"></i>{" "}

                          </span>
                        </td>

                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </CCard>


      <RecentTabModal
        booking={booking}
        setBooking={setBooking}
      // recentBooking={recentBooking}
      />
      <RecentPrintModal
        salesid={salesid}
        setSalesid={setSalesid}
        printBooking={printBooking}
        setPrintBooking={setPrintBooking}
        invoiceDetails={invoiceDetails}
      />
    </>
  );
};
export default RecentInvoice;
