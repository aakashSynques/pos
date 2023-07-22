import React, { useState, useEffect } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { fetch } from "../../utils";
import { BallTriangle } from "react-loader-spinner";

const SelectOutlets = () => {
  const [loading, setLoading] = useState(true);
  const [outletModel, setOutletModel] = useState(true); // first model state
  const [deliveryModel, setDeliveryModel] = useState(false); // New state for the second modal
  // const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [outletList, setOutletList] = useState([]); // display data state
  const [deliveryModeList, setDeliveryModeList] = useState([]); // display delivery mode list data state

  useEffect(() => {
    setOutletModel(true);
    getOutletList();
    setDeliveryModel(false);
    getDeliveryModeList();
  }, []);

  const handleSelectOutlet = (outlet) => {
    // setSelectedOutlet(outlet);
    setOutletModel(false);
    setDeliveryModel(true); // Open the second modal
  };

// select delivery model
  const handleSelectDelivery = () => {
    setDeliveryModel(false); // 
  };

  const getOutletList = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      setLoading(true);
      const response = await fetch("/api/outlets/all", "get", null, headers);
      setOutletList(response.data.allOutlets);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };


  // delivery mode state
  const getDeliveryModeList = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      setLoading(true);
      const response = await fetch("api/outlets/config-data", "get", null, headers);
      // Set the delivery modes received from the API in your state or do any other necessary processing
      setDeliveryModeList(response.data.delivery_heads)
      // console.log(response.data.delivery_heads)
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <CModal
        size="sm"
        visible={outletModel}
        className="outletmodelform"
        backdrop="static"
      >
        <CModalHeader>
          <CModalTitle>BNS - Outlets</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {loading ? (
            <div className="loader-container">
              <BallTriangle color="#00BFFF" height={80} width={80} />
            </div>
          ) : (
            outletList.map((outlet) => (
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
            ))
          )}
        </CModalBody>
      </CModal>
      

      {/* Second Modal for delivery mode */}
      <CModal
        size="sm"
        visible={deliveryModel}
        className="outletmodelform"
        backdrop="static"
      >
        <CModalHeader>
          <CModalTitle>Delivery Mode</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {loading ? (
            <div className="loader-container">
              <BallTriangle color="#00BFFF" height={80} width={80} />
            </div>
          ) :  (
            deliveryModeList.map((delivery) => (
              <CButton
                className="btn btn-block location-btn w-100"
                key={delivery}
                onClick={() => handleSelectDelivery()}
              >
                <div>
                  <h3 className="mb-0">{delivery}</h3>
                </div>
              </CButton>
            ))
          )}
        </CModalBody>
      </CModal>
    </>
  );
};

export default SelectOutlets;
