import React from "react";
import { Link } from "react-router-dom";
import { CCol, CContainer, CRow } from "@coreui/react";
const RazorPay = ({ recentBooking }) => {
  return (
    <>
      <table className="table table-bordered booking-or-table">
        <thead className="thead-light">
          <tr style={{ background: "#909090", color: "#ffffff" }}>
            <th width="8%">Order#</th>
            <th width="12%">Invoice# / Invoice Date</th>
            <th width="5%">Delivery Mode / DateTime </th>

            <th width="12%">Customer Name</th>
            <th width="8%">Items</th>
            <th width="8%"> Total</th>
            <th width="8%">Discount</th>
            <th width="8%">Delivery</th>
            <th width="8%">Tax</th>
            <th width="5%">Round Off</th>
            <th width="8%"> Total Amount</th>
            <th width="8%">Note</th>
            <th width="18%" colSpan="4" className="text-center">
              Action
              <tr>
                <th>Print|</th>
                <th>Edit|</th>
                <th>Return</th>
              </tr>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan="15" style={{ background: "#e2e2e2" }}>
              Today(s) Orders
            </th>
          </tr>
          {recentBooking.map(({ sales_json, salesid, invoice_no }) => {
            try {
              const deliveryMode = sales_json.cartSumUp.deliveryMode;
              const discount = sales_json.cartSumUp.discount;
              const devileryCharge = sales_json.cartSumUp.devileryCharges;

              const roundoff = sales_json.cartSumUp.roundoff;

              const payModes = sales_json.cartSumUp.payDetails[0].payMode;

              if (
                (deliveryMode === "1" && payModes == "24") ||
                (deliveryMode === "2" && payModes == "24")
              ) {
                return (
                  <tr key={salesid}>
                    <td>{salesid}</td>

                    <td style={{ width: "17%" }}>
                      <Link to="" className="text-primary text-link">
                        {invoice_no}
                        <br />
                      </Link>
                      <small>{sales_json.cartSumUp.eat}</small>
                      <strong
                        className="status-btn"
                        style={{
                          fontWeight: "bold",
                          fontSize: "1em",
                          color: "white",
                          backgroundColor: "#f0ad4e",
                          height: "2%",
                          width: "2%",
                          marginLeft: "2%",
                        }}
                      >
                        Table#{" "}
                        <medium style={{ color: "black" }}>
                          {sales_json.cartSumUp.deliveryTableNo}
                        </medium>
                      </strong>
                    </td>
                    <td style={{ width: "9%" }}>
                      {deliveryMode == "2" ? (
                        <strong
                          className="status-btn"
                          style={{
                            fontWeight: "bold",
                            fontSize: "1em",
                            color: "white",
                            backgroundColor: "#f0ad4e",
                            height: "2%",
                            width: "2%",
                            marginLeft: "2%",
                          }}
                        >
                          on Table
                        </strong>
                      ) : null}
                    </td>
                    <td>
                      {sales_json.selectedCustomerJson.customer_name}
                      <br />({sales_json.selectedCustomerJson.mobile})
                    </td>
                    <td className="text-center">
                      {sales_json.cartSumUp.items}
                    </td>
                    <td className="text-end">
                      <bold>
                        <span
                          style={{
                            paddingRight: "3px",
                          }}
                        >
                          &#8377;
                        </span>
                      </bold>
                      {Number(sales_json.cartSumUp.subTotal).toFixed(2)}
                    </td>
                    <td className="text-end">
                      {discount && Number(discount) !== 0 && (
                        <bold>
                          <span style={{ paddingRight: "3px" }}>&#8377;</span>
                        </bold>
                      )}
                      {discount && Number(discount) !== 0
                        ? Number(discount).toFixed(2)
                        : " "}
                    </td>
                    <td className="text-end">
                      {devileryCharge && Number(devileryCharge) !== 0 && (
                        <bold>
                          <span style={{ paddingRight: "3px" }}>&#8377;</span>
                        </bold>
                      )}
                      {devileryCharge && Number(devileryCharge) !== 0
                        ? Number(devileryCharge).toFixed(2)
                        : " "}
                    </td>

                    <td className="text-end">
                      <bold>
                        <span
                          style={{
                            paddingRight: "3px",
                          }}
                        >
                          &#8377;
                        </span>
                      </bold>
                      {Number(sales_json.cartSumUp.tax).toFixed(2)}
                    </td>
                    <td className="text-end">
                      {roundoff && Number(roundoff) !== 0 && (
                        <bold>
                          <span style={{ paddingRight: "3px" }}>&#8377;</span>
                        </bold>
                      )}
                      {roundoff && Number(roundoff) !== 0
                        ? Number(roundoff).toFixed(2)
                        : " "}
                    </td>
                    <td className="text-end" style={{ width: "15%" }}>
                      <CContainer>
                        <CRow>
                          <CCol
                            style={{
                              // background: "red",
                              padding: "3px",
                              textAlign: "left",
                            }}
                          >
                            {sales_json.cartSumUp.payDetails
                              ? sales_json.cartSumUp.payDetails.map((p) => {
                                  return (
                                    <span className="text-start">
                                      {p.payMode == "1" ? (
                                        <strong
                                          className="status-btn"
                                          style={{
                                            fontWeight: "bold",
                                            fontSize: "1.1em",
                                            color: "white",
                                            backgroundColor: "#777777",
                                            padding: "2px",
                                          }}
                                        >
                                          C<br />
                                        </strong>
                                      ) : p.payMode == "6" ? (
                                        <strong
                                          className="status-btn"
                                          style={{
                                            fontWeight: "bold",
                                            fontSize: "1em",
                                            color: "white",
                                            backgroundColor: "#777777",
                                            padding: "2px",
                                          }}
                                        >
                                          W<br />
                                        </strong>
                                      ) : p.payMode == "24" ? (
                                        <strong
                                          className="status-btn"
                                          style={{
                                            fontWeight: "bold",
                                            fontSize: "1em",
                                            color: "white",
                                            backgroundColor: "#777777",
                                            padding: "2px",
                                          }}
                                        >
                                          Rzp
                                          <br />
                                        </strong>
                                      ) : p.payMode == "25" ? (
                                        <strong
                                          className="status-btn"
                                          style={{
                                            fontWeight: "bold",
                                            fontSize: "1em",
                                            color: "white",
                                            backgroundColor: "#1a82c3",
                                            padding: "2px",
                                          }}
                                        >
                                          (HDFC 2)
                                        </strong>
                                      ) : p.payMode == "26" ? (
                                        <strong
                                          className="status-btn"
                                          style={{
                                            fontWeight: "bold",
                                            fontSize: "1em",
                                            color: "white",
                                            backgroundColor: "#777777",
                                            padding: "2px",
                                          }}
                                        >
                                          HDFC QR
                                        </strong>
                                      ) : null}
                                    </span>
                                  );
                                })
                              : null}
                          </CCol>
                          <CCol className="text-end">
                            {sales_json.cartSumUp.grandTotal &&
                              Number(sales_json.cartSumUp.grandTotal) !== 0 && (
                                <bold>
                                  <span style={{ paddingRight: "3px" }}>
                                    &#8377;
                                  </span>
                                </bold>
                              )}
                            {sales_json.cartSumUp.grandTotal &&
                            Number(sales_json.cartSumUp.grandTotal) !== 0
                              ? Number(sales_json.cartSumUp.grandTotal).toFixed(
                                  2
                                )
                              : " "}
                          </CCol>
                        </CRow>
                      </CContainer>
                    </td>
                    <td>{sales_json.cartSumUp.note}</td>
                    <td>
                      <button className="btn btn-success btn-margin">
                        <i className="fa fa-print"></i>
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-info btn-margin">
                        <i className="fa fa-edit"></i>
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-danger btn-margin">
                        <i className="fa fa-share-square-o"></i>
                      </button>
                    </td>
                  </tr>
                );
              } else {
                return null; // Return null for rows that don't match the condition
              }
            } catch (error) {
              // console.error("Error parsing sales_json:", error);
              return null;
            }
          })}
          <tr>
            <th colSpan="15" style={{ background: "#e2e2e2" }}>
              Future Orders
            </th>
          </tr>
          {recentBooking.map(({ sales_json, salesid, invoice_no }) => {
            try {
              const deliveryMode = sales_json.cartSumUp.deliveryMode;
              const discount = sales_json.cartSumUp.discount;
              const devileryCharge = sales_json.cartSumUp.devileryCharges;

              const roundoff = sales_json.cartSumUp.roundoff;

              const payModes = sales_json.cartSumUp.payDetails[0].payMode;

              if (
                (deliveryMode === "1" && payModes == "24") ||
                (deliveryMode === "3" && payModes == "24") ||
                (deliveryMode === "4" && payModes == "24")
              ) {
                return (
                  <tr key={salesid}>
                    <td>{salesid}</td>

                    <td style={{ width: "17%" }}>
                      <Link to="" className="text-primary text-link">
                        {invoice_no}
                        <br />
                      </Link>
                      <small>{sales_json.cartSumUp.eat}</small>
                    </td>
                    <td style={{ width: "9%" }}>
                      {deliveryMode == "3" ? (
                        <strong
                          className="status-btn"
                          style={{
                            fontWeight: "bold",
                            fontSize: "1em",
                            color: "white",
                            backgroundColor: "#1a82c3",
                            height: "2%",
                            width: "2%",
                            marginLeft: "2%",
                          }}
                        >
                          PickUp
                        </strong>
                      ) : deliveryMode == "2" ? (
                        <strong
                          className="status-btn"
                          style={{
                            fontWeight: "bold",
                            fontSize: "1em",
                            color: "white",
                            backgroundColor: "#f0ad4e",
                            height: "2%",
                            width: "2%",
                            marginLeft: "2%",
                          }}
                        >
                          on Table
                        </strong>
                      ) : deliveryMode == "4" ? (
                        <strong
                          className="status-btn"
                          style={{
                            fontWeight: "bold",
                            fontSize: "1em",
                            color: "white",
                            backgroundColor: "#d9534f",
                            height: "2%",
                            width: "2%",
                            marginLeft: "2%",
                          }}
                        >
                          Home Delivery
                        </strong>
                      ) : null}
                      <br />
                      <small>{sales_json.cartSumUp.deliveryDate}</small>
                      <br />
                      <small>{sales_json.cartSumUp.deliveryTime}</small>
                    </td>
                    <td>
                      {sales_json.selectedCustomerJson.customer_name}
                      <br />({sales_json.selectedCustomerJson.mobile})
                    </td>
                    <td className="text-center">
                      {sales_json.cartSumUp.items}
                    </td>
                    <td className="text-end">
                      <bold>
                        <span
                          style={{
                            paddingRight: "3px",
                          }}
                        >
                          &#8377;
                        </span>
                      </bold>
                      {Number(sales_json.cartSumUp.subTotal).toFixed(2)}
                    </td>
                    <td className="text-end">
                      {discount && Number(discount) !== 0 && (
                        <bold>
                          <span style={{ paddingRight: "3px" }}>&#8377;</span>
                        </bold>
                      )}
                      {discount && Number(discount) !== 0
                        ? Number(discount).toFixed(2)
                        : " "}
                    </td>
                    <td className="text-end">
                      {devileryCharge && Number(devileryCharge) !== 0 && (
                        <bold>
                          <span style={{ paddingRight: "3px" }}>&#8377;</span>
                        </bold>
                      )}
                      {devileryCharge && Number(devileryCharge) !== 0
                        ? Number(devileryCharge).toFixed(2)
                        : " "}
                    </td>

                    <td className="text-end">
                      <bold>
                        <span
                          style={{
                            paddingRight: "3px",
                          }}
                        >
                          &#8377;
                        </span>
                      </bold>
                      {Number(sales_json.cartSumUp.tax).toFixed(2)}
                    </td>
                    <td className="text-end">
                      {roundoff && Number(roundoff) !== 0 && (
                        <bold>
                          <span style={{ paddingRight: "3px" }}>&#8377;</span>
                        </bold>
                      )}
                      {roundoff && Number(roundoff) !== 0
                        ? Number(roundoff).toFixed(2)
                        : " "}
                    </td>
                    <td className="text-end" style={{ width: "15%" }}>
                      <CContainer>
                        <CRow>
                          <CCol
                            style={{
                              // background: "red",
                              padding: "3px",
                              textAlign: "left",
                            }}
                          >
                            {sales_json.cartSumUp.payDetails
                              ? sales_json.cartSumUp.payDetails.map((p) => {
                                  return (
                                    <span className="text-start">
                                      {p.payMode == "1" ? (
                                        <strong
                                          className="status-btn"
                                          style={{
                                            fontWeight: "bold",
                                            fontSize: "1.1em",
                                            color: "white",
                                            backgroundColor: "#777777",
                                            padding: "2px",
                                          }}
                                        >
                                          C<br />
                                        </strong>
                                      ) : p.payMode == "6" ? (
                                        <strong
                                          className="status-btn"
                                          style={{
                                            fontWeight: "bold",
                                            fontSize: "1em",
                                            color: "white",
                                            backgroundColor: "#777777",
                                            padding: "2px",
                                          }}
                                        >
                                          W<br />
                                        </strong>
                                      ) : p.payMode == "24" ? (
                                        <strong
                                          className="status-btn"
                                          style={{
                                            fontWeight: "bold",
                                            fontSize: "1em",
                                            color: "white",
                                            backgroundColor: "#777777",
                                            padding: "2px",
                                          }}
                                        >
                                          Rzp
                                          <br />
                                        </strong>
                                      ) : p.payMode == "25" ? (
                                        <strong
                                          className="status-btn"
                                          style={{
                                            fontWeight: "bold",
                                            fontSize: "1em",
                                            color: "white",
                                            backgroundColor: "#1a82c3",
                                            padding: "2px",
                                          }}
                                        >
                                          (HDFC 2)
                                        </strong>
                                      ) : p.payMode == "26" ? (
                                        <strong
                                          className="status-btn"
                                          style={{
                                            fontWeight: "bold",
                                            fontSize: "1em",
                                            color: "white",
                                            backgroundColor: "#777777",
                                            padding: "2px",
                                          }}
                                        >
                                          HDFC QR
                                        </strong>
                                      ) : null}
                                    </span>
                                  );
                                })
                              : null}
                          </CCol>
                          <CCol className="text-end">
                            {sales_json.cartSumUp.grandTotal &&
                              Number(sales_json.cartSumUp.grandTotal) !== 0 && (
                                <bold>
                                  <span style={{ paddingRight: "3px" }}>
                                    &#8377;
                                  </span>
                                </bold>
                              )}
                            {sales_json.cartSumUp.grandTotal &&
                            Number(sales_json.cartSumUp.grandTotal) !== 0
                              ? Number(sales_json.cartSumUp.grandTotal).toFixed(
                                  2
                                )
                              : " "}
                          </CCol>
                        </CRow>
                      </CContainer>
                    </td>
                    <td>{sales_json.cartSumUp.note}</td>
                    <td>
                      <button className="btn btn-success btn-margin">
                        <i className="fa fa-print"></i>
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-info btn-margin">
                        <i className="fa fa-edit"></i>
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-danger btn-margin">
                        <i className="fa fa-share-square-o"></i>
                      </button>
                    </td>
                  </tr>
                );
              } else {
                return null; // Return null for rows that don't match the condition
              }
            } catch (error) {
              // console.error("Error parsing sales_json:", error);
              return null;
            }
          })}
        </tbody>
      </table>
    </>
  );
};
export default RazorPay;
