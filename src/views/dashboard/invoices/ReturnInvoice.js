import { CCardHeader, CLink, CCardBody, CCard } from "@coreui/react";
import React from "react";
const ReturnInvoice = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          Recent Return Invoice(s)
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
export default ReturnInvoice;
