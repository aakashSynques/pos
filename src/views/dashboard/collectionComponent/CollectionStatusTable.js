import React from "react";

function CollectionStatusTable(props) {
  return (
    <>
      <table className="table table-bordered booking-or-table">
        <thead className="thead-light">
          <tr style={{ background: "#909090", color: "#ffffff" }}>
            <th width="5%">Heads</th>
            <th width="5%">Booking(s)</th>
            <th width="5%">Invoice(s)</th>
            <th width="5%">Return Invoice(s)</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </>
  );
}

export default CollectionStatusTable;
