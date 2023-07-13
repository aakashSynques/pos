import React from "react";
const RazorPay = () => {
  return (
    <>
      <table className="table table-bordered booking-or-table">
        <thead className="thead-light">
          <tr style={{ background: "#909090", color: "#ffffff" }}>
            <th width="10%">Book#</th>
            <th width="12%">Invoice# / Invoice Date</th>
            <th width="12%">Delivery Mode / DateTime</th>
            <th width="12%">Customer Name</th>
            <th width="8%">Items</th>
            <th width="8%"> Total</th>
            <th width="8%">Discount</th>
            <th width="8%">Delivery</th>
            <th width="8%">Tax</th>
            <th width="8%">Round Off</th>
            <th width="8%"> Total Amount</th>
            <th width="8%">Note</th>
            <th width="12%" colSpan="4">
              Action
              <tr>
                <th>Print|</th>
                <th>Edit|</th>
                <th>Return</th>
              </tr>
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
export default RazorPay;
