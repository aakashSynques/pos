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
  
  const Delivered = () => {
    return (
      <>
       <table className="table table-bordered booking-or-table">
        <thead className="thead-light">
          <tr style={{ background: "#909090", color: "#ffffff" }}>
            <th width="12%">Book# </th>
            <th width="12%">Delivery Mode</th>
            <th width="15%">Customer Name</th>
            <th width="20%">Receiver Name</th>
            <th width="10%">Items</th>
            <th width="10%">Order Amount</th>
            <th width="12%">Advance</th>
            <th width="8%">Due Balance</th>
            <th width="10%" colSpan="4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
              <center className="text-center">NO data Found</center>
        </tbody>
      </table>


        </>
  );
};
export default Delivered;
