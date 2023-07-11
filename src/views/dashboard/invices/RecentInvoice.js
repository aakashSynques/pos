import { CCardHeader, CLink, CCardBody, CCard,  CModal,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CModalBody,
  CNavItem,
  CNav,
  CNavLink,
  CTabContent,
  CTabPane, CButton } from "@coreui/react";
import React, { useState} from "react";
import CounterSale from "./recentsale/CounterSale";
const RecentInvoice = () => {
  const [booking, setBooking] = useState(false);
  const [activeKey, setActiveKey] = useState(1);
  return (
    <>
      <CCard>
        <CCardHeader>
          Recent Invoice(s)
          <CLink className="text-primary pull-right"  onClick={() => setBooking(!booking)}>
            <i className="fa fa-external-link fa-xs"></i>
          </CLink>
        </CCardHeader>
        <CCardBody>
          <div id="DB_RecentPunchedInvoice">
            <small className="text-danger">No, Invoices Punched..</small>
          </div>
        </CCardBody>
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
                Counter Sale  <span class="badge"> 0</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                On Table <span class="badge"> 0</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 3}
                onClick={() => setActiveKey(3)}
              >
                Pick UP <span class="badge"> 8</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 4}
                onClick={() => setActiveKey(4)}
              >
                Home Delivery <span class="badge"> 0</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 5}
                onClick={() => setActiveKey(5)}
              >
               Razorpay <span class="badge"> 0</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 6}
                onClick={() => setActiveKey(6)}
              >
               Zometo <span class="badge"> 0</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 7}
                onClick={() => setActiveKey(7)}
              >
               Swiggy<span class="badge"> 0</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeKey === 5}
                onClick={() => setActiveKey(5)}
              >
               Return Bills <span class="badge"> 0</span>
              </CNavLink>
            </CNavItem>
          </CNav>



          <CTabContent>
            <CTabPane
              role="tabpanel"
              aria-labelledby="home-tab"
              visible={activeKey === 1}
            >
              <CounterSale />
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="profile-tab"
              visible={activeKey === 2}
            >
              tab 2
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="contact-tab"
              visible={activeKey === 3}
            >
        =tab 3
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
