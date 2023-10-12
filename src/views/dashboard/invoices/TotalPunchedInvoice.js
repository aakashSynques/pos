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
import { setRecentBookings } from "../../../action/actions"; //recentinvoice
import { fetch } from "../../../utils";
import { BASE_URL } from "../../../config";

const TotalPunchedInvoice = () => {
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

  // const filterAndCountData = (data, custTypeName) => {
  //   return data.filter(
  //     (booking) => booking.sales_json.selectedCustomerJson.cust_type_name === custTypeName
  //   ).length;
  // };

  const filterAndCountData = (data, custTypeName) => {
    if (!data || !Array.isArray(data)) {
      return 0; // Return 0 if data is not defined or not an array
    }
  
    return data.filter(
      (booking) =>
        booking.sales_json?.selectedCustomerJson?.cust_type_name === custTypeName
    ).length;
  };
  



  const customerDataLength = filterAndCountData(recentBooking, 'Customer');
  const walkInCustomerDataLength = filterAndCountData(recentBooking, 'WalkIn-Customer');
  

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io.connect(BASE_URL); // Use the variable directly
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("get-order", (data) => {
        const newOrderId = Date.now() + Math.random();
        setNewAddedOrder(newOrderId);
      });
    }
  }, [socket]);

  const getAllRecentInvoices = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const body = {
        outlet_id,
      };
      const response = await fetch("/api/order/recent", "POST", body, headers);
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
  }, [outlet_id, newAddedOrder]);

  const recentBookingLength = recentBooking.length;

  return (
    <>
      <CCard className="invoice-card">
        <CCardHeader className="invoice-card">
          Total Punched Invoice(s)
        </CCardHeader>

        {networkError === true && (
          <CCardBody style={{ display: "flex" }}>
            <div className="text-danger medium-text font-size-2">No Punched Invoice..</div>
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
              Loading Punched Invoice..
            </div>
          </CCardBody>
        )}

        {loading === false && networkError === false && (
          <div>
            <table
              width="100%"
              className="table table-bordered ongoing mb-0"
              style={{ fontSize: "11px" }}
            >
              <tbody>
                <tr style={{ background: "#efefef" }}>
                  <th>Heads</th>
                  <th className="text-end">Invoice </th>
                  <th className="text-end">Return(s)</th>
                </tr>
                <tr valign="top">
                  <td>Customer</td>
                  <td className="text-right">{customerDataLength}</td>
                  <td className="text-right"> </td>
                </tr>
                <tr valign="top">
                  <td>WalkIn</td>
                  <td className="text-right">{walkInCustomerDataLength}</td>
                  <td className="text-right">&nbsp;</td>
                </tr>
                <tr valign="top">
                  <td>Zomato</td>
                  <td className="text-right">&nbsp;</td>
                  <td className="text-right">&nbsp;</td>
                </tr>
                <tr valign="top">
                  <td>Swiggy</td>
                  <td className="text-right">&nbsp;</td>
                  <td className="text-right">&nbsp;</td>
                </tr>
                <tr>
                  <th>Total Invoice(s)</th>
                  <th className="text-right">{recentBookingLength}</th>
                  <th className="text-right">0</th>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </CCard>
    </>
  );
};
export default TotalPunchedInvoice;
