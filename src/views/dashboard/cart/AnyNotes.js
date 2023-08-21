import {
  CButton,
  CCollapse,
  CCardBody,
  CCard,
  CFormTextarea,
} from "@coreui/react";
import React, { useState, useEffect, useRef } from "react";


const AnyNotes = () => {

  const [anynote, setAnyNote] = useState(false);
  const textareaRef = useRef(null); // Create a ref to the textarea element

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "F3") {
        setAnyNote(!anynote);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [anynote]);

  useEffect(() => {
    if (anynote && textareaRef.current) {
      textareaRef.current.focus(); // Focus on the textarea when note becomes visible
    }
  }, [anynote]);


  return (
    <>
      <div onClick={() => setAnyNote(!anynote)} className="pt-2 pb-2">
        Any Note <small>[F3]</small> <i className="fa fa-plus-square"></i>
      </div>
      <CCollapse visible={anynote}>
        <CFormTextarea
          ref={textareaRef} // Attach the ref to the textarea element
          placeholder="Note"
          className={`cart-note mb-4 ${anynote ? 'focused' : ''}`} // Apply 'focused' class when note is visible
          rows={5}
        ></CFormTextarea>
      </CCollapse>
    </>
  );
};

export default AnyNotes;


