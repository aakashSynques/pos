import {
  CCardHeader,
  CLink,
  CCardBody,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CNav,
  CModal,
  CNavItem,
  CNavLink,
  CCard,
  CTabContent,
  CTabPane,
  CModalFooter,
  CButton,
} from "@coreui/react";
import React, { useState } from "react";
import OnGoingKotModel from "./OnGoingKotModel/OnGoingKotModel";
// import "../../../scss/_new.scss";
const OnGoingKot = () => {
  const [returns, setReturns] = useState(false);
  const [activeKey, setActiveKey] = useState(1);

  return (
    <>
      <CCard className="invoice-card">
        <CCardHeader className="invoice-card">
          OnGoing KOT(s)
          <CLink
            className="text-primary pull-right"
            onClick={() => setReturns(!returns)}
          >
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
      {/* ==============================Model start here================================== */}
      <CModal size="lg" visible={returns} onClose={() => setReturns(false)}>
        <CModalHeader onClose={() => setReturns(false)}>
          <CModalTitle>
            Pending KOTs To Bill <span className="badge"> 0</span>
          </CModalTitle>
        </CModalHeader>

        <CModalBody>
          <CTabContent>
            <CTabPane
              role="tabpanel"
              aria-labelledby="home-tab"
              visible={activeKey === 1}
            >
              <OnGoingKotModel />
            </CTabPane>
          </CTabContent>
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setReturns(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
export default OnGoingKot;
