import {
  CButton,
  CCollapse,
  CCardBody,
  CCard,
  CFormTextarea,
} from "@coreui/react";
import React, { useState } from "react";

const AnyNotes = () => {
  const [anynote, setAnyNote] = useState(false);

  return (
    <>
      <div onClick={() => setAnyNote(!anynote)} className="pt-2">
        Any Note <small>[F3]</small> <i class="fa fa-plus-square"></i>
      </div>
      <CCollapse visible={anynote}>
        <CFormTextarea
          placeholder="Note"
          className="cart-note"
          rows={5}
        ></CFormTextarea>
      </CCollapse>
    </>
  );
};

export default AnyNotes;
