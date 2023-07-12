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
import React, { useState } from "react";
import CounterSale from "./recentsale/CounterSale";
import OnTable from "./recentsale/OnTable";
import PickUp from "./recentsale/PickUp";
import HomeDelivery from "./recentsale/HomeDelivery";
import RazorPay from "./recentsale/RazorePay";
import Zometo from "./recentsale/Zometo";
import Swiggy from "./recentsale/Swiggy";
import ReturnBIll from "./recentsale/ReturnBIll";

const RecentInvoice = () => {
  const [booking, setBooking] = useState(false);
  const [activeKey, setActiveKey] = useState(1);
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
