import React, { useState, useEffect } from "react";
import { CButton, CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react";
import { fetch } from "../../utils";
import { connect } from "react-redux";
import { setOutletList, setDeliveryList } from "../../action/actions"; // Assuming you have action creators setOutletList and setDeliveryList in action/actions.js

const AssignOutLet = ({ outletList, deliveryList, setOutletList, setDeliveryList }) => {
  const [outletmodel, setOutletmodel] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [outletListdata, setOutletListdata] = useState([]);

  const handleSelectOutlet = (outlet) => {
    setSelectedOutlet(outlet);
    setOutletmodel(false);
  };


  const getOutletListdata = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch("/api/outlets/assigned", "get", null, headers);
      setOutletListdata(response.data.allAssignedOutlets);
     
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOutletListdata();
  }, []);

  // delivery data
  const [deliverymodel, setDeliverymodel] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [deliveryListdata, setDeliveryListdata] = useState([]);
  const handleSelectDelivery = (delivery) => {
    setSelectedDelivery(delivery);
    setDeliverymodel(false);
  };

  const getDeliveryListdata = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch("/api/outlets/config-data", "get", null, headers);
      setDeliveryListdata(response.data.delivery_heads);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDeliveryListdata();
  }, []);

  return (
    <>
      <CButton className="gray-outlet" onClick={() => setOutletmodel(!outletmodel)}>
        <b>OUTLET</b> <br />
        {selectedOutlet && (
          <div>
            <p>{selectedOutlet.outlet_name}</p>
          </div>
        )}
      </CButton>
      <CModal size="sm" visible={outletmodel} className="outletmodelform" backdrop="static">
        <CModalHeader>
          <CModalTitle>BNS - Outlets</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {outletListdata.map((outlet) => (
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

      {/* Delivery model */}
      <CButton className="gray-outlet" onClick={() => setDeliverymodel(!deliverymodel)}>
        <b>DELIVERY</b> <br />
        {selectedDelivery && (
          <div>
            <p>{selectedDelivery.delivery_heads}</p>
          </div>
        )}
      </CButton>

      <CModal size="sm" visible={deliverymodel} className="outletmodelform" backdrop="static">
        <CModalHeader>
          <CModalTitle>Delivery Mode</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {Array.isArray(deliveryListdata) &&
            deliveryListdata.map((delivery) => (
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

const mapStateToProps = (state) => ({
  outletList: state.outlets || [], // Set default value as an empty array
  deliveryList: state.deliveries || [], // Set default value as an empty array
});

const mapDispatchToProps = {
  setOutletList,
  setDeliveryList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignOutLet);


// import React, { useState, useEffect } from "react";
// import { CButton, CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react";
// import { fetch } from "../../utils";
// import ProductsSearchBar from "./ProductsSearchBar"; // Import the updated ProductsSearchBar component

// const AssignOutLet = () => {
//   const [outletmodel, setOutletmodel] = useState(false);
//   const [selectedOutlet, setSelectedOutlet] = useState(null);
//   const [outletList, setOutletList] = useState([]);

//   const handleSelectOutlet = (outlet) => {
//     setSelectedOutlet(outlet);
//     setOutletmodel(false);
//   };

//   const getOutletList = async () => {
//     try {
//       const token = localStorage.getItem("pos_token");
//       const headers = { Authorization: `Bearer ${token}` };
//       const response = await fetch("/api/outlets/assigned", "get", null, headers);
//       setOutletList(response.data.allAssignedOutlets);

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getOutletList();
//   }, []);

//   return (
//     <>
//       <CButton
//         className="gray-outlet"
//         onClick={() => setOutletmodel(!outletmodel)}
//       >
//         <b>OUTLET</b> <br />
//         {selectedOutlet && (
//           <div>
//             <p>{selectedOutlet.outlet_name}</p>
//           </div>
//         )}
//       </CButton>
//       <CModal
//         size="sm"
//         visible={outletmodel}
//         className="outletmodelform"
//         backdrop="static"
//       >
//         <CModalHeader>
//           <CModalTitle>BNS - Outlets</CModalTitle>
//         </CModalHeader>
//         <CModalBody>
//           {outletList.map((outlet) => (
//             <CButton
//               className="btn btn-block location-btn w-100"
//               key={outlet.outlet_id}
//               onClick={() => handleSelectOutlet(outlet)}
//             >
//               <div>
//                 <h3 className="mb-0">{outlet.outlet_name}</h3>
//                 <p className="mb-0">{outlet.outlet_address}</p>
//                 <p className="mb-0">{outlet.outlet_contact_no}</p>
//               </div>
//             </CButton>
//           ))}
//         </CModalBody>
//       </CModal>


//     </>
//   );
// };

// export default AssignOutLet;