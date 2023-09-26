// import { CCol } from "@coreui/react";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { updateTotalCash } from "../../../../../action/actions";

// const CashDenominationTbl = () => {

//   const denominationsDescending = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

//   // const totalCash = useSelector((state) => state.totalCash);
//   const dispatch = useDispatch();
//   // State to store denomination counts
//   const [denominationCounts, setDenominationCounts] = useState(
//     Object.fromEntries(
//       denominationsDescending.map((denomination) => [denomination, 0])
//     )
//   );

//   // Function to handle changes in denomination counts
//   const handleDenominationChange = (e, denomination) => {
//     // Remove leading zeros when parsing the input value
//     const value = e.target.value.replace(/^0+/, "");
//     setDenominationCounts((prevCounts) => ({
//       ...prevCounts,
//       [denomination]: value === "" ? 0 : parseInt(value, 10),
//     }));
//   };

//   // Calculate total cash and total count
//   const totalCash = Object.keys(denominationCounts).reduce(
//     (acc, denomination) =>
//       acc + denominationCounts[denomination] * parseFloat(denomination),
//     0
//   );
//   dispatch(updateTotalCash(totalCash));
//   console.log('dfsadf', dispatch(updateTotalCash(totalCash)));

//   const totalCount = Object.values(denominationCounts).reduce(
//     (acc, count) => acc + count,
//     0
//   );

//   return (
//     <>
//       <CCol sm={4}>
//         <h6>
//           <b>Cash Denomination</b>{" "}
//         </h6>
//         <table className="table table-bordered collection-table-style table-hover mode-2">
//           <thead>
//             <tr>
//               <th width="30%" className="bg-light table-titlse-style">
//                 Note/Coin (INR)
//               </th>
//               <th width="10%" className="bg-light table-titlse-style">
//                 &nbsp;
//               </th>
//               <th width="25%" className="bg-light table-titlse-style">
//                 Count(s)
//               </th>
//               <th width="30%" className="bg-light table-titlse-style">
//                 Total
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {denominationsDescending.map((denomination) => (
//               <tr key={denomination} valign="middle">
//                 <td align="right">{denomination}.00&nbsp;</td>
//                 <td align="center">x</td>
//                 <td align="center">
//                   <input
//                     type="text"
//                     className="form-control input-sm denominationList rounded-0"
//                     style={{
//                       textAlign: "center",
//                       height: "23px",
//                       width: "70px",
//                       fontSize: "13px",
//                     }}
//                     maxLength="5"
//                     value={denominationCounts[denomination]}
//                     onChange={(e) => handleDenominationChange(e, denomination)}
//                   />
//                 </td>
//                 <td align="right">
//                   {denominationCounts[denomination] > 0
//                     ? (
//                         denominationCounts[denomination] *
//                         parseFloat(denomination)
//                       ).toFixed(2)
//                     : "-"}
//                 </td>
//               </tr>
//             ))}
//             <tr>
//               <th colSpan="2" align="right" className="bg-light">
//                 Total Cash
//               </th>
//               <td style={{ textAlign: "center" }} className="bg-light">
//                 {totalCount}
//               </td>
//               <td style={{ textAlign: "right" }} className="bg-light">
//                 {totalCash.toFixed(2)}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </CCol>
//     </>
//   );
// };

// export default CashDenominationTbl;

import { CCol } from "@coreui/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTotalCash } from "../../../../../action/actions";

const CashDenominationTbl = () => {
  const denominationsDescending = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
  const dispatch = useDispatch();

  // State to store denomination counts
  const [denominationCounts, setDenominationCounts] = useState(
    Object.fromEntries(
      denominationsDescending.map((denomination) => [denomination, 0])
    )
  );

  // Function to handle changes in denomination counts
  const handleDenominationChange = (e, denomination) => {
    // Remove leading zeros when parsing the input value
    const value = e.target.value.replace(/^0+/, "");
    setDenominationCounts((prevCounts) => ({
      ...prevCounts,
      [denomination]: value === "" ? 0 : parseInt(value, 10),
    }));
  };

  // Calculate total count
  const totalCount = Object.values(denominationCounts).reduce(
    (acc, count) => acc + count,
    0
  );


  const totalCash = Object.keys(denominationCounts).reduce(
    (acc, denomination) =>
      acc + denominationCounts[denomination] * parseFloat(denomination),
    0
  );
  dispatch(updateTotalCash(totalCash)); // Dispatch the action with the calculated totalCash

  

  return (
    <>
      <CCol sm={4}>
        <h6>
          <b>Cash Denomination</b>{" "}
        </h6>
        <table className="table table-bordered collection-table-style table-hover mode-2">
          <thead>
            <tr>
              <th width="30%" className="bg-light table-titlse-style">
                Note/Coin (INR)
              </th>
              <th width="10%" className="bg-light table-titlse-style">
                &nbsp;
              </th>
              <th width="25%" className="bg-light table-titlse-style">
                Count(s)
              </th>
              <th width="30%" className="bg-light table-titlse-style">
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            {denominationsDescending.map((denomination) => (
              <tr key={denomination} valign="middle">
                <td align="right">{denomination}.00&nbsp;</td>
                <td align="center">x</td>
                <td align="center">
                  <input
                    type="text"
                    className="form-control input-sm denominationList rounded-0"
                    style={{
                      textAlign: "center",
                      height: "23px",
                      width: "70px",
                      fontSize: "13px",
                    }}
                    maxLength="5"
                    value={denominationCounts[denomination]}
                    onChange={(e) => handleDenominationChange(e, denomination)}
                  />
                </td>
                <td align="right">
                  {denominationCounts[denomination] > 0
                    ? (
                        denominationCounts[denomination] *
                        parseFloat(denomination)
                      ).toFixed(2)
                    : "-"}
                </td>
              </tr>
            ))}
            <tr>
              <th colSpan="2" align="right" className="bg-light">
                Total Cash
              </th>
              <td style={{ textAlign: "center" }} className="bg-light">
                {totalCount}
              </td>
              <td style={{ textAlign: "right" }} className="bg-light">
                {totalCash.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </CCol>
    </>
  );
};

export default CashDenominationTbl;
