// import React, { useState, useEffect } from "react";
// import {
//   CButton,
//   CModal,
//   CModalBody,
//   CModalHeader,
//   CModalTitle,
// } from "@coreui/react";
// import { fetch } from "../../utils";
// import { connect } from "react-redux";
// import {
//   setOutletList,
//   setDeliveryList,
//   setSelectedOutletId,
// } from "../../action/actions";
// import { BallTriangle } from "react-loader-spinner";
// import { ToastContainer, toast } from "react-toastify";

// // Assuming you have action creators setOutletList and setDeliveryList in action/actions.js
// const AssignOutLet = ({ setSelectedOutletId }) => {
//   const [loading, setLoading] = useState(true);
//   const [outletmodel, setOutletmodel] = useState(true);
//   const [selectedOutlet, setSelectedOutlet] = useState(null);
//   const [outletListdata, setOutletListdata] = useState([]);
//   const [networkError, setNetworkError] = useState(false);
//   // Function to toggle the outlet modal visibility and fetch data if not already fetched
//   const toggleOutletModal = () => {
//     // console.log("Toggling outletmodel");
//     setOutletmodel((prevState) => !prevState);
//   };

//   const handleSelectOutlet = (outlet) => {
//     setSelectedOutlet(outlet);
//     toggleOutletModal();
//    // Show the delivery mode modal after selecting an outlet
//   setDeliverymodel(true);
//     setSelectedOutletId(outlet.outlet_id); // Dispatch the action to set the selected outlet_id in the Redux store
//     toast.success(`Outlet selected:  ${outlet.outlet_name}`, {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   };
//   const getOutletListdata = async () => {
//     try {
//       const token = localStorage.getItem("pos_token");
//       const headers = { Authorization: `Bearer ${token}` };
//       setLoading(true);
//       const response = await fetch(
//         "/api/outlets/assigned",
//         "get",
//         null,
//         headers
//       );
//       setOutletListdata(response.data.allAssignedOutlets);
//       setLoading(false);
//       setNetworkError(false); // Reset networkError state if the request succeeds
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//       setNetworkError(true); // Set networkError state to true if there is a network error
//     }
//   };
//   useEffect(() => {
//     getOutletListdata();
//   }, [outletmodel]);

//   // delivery data
//   const [deliverymodel, setDeliverymodel] = useState(false);
//   const [selectedDelivery, setSelectedDelivery] = useState(null);
//   const [deliveryListdata, setDeliveryListdata] = useState([]);
//   const [selectedDeliveryMode, setSelectedDeliveryMode] = useState(""); // Step 1: State for selected delivery mode

//   // const handleSelectDelivery = (delivery) => {
//   //   setSelectedDelivery(delivery);
//   //   setDeliverymodel(false);
//   // };
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
//       setDeliveryListdata(response.data.delivery_heads.slice(1));
//       // console.log(response.data.delivery_heads)
//       console.log(response.data.delivery_heads.shift());
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     getDeliveryListdata();
//   }, []);

//   const handleSelectDelivery = (delivery) => {
//     //selected delivery mode in the state
//     setSelectedDeliveryMode(delivery);
//     setDeliverymodel(false); // Close the modal after selecting
//     toast.success(`Delivery Mode:  ${selectedDeliveryMode}`, {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//     // console.log(selectedDeliveryMode)
//   };

//   return (
//     <>
//       {/* oulet model */}

//       <CButton
//         className="gray-outlet"
//         // onClick={() => setOutletmodel(!outletmodel)}
//         onClick={toggleOutletModal}
//       >
//         <b>OUTLET</b> <br />
//         {selectedOutlet && (
//           <div>
//             <p className='font-size' style={{"color": "#09a30e"}}>{selectedOutlet.outlet_name}</p>
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
//           {loading ? (
//             <div className="loader-container">
//               <BallTriangle color="#00BFFF" height={80} width={80} />
//             </div>
//           ) : networkError ? (
//             <div className="error-message text-danger">
//               <b>Network Error: Unable to fetch data.</b>
//             </div>
//           ) : (
//             outletListdata.map((outlet) => (
//               <CButton
//                className={`btn btn-block location-btn w-100 ${selectedOutlet?.outlet_id === outlet.outlet_id ? "selected-outlet" : ""}`}
//                 key={outlet.outlet_id}
//                 onClick={() => handleSelectOutlet(outlet)}
//                 data-id={outlet.outlet_id}
//               >
//                 <div>
//                   <h3 className="mb-0">{outlet.outlet_name}</h3>
//                   <p className="mb-0">{outlet.outlet_address}</p>
//                   <p className="mb-0">{outlet.outlet_contact_no}</p>
//                 </div>
//               </CButton>
//             ))
//           )}
//         </CModalBody>
//       </CModal>

// {/* ---------------------------------------- Delivery Mode ---------------------------------- */}
//       {/* Delivery model */}
//       <CButton
//         className="gray-outlet"
//         onClick={() => setDeliverymodel(!deliverymodel)}
//       >
//         <b>DELIVERY</b> <br />
//         {selectedDeliveryMode && (
//           <div>
//             <p style={{"color": "#09a30e"}}>{selectedDeliveryMode}</p>
//           </div>
//         )}
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
//               <CButton
//                 // className="btn btn-block location-btn w-100"
//                 className={`btn btn-block location-btn w-100 ${selectedDeliveryMode === delivery ? "selected-outlet" : ""}`}
//                 key={delivery}
//                 onClick={() => handleSelectDelivery(delivery)}
//               >
//                 <div>
//                   <h3 className="mb-0">{delivery}</h3>
//                 </div>
//               </CButton>
//             ))}
//         </CModalBody>
//       </CModal>
//     </>
//   );
// };

// const mapStateToProps = (state) => ({
//   outletList: state.outlets || [], // Set default value as an empty array
//   deliveryList: state.deliveries || [], // Set default value as an empty array
// });
// const mapDispatchToProps = {
//   setOutletList,
//   setDeliveryList,
//   setSelectedOutletId,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(AssignOutLet);

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
  setDeliveryList,
  setSelectedOutletId,
  setSelectedOutletData,
} from "../../action/actions";
import { BallTriangle } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

// Assuming you have action creators setOutletList and setDeliveryList in action/actions.js
const AssignOutLet = ({ setSelectedOutletId }) => {
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
  // console.log(selectedOutletId);

  const handleSelectOutlet = (outlet) => {
    setSelectedOutlet(outlet);
    toggleOutletModal();
    // Show the delivery mode modal after selecting an outlet
    setDeliverymodel(true);
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
      console.log(response.data.allAssignedOutlets);
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
  }, []); // Empty dependency array to run the effect only once when the component mounts

  // delivery data
  const [deliverymodel, setDeliverymodel] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [deliveryListdata, setDeliveryListdata] = useState([]);
  const [selectedDeliveryMode, setSelectedDeliveryMode] = useState(""); // Step 1: State for selected delivery mode

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
      setDeliveryListdata(response.data.delivery_heads.slice(1));
      // console.log(response.data.delivery_heads)
      // console.log(response.data.delivery_heads.shift());
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDeliveryListdata();
  }, []);

  useEffect(() => {
    // Add an event listener to handle the F1 key press
    const handleKeyPressDelivey = (e) => {
      if (e.key === "F2") {
        // <-- Correct the key comparison here
        e.preventDefault(); // Prevent default browser behavior
        setDeliverymodel(true); // <-- Correct the function call to open the delivery modal
      }
    };
    // Attach the event listener when the component mounts
    window.addEventListener("keydown", handleKeyPressDelivey);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPressDelivey);
    };
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const handleSelectDelivery = (delivery) => {
    //selected delivery mode in the state
    setSelectedDeliveryMode(delivery);
    setDeliverymodel(false); // Close the modal after selecting
    console.log(selectedDeliveryMode);
  };

  return (
    <>
      {/* oulet model */}
      <CButton
        // color="secondary"
        // style={{ backgroundColor: "rgba(0, 0, 0, 0.025)", color: "black" }}
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
                  <CCol sm={6} key={outlet.outlet_id}>
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

      {/* ---------------------------------------- Delivery Mode ---------------------------------- */}
      {/* Delivery model */}
      <CButton
        className="gray-outlet"
        // color="light"
        onClick={() => setDeliverymodel(!deliverymodel)}
      >
        <b>DELIVERY - [F2]</b> <br />
        {selectedDeliveryMode && (
          <div>
            <p style={{ color: "#09a30e" }}>{selectedDeliveryMode}</p>
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
          <CModalTitle>Delivery Mode</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {Array.isArray(deliveryListdata) &&
            deliveryListdata.map((delivery) => (
              <CButton
                // className="btn btn-block location-btn w-100"
                className={`btn btn-block location-btn w-100 ${
                  selectedDeliveryMode === delivery ? "selected-outlet" : ""
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
  setSelectedOutletId,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignOutLet);
