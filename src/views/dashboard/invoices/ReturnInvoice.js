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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import axios from "axios";

const ReturnInvoice = () => {
  const [returnedOrders, setReturnedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const [returns, setReturns] = useState(false);
  const [activeKey, setActiveKey] = useState(1);

  const outlet_id = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );
  const getReturnInvoices = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      console.log(outlet_id);
      setLoading(true);
      const response = await axios.post(
        "http://posapi.q4hosting.com/api/order/return",
        { outlet_id },
        { headers }
      );
      setReturnedOrders(response.data.returnedOrders);
      console.log(response);
      setLoading(false);
      setNetworkError(false);
    } catch (err) {
      console.log(err);
      if (err.response.data.message == "No Returned Orders Found.") {
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
    getReturnInvoices();
  }, [outlet_id]);

  return (
    <>
      <CCard>
        <CCardHeader>
          Recent Return Invoice(s)
          <CLink
            className="text-primary pull-right"
            onClick={() => setReturns(!returns)}
          >
            <i className="fa fa-external-link fa-xs"></i>
          </CLink>
        </CCardHeader>
        {/* <CCardBody> */}

        {networkError === true && (
          <CCardBody style={{ display: "flex" }}>
            <div>
              <medium className="text-danger">No Returned Invoices..</medium>
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
                Loading Returned Invoices..
              </medium>
            </div>
          </CCardBody>
        )}

        {loading === false && networkError === false && (
          <div className="pending-booking">
            <table width="100%" className="table table-bordered ongoing">
              <tbody>
                {returnedOrders
                  .slice(0, 11)
                  .map(({ invoice_return_no, eat, return_json, outlet_id }) => {
                    let returnInvoiceJson = null;

                    try {
                      returnInvoiceJson = JSON.parse(return_json);
                    } catch (error) {
                      // Handle the JSON parsing error, if needed
                      console.error("Error parsing return_json:", error);
                    }
                    return (
                      <tr>
                        <td>
                          <Link to="" className="text-primary text-link">
                            {invoice_return_no}
                          </Link>
                          <br />
                          <small>
                            {returnInvoiceJson.selectedCustomerJson
                              .customer_name &&
                              returnInvoiceJson.selectedCustomerJson
                                .customer_name}{" "}
                            ({returnInvoiceJson.selectedCustomerJson.mobile})
                          </small>
                        </td>
                        <td>
                          <label
                            style={{ fontWeight: "bold", textAlign: "right" }}
                          >
                            {" "}
                            &#8377; {returnInvoiceJson.cartSumUp.grandTotal}
                          </label>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
        {/* </CCardBody> */}
      </CCard>

      {/* Returned orders modal */}

      <CModal size="xl" visible={returns} onClose={() => setReturns(false)}>
        <CModalHeader onClose={() => setReturns(false)}>
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
                Today'sReturned Orders <span className="badge"> 20</span>
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
              {/* <Pending /> */}
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="profile-tab"
              visible={activeKey === 2}
            >
              {/* <Delivered /> */}
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="contact-tab"
              visible={activeKey === 3}
            >
              {/* <Future /> */}
            </CTabPane>
          </CTabContent>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClose={() => setReturns(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
export default ReturnInvoice;
