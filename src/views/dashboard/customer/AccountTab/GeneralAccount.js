

import React from 'react'
import { CCol, CContainer, CRow } from "@coreui/react";

const GeneralAccount = () => {
  return (
      <>
           <table className="table table-bordered border booking-or-table">
        <thead className="thead-light">
          <tr style={{ background: "#909090", color: "#ffffff" }}>
            <th width="5%">#</th>
            <th width="15%">Narration</th>
            <th width="8%">Mode</th>
            <th width="12%">Bank Ref</th>
            <th width="10%">Debit</th>
            <th width="10%">Credit</th>
            <th width="10%">Balance</th>
            <th width="8%">Outlet</th>
            <th width="8%">Entry</th>
            <th width="15%">DateTime</th>
            {/* <th width="12%" colSpan="4">
              Action
              <tr>
                <th>Print|</th>
                <th>Edit|</th>
                <th>Return</th>
              </tr>
            </th> */}
          </tr>
        </thead>
        <tbody>
          <center className="text-center">NO data Found</center>
        </tbody>
      </table>

   </>
  )
}

export default GeneralAccount