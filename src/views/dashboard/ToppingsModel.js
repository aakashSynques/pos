import React, { useState, useEffect } from "react";
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from "@coreui/react";

const ToppingsModel = () => {
  const [toppingModel, setToppingModel] = useState(false);
  return (
    <div>
      {/* Toppings model */}
      <CModal size="lg" visible={toppingModel} onClose={() => setToppingModel(false)}>
        <CModalHeader onClose={() => setToppingModel(false)}>
          <CModalTitle>Apply Toppings</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="toppings-btn-style">
            {/* Your toppings data rendering code here */}
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setToppingModel(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default ToppingsModel;
