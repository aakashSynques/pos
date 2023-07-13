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
import { outletsAllAssignedList } from "../../db/outlets.constant";

const SelectLocation = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true); // Show the modal when the component mounts
  }, []);

  const [data, setData] = useState(outletsAllAssignedList);

  return (
    <>
      <CModal size="sm" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>BNS - Outlets </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {data.map((item) => (
            <CButton  
              className="btn btn-block location-btn w-100"
              key={item.outlet_id}
            >
              <div>
                <h3 className="mb-0">{item.outlet_name}</h3>
                <p className="mb-0">{item.outlet_address}</p>
                <p className="mb-0">{item.outlet_contact_no}</p>
              </div>
            </CButton>
          ))}
        </CModalBody>
        
      </CModal>
    </>
  );
};
export default SelectLocation;
