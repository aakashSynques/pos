import { CButton } from '@coreui/react'
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";

const DiscardSaleBtn = () => {


 return (
    <div>
       <CButton        
       className="light-outlet light-outlet3"
       style={{ background: "#d9534f" }} 
       >
          <b>Discard Sale</b>
          <p>[Shift + Ctrl + Delete]</p>
        </CButton>
    </div>
  )
}
  
export default DiscardSaleBtn
