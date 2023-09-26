import React, { useState } from "react";
import {
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

function PendingSaleModal({ pendingButtonModal, setPendingButtonModal }) {
  const [activeKey, setActiveKey] = useState(1);
  
  




  return (
    <CModal
      onShow={() => false}
      size="lg"
      visible={pendingButtonModal}
      onClose={() => setPendingButtonModal(false)}
    >
      <CModalHeader>
        <CModalTitle>Pending Sales List</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CNav variant="pills" role="tablist">
          <CNavItem>
            <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
              Counter Sale <span className="badge"> 0</span>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
              On Table <span className="badge"> 0</span>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeKey === 3} onClick={() => setActiveKey(3)}>
              Pick UP <span className="badge"> 0</span>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeKey === 4} onClick={() => setActiveKey(4)}>
              Home Delivery <span className="badge"> 0</span>
            </CNavLink>
          </CNavItem>
        </CNav>

        <CTabContent>
          <CTabPane
            role="tabpanel"
            aria-labelledby="countersale"
            visible={activeKey === 1}
          >
            {/* <CounterSale recentBooking={recentBooking} /> */}
          </CTabPane>

          <CTabPane
            role="tabpanel"
            aria-labelledby="ontable"
            visible={activeKey === 2}
          >
            {/* <OnTable recentBooking={recentBooking} /> */}
          </CTabPane>

          <CTabPane
            role="tabpanel"
            aria-labelledby="pickup"
            visible={activeKey === 3}
          >
            {/* <PickUp recentBooking={recentBooking} /> */}
          </CTabPane>

          <CTabPane
            role="tabpanel"
            aria-labelledby="homedelivery"
            visible={activeKey === 4}
          >
            {/* <HomeDelivery recentBooking={recentBooking} /> */}
          </CTabPane>
        </CTabContent>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setPendingButtonModal(false)}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default PendingSaleModal;

