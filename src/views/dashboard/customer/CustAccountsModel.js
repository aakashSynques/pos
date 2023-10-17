import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CForm,
  CFormSelect,
  CFormInput,
  CFormTextarea,
  CNav,
  CNavItem,
  CNavLink,
  CContainer,
  CRow,
  CCol,
  CTabContent,
  CTabPane,
  CHeader,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import GeneralAccount from "./AccountTab/GeneralAccount";
import CustCreditRecoveryForm from "./CustCreditRecoveryForm";

const CustAccountsModel = ({
  accountModel,
  setAccountModel,
  custAccountData,
  setCustAccountData,
  selectedCustomer,
}) => {
  const [activeKey, setActiveKey] = useState(1);
  // console.log(selectedCustomer, "33");

  return (
    <>
      {/* <CButton onClick={() => setAccountModel(!accountModel)}>
        Vertically centered modal
      </CButton> */}
      <CModal
        size="xl"
        visible={accountModel}
        onClose={() => setAccountModel(!accountModel)}
      >
        <CModalHeader className="pt-3 pb-3">
          <CModalTitle className="font-size-2">
            Account's of{" "}
            <span className="text-primary">
              <span style={{ fontWeight: "bold" }}>
                {selectedCustomer && selectedCustomer.json.customer_name}{" "}
              </span>
              <small>
                ({selectedCustomer && selectedCustomer.json.mobile})
              </small>
            </span>
          </CModalTitle>
          <CButton
            className="pt-0 pb-0 m-2 rounded-1 font-size-2"
            style={{ background: "#26B99A", border: "none", fontSize: "12px" }}
          >
            Wallet Balance <span className="badge">0</span>
          </CButton>
        </CModalHeader>

        <CModalBody>
          <CContainer>
            <CRow>
              <CCol xs={2}>
                {/* account credit recovery form    */}
                  <CustCreditRecoveryForm />
              </CCol>

              {/* account tabs */}
              <CCol xs={10} className="cust-ac-model ">
                <CNav variant="pills" role="tablist">
                  <CNavItem>
                    <CNavLink
                      active={activeKey === 1}
                      onClick={() => setActiveKey(1)}
                    >
                      General Account
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      active={activeKey === 2}
                      onClick={() => setActiveKey(2)}
                    >
                      Funds/ Expenses/ Purchase/ Bills{" "}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      active={activeKey === 3}
                      onClick={() => setActiveKey(3)}
                    >
                      Salary
                    </CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane
                    role="tabpanel"
                    aria-labelledby="countersale"
                    visible={activeKey === 1}
                  >
                    <GeneralAccount />
                  </CTabPane>

                  <CTabPane
                    role="tabpanel"
                    aria-labelledby="ontable"
                    visible={activeKey === 2}
                  >
                    <GeneralAccount />
                  </CTabPane>

                  <CTabPane
                    role="tabpanel"
                    aria-labelledby="pickup"
                    visible={activeKey === 3}
                  >
                    <GeneralAccount />
                  </CTabPane>
                </CTabContent>
              </CCol>
            </CRow>
          </CContainer>
        </CModalBody>

        <CModalFooter className="pt-2 pb-2">
          <CButton
            className="btn-sm rounded-1 btn-default"
            onClick={() => setAccountModel(false)}
          >
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default CustAccountsModel;
