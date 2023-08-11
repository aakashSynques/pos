import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CCol,
  CRow,
  CFormSelect,
  CFormCheck,
  CFormTextarea,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import { fetch } from "../../../utils";
const CustomizeModel = ({ customizeModelVisible, onClose }) => {
  const [customShapeList, setCustomShapeList] = useState([]);
  const [selectedShape, setSelectedShape] = useState(""); //

  const getCustomShapeList = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch("/api/custom/shape", "get", null, headers);
      setCustomShapeList(response.data.customShapeList[0]);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCustomShapeList();
  }, []);

  return (
    <div>
      <CModal
        visible={customizeModelVisible}
        onClose={onClose}
        size="lg"
        className="topping-modals cust-model"
      >
        <CModalHeader
          className="pt-3 pb-0"
          onClose={() => setCustomizeModelVisible(false)}
        >
          <CModalTitle>Apply Cake Customization</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md={6}>
              <CFormSelect
                id="inputCustomFlavor"
                label="Custom Flavor"
                className="rounded-0 input-dro-font"
              >
                <option>Select Flavor</option>
                <option>...</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormSelect
                id="inputCustomShape"
                label="Custom Shape"
                className="rounded-0 input-dro-font"
                value={selectedShape}
                onChange={(e) => setSelectedShape(e.target.value)} // Update the selected shape
              >
                <option value="">Select Shape</option>
                {customShapeList.map((shape) => (
                  <option key={shape.shape_id} value={shape.shape_id}>
                    {shape.shape_name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6} className="mt-3">
              <legend className="col-form-label pt-0">Custom Choice</legend>
              <label class="btn  btn-default rounded-0 border cust-radio">
                <CFormCheck
                  type="radio"
                  name="gridRadios"
                  id="gridRadios1"
                  value="option1"
                  label="Egg"
                  className="input-dro-font"
                  defaultChecked
                />{" "}
              </label>

              <label class="btn btn-default rounded-0  border cust-radio">
                <CFormCheck
                  type="radio"
                  name="gridRadios"
                  id="gridRadios2"
                  value="option2"
                  label="EggLess"
                  className="input-dro-font"
                />
              </label>
            </CCol>
            <CCol md={6} className="mt-3">
              <CFormSelect
                id="inputCustomShape"
                label="Custom Size"
                className="rounded-0 input-dro-font"
              >
                <option>Select Size</option>
                <option>...</option>
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow className="mt-2">
            <CCol md={6}>
              <legend className="col-form-label">Message On Cake</legend>
              <CFormTextarea rows={2} className="rounded-0 "></CFormTextarea>
              <span className="text-primary" style={{ fontSize: "11px" }}>
                Message length upto <span>250</span> characters.
              </span>

              <legend className="col-form-label pt-4">Message On Card</legend>
              <CFormTextarea rows={2} className="rounded-0 "></CFormTextarea>
              <span className="text-primary" style={{ fontSize: "11px" }}>
                Message length upto <span>250</span> characters.
              </span>

              <legend className="col-form-label pt-4">
                Extra Information / Product Note
              </legend>
              <CFormTextarea rows={2} className="rounded-0 "></CFormTextarea>
            </CCol>
            <CCol md={6} className="mt-3">
              <legend className="col-form-label pt-0">Custom Choice</legend>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="danger"
            onClick={() => setCustomizeModelVisible(false)}
          >
            Clear All [Alt + C]
          </CButton>
          <CButton color="success">Submit [Alt + Enter]</CButton>
          <CButton
            color="light"
            onClick={() => setCustomizeModelVisible(false)}
          >
            Cancel [Esc]
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default CustomizeModel;
