// import React, { useState, useEffect } from "react";
// import {
//   CButton,
//   CModal,
//   CModalBody,
//   CModalHeader,
//   CModalTitle,
// } from "@coreui/react";
// import { fetch } from "../../utils";
// import { useDispatch, useSelector } from "react-redux"; // Import these
// import { selectDelivery } from "../../action/actions"; // Import the action

// const DeliveryModeModal = ({ onClose, onOpen }) => {
//   const [deliverymodel, setDeliverymodel] = useState(false);
//   const [deliveryListdata, setDeliveryListdata] = useState([]);
//   const dispatch = useDispatch(); // Initialize the dispatch function
//   const selectedDelivery = useSelector((state) => state.delivery.selectedDelivery);
//   const getDeliveryListdata = async () => {
//     try {
//       const token = localStorage.getItem("pos_token");
//       const headers = { Authorization: `Bearer ${token}` };
//       const response = await fetch(
//         "/api/outlets/config-data",
//         "get",
//         null,
//         headers
//       );
//       setDeliveryListdata(response.data.delivery_heads);

//       // console.log('outlet data', response.data.delivery_heads)
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     getDeliveryListdata();
//   }, []);

//   useEffect(() => {
//     const handleKeyPressDelivey = (e) => {
//       if (e.key === "F2") {
//         e.preventDefault();
//         setDeliverymodel(true);
//       }
//     };
//     window.addEventListener("keydown", handleKeyPressDelivey);
//     return () => {
//       window.removeEventListener("keydown", handleKeyPressDelivey);
//     };
//   }, []);

//   const handleSelectDelivery = (delivery) => {
//     dispatch(selectDelivery(delivery)); // Dispatch the action with the selected delivery
//     setDeliverymodel(false);
//   };

//   return (
//     <>
//        <CButton
//         className="gray-outlet"
//         onClick={() => {
//           setDeliverymodel(false); // Close the DeliveryModeModal
//           onClose(); // Handle further behavior (e.g., show AssignOutLet modal)
//         }}
//       >

//         <b>DELIVERY - [F2]</b> <br />
//         <div>
//           <p style={{ color: "#09a30e" }}>{selectedDelivery}</p>
//         </div>
//       </CButton>
//       <CModal
//         size="sm"
//         visible={deliverymodel}
//         className="outletmodelform"
//         backdrop="static"
//       >
//         <CModalHeader>
//           <CModalTitle>Delivery Mode</CModalTitle>
//         </CModalHeader>
//         <CModalBody>
//           {Array.isArray(deliveryListdata) &&
//             deliveryListdata.map((delivery) => (
                           
//                 <CButton
//                 className={`btn btn-block location-btn w-100 ${
//                   selectedDelivery === delivery ? "selected-outlet" : ""
//                 }`}
//                 key={delivery}
//                 onClick={() => handleSelectDelivery(delivery)}
//               >
              
//                 <div>
//                   <h3 className="mb-0" style={{ fontWeight: "bold" }}>
//                     {delivery}
//                   </h3>
//                 </div>
//               </CButton>
//             ))}
//         </CModalBody>
//       </CModal>
//     </>
//   );
// };

// export default DeliveryModeModal;



import React, { useState, useEffect } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { fetch } from "../../utils";
import { useDispatch, useSelector } from "react-redux"; // Import these
import { selectDelivery } from "../../action/actions"; // Import the action

const DeliveryModeModel = () => {
  const [deliverymodel, setDeliverymodel] = useState(false);
  const [deliveryListdata, setDeliveryListdata] = useState([]);
  const dispatch = useDispatch(); // Initialize the dispatch function
  const selectedDelivery = useSelector((state) => state.delivery.selectedDelivery);
  const getDeliveryListdata = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch(
        "/api/outlets/config-data",
        "get",
        null,
        headers
      );
      setDeliveryListdata(response.data.delivery_heads);
      console.log('delivery mode', response.data.delivery_heads)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDeliveryListdata();
  }, []);

  useEffect(() => {
    const handleKeyPressDelivey = (e) => {
      if (e.key === "F2") {
        e.preventDefault();
        setDeliverymodel(true);
      }
    };
    window.addEventListener("keydown", handleKeyPressDelivey);
    return () => {
      window.removeEventListener("keydown", handleKeyPressDelivey);
    };
  }, []);

  const handleSelectDelivery = (delivery) => {
    dispatch(selectDelivery(delivery)); // Dispatch the action with the selected delivery
    setDeliverymodel(false);
  };
  console.log(selectedDelivery);
 
  
  

  return (
    <>
      <CButton
        className="gray-outlet"
        // color="light"
        onClick={() => setDeliverymodel(!deliverymodel)}
      >
        <b>DELIVERY - [F2]</b> <br />
        <div>
          <p style={{ color: "#09a30e" }}>{selectedDelivery}</p>
        </div>
      </CButton>
      <CModal
        size="sm"
        visible={deliverymodel}
        className="outletmodelform"
        backdrop="static"
      >
        <CModalHeader>
          <CModalTitle>Delivery Mode</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {Array.isArray(deliveryListdata) &&
            deliveryListdata.map((delivery) => (
                           
                <CButton
                className={`btn btn-block location-btn w-100 ${
                  selectedDelivery === delivery ? "selected-outlet" : ""
                }`}
                key={delivery}
                onClick={() => handleSelectDelivery(delivery)}
              >
              
                <div>
                  <h3 className="mb-0" style={{ fontWeight: "bold" }}>
                    {delivery}
                  </h3>
                </div>
              </CButton>
            ))}
        </CModalBody>
      </CModal>

      {/* {selectedDelivery === deliveryListdata[1] && (
        <div>
sjfhsdkjfh
        </div>
      )} */}
    </>
  );
};

export default DeliveryModeModel;


// 0: "-"
// 1: "Counter Sale"
// 2: "On Table"
// 3:"PickUp"
// 4: "Home Delivery"

// when the selectedDelivery on table than dispay    {selectedDelivery == 1 && (
//   <div>
//     1. {selectedDelivery}
//   </div>
// )} this section

