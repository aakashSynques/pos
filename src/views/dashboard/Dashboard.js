import React, { useState, useEffect } from "react";
import { CCol, CContainer, CRow } from "@coreui/react";
import InvoicesListBox from "./InvoicesListBox";
import CustomerSection from "./CustomerSection";
import OutletSection from "./OutletSection";
// import OutletSelectionModal from "./OutletSelectionModal";
import SelectOutlets from "./SelectOutlets";

const Dashboard = () => {
 
  return (
    <div className="bg-light-1">
      {/* <SelectOutlets /> */}
      <CContainer>
        <CRow>
          <CCol sm={5} className="p-0">
            <InvoicesListBox />
          </CCol>
          <CCol sm={5}>
            <CustomerSection />
          </CCol>
          <CCol sm={2}>
              <OutletSection />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Dashboard;
