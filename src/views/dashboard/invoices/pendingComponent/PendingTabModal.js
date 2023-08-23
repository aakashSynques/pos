import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCardHeader,
  CLink,
  CCardBody,
  CCard,
  CButton,
  CModalFooter,
} from "@coreui/react";
import React from "react";
import { useState } from "react";
import Delivered from "../../invoices/bookingtables/Delivered";
import Pending from "../../invoices/bookingtables/Pending";
import Future from "../../invoices/bookingtables/Future";

function PendingTabModal({
  bookingModal,
  setBookingModal,
  pendingBooking,
  invoiceDetails,
}) {
  const [activeKey, setActiveKey] = useState(1);

  const getTodayPendingDeliuvery = () => {
    let todayPendingLength = [];

    pendingBooking.forEach(({ booking_json }) => {
      try {
        if (booking_json.cartSumUp.deliveryMode) {
          const deliveryMode = booking_json.cartSumUp.deliveryMode;
          if (deliveryMode.length > 0) {
            const pickUpTab = deliveryMode ? deliveryMode : null;
            todayPendingLength.push(pickUpTab);
          }
        }
      } catch (error) {
        console.error("Error parsing booking_json:", error);
      }
    });

    const filteredTodayDelivery = todayPendingLength.filter(Boolean);

    return filteredTodayDelivery; // Return the array of payMode values
  };
  const todayDelivery = getTodayPendingDeliuvery();

  return (
    <>
      <CModal
        size="xl"
        visible={bookingModal}
        onClose={() => setBookingModal(false)}
      >
        <CModalHeader onClose={() => setBookingModal(false)}>
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
                Today's Pending Delivery{" "}
                <span className="badge"> {todayDelivery.length}</span>
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
              <Pending
                pendingBooking={pendingBooking}
                invoiceDetails={invoiceDetails}
              />
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="profile-tab"
              visible={activeKey === 2}
            >
              <Delivered pendingBooking={pendingBooking} />
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="contact-tab"
              visible={activeKey === 3}
            >
              <Future pendingBooking={pendingBooking} />
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
}

export default PendingTabModal;
