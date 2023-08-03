import { CButton, CModal, CModalBody, CModalHeader, CModalFooter, CModalTitle } from "@coreui/react";
import React, { useState} from "react";

const CustAccountsModel = ({ 
  visible,
  onClose
}) => {
  
  return (
      <>
      {/* <CButton onClick={() => setAccountModel(!accountModel)}>
        Vertically centered modal
      </CButton> */}
      <CModal
        size="lg"
        alignment="center"
        visible={visible}
        // onClose={() => setAccountModel(false)}
        onClose={onClose}
      >
        <CModalHeader>
          <CModalTitle>Account's of (user Name)</CModalTitle>
        </CModalHeader>
        <CModalBody>
       
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setAccountModel(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default CustAccountsModel;
