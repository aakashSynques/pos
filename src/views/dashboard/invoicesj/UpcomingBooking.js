import { CCardHeader, CLink, CCardBody, CCard } from "@coreui/react";
import React from "react";
const UpcomingBooking = () => {
  return (
    <>
      <CCard className="invoice-card">
        <CCardHeader className="invoice-card">
          Upcoming Booking
          <CLink className="text-primary pull-right">
            <i className="fa fa-external-link fa-xs"></i>
          </CLink>
        </CCardHeader>
        <CCardBody>
          <div>
            <small className="text-danger">No, Invoices Punched..</small>
          </div>
        </CCardBody>
      </CCard>
    </>
  );
};
export default UpcomingBooking;
