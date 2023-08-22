import { CCardHeader, CLink, CCardBody, CCard } from "@coreui/react";
import React from "react";
const TotalPunchedInvoice = () => {
  return (
    <>
      <CCard className="invoice-card">
        <CCardHeader className="invoice-card">
          Total Punched Invoice(s)
          <CLink className="text-primary pull-right">
            <i className="fa fa-external-link fa-xs"></i>
          </CLink>
        </CCardHeader>
        <CCardBody>
          <div id="DB_RecentPunchedInvoice">
            <small className="text-danger">No, Invoices Punched..</small>
          </div>
        </CCardBody>
      </CCard>
    </>
  );
};
export default TotalPunchedInvoice;
