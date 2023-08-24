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
import CollectionStatusTable from "./CollectionStatusTable";
import CollectionStatusTablePayMode from "./CollectionStatusTablePayMode";

function CollectioStatusModal({ collectionModal, setCollectionModal }) {
  //   const [collectionModal, setCollectionModal] = useState(false);
  const [activeKey, setActiveKey] = useState(1);

  return (
    <CModal
      size="xl"
      visible={collectionModal}
      onClose={() => setCollectionModal(false)}
    >
      <CModalHeader onClose={() => setCollectionModal(false)}>
        <CModalTitle>Today's Collection Summary</CModalTitle>
      </CModalHeader>
      {/* 
      <CModalBody>
        <CTabContent>
          <CTabPane
            role="tabpanel"
            aria-labelledby="home-tab"
            visible={activeKey === 1}
          ></CTabPane>
        </CTabContent>
      </CModalBody> */}
      <CContainer>
        <CRow>
          <CCol xs={4} className="text-start">
            <CollectionStatusTable />
          </CCol>

          <CCol xs={8} className="text-start ">
            <CollectionStatusTablePayMode />
          </CCol>
        </CRow>
      </CContainer>

      <CModalFooter>
        <CContainer>
          <CRow>
            <CCol xs={3} className="text-start">
              <CButton color="warning p-1">
                <span className="badge bg-white text-warning">
                  <i className="fa fa-tasks"></i>
                </span>{" "}
                Mark Attendance
              </CButton>
            </CCol>

            <CCol xs={6} className="text-start ">
              <CButton color="info p-1">
                <span className="badge bg-white text-success">
                  <i className="fa fa-file-text-o"></i>
                </span>{" "}
                Generate Daily Outlet Closing Report
              </CButton>
            </CCol>

            <CCol xs={3} className="text-end ">
              <CButton color="secondary p-1">Close</CButton>
            </CCol>
          </CRow>
        </CContainer>
      </CModalFooter>
    </CModal>
  );
}

export default CollectioStatusModal;
