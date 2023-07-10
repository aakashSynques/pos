import React, { useState, useEffect } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CFont,
} from "@coreui/react";

const SelectLocation = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true); // Show the modal when the component mounts
  }, []);
  return (
    <>
      {/* <CModal
              size="sm"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      > */}
      <CModal size="sm" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>BNS - Outlets </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CButton className="btn btn-secondary btn-default btn-block location-btn">
            <div>
              <h3 className="mb-0">10 No. Market</h3>
              <p className="mb-0">
                B - 1 &amp; 2, GM Tower, 10 No. Market, Arera Colony -
                Bhopal(M.P.)
              </p>
              <p className="mb-0">+91 755 4291111, 4076666</p>
            </div>
          </CButton>
          <CButton className="btn btn-secondary btn-default btn-block location-btn">
            <div>
              <h3 className="mb-0">10 No. Market</h3>
              <p className="mb-0">
                B - 1 &amp; 2, GM Tower, 10 No. Market, Arera Colony -
                Bhopal(M.P.)
              </p>
              <p className="mb-0">+91 755 4291111, 4076666</p>
            </div>
          </CButton>
          <CButton className="btn btn-secondary btn-default btn-block location-btn">
            <div>
              <h3 className="mb-0">10 No. Market</h3>
              <p className="mb-0">
                B - 1 &amp; 2, GM Tower, 10 No. Market, Arera Colony -
                Bhopal(M.P.)
              </p>
              <p className="mb-0">+91 755 4291111, 4076666</p>
            </div>
          </CButton>
          <CButton className="btn btn-secondary btn-default btn-block location-btn">
            <div>
              <h3 className="mb-0">10 No. Market</h3>
              <p className="mb-0">
                B - 1 &amp; 2, GM Tower, 10 No. Market, Arera Colony -
                Bhopal(M.P.)
              </p>
              <p className="mb-0">+91 755 4291111, 4076666</p>
            </div>
          </CButton>
          <CButton className="btn btn-secondary btn-default btn-block location-btn">
            <div>
              <h3 className="mb-0">10 No. Market</h3>
              <p className="mb-0">
                B - 1 &amp; 2, GM Tower, 10 No. Market, Arera Colony -
                Bhopal(M.P.)
              </p>
              <p className="mb-0">+91 755 4291111, 4076666</p>
            </div>
          </CButton>
        </CModalBody>
      </CModal>
    </>
  );
};
export default SelectLocation;
