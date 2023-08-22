import React from "react";
import {
  CCardHeader,
  CLink,
  CCardBody,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CNav,
  CModal,
  CNavItem,
  CNavLink,
  CCard,
  CTabContent,
  CTabPane,
  CModalFooter,
  CButton,
} from "@coreui/react";
import OnGoingKotModel from "./OnGoingKotModel";
import { useState } from "react";

function OnGoingTabModal({ kotModal, setKotModal }) {
  const [activeKey, setActiveKey] = useState(1);

  return (
    <CModal size="lg" visible={kotModal} onClose={() => setKotModal(false)}>
      <CModalHeader onClose={() => setKotModal(false)}>
        <CModalTitle>
          Pending KOTs To Bill <span className="badge"> 0</span>
        </CModalTitle>
      </CModalHeader>

      <CModalBody>
        <CTabContent>
          <CTabPane
            role="tabpanel"
            aria-labelledby="home-tab"
            visible={activeKey === 1}
          >
            <OnGoingKotModel />
          </CTabPane>
        </CTabContent>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClose={() => setKotModal(false)}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default OnGoingTabModal;
