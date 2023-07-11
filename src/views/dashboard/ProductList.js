import {
  CContainer,
  CRow,
  CCol,
  CCardHeader,
  CLink,
  CCardBody,
  CCard,
} from "@coreui/react";
import React from "react";
import SearchBar from "./SearchBar";
import RecentInvoice from "./invices/RecentInvoice";
import OnGoingKot from "./invices/OnGoingKot";
import ReturnInvoice from "./invices/ReturnInvoice";
import UpcomingBooking from "./invices/UpcomingBooking";
import TotalPunchedInvoice from "./invices/TotalPunchedInvoice";
import PendingBooking from "./invices/PendingBooking";
const ProductList = () => {
  return (
    <>
      <div className="product-search-section">
        <SearchBar />
        <CContainer className="category-list-box">
          <CRow>
            {/* Recent Invice section */}
            <CCol md="6" sm="6" xs="12" className="p-10">
              <RecentInvoice />
            </CCol>

            {/* on going kot section */}
            <CCol md="6" sm="6" xs="12" className="p-10">
              <OnGoingKot />
            </CCol>

            {/* Recent Return Invoice(s) section */}
            <CCol md="6" sm="6" xs="12" className="p-10">
              <ReturnInvoice />
            </CCol>

            {/* Upcoming Booking */}
            <CCol md="6" sm="6" xs="12" className="p-10">
              <UpcomingBooking />
            </CCol>

            {/* Total Punched Invoice(s) section */}
            <CCol md="6" sm="6" xs="12" className="p-10">
              <TotalPunchedInvoice />
            </CCol>

            {/* Pending Booking(s) section */}
            <CCol md="6" sm="6" xs="12" className="p-10">
              <PendingBooking />
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};
export default ProductList;
