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
import { useDispatch, useSelector } from "react-redux";
import {
  setupdateCustomizInCart,
  setProductNoteInCart,
  setClearCustomizationInCart,
} from "../../../action/actions";

const CustomizeModel = ({
  customizeModelVisible,
  onClose,
  productId,
  item,
  setVisibleNote,
}) => {
  const [customShapeList, setCustomShapeList] = useState([]);
  const dispatch = useDispatch();
  const [extraProdNote, setExtraProdNote] = useState("");
  const cartItemsArray = useSelector((state) => state.cart.cartItems);
  const [customFlavorList, setCustomFlavorList] = useState([]);
  const [customSizeList, setCustomSizeList] = useState([]);
  const [photoMode, setPhotoMode] = useState(1); // 1 for Gallery, 2 for Upload
  const [selectedImage, setSelectedImage] = useState(null);

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

  const getCustomFlavor = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch("/api/custom/flavour", "get", null, headers);
      setCustomFlavorList(response.data.customFlavourList[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const getCustomSize = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch("/api/custom/size", "get", null, headers);
      setCustomSizeList(response.data.customSizeList[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCustomShapeList();
    getCustomFlavor();
    getCustomSize();
  }, []);

  useEffect(() => {
    setExtraProdNote(item.is_prod_note);
  }, [item.is_prod_note]);

  const [formData, setFormData] = useState({
    choice_id: "",
    choice_name: "",
    flavor_id: "",
    flavor_name: "",
    message_on_cake: "",
    message_on_card: "",
    photo_mode_id: "",
    photo_mode_name: "",
    photo_path: [],
    shape_id: "",
    shape_name: "",
    size_id: "",
    size_name: "",
  });

  const handleFormSubmit = () => {
    const customjsonData = {
      choice_id: formData.choice_id,
      choice_name: formData.choice_name,
      flavor_id: formData.flavor_id,
      flavor_name: formData.flavor_name,
      message_on_cake: formData.message_on_cake,
      message_on_card: formData.message_on_card,
      photo_mode_id: formData.photo_mode_id,
      photo_mode_name: formData.photo_mode_name,
      photo_path: formData.photo_path,
      shape_id: formData.shape_id,
      shape_name: formData.shape_name,
      size_id: formData.size_id,
      size_name: formData.size_name,
    };

console.log("imge datA", customjsonData)

    let newCartWithNote = [];
    if (extraProdNote !== "") {
      setVisibleNote(true);
      const noteDispatch = () => {
        let disp = dispatch(
          setProductNoteInCart(cartItemsArray, productId, extraProdNote)
        );
        newCartWithNote = disp.payload;
        return newCartWithNote;
      };
      noteDispatch();
    }

    dispatch(
      setupdateCustomizInCart(
        newCartWithNote.length > 0 ? newCartWithNote : cartItemsArray,
        productId,
        customjsonData
      )
    );

    onClose();
  };

  const handlePhotoModeChange = (mode) => {
    setPhotoMode(mode);
    setSelectedImage(null);
    const photo_mode_id = mode.toString();
    const photo_mode_name = mode === 1 ? "Gallery" : "Upload";
    setFormData({
      ...formData,
      photo_mode_id,
      photo_mode_name,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFormData({
        ...formData,
        photo_path: [file], // Store the selected file object in the formData
      });
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <CModal
        visible={customizeModelVisible}
        onClose={onClose}
        size="lg"
        className="topping-modals cust-model"
      >
        <CModalHeader className="pt-3 pb-0" onClose={onClose}>
          <CModalTitle>Apply Cake Customization</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md={6}>
              <CFormSelect
                id="inputCustomFlavor"
                label="Custom Flavor"
                className="rounded-0 input-dro-font font-size-2"
                labelClassName="font-size-2"
                value={formData.flavor_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    flavor_id: e.target.value,
                    flavor_name: e.target.selectedOptions[0].label,
                  })
                }
              >
                <option value="">Select Flavor</option>
                {customFlavorList.map((flavor) => (
                  <option
                    key={flavor.flavor_id}
                    value={flavor.flavor_id}
                    style={{ fontSize: "14px", lineHeight: "14px" }}
                  >
                    {flavor.flavor_name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormSelect
                id="inputCustomShape"
                label="Custom Shape"
                className="rounded-0 input-dro-font"
                value={formData.shape_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shape_id: e.target.value,
                    shape_name: e.target.selectedOptions[0].label,
                  })
                }
              >
                <option value="">Select Shape</option>
                {customShapeList.map((shape) => (
                  <option
                    key={shape.shape_id}
                    value={shape.shape_id}
                    style={{ fontSize: "14px", lineHeight: "14px" }}
                  >
                    {shape.shape_name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6} className="mt-3">
              <legend className="col-form-label pt-0">Custom Choice</legend>
              <label className="btn  btn-default rounded-0 border cust-radio">
                <CFormCheck
                  type="radio"
                  name="customChoice"
                  id="choiceRadios1"
                  value="1"
                  label="Egg"
                  className="input-dro-font"
                  checked={formData.choice_id === "1"}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      choice_id: "1",
                      choice_name: "Egg",
                    })
                  }
                  defaultChecked
                />
              </label>
              <label className="btn btn-default rounded-0  border cust-radio">
                <CFormCheck
                  type="radio"
                  name="customChoice"
                  id="choiceRadios2"
                  value="2"
                  label="EggLess"
                  className="input-dro-font"
                  checked={formData.choice_id === "2"}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      choice_id: "2",
                      choice_name: "EggLess",
                    })
                  }
                />
              </label>
            </CCol>
            <CCol md={6} className="mt-3">
              <CFormSelect
                id="inputCustomSize"
                label="Custom Size"
                className="rounded-0 input-dro-font"
                value={formData.size_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    size_id: e.target.value,
                    size_name: e.target.selectedOptions[0].label,
                  })
                }
              >
                <option>Select Size</option>
                {customSizeList.map((size) => (
                  <option
                    key={size.size_id}
                    value={size.size_id}
                    style={{ fontSize: "14px", lineHeight: "14px" }}
                  >
                    {size.size_name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow className="mt-2">
            <CCol md={6}>
              <legend className="col-form-label">Message On Cake</legend>
              <CFormTextarea
                rows={2}
                className="rounded-0 "
                value={formData.message_on_cake}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message_on_cake: e.target.value,
                  })
                }
              ></CFormTextarea>
              <span className="text-primary" style={{ fontSize: "11px" }}>
                Message length up to <span>250</span> characters.
              </span>

              <legend className="col-form-label pt-4">Message On Card</legend>
              <CFormTextarea
                rows={2}
                className="rounded-0 "
                value={formData.message_on_card}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message_on_card: e.target.value,
                  })
                }
              ></CFormTextarea>
              <span className="text-primary" style={{ fontSize: "11px" }}>
                Message length up to <span>250</span> characters.
              </span>

              <legend className="col-form-label pt-4">
                Extra Information / Product Note
              </legend>
              <CFormTextarea
                rows={2}
                className="rounded-0"
                value={extraProdNote}
                onChange={(e) => setExtraProdNote(e.target.value)}
              ></CFormTextarea>
            </CCol>
            <div className="col-sm-6 col-xs-12">
              <div className="row">
                <div className="hidden-sm col-xs-12">&nbsp;</div>
                <div className="col-sm-2 col-xs-4">
                  <legend className="col-form-label">Photo</legend>
                </div>
                <div className="col-sm-10 col-xs-8">
                  <label
                    className={`btn btn-xs btn-default img-upload-btn ${
                      photoMode === 1 ? "active" : ""
                    }`}
                    onClick={() => handlePhotoModeChange(1)}
                  >
                    <input
                      type="radio"
                      name="gallery"
                      value="1"
                      checked={photoMode === 1}
                      readOnly
                      data-label="Gallery"
                    />
                    Photo Gallery
                  </label>
                  <label
                    className={`btn btn-xs btn-default img-upload-btn ${
                      photoMode === 2 ? "active" : ""
                    }`}
                    onClick={() => handlePhotoModeChange(2)}
                  >
                    <input
                      type="radio"
                      name="upload"
                      data-label="Upload"
                      value="2"
                      checked={photoMode === 2}
                      readOnly
                    />
                    Upload Photo
                  </label>
                </div>
              </div>

              {photoMode === 1 && (
                <>
                  <CButton
                    type="file"
                    color="warning"
                    className="w-100 mt-3 font text-white"
                    style={{ fontSize: "13px" }}
                  >
                    <i className="fa fa-picture-o"></i> Browse Cake Gallery
                  </CButton>
                </>
              )}
              {photoMode === 2 && (
                <div className="row">
                  <div className="col-sm-12 col-xs-12 mt-3">
                    <input
                      type="file"
                      className="form-control rounded-0 input-dro-font p-1"
                      name=""
                      onChange={handleImageUpload}
                    />
                  </div>
                  <small className="text-danger" style={{ fontSize: "11px" }}>
                    (only .jpg/.png/.gif allowed, Max 2048px * 2048px, up to
                    2MB)
                  </small>
                </div>
              )}

              <div className="row">
                <div className="col-sm-12 col-xs-12 align-center">
                  <center>
                    {selectedImage && (
                      <div className="pull-left">
                        <img
                          src={selectedImage}
                          alt="Selected"
                          style={{ margin: "10px 5px", padding: "2px" }}
                          width="80"
                          className="text-center img-thumbnail img-responsive"
                        />
                        <br />
                        <button
                          onClick={removeImage}
                          className="btn btn-xs btn-danger"
                        >
                          <i className="fa fa-trash"></i> Remove
                        </button>
                      </div>
                    )}
                  </center>
                </div>
              </div>
            </div>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="danger"
            onClick={() => {
              dispatch(
                setClearCustomizationInCart(cartItemsArray, item.prod_id)
              );
              onClose();
            }}
          >
            Clear All [Alt + C]
          </CButton>
          <CButton color="success" onClick={handleFormSubmit}>
            Submit [Alt + Enter]
          </CButton>
          <CButton color="light" onClick={onClose}>
            Cancel [Esc]
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default CustomizeModel;
