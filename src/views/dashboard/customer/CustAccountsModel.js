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
import React, { useState } from "react";
import GeneralAccount from "./AccountTab/GeneralAccount";

const CustAccountsModel = ({ visible, onClose }) => {
  const [activeKey, setActiveKey] = useState(1);

  return (
    <>
      {/* <CButton onClick={() => setAccountModel(!accountModel)}>
        Vertically centered modal
      </CButton> */}
      <CModal
        size="xl"
        style={{ marginLeft: "5%", marginRight: "5%" }}
        alignment="center"
        visible={visible}
        // onClose={() => setAccountModel(false)}
        onClose={onClose}
      >
        <CModalHeader>
          <CModalTitle>Account's of (user Name)</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer>
            <CRow>
              <CCol xs={2}>
                <CForm>
                  <CFormSelect
                    aria-label="Default select example"
                    style={{ marginBottom: "7%" }}
                    options={[
                      { label: "Entry Type", value: "1" },
                      { label: "Advance amount", value: "2" },
                    ]}
                  />

                  <CFormTextarea
                    id="exampleFormControlTextarea1"
                    rows={4}
                    placeholder="Narration"
                    style={{ marginBottom: "7%" }}
                  ></CFormTextarea>
                  <CFormInput
                    type="text"
                    id="exampleFormControlInput1"
                    placeholder="Amount"
                    style={{ marginBottom: "7%" }}
                  />
                  <CFormSelect
                    aria-label="Default select example"
                    style={{ marginBottom: "7%" }}
                    options={[
                      { label: "Mode", value: "1" },
                      { label: "Cash", value: "2" },
                      { label: "HDFC QR", value: "3" },
                      { label: "HDFC CC", value: "4" },
                      { label: "Plutus CC", value: "5" },
                      { label: "PayTm", value: "6" },
                      { label: "PhonePe", value: "7" },
                      { label: "Swiggy Dineout", value: "8" },
                      { label: "NEFT", value: "9" },
                      { label: "Cheque", value: "10" },
                    ]}
                  />
                  <CFormInput
                    type="text"
                    id="exampleFormControlInput1"
                    placeholder="Ref. Bank/Cheque/Card"
                    style={{ marginBottom: "2%" }}
                  />
                </CForm>
              </CCol>
              <CCol xs={10} style={{ borderLeft: "1px solid #bfc5ca" }}>
                <CNav variant="pills" role="tablist">
                  <CNavItem>
                    <CNavLink
                      active={activeKey === 1}
                      onClick={() => setActiveKey(1)}
                    >
                      General Account - <span className="badge"> 0</span>
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      active={activeKey === 2}
                      onClick={() => setActiveKey(2)}
                    >
                      Funds/ Expenses/ Purchase/ Bills -{" "}
                      <span className="badge"> 0</span>
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      active={activeKey === 3}
                      onClick={() => setActiveKey(3)}
                    >
                      Salary - <span className="badge"> 8</span>
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