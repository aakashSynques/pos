import React from "react";

function CollectionStatusTablePayMode(props) {
  return (
    <>
      <table className="table table-bordered booking-or-table">
        <thead className="thead-light">
          <tr style={{ background: "#909090", color: "#ffffff" }}>
            <th width="5%">Pay Mode</th>
            <th width="5%">Total</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </>
  );
}

export default CollectionStatusTablePayMode;
