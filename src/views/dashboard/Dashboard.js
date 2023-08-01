import React, { useState, useEffect } from "react";
import { CCol, CContainer, CRow } from "@coreui/react";
import InvoicesListBox from "./InvoicesListBox";
import CustomerSection from "./CustomerSection";
import OutletSection from "./OutletSection";
import ProductsSearchBar from "./ProductsSearchBar";

const Dashboard = () => {
 
  return (
    <div className="bg-light-1">
      <CContainer>
        <CRow>
          <CCol sm={5} className="p-0">
            <ProductsSearchBar />
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
