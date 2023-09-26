import React from "react";
import ExtraDiscription from "./ExtraDiscription";

const BillsSummeryTble = () => {
  return (
    <>
      <h6>
        <b>Bills Summary</b>
      </h6>
      <table className="table table-bordered collection-table-style table-hover mode-2">
        <thead>
          <tr>
            <th width="40%" className="bg-light table-titlse-style">
              PAID
            </th>
            <th width="20%" className="bg-light table-titlse-style">
              Voucher(s)
            </th>
            <th width="40%" className="bg-light table-titlse-style">
              Amount(s)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>Expences</b>
            </td>
            <td>-</td>
            <td className="text-end">-</td>
          </tr>
          <tr>
            <td>
              <b>Purchses</b>
            </td>
            <td>-</td>
            <td className="text-end">-</td>
          </tr>

          <tr>
            <td colSpan={3}>
              {" "}
              <br />
            </td>
          </tr>

          {/* section ll         */}
          <tr>
            <th width="40%" className="bg-light table-titlse-style">
              Credit
            </th>
            <th width="20%" className="bg-light table-titlse-style">
              Voucher(s)
            </th>
            <th width="40%" className="bg-light table-titlse-style">
              Amount{" "}
            </th>
          </tr>
          <tr>
            <td>
              <b>Expences</b>
            </td>
            <td>-</td>
            <td className="text-end">-</td>
          </tr>
          <tr>
            <td>
              <b>Purchses</b>
            </td>
            <td>-</td>
            <td className="text-end">-</td>
          </tr>

          <tr>
            <td colSpan={3}>
              {" "}
              <br />
            </td>
          </tr>

          {/* section llL         */}
          <tr>
            <th width="40%" className="bg-light table-titlse-style">
              Extra{" "}
            </th>
            <th width="20%" className="bg-light table-titlse-style">
              Voucher(s)
            </th>
            <th width="40%" className="bg-light table-titlse-style">
              Amount{" "}
            </th>
          </tr>
          <tr>
            <td>
              <b>Advance Salary </b>
            </td>
            <td>-</td>
            <td className="text-end">-</td>
          </tr>
        </tbody>
      </table>

      <ExtraDiscription />
    </>
  );
};

export default BillsSummeryTble;
