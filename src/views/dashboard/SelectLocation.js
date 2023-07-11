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
              <h3 className="mb-0">M.P. Nagar</h3>
              <p className="mb-0">
                Jyoti Cineplex Compound, Zone-I, M.P. Nagar - Bhopal (M.P.)
              </p>
              <p className="mb-0">+91 755 4292222, 4075555</p>
            </div>
          </CButton>
          <CButton className="btn btn-secondary btn-default btn-block location-btn">
            <div>
              <h3 className="mb-0">New Market</h3>
              <p className="mb-0">
                Rangmahal Cineplex Compound, TT Nagar, New Market - Bhopal
                (M.P.)
              </p>
              <p className="mb-0">+91 755 4283333</p>
            </div>
          </CButton>
          <CButton className="btn btn-secondary btn-default btn-block location-btn">
            <div>
              <h3 className="mb-0">Lalghati</h3>
              <p className="mb-0">
                4, Alark Square, Lalghati Square - Bhopal (M.P.)
              </p>
              <p className="mb-0">+91 755 4294444</p>
            </div>
          </CButton>

          <CButton className="btn btn-secondary btn-default btn-block location-btn">
            <div>
              <h3 className="mb-0">Indore - Vijay Nagar</h3>
              <p className="mb-0">
                shop no 3 & 4 Griraj Grand, scheme no 54, Satya Sai Square,
                Vijay Nagar - Indore (M.P.)
              </p>
              <p className="mb-0">+91 731 4297575</p>
            </div>
          </CButton>

          <CButton className="btn btn-secondary btn-default btn-block location-btn">
            <div>
              <h3 className="mb-0">Gwalior - DB City Mall</h3>
              <p className="mb-0">
              T8, Food court, Third Floor, DB City Mall - Gwalior (M.P)
              </p>
              <p className="mb-0">+91 751 4924122</p>
            </div>
          </CButton>
        </CModalBody>
      </CModal>
    </>
  );
};
export default SelectLocation;
