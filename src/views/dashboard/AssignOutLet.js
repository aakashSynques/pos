import React, { useState, useEffect } from "react";
import {
  CButton,
  CCol,
  CContainer,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import { fetch } from "../../utils";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  setOutletList,
  setSelectedOutletId,
  setSelectedOutletData,
} from "../../action/actions";
import { BallTriangle } from "react-loader-spinner";

// Assuming you have action creators setOutletList and setDeliveryList in action/actions.js
const AssignOutLet = ({ setSelectedOutletId}) => {
  const [loading, setLoading] = useState(true);
  const [outletmodel, setOutletmodel] = useState(true);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [outletListdata, setOutletListdata] = useState([]);
  const [networkError, setNetworkError] = useState(false);
  // Function to toggle the outlet modal visibility and fetch data if not already fetched
  const toggleOutletModal = () => {
    // console.log("Toggling outletmodel");
    setOutletmodel((prevState) => !prevState);
  };

  const dispatch = useDispatch();
  const selectedOutletId = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );

   
  const handleSelectOutlet = (outlet) => {
    setSelectedOutlet(outlet);
    toggleOutletModal();
    // Show the delivery mode modal after selecting an outlet
    // setDeliverymodel(true);
    setSelectedOutletId(outlet.outlet_id); // Dispatch the action to set the selected outlet_id in the Redux store
  };
  const getOutletListdata = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      setLoading(true);
      const response = await fetch(
        "/api/outlets/assigned",
        "get",
        null,
        headers
      );
      setOutletListdata(response.data.allAssignedOutlets);
      // console.log(response.data.allAssignedOutlets);
      setLoading(false);
      setNetworkError(false); // Reset networkError state if the request succeeds
      dispatch(setSelectedOutletData(selectedOutletId, outletListdata));
    } catch (err) {
      console.log(err);
      setLoading(false);
      setNetworkError(true); // Set networkError state to true if there is a network error
    }
  };
  useEffect(() => {
    getOutletListdata();
  }, [outletmodel]);

  // outlet select sortcut key F1
  useEffect(() => {
    // Add an event listener to handle the F1 key press
    const handleKeyPressOutlet = (e) => {
      if (e.key === "F1") {
        e.preventDefault(); // Prevent default browser behavior
        toggleOutletModal();
      }
    };
    // Attach the event listener when the component mounts
    window.addEventListener("keydown", handleKeyPressOutlet);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPressOutlet);
    };
  }, []); 


  return (
    <>
      {/* oulet model */}
      <CButton
        className="gray-outlet"
        onClick={toggleOutletModal}
      >
        <b>OUTLET - [F1]</b> <br />
        {selectedOutlet && (
          <div>
            <p style={{ color: "#09a30e" }}>{selectedOutlet.outlet_name}</p>
          </div>
        )}
      </CButton>
      <CModal
        size="lg"
        visible={outletmodel}
        className="outletmodelform"
        backdrop="static"
      >
        <CModalHeader>
          <CModalTitle>BNS - Outlets</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer>
            <CRow>
              {loading ? (
                <div className="loader-container">
                  <BallTriangle color="#00BFFF" height={80} width={80} />
                </div>
              ) : networkError ? (
                <div className="error-message text-danger">
                  <b>Network Error: Unable to fetch data.</b>
                </div>
              ) : (
                outletListdata.map((outlet) => (
                  <CCol className="aws-btn" sm={6} key={outlet.outlet_id}>
                    <CButton
                      className={`btn btn-block location-btn w-100 ${
                        selectedOutlet?.outlet_id === outlet.outlet_id
                          ? "selected-outlet"
                          : ""
                      }`}
                      onClick={() => handleSelectOutlet(outlet)}
                      data-id={outlet.outlet_id}
                    >
                      <div>
                        <h3 className="mb-0" style={{ fontWeight: "bold" }}>
                          {outlet.outlet_name}
                        </h3>
                        <p className="mb-0">{outlet.outlet_address}</p>
                        <p className="mb-0">{outlet.outlet_contact_no}</p>
                      </div>
                    </CButton>
                  </CCol>
                ))
              )}
            </CRow>
          </CContainer>
        </CModalBody>
      </CModal>
    </>
  );
};

const mapStateToProps = (state) => ({
  outletList: state.outlets || [], // Set default value as an empty array
});
const mapDispatchToProps = {
  setOutletList,
  setSelectedOutletId,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignOutLet);
