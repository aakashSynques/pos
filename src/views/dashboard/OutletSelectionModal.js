// import React, { useState } from 'react';

// const OutletSelectionModal = () => {
//   const [outletId, setOutletId] = useState(0);

//   const outletsAllList = [
//     {
//       "outlet_id": "1",
//       "outlet_name": "10 No. Market",
//       // rest of the data
//     },
//     // other outlet data
//   ];

//   const changeOutlet = (outletId) => {
//     setOutletId(outletId);
//     // Rest of the code for handling outlet selection
//     // ...
//   };

//   return (
//     <div className="modal-body">
//       {outletsAllList.map((outlet) => (
//         <button
//           key={outlet.outlet_id}
//           className="btn btn-default btn-block"
//           onClick={() => changeOutlet(outlet.outlet_id)}
//         >
//           <font size="3">
//             <b>{outlet.outlet_name}</b>
//           </font>
//           <br />
//           <font size="1">
//             {outlet.outlet_address}
//             <br />
//             {outlet.outlet_city}
//             <br />
//             {outlet.outlet_contact_no}
//           </font>
//         </button>
//       ))}
//     </div>
//   );
// };

// export default OutletSelectionModal;