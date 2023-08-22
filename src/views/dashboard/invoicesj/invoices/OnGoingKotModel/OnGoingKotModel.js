import React from "react";
import {
  CCardHeader,
  CLink,
  CCardBody,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CNav,
  CModal,
  CNavItem,
  CNavLink,
  CDropdownMenu,
  CDropdownItem,
  CRow,
  CForm,
  CFormSelect,
  CDropdownToggle,
  CContainer,
  CCol,
  CTabContent,
  CTabPane,
  CModalFooter,
  CButton,
  CDropdown,
} from "@coreui/react";
import { useState } from "react";
const OnGoingKotModel = () => {
  const [returnModel, setReturnModel] = useState(false);
  const [openTable, setOpenTable] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <table className="table table-bordered border booking-or-table">
        <thead className="thead-light">
          <tr style={{ background: "#909090", color: "#ffffff" }}>
            <th width="20%">On Table</th>
            <th width="20%">Pending Bills </th>
            <th width="60%">Bills Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong
                style={{
                  background: "#fcf8e3",
                  fontWeight: "800",
                  padding: "5px 10px 5px 5px",
                }}
              >
                Table No. 9{" "}
                <span className="badge" style={{ marginLeft: "30%" }}>
                  1
                </span>
              </strong>
            </td>
            <td>
              <strong
                style={{
                  background: "#8a6d3b",
                  color: "white",
                  fontSize: "bold",
                  fontWeight: "900",
                  padding: "2px 11px 2px 11px",
                }}
              >
                DOOSY (AAKASH JI)
              </strong>
              <td style={{ background: "#fcf8e3" }}>
                <CLink onClick={() => setOpenTable(!openTable)}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                </CLink>

                <b style={{ padding: "2px 5px 1px 10px" }}>BNS/K2/2324/1383</b>
                <CLink
                  className="text-black pull-right"
                  onClick={() => setReturnModel(!returnModel)}
                >
                  <i className="fa fa-retweet"></i>
                </CLink>
                <br />
                <small>01-07-2023 10:38:15</small>
              </td>
            </td>

            {isChecked && openTable && (
              <table className="table table-bordered">
                <thead>
                  <tr style={{ background: "#909090", color: "#ffffff" }}>
                    <th width="60%">Product Details</th>
                    <th width="5%">Qty</th>
                    <th width="15%">Rate</th>
                    <th width="15%">Amount</th>
                    <th width="5%"> </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="4" style={{ background: "#efefef" }}>
                      KOT#: BNS/K2/2324/1383
                    </td>
                    <td style={{ background: "#efefef" }}>
                      <button className="btn btn-info btn-margin">
                        <i className="fa fa-print"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>MUSHROOM STUFFED BUN</td>
                    <td>1</td>
                    <td>&#8377; 180.00</td>
                    <td>&#8377; 180.00</td>
                    <td>&#x2713;</td>
                  </tr>
                  <tr>
                    <td>PANEER ROLL</td>
                    <td>1</td>
                    <td>&#8377; 140.00</td>
                    <td>&#8377; 140.00</td>
                    <td>&#x2713;</td>
                  </tr>
                  <tr>
                    <td
                      colspan="2"
                      align="end"
                      style={{ background: "#efefef" }}
                    >
                      Sub-Total
                    </td>
                    <td style={{ background: "#efefef" }}> 2 Item</td>
                    <td style={{ background: "#efefef" }}>&#8377; 320</td>
                    <td style={{ background: "#efefef" }}></td>
                  </tr>
                  <tr>
                    <td
                      colspan="3"
                      align="end"
                      style={{ background: "#efefef" }}
                    >
                      Tax GST (2.5% SGST)
                    </td>
                    <td style={{ background: "#efefef" }}>&#8377; 8.00</td>
                    <td style={{ background: "#efefef" }}></td>
                  </tr>
                  <tr>
                    <td
                      colspan="3"
                      align="end"
                      style={{ background: "#efefef" }}
                    >
                      Tax GST (2.5% CGST)
                    </td>
                    <td style={{ background: "#efefef" }}>&#8377; 8.00</td>
                    <td style={{ background: "#efefef" }}></td>
                  </tr>
                  <tr>
                    <td
                      colspan="3"
                      align="end"
                      style={{ background: "#efefef" }}
                    >
                      Grand-Total
                    </td>
                    <td style={{ background: "#efefef" }}>&#8377; 336.00</td>
                    <td style={{ background: "#efefef" }}></td>
                  </tr>
                </tbody>
                <td colspan="5">
                  <button
                    className="btn pay-btn"
                    type="button"
                    style={{
                      margin: "5% 0% 0% 35%",
                      width: "30%",
                      background: "#26b99a",
                    }}
                  >
                    <i
                      className="fa fa-file-text-o"
                      style={{
                        background: "#26b99a",
                        color: "white",
                      }}
                    ></i>
                    Create Bill
                  </button>
                </td>
              </table>
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default OnGoingKotModel;
