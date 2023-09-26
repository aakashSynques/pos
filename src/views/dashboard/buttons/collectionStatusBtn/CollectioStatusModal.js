import React from "react";
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
  CRow,
  CContainer,
  CCol,
} from "@coreui/react";
import { useState } from "react";
import CollectionStatusTableLHS from "./CollectionStatusTableLHS";
import PaymodeSectionRHS from "./PaymodeSectionRHS";
import DailyClosingReportModel from "./DailyClosingReportModel";
import StaffAttendanceModel from "./StaffAttendanceModel";

function CollectioStatusModal({ collectionModal, setCollectionModal }) {
  const [reportModelVisible, setReportModelVisible] = useState(false);

  const closeModal = () => {
    setCollectionModal(false);
  };
  const openReportModel = () => {
    setReportModelVisible(true); // Open the DailyClosingReportModel modal
  };

  return (
    <>
      <CModal
        size="xl"
        visible={collectionModal}
        onClose={closeModal}
        backdrop="static"
      >
        <CModalHeader onClose={closeModal}>
          <CModalTitle>Today's Collection Summary</CModalTitle>
        </CModalHeader>
        <CContainer>
          <CRow className="py-3">
            <CCol xs={4} className="text-start">
              <CollectionStatusTableLHS />
            </CCol>

            <CCol xs={8} className="text-start ">
              <PaymodeSectionRHS />
            </CCol>
          </CRow>
        </CContainer>

        <CModalFooter>
          <CContainer>
            <CRow>
              <CCol xs={6} className="text-start">
                {/* <CButton
                  color="warning pl-2 pr-2 py-1 text-white rounded-1"
                  style={{ fontSize: "15px" }}
                  

                >
                  <span className="badge bg-white text-warning">
                    <i className="fa fa-tasks"></i>
                  </span>{" "}
                  Mark Attendance
                </CButton>{" "} */}
                <StaffAttendanceModel />
                &nbsp;&nbsp;
                <CButton
                  color="primary pl-2 pr-2 py-1 text-white rounded-1"
                  style={{ backgroundColor: "#1A82C3", fontSize: "15px" }}
                  onClick={openReportModel} // Call the openReportModel function
                >
                  <span className="badge bg-white text-success">
                    <i className="fa fa-file-text-o"></i>
                  </span>{" "}
                  Generate Daily Outlet Closing Report
                </CButton>
              </CCol>

              <CCol xs={6} className="text-end ">
                <CButton color="secondary p-1" onClick={closeModal}>
                  Close
                </CButton>
              </CCol>
            </CRow>
          </CContainer>
        </CModalFooter>
      </CModal>

      <DailyClosingReportModel
        reportModelVisible={reportModelVisible}
        setReportModelVisible={setReportModelVisible}
      />
    </>
  );
}

export default CollectioStatusModal;
