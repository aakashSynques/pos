import { CContainer, CRow, CCol } from "@coreui/react";
import React from "react";
import RecentInvoice from "./invoices/RecentInvoice";
import OnGoingKot from "./invoices/OnGoingKot";
import ReturnInvoice from "./invoices/ReturnInvoice";
import UpcomingBooking from "./invoices/UpcomingBooking";
import TotalPunchedInvoice from "./invoices/TotalPunchedInvoice";
import PendingBooking from "./invoices/PendingBooking";

const InvoicesListBox = () => {
  return (
    <>
      <div className="product-search-section">
        <CContainer className="category-list-box">
          <CRow>
            {/* Recent Invice section */}
            <CCol md="6" sm="6" xs="12" className="p-10">
              <RecentInvoice />
              {/* </CCol> */}

              {/* Recent Return Invoice(s) section */}
              {/* <CCol md="6" sm="6" xs="12" className="p-10"> */}
              <ReturnInvoice />
              {/* </CCol> */}

              {/* Total Punched Invoice(s) section */}
              <TotalPunchedInvoice />
            </CCol>

            {/* on going kot section */}
            <CCol md="6" sm="6" xs="12" className="p-10">
              <OnGoingKot />
              {/* </CCol> */}

              {/* Upcoming Booking */}
              {/* <CCol md="6" sm="6" xs="12" className="p-10"> */}
              <UpcomingBooking />
              {/* </CCol> */}

              {/* Pending Booking(s) section */}
              {/* <CCol md="6" sm="6" xs="12" className="p-10"> */}
              <PendingBooking />
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};
export default InvoicesListBox;
