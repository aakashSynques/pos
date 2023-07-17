import React, { useState, useEffect } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { fetch } from "../../utils";

const AssignOutLet = () => {
  const [outletmodel, setOutletmodel] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [outletList, setOutletList] = useState([]);

  const handleSelectOutlet = (outlet) => {
    setSelectedOutlet(outlet);
    setOutletmodel(false);
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

  // delivery data
  const [deliverymodel, setDeliverymodel] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [deliveryList, setDeliveryList] = useState([]);

  const handleSelectDelivery = (delivery) => {
    setSelectedDelivery(delivery);
    setDeliverymodel(false);
  };

  const getDeliveryList = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch(
        "/api/outlets/config-data",
        "get",
        null,
        headers
      );
      setDeliveryList(response.data.delivery_heads);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDeliveryList();
  }, []);

  return (
    <>
      <CButton
        className="gray-outlet"
        onClick={() => setOutletmodel(!outletmodel)}
      >
        <b>OUTLET</b> <br />
        {selectedOutlet && (
          <div>
            <p>{selectedOutlet.outlet_name}</p>
          </div>
        )}
      </CButton>
      <CModal
        size="sm"
        visible={outletmodel}
        className="outletmodelform"
        backdrop="static"
      >
        <CModalHeader>
          <CModalTitle>BNS - Outlets</CModalTitle>
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

      <CButton
        className="gray-outlet"
        onClick={() => setDeliverymodel(!deliverymodel)}
      >
        <b>DELIVERY</b> <br />
        {selectedDelivery && (
          <div>
            <p>{selectedDelivery.delivery_heads}</p>
          </div>
        )}
      </CButton>
      <CModal
        size="sm"
        visible={deliverymodel}
        className="outletmodelform"
        backdrop="static"
      >
        <CModalHeader>
          <CModalTitle>BNS - Outlets</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {Array.isArray(deliveryList) &&
            deliveryList.map((delivery) => (
              <CButton
                className="btn btn-block location-btn w-100"
                key={delivery}
                onClick={() => handleSelectDelivery(delivery)}
              >
                <div>
                  <h3 className="mb-0">{delivery}</h3>
                </div>
              </CButton>
            ))}
        </CModalBody>
      </CModal>
    </>
  );
};

export default AssignOutLet;
