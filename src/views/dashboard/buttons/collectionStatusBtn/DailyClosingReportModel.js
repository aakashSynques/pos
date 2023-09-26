import React, { useState } from "react";
import {
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModal,
  CModalFooter,
  CButton,
  CRow,
  CCol,
} from "@coreui/react";
import CashDenominationTbl from "./closingSummaryTables/CashDenominationTbl";
import CollectionSummeryTbl from "./closingSummaryTables/CollectionSummeryTbl";
import BillsSummeryTble from "./closingSummaryTables/BillsSummeryTble";
import CurrentDate from "../../../../components/CurrentDate";

const DailyClosingReportModel = ({
  reportModelVisible,
  setReportModelVisible,
}) => {
  return (
    <div className="closing-table">
      <CModal
        visible={reportModelVisible}
        onClose={() => setReportModelVisible(false)}
        keyboard={true}
        size="lg"
        className="closing-table"
      >
        <CModalHeader onClose={() => setReportModelVisible(false)}>
          <CModalTitle>
            Today's Closing Summary ' <CurrentDate /> '
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            {/* Cash Denomination Table component */}
            <CashDenominationTbl />
            {/* Collection Summary table componet */}
            <CollectionSummeryTbl />

            <CCol sm={4}>
              <BillsSummeryTble />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton className="btn btn-sm btn-success ">
            <span className="badge text-success bg-white">
              <i className="fa fa-plus"></i>
            </span>{" "}
            {""}
            Submit Closing Sheet
          </CButton>
          <CButton
            className="btn btn-sm btn-light border"
            onClick={() => setReportModelVisible(false)}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default DailyClosingReportModel;
