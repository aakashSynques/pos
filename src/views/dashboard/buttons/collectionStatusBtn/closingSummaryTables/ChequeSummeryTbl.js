import React from "react";

const ChequeSummeryTbl = () => {
  return (
    <>
      {" "}
      <h6>
        <b>Cheque Summary</b>
      </h6>
      <table className="table table-bordered collection-table-style table-hover mode-2">
        <thead>
          <tr>
            <th width="40%" className="bg-light table-titlse-style">
              Customer Name
            </th>
            <th width="20%" className="bg-light table-titlse-style">
              Cheque#
            </th>
            <th width="40%" className="bg-light table-titlse-style">
              Amount(s)
            </th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </>
  );
};

export default ChequeSummeryTbl;
