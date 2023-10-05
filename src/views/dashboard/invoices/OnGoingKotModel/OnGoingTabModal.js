import {
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModal,
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
    <CModal size="lg" visible={kotModal} onClose={() => setKotModal(false)} className="closing-table">
      <CModalHeader onClose={() => setKotModal(false)}>
        <CModalTitle>
          Pending KOTs To Bill <span className="badge"></span>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CTabContent>       
            <OnGoingKotModel />
        </CTabContent>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary"  onClick={() => setKotModal(false)}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default OnGoingTabModal;
