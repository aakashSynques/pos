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

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RecentPrintModal from "./RecentPrintModal";
import RecentTabModal from "./RecentTabModal";
import useFetch from "../../../custom hooks/useFetch";
// import { setPrototypeOf } from "core-js/core/object";

const RecentInvoice = () => {
  const [booking, setBooking] = useState(false);
 
  const [printBooking, setPrintBooking] = useState(false);

  const outlet_id = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );

  const  { recentBooking, loading, networkError }=useFetch("http://posapi.q4hosting.com/api/order/recent",outlet_id)

  const [invoiceDetails, setInvoiceDetails] = useState();

  const clickInvoiceLink = (invoice_no, sales_json) => {
    setPrintBooking(!printBooking);
    setInvoiceDetails({ [invoice_no]: sales_json });
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
                  .map(({ invoice_no, sales_json }) => {
                    return (
                      <tr>
                        <td>
                          {sales_json.cartSumUp.deliveryMode == "1" ? (
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
                          ) : sales_json.cartSumUp.deliveryMode == "2" ? (
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
                          ) : sales_json.cartSumUp.deliveryMode == "3" ? (
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
                          ) : sales_json.cartSumUp.deliveryMode == "4" ? (
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
                              clickInvoiceLink(invoice_no, sales_json)
                            }
                          >
                            {invoice_no}
                            <br />
                          </Link>
                          <small>
                            {sales_json.selectedCustomerJson.customer_name}(
                            {sales_json.selectedCustomerJson.mobile})
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
                            {Number(sales_json.cartSumUp.grandTotal).toFixed(2)}
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
                  })}
              </tbody>
            </table>
          </div>
        )}
      </CCard>
      <RecentTabModal
        booking={booking}
        setBooking={setBooking}
        recentBooking={recentBooking}
      />
      <RecentPrintModal
        printBooking={printBooking}
        setPrintBooking={setPrintBooking}
        invoiceDetails={invoiceDetails}
      />
    </>
  );
};
export default RecentInvoice;
