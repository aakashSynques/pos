import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSaveSaleData, setPandingSaleProcess } from "../../../../action/actions";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import the CSS for styling
import io from 'socket.io-client';
import {
  CModal,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CModalBody,
  CNavItem,
  CNav,
  CNavLink,
  CTabContent,
  CTabPane,
  CButton,
} from "@coreui/react";
import { fetch } from "../../../../utils";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../config";

function PendingSaleModal({ pendingButtonModal, setPendingButtonModal }) {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const outlet_id = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );

  const [activeKey, setActiveKey] = useState(1);
  const [saveSaleData, setsaveSaleData] = useState([]);
  const getsaveSaleData = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch("/api/sales/getAllSavedData", "post", null, headers);
      const allSavedData = response.data.saved_data;
      console.log('process for pending sale', allSavedData)
      const filteredData = allSavedData.filter(item => item.cartSumUp.outlet_id == outlet_id);
      setsaveSaleData(filteredData);

      dispatch(getSaveSaleData(filteredData));
      await socket.emit("add-order", setsaveSaleData);
    } catch (err) {
      console.log('new', err);
    }
  };

  useEffect(() => {
    getsaveSaleData();
  }, [outlet_id]);

  useEffect(() => {
    const newSocket = io.connect(BASE_URL); // Replace with your server URL
    setSocket(newSocket);

  }, []);


  const [tabCounts, setTabCounts] = useState([0, 0, 0, 0]);
  useEffect(() => {
    const counts = [0, 0, 0, 0];
    saveSaleData.forEach((sale) => {
      if (sale.cartSumUp.deliveryMode == 1 && "1") {
        counts[0]++; // Counter Sale
      } else if (sale.cartSumUp.deliveryMode == 2 && "2") {
        counts[1]++; // On Table
      } else if (sale.cartSumUp.deliveryMode == 3 && "3") {
        counts[2]++; // Pick UP
      } else if (sale.cartSumUp.deliveryMode == 4 && "4") {
        counts[3]++; // Home Delivery
      }
    });

    setTabCounts(counts);
  }, [saveSaleData]);




  const deletePendingSale = async (psid) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure to discard the current cart from the pending list?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const token = localStorage.getItem("pos_token");
              const headers = { Authorization: `Bearer ${token}` };
              await fetch(`/api/sales/deletePenddingSaleData/${psid}`, "delete", null, headers);
              getsaveSaleData();
              toast.success("Pending sale data deleted successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
              });
            } catch (err) {
              console.error("Error deleting sale data:", err);

              toast.error("Error deleting pending sale data. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
              });
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            toast.error("pandding sales not delete", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
            });
          },
        },
      ],
    });
  };


    const startSaleProcess = (pandingSaleProcess) => {
    console.log("Selected Sale Data:",  dispatch(setPandingSaleProcess(pandingSaleProcess)));
    dispatch(setPandingSaleProcess(pandingSaleProcess));
  };

  return (
    <CModal
      onShow={() => false}
      size="lg"
      visible={pendingButtonModal}
      onClose={() => setPendingButtonModal(false)}
      className="closing-table"
      backdrop="static"
    >
      <CModalHeader>
        <CModalTitle>Pending Sales List</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CNav variant="pills" role="tablist">
          <CNavItem>
            <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
              Counter Sale <span className="badge rounded-circle" style={{ padding: "3px 6px", fontSize: "12px" }}>
                {tabCounts[0]}
              </span>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeKey === 2} onClick={() => setActiveKey(2)}>
              On Table <span className="badge rounded-circle" style={{ padding: "3px 6px", fontSize: "12px" }}>
                {tabCounts[1]}
              </span>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeKey === 3} onClick={() => setActiveKey(3)}>
              Pick UP <span className="badge rounded-circle" style={{ padding: "3px 6px", fontSize: "12px" }}>
                {tabCounts[2]}
              </span>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink active={activeKey === 4} onClick={() => setActiveKey(4)}>
              Home Delivery <span className="badge rounded-circle" style={{ padding: "3px 6px", fontSize: "12px" }}>
                {tabCounts[3]}
              </span>
            </CNavLink>
          </CNavItem>
        </CNav>

        <CTabContent>
          <CTabPane
            role="tabpanel"
            aria-labelledby="countersale"
            visible={activeKey == 1}
          >
            <table className="table table-bordered border booking-or-table collection-table-style table-hover mode-2" >
              <thead className="thead-light">
                <tr>
                  <th width="5%">#</th>
                  <th width="15%">Sales Date</th>
                  <th width="25%">Customer Name</th>
                  <th width="2%">Items</th>
                  <th width="18%">Total Sale</th>
                  <th>Note</th>
                  <th width="12%" colspan="2">Action</th>
                </tr>
              </thead>
              <tbody>
                {saveSaleData.map((sale, index) => {
                  if (sale.cartSumUp.deliveryMode == 1) {
                    const date = new Date(sale.eat);
                    const formattedDate = `${date.getFullYear()}-${String(
                      date.getMonth() + 1
                    ).padStart(2, "0")}-${String(date.getDate()).padStart(
                      2,
                      "0"
                    )} ${String(date.getHours()).padStart(2, "0")}:${String(
                      date.getMinutes()
                    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(
                      2,
                      "0"
                    )}`;
                    return (
                      <tr key={index}>
                        <td>{sale.psid}</td>
                        <td>{formattedDate}</td>
                        <td>
                          {sale.selectedCustomerJson.customer_name}{" "}
                          <small>({sale.selectedCustomerJson.mobile})</small>
                        </td>
                        <td align="center">
                          {sale.productsInCart.length}
                        </td>
                        <td align="right">
                          <i className="fa fa-inr"></i>{" "}
                          {parseFloat(sale.cartSumUp.grandTotal).toFixed(2)}
                          <br />
                          <span style={{ lineHeight: "18px" }}>
                            Tax: <i className="fa fa-inr"></i>
                            {sale.cartSumUp.tax}{" "}
                          </span>
                        </td>
                        <td></td>
                        <td align="center">
                        <CButton
                            className="btn btn-xs btn-warning rounded-1 text-white"
                            onClick={() => startSaleProcess(sale)}
                          >
                            <i className="fa fa-reply-all "></i> Process
                          </CButton>


                        </td>
                        <td align="center">
                          <CButton className="btn btn-xs btn-danger" onClick={() => deletePendingSale(sale.psid)}>
                            <i className="fa fa-times"></i>
                          </CButton>
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </CTabPane>


          <CTabPane
            role="tabpanel"
            aria-labelledby="ontable"
            visible={activeKey === 2}
          >

            <table className="table table-bordered border booking-or-table collection-table-style table-hover mode-2" >
              <thead className="thead-light">
                <tr>
                  <th width="5%">#</th>
                  <th width="15%">Sales Date</th>
                  <th width="25%">Customer Name</th>
                  <th width="2%">Items</th>
                  <th width="18%">Total Sale</th>
                  <th>Note</th>
                  <th width="12%" colspan="2">Action</th>
                </tr>
              </thead>
              <tbody>
                {saveSaleData.map((sale, index) => {
                  if (sale.cartSumUp.deliveryMode == 2) {
                    const date = new Date(sale.eat);
                    const formattedDate = `${date.getFullYear()}-${String(
                      date.getMonth() + 1
                    ).padStart(2, "0")}-${String(date.getDate()).padStart(
                      2,
                      "0"
                    )} ${String(date.getHours()).padStart(2, "0")}:${String(
                      date.getMinutes()
                    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(
                      2,
                      "0"
                    )}`;
                    return (
                      <tr key={index}>
                        <td>{sale.psid}</td>
                        <td>{formattedDate}</td>
                        <td>
                          {sale.selectedCustomerJson.customer_name}{" "}
                          <small>({sale.selectedCustomerJson.mobile})</small>
                        </td>
                        <td align="center">
                          {sale.productsInCart.length}
                        </td>
                        <td align="right">
                          <i className="fa fa-inr"></i>{" "}
                          {parseFloat(sale.cartSumUp.grandTotal).toFixed(2)}
                          <br />
                          <span style={{ lineHeight: "18px" }}>
                            Tax: <i className="fa fa-inr"></i>
                            {sale.cartSumUp.tax}{" "}
                          </span>
                        </td>
                        <td></td>
                        <td align="center">
                          <CButton className="btn btn-xs btn-warning rounded-1 text-white">
                            <i className="fa fa-reply-all "></i> Process
                          </CButton>
                        </td>
                        <td align="center">
                          <CButton className="btn btn-xs btn-danger" onClick={() => deletePendingSale(sale.psid)}>
                            <i className="fa fa-times"></i>
                          </CButton>
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>

          </CTabPane>

          <CTabPane
            role="tabpanel"
            aria-labelledby="pickup"
            visible={activeKey === 3}
          >
            <table className="table table-bordered border booking-or-table collection-table-style table-hover mode-2" >
              <thead className="thead-light">
                <tr>
                  <th width="5%">#</th>
                  <th width="15%">Sales Date</th>
                  <th width="25%">Customer Name</th>
                  <th width="2%">Items</th>
                  <th width="18%">Total Sale</th>
                  <th>Note</th>
                  <th width="12%" colspan="2">Action</th>
                </tr>
              </thead>
              <tbody>
                {saveSaleData.map((sale, index) => {
                  if (sale.cartSumUp.deliveryMode == 3) {
                    const date = new Date(sale.eat);
                    const formattedDate = `${date.getFullYear()}-${String(
                      date.getMonth() + 1
                    ).padStart(2, "0")}-${String(date.getDate()).padStart(
                      2,
                      "0"
                    )} ${String(date.getHours()).padStart(2, "0")}:${String(
                      date.getMinutes()
                    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(
                      2,
                      "0"
                    )}`;
                    return (
                      <tr key={index}>
                        <td>{sale.psid}</td>
                        <td>{formattedDate}</td>
                        <td>
                          {sale.selectedCustomerJson.customer_name}{" "}
                          <small>({sale.selectedCustomerJson.mobile})</small>
                        </td>
                        <td align="center">
                          {sale.productsInCart.length}
                        </td>
                        <td align="right">
                          <i className="fa fa-inr"></i>{" "}
                          {parseFloat(sale.cartSumUp.grandTotal).toFixed(2)}
                          <br />
                          <span style={{ lineHeight: "18px" }}>
                            Tax: <i className="fa fa-inr"></i>
                            {sale.cartSumUp.tax}{" "}
                          </span>
                        </td>
                        <td></td>
                        <td align="center">
                          <CButton className="btn btn-xs btn-warning rounded-1 text-white">
                            <i className="fa fa-reply-all "></i> Process
                          </CButton>
                        </td>
                        <td align="center">
                          <CButton className="btn btn-xs btn-danger" onClick={() => deletePendingSale(sale.psid)}>
                            <i className="fa fa-times"></i>
                          </CButton>
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </CTabPane>

          <CTabPane
            role="tabpanel"
            aria-labelledby="homedelivery"
            visible={activeKey === 4}
          >
            <table className="table table-bordered border booking-or-table collection-table-style table-hover mode-2" >
              <thead className="thead-light">
                <tr>
                  <th width="5%">#</th>
                  <th width="15%">Sales Date</th>
                  <th width="25%">Customer Name</th>
                  <th width="2%">Items</th>
                  <th width="18%">Total Sale</th>
                  <th>Note</th>
                  <th width="12%" colspan="2">Action</th>
                </tr>
              </thead>
              <tbody>
                {saveSaleData.map((sale, index) => {
                  if (sale.cartSumUp.deliveryMode == 4) {
                    const date = new Date(sale.eat);
                    const formattedDate = `${date.getFullYear()}-${String(
                      date.getMonth() + 1
                    ).padStart(2, "0")}-${String(date.getDate()).padStart(
                      2,
                      "0"
                    )} ${String(date.getHours()).padStart(2, "0")}:${String(
                      date.getMinutes()
                    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(
                      2,
                      "0"
                    )}`;
                    return (
                      <tr key={index}>
                        <td>{sale.psid}</td>
                        <td>{formattedDate}</td>
                        <td>
                          {sale.selectedCustomerJson.customer_name}{" "}
                          <small>({sale.selectedCustomerJson.mobile})</small>
                        </td>
                        <td align="center">
                          {sale.productsInCart.length}
                        </td>
                        <td align="right">
                          <i className="fa fa-inr"></i>{" "}
                          {parseFloat(sale.cartSumUp.grandTotal).toFixed(2)}
                          <br />
                          <span style={{ lineHeight: "18px" }}>
                            Tax: <i className="fa fa-inr"></i>
                            {sale.cartSumUp.tax}{" "}
                          </span>
                        </td>
                        <td></td>
                        <td align="center">
                          <CButton className="btn btn-xs btn-warning rounded-1 text-white">
                            <i className="fa fa-reply-all "></i> Process
                          </CButton>
                        </td>
                        <td align="center">
                          <CButton className="btn btn-xs btn-danger" onClick={() => deletePendingSale(sale.psid)}>
                            <i className="fa fa-times"></i>
                          </CButton>
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </CTabPane>
        </CTabContent>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" className="btn btn-sm btn-default" onClick={() => setPendingButtonModal(false)}>
          Close
        </CButton>

      </CModalFooter>
    </CModal>
  );
}

export default PendingSaleModal;


// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getSaveSaleData } from "../../../../action/actions";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css"; // Import the CSS for styling
// import io from 'socket.io-client';
// import {
//   CModal,
//   CModalHeader,
//   CModalFooter,
//   CModalTitle,
//   CModalBody,
//   CNavItem,
//   CNav,
//   CNavLink,
//   CTabContent,
//   CTabPane,
//   CButton,
// } from "@coreui/react";
// import { fetch } from "../../../../utils";
// import { toast } from "react-toastify";
// import { BASE_URL } from "../../../../config";

// function PendingSaleModal({ pendingButtonModal, setPendingButtonModal }) {
//   const dispatch = useDispatch();
//   const [socket, setSocket] = useState(null);
//   const outlet_id = useSelector(
//     (state) => state.selectedOutletId.selectedOutletId
//   );
//   const [activeKey, setActiveKey] = useState(1);
//   const [saveSaleData, setsaveSaleData] = useState([]);

//   const getsaveSaleData = async () => {
//     try {
//       const token = localStorage.getItem("pos_token");
//       const headers = { Authorization: `Bearer ${token}` };
//       const response = await fetch("/api/sales/getAllSavedData", "post", null, headers);
//       const allSavedData = response.data.saved_data;
//       console.log('process for pending sale', allSavedData)
//       const filteredData = allSavedData.filter(item => item.cartSumUp.outlet_id == outlet_id);
//       setsaveSaleData(filteredData);
//       dispatch(getSaveSaleData(filteredData));
//       await socket.emit("add-order", setsaveSaleData);
//     } catch (err) {
//       console.log('new', err);
//     }
//   };

//   useEffect(() => {
//     getsaveSaleData();
//   }, [outlet_id]);

//   useEffect(() => {
//     const newSocket = io.connect(BASE_URL); // Replace with your server URL
//     setSocket(newSocket);

//   }, []);

//   const [tabCounts, setTabCounts] = useState([0, 0, 0, 0]);
//   useEffect(() => {
//     const counts = [0, 0, 0, 0];
//     saveSaleData.forEach((sale) => {
//       if (sale.cartSumUp.deliveryMode == 1 && "1") {
//         counts[0]++; // Counter Sale
//       } else if (sale.cartSumUp.deliveryMode == 2 && "2") {
//         counts[1]++; // On Table
//       } else if (sale.cartSumUp.deliveryMode == 3 && "3") {
//         counts[2]++; // Pick UP
//       } else if (sale.cartSumUp.deliveryMode == 4 && "4") {
//         counts[3]++; // Home Delivery
//       }
//     });

//     setTabCounts(counts);
//   }, [saveSaleData]);

//   const deletePendingSale = async (psid) => {
//     confirmAlert({
//       title: "Confirm Deletion",
//       message: "Are you sure to discard the current cart from the pending list?",
//       buttons: [
//         {
//           label: "Yes",
//           onClick: async () => {
//             try {
//               const token = localStorage.getItem("pos_token");
//               const headers = { Authorization: `Bearer ${token}` };
//               await fetch(`/api/sales/deletePenddingSaleData/${psid}`, "delete", null, headers);
//               getsaveSaleData();
//               toast.success("Pending sale data deleted successfully!", {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//               });
//             } catch (err) {
//               console.error("Error deleting sale data:", err);

//               toast.error("Error deleting pending sale data. Please try again.", {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//               });
//             }
//           },
//         },
//         {
//           label: "No",
//           onClick: () => {
//             toast.error("pending sales not deleted", {
//               position: "top-right",
//               autoClose: 3000,
//               hideProgressBar: false,
//             });
//           },
//         },
//       ],
//     });
//   };

//   const startSaleProcess = (saleData) => {
//     console.log("Selected Sale Data:", saleData);
//   };



//   return (
//     <CModal
//       onShow={() => false}
//       size="lg"
//       visible={pendingButtonModal}
//       onClose={() => setPendingButtonModal(false)}
//       className="closing-table"
//       backdrop="static"
//     >
//       <CModalHeader>
//         <CModalTitle>Pending Sales List</CModalTitle>
//       </CModalHeader>
//       <CModalBody>
//         <CNav variant="pills" role="tablist">
//           <CNavItem>
//             <CNavLink active={activeKey === 1} onClick={() => setActiveKey(1)}>
//               Counter Sale <span className="badge rounded-circle" style={{ padding: "3px 6px", fontSize: "12px" }}>
//                 {tabCounts[0]}
//               </span>
//             </CNavLink>
//           </CNavItem>
//         </CNav>

//         <CTabContent>
//           <CTabPane
//             role="tabpanel"
//             aria-labelledby="countersale"
//             visible={activeKey == 1}
//           >
//             <table className="table table-bordered border booking-or-table collection-table-style table-hover mode-2">
//               <thead className="thead-light">
//                 <tr>
//                   <th width="5%">#</th>
//                   <th width="15%">Sales Date</th>
//                   <th width="25%">Customer Name</th>
//                   <th width="2%">Items</th>
//                   <th width="18%">Total Sale</th>
//                   <th>Note</th>
//                   <th width="12%" colspan="2">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {saveSaleData.map((sale, index) => {
//                   if (sale.cartSumUp.deliveryMode == 1) {
//                     const date = new Date(sale.eat);
//                     const formattedDate = `${date.getFullYear()}-${String(
//                       date.getMonth() + 1
//                     ).padStart(2, "0")}-${String(date.getDate()).padStart(
//                       2,
//                       "0"
//                     )} ${String(date.getHours()).padStart(2, "0")}:${String(
//                       date.getMinutes()
//                     ).padStart(2, "0")}:${String(date.getSeconds()).padStart(
//                       2,
//                       "0"
//                     )}`;
//                     return (
//                       <tr key={index}>
//                         <td>{sale.psid}</td>
//                         <td>{formattedDate}</td>
//                         <td>
//                           {sale.selectedCustomerJson.customer_name}{" "}
//                           <small>({sale.selectedCustomerJson.mobile})</small>
//                         </td>
//                         <td align="center">
//                           {sale.productsInCart.length}
//                         </td>
//                         <td align="right">
//                           <i className="fa fa-inr"></i>{" "}
//                           {parseFloat(sale.cartSumUp.grandTotal).toFixed(2)}
//                           <br />
//                           <span style={{ lineHeight: "18px" }}>
//                             Tax: <i className="fa fa-inr"></i>
//                             {sale.cartSumUp.tax}{" "}
//                           </span>
//                         </td>
//                         <td></td>
//                         <td align="center">
//                           <CButton
//                             className="btn btn-xs btn-warning rounded-1 text-white"
//                             onClick={() => startSaleProcess(sale)}
//                           >
//                             <i className="fa fa-reply-all "></i> Process
//                           </CButton>
//                         </td>
//                         <td align="center">
//                           <CButton className="btn btn-xs btn-danger" onClick={() => deletePendingSale(sale.psid)}>
//                             <i className="fa fa-times"></i>
//                           </CButton>
//                         </td>
//                       </tr>
//                     );
//                   }
//                   return null;
//                 })}
//               </tbody>
//             </table>
//           </CTabPane>
//         </CTabContent>
//       </CModalBody>
//       <CModalFooter>
//         <CButton color="secondary" className="btn btn-sm btn-default" onClick={() => setPendingButtonModal(false)}>
//           Close
//         </CButton>
//       </CModalFooter>
//     </CModal>
//   );
// }

// export default PendingSaleModal;
