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
import { fetch } from "../../utils";

const AssignOutLet = () => {
  const [outletmodel, setOutletmodel] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState(null); // Track the selected outlet
  const [outletList, setOutletList] = useState([]); // api data

  const [data, setData] = useState(outletsAllAssignedList);

  const handleSelectOutlet = (outlet) => {
    setSelectedOutlet(outlet); // Set the selected outlet
    setOutletmodel(false); // Close the modal
  };

  const getOutletList = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch("/api/outlets/all", "get", null, headers);
      setOutletList(response.data.allOutlets);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getOutletList();
  }, []);

  return (
    <>
      <CButton
        className="gray-outlet"
        onClick={() => setOutletmodel(!outletmodel)}
      >
        <b>OUTLET</b> <br />{" "}
        {selectedOutlet && (
          <div>
            <p>{selectedOutlet.outlet_name}</p>
          </div>
        )}
        <p className="" style={{ color: "green" }}>
          {/* {outletName} */}
        </p>
      </CButton>

      <CModal
        size="sm"
        visible={outletmodel}
        className="outletmodelform"
        backdrop="static"
      >
        <CModalHeader>
          <CModalTitle>BNS - Outlets </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {outletList.map((outlet) => (
            <CButton
              className="btn btn-block location-btn w-100"
              key={outlet.outlet_id}
              onClick={() => handleSelectOutlet(outlet)}
            >
              <div>
                <h3 className="mb-0">{outlet.outlet_name}</h3>
                <p className="mb-0">{outlet.outlet_address}</p>
                <p className="mb-0">{outlet.outlet_contact_no}</p>
              </div>
            </CButton>
          ))}
        </CModalBody>
      </CModal>
    </>
  );
};

export default AssignOutLet;
