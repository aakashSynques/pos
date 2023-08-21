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
import AssignOutLet from "./AssignOutLet";
import DeliveryModeModal from "./DeliveryModeModal";

const OutletOptions = ({ outletName }) => {
  return (
    <>
      <div className="outlet-btn">
        <AssignOutLet />
        <DeliveryModeModal />
        <br /> 
        <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
          <b>New Sale</b>
          <p>[Shift + N]</p>
        </CButton>
        <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
          <b>Save Sale</b>
          <p>[Shift + S]</p>
        </CButton>
        <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
          <b>Panding Sale(s)</b>
          <p>[Shift + L]</p>
        </CButton>
        <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
          <b>Pending KOT(s)</b>
          <p>[Shift + K]</p>
        </CButton>
        <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
          <b>Recent Sale(s)</b>
          <p>[Shift + R]</p>
        </CButton>
        <CButton className="light-outlet" style={{ background: "#f0ad4e" }}>
          <b>Booking Sale</b>
          <p>[Shift + B]</p>
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
          <p>[Shift + Delete]</p>
        </CButton>
        <CButton className="light-outlet" style={{ background: "#d9534f" }}>
          <b>Discard Sale</b>
          <p>[Shift + Ctrl + Delete]</p>
        </CButton>
      </div>
    </>
  );
};

export default OutletOptions;
