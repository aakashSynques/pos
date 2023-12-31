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
import { fetch } from "../../../utils";

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
      const headers = { Authorization: `Bearer ${token}` };
      const body = {
        outlet_id
      }
      const response = await fetch(
        "/api/order/return",
        "POST",
        body,
        headers
      );
      setReturnedOrders(response.data.returnedOrders);
      setLoading(false);
      setNetworkError(false);
    } catch (err) {
      // console.log(err);
      if (err.response.data.message == "No Returned Orders Found.") {
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
    getReturnInvoices();
  }, [outlet_id]);

  return (
    <>
      <CCard className="invoice-card">
        <CCardHeader className="invoice-card">
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
              <div className="text-danger medium-text font-size-2">No Returned Invoices..</div>
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
              <div className="text-danger medium-text font-size-2">
                Loading Returned Invoices..
              </div>
            </div>
          </CCardBody>
        )}

        {loading === false && networkError === false && (
          <div className="pending-booking">
            <table width="100%" className="table table-bordered ongoing mb-0">
              <tbody>
                {returnedOrders
                  .slice(0, 11)
                  .map(({ invoice_return_no, return_json }) => {
                    return (
                      <tr>
                        <td>
                          <Link to="" className="text-primary text-link">
                            {invoice_return_no}
                          </Link>
                          <br />
                          <small>
                            {return_json.selectedCustomerJson.customer_name &&
                              return_json.selectedCustomerJson
                                .customer_name}{" "}
                            ({return_json.selectedCustomerJson.mobile})
                          </small>
                        </td>
                        <td>
                          <label
                            style={{ fontWeight: "bold", textAlign: "right" }}
                          >
                            {" "}
                            &#8377; {return_json.cartSumUp.grandTotal}
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
          <CButton color="secondary" onClick={() => setReturns(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
export default ReturnInvoice;
