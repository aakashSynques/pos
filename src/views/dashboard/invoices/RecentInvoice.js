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
import CounterSale from "./recentsale/CounterSale";
import OnTable from "./recentsale/OnTable";
import PickUp from "./recentsale/PickUp";
import HomeDelivery from "./recentsale/HomeDelivery";
import RazorPay from "./recentsale/RazorePay";
import Zometo from "./recentsale/Zometo";
import Swiggy from "./recentsale/Swiggy";
import ReturnBIll from "./recentsale/ReturnBIll";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RecentInvoice = () => {
  const [booking, setBooking] = useState(false);
  const [recentBooking, setRecentBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  // console.log(recentBooking, "32");

  const [activeKey, setActiveKey] = useState(1);

  const outlet_id = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );
  // console.log(outlet_id, "49");
  // useEffect(() => {
  //   const pos_token = localStorage.getItem("pos_token");
  //   // console.log(pos_token, "35");

  //   fetch("http://localhost:1000/api/school/pos", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: `Bearer ${pos_token}`,
  //     },
  //     body: JSON.stringify({ outlet_id }),
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // console.log(data.get_recent_data, "45");
  //       setRecentBooking(data.get_recent_data);
  //     })
  //     .catch((error) => {
  //       console.error("something wrong:", error);
  //     });
  // }, [outlet_id]);

  const getAllRecentInvoices = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      // console.log(outlet_id);
      setLoading(true);
      const response = await axios.post(
        "http://posapi.q4hosting.com/api/order/recent",
        { outlet_id },
        { headers }
      );
      setRecentBooking(response.data.recentOrders);

      // console.log(response);
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
  useEffect(() => {
    getAllRecentInvoices();
  }, [outlet_id]);

  return (
    <>
      <CCard>
        <CCardHeader>
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
            <div>
              <medium className="text-danger">No Recent Invoices..</medium>
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
              <medium className="text-danger">Loading Recent Invoices..</medium>
            </div>
          </CCardBody>
        )}

        {loading === false && networkError === false && (
          <div id="DB_RecentPunchedInvoice">
            <table width="100%" className="table table-bordered ongoing">
              <tbody>
                {recentBooking
                  .slice(0, 10)
                  .map(
                    ({
                      invoice_no,
                      eat,
                      sales_json,
                      outlet_id,
                      customer_name,
                    }) => {
                      let parsedSalesJson = null;

                      try {
                        parsedSalesJson = JSON.parse(sales_json);
                      } catch (error) {
                        // Handle the JSON parsing error, if needed
                        console.error("Error parsing sales_json:", error);
                      }
                      const total = Number(
                        parsedSalesJson.cartSumUp.grandTotal
                      );
                      // console.log(parsedSalesJson);
                      // console.log(parsedSalesJson.cartSumUp.grandTotal, "135");
                      return (
                        <tr>
                          <td>
                            {parsedSalesJson.cartSumUp.deliveryMode == "1" ? (
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
                            ) : parsedSalesJson.cartSumUp.deliveryMode ==
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
                            ) : parsedSalesJson.cartSumUp.deliveryMode ==
                              "3" ? (
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
                            ) : parsedSalesJson.cartSumUp.deliveryMode ==
                              "4" ? (
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
                            <Link to="" className="text-primary text-link">
                              {invoice_no}
                              <br />
                            </Link>
                            <small>
                              {
                                parsedSalesJson.selectedCustomerJson
                                  .customer_name
                              }
                              ({parsedSalesJson.selectedCustomerJson.mobile})
                            </small>
                          </td>
                          <td
                            style={{
                              fontWeight: "bold",
                              color: "black",
                            }}
                          >
                            <bold>
                              <span
                                style={{
                                  paddingRight: "3px",
                                }}
                              >
                                &#8377;
                              </span>
                              {total.toFixed(2)}
                            </bold>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#f0ad4e"
                              viewBox="0 0 66 66"
                              stroke="#333"
                            >
                              <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>
        )}
      </CCard>

      <CModal size="xl" visible={booking} onClose={() => setBooking(false)}>
        <CModalHeader onClose={() => setBooking(false)}>
          <CModalTitle>Recent Sales List</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CNav variant="pills" role="tablist">
            <CNavItem>
              <CNavLink
                active={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                Counter Sale <span className="badge"> 0</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                On Table <span className="badge"> 0</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 3}
                onClick={() => setActiveKey(3)}
              >
                Pick UP <span className="badge"> 8</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 4}
                onClick={() => setActiveKey(4)}
              >
                Home Delivery <span className="badge"> 0</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 5}
                onClick={() => setActiveKey(5)}
              >
                Razorpay <span className="badge"> 0</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 6}
                onClick={() => setActiveKey(6)}
              >
                Zometo <span className="badge"> 0</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 7}
                onClick={() => setActiveKey(7)}
              >
                Swiggy<span className="badge"> 0</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 8}
                onClick={() => setActiveKey(8)}
              >
                Return Bills <span className="badge"> 0</span>
              </CNavLink>
            </CNavItem>
          </CNav>

          <CTabContent>
            <CTabPane
              role="tabpanel"
              aria-labelledby="countersale"
              visible={activeKey === 1}
            >
              <CounterSale />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="ontable"
              visible={activeKey === 2}
            >
              <OnTable />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="pickup"
              visible={activeKey === 3}
            >
              <PickUp />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="homedelivery"
              visible={activeKey === 4}
            >
              <HomeDelivery />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="razorpay"
              visible={activeKey === 5}
            >
              <RazorPay />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="zomoto"
              visible={activeKey === 6}
            >
              <Zometo />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="swiggy"
              visible={activeKey === 7}
            >
              <Swiggy />
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="returnbill"
              visible={activeKey === 8}
            >
              <ReturnBIll />
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
export default RecentInvoice;
