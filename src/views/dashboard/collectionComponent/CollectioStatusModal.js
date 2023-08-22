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
import { useState } from "react";

function CollectioStatusModal({ collectionModal, setCollectionModal }) {
  //   const [collectionModal, setCollectionModal] = useState(false);
  const [activeKey, setActiveKey] = useState(1);

  return (
    <CModal
      size="lg"
      visible={collectionModal}
      onClose={() => setCollectionModal(false)}
    >
      <CModalHeader onClose={() => setCollectionModal(false)}>
        <CModalTitle>Today's Collection Summary</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <CTabContent>
          <CTabPane
            role="tabpanel"
            aria-labelledby="home-tab"
            visible={activeKey === 1}
          ></CTabPane>
        </CTabContent>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClose={() => setCollectionModal(false)}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default CollectioStatusModal;
