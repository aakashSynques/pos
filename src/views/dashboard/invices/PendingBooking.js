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
import React, { useState } from "react";
import Pendding from "./bookingtables/Delivered";
import Pending from "./bookingtables/Pending";
import Delivered from "./bookingtables/Delivered";
import Future from "./bookingtables/Future";
const PendingBooking = () => {
  const [booking, setBooking] = useState(false);
  const [activeKey, setActiveKey] = useState(1);
  return (
    <>
      <CCard>
        <CCardHeader>
          Pending Booking(s)
          <CLink
            className="text-primary pull-right"
            onClick={() => setBooking(!booking)}
          >
            <i className="fa fa-external-link fa-xs"></i>
          </CLink>
        </CCardHeader>
        {/* <div>
            <small className="text-danger">No, Invoices Punched..</small>
          </div> */}
        <div className="pending-booking">
          <table width="100%" className="table table-bordered ongoing">
            <tbody>
              <tr>
                <td>
                  <a href="" className="text-primary text-link">
                    BNS/B2/2324/1351
                  </a>
                  <br />
                  MANISH BAGGA<small> (9425600163)</small>
                </td>
                <td>
                  <label
                    className="status-btn text-white"
                    style={{ backgroundColor: "#1A82C3" }}
                  >
                    PickUp
                  </label>
                  <br />
                  2023-06-07
                  <br />
                  11:00 AM
                </td>
              </tr>

              <tr>
                <td>
                  <a href="" className="text-primary text-link">
                    BNS/B2/2324/1351
                  </a>
                  <br />
                  ANGC GRP INDIA PRIVATE LIMITED<small> (9425600163)</small>
                </td>
                <td>
                  <label
                    className="status-btn text-white"
                    style={{ backgroundColor: "red" }}
                  >
                    Delivery
                  </label>
                  <br />
                  2023-06-07
                  <br />
                  11:00 AM
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
                Today's Pending Delivery <span class="badge"> 20</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                Today's Delivered Booking <span class="badge"> 0</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 3}
                onClick={() => setActiveKey(3)}
              >
                Future Booking(s) <span class="badge"> 8</span>
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
