import { CCardHeader, CLink, CCardBody, CCard } from "@coreui/react";
import React from "react";
const OnGoingKot = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          OnGoing KOT(s)
          <CLink className="text-primary pull-right">
            <i className="fa fa-external-link fa-xs"></i>
          </CLink>
        </CCardHeader>

        <div>
          {/* <small className="text-danger">
                      No, Invoices Punched..
                    </small> */}
          <table
            width="100%"
            className="table table-bordered ongoing"
            style={{ fontSize: "11px" }}
          >
            <tbody>
              <tr style={{ background: "#efefef" }}>
                <th>Table No</th>
                <th>KOTs</th>
                <th>Amount</th>
              </tr>
              <tr>
                <td>
                  <b>
                    <a href="" className="text-primary text-link">
                      9
                    </a>
                  </b>
                </td>
                <td align="center">1</td>
                <td align="right">
                  <i className="fa fa-inr"></i> 336.00
                </td>
              </tr>
              <tr style={{ background: "#efefef" }}>
                <th colSpan="2" style={{ textAlign: "right" }}>
                  Total Amount &nbsp;
                </th>
                <th style={{ textAlign: "right" }}>
                  <i className="fa fa-inr"></i> 336.00
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </CCard>
    </>
  );
};
export default OnGoingKot;
