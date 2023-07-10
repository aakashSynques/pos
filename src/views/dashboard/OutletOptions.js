import {
  CContainer,
  CRow,
  CCol,
  CCardHeader,
  CLink,
  CCardBody,
  CCard,
  CButton,
} from "@coreui/react";
import React from "react";
import SearchBar from "./SearchBar";
const OutletOptions = () => {
  return (
    <>
      <div className="outlet-btn">
        <CButton className="gray-outlet">
          <b>OUTLET</b> <br />
          <p className="" style={{ color: "green" }}>
            10 No. Market
          </p>
        </CButton>
        <CButton className="gray-outlet">
          <b>OUTLET</b> <br />
          <p className="" style={{ color: "green" }}>
            10 No. Market
          </p>
        </CButton>
        <br /> <br />
        <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
          <b>New Sale</b>
          <p></p>
        </CButton>
        <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
          <b>Save Sale</b>
          <p></p>
        </CButton>
        <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
          <b>Panding Sale(s)</b>
          <p></p>
        </CButton>
        <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
          <b>Pending KOT(s)</b>
          <p></p>
        </CButton>
        <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
          <b>Recent Sale(s)</b>
          <p></p>
        </CButton>
        <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
          <b>Booking Sale</b>
          <p></p>
        </CButton>
        <CButton
          className="light-outlet"
          style={{ background: "#fff", color: "#000" }}
        >
          <b>Collection Status</b>
        </CButton>
        <CButton
          className="light-outlet"
          style={{ background: "#fff", color: "#000" }}
        >
          <b>Expenses/Purchase Status</b>
        </CButton>
        <CButton className="light-outlet" style={{ background: "#d9534f" }}>
          <b>Clear Sale</b>
        </CButton>
        <CButton className="light-outlet" style={{ background: "#d9534f" }}>
          <b>Discard Sale</b>
        </CButton>
      </div>
    </>
  );
};

export default OutletOptions;
