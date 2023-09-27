// CounterSaleTable.js
import React from "react";

function CounterSaleTable({ salesData }) {
  return (
    <table className="table table-bordered border booking-or-table collection-table-style table-hover mode-2">
      <thead className="thead-light">
        <tr>
          <th width="5%">#</th>
          <th width="15%">Sales Date</th>
          <th width="25%">Customer Name</th>
          <th width="2%">Items</th>
          <th width="18%">Total Sale</th>
          <th>Note</th>
          <th width="12%" colspan="2">Action</th>
        </tr>
      </thead>
      <tbody>
        {salesData.map((sale, index) => (
          <tr key={index}>
            {/* Render Counter Sale data */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CounterSaleTable;
