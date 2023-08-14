import React from "react";
import { CCol, CContainer, CRow } from "@coreui/react";
import { Link } from "react-router-dom";
const Zometo = ({ recentBooking }) => {
  return (
    <>
      <table className="table table-bordered booking-or-table">
        <thead className="thead-light">
          <tr style={{ background: "#909090", color: "#ffffff" }}>
            <th width="10%">Book#</th>
            <th width="12%">Invoice# / Invoice Date</th>
            <th width="12%">Customer Name</th>
            <th width="8%">Items</th>
            <th width="8%"> Total</th>
            <th width="8%">Discount</th>
            <th width="8%">Delivery</th>
            <th width="8%">Tax</th>
            <th width="8%">Round Off</th>
            <th width="8%"> Total Amount</th>
            <th width="8%">Note</th>
            <th width="12%" colSpan="4" className="text-center">
              Action
              <tr>
                <th>Print|</th>
                <th>Return</th>
              </tr>
            </th>
          </tr>
        </thead>
        <tbody>
          {recentBooking.slice(0, 1).map(({ sales_json }) => {
            let parsedSalesJson = null;
            try {
              parsedSalesJson = JSON.parse(sales_json);
              // console.log(parsedSalesJson, "38 home");
            } catch (error) {
              // return false;
              console.error("Error parsing sales_json:", error);
            }
            const total = Number(parsedSalesJson.cartSumUp.grandTotal);
            return (
              recentBooking
                // .slice(0, 1)
                .map(({ sales_json, salesid, invoice_no }) => {
                  try {
                    const parsedSalesJson = JSON.parse(sales_json);

                    const deliveryMode = parsedSalesJson.cartSumUp.deliveryMode;
                    const discount = parsedSalesJson.cartSumUp.discount;
                    const devileryCharge =
                      parsedSalesJson.cartSumUp.devileryCharges;

                    const roundoff = parsedSalesJson.cartSumUp.roundoff;
                    if (
                      parsedSalesJson.selectedCustomerJson.customer_name.slice(
                        0,
                        6
                      ) == "ZOMATO"
                    ) {
                      return (
                        <tr key={salesid}>
                          <td>{salesid}</td>
                          <td>
                            <Link to="" className="text-primary text-link">
                              {invoice_no}
                              <br />
                            </Link>
                            <small>{parsedSalesJson.cartSumUp.eat}</small>
                          </td>
                          <td>
                            {parsedSalesJson.selectedCustomerJson.customer_name}
                            <br />({parsedSalesJson.selectedCustomerJson.mobile}
                            )
                          </td>
                          <td className="text-center">
                            {parsedSalesJson.cartSumUp.items}
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
                            {Number(parsedSalesJson.cartSumUp.subTotal).toFixed(
                              2
                            )}
                          </td>
                          <td className="text-end">
                            {discount && Number(discount) !== 0 && (
                              <bold>
                                <span style={{ paddingRight: "3px" }}>
                                  &#8377;
                                </span>
                              </bold>
                            )}
                            {discount && Number(discount) !== 0
                              ? Number(discount).toFixed(2)
                              : " "}
                          </td>
                          <td className="text-end">
                            {devileryCharge && Number(devileryCharge) !== 0 && (
                              <bold>
                                <span style={{ paddingRight: "3px" }}>
                                  &#8377;
                                </span>
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
                            {Number(parsedSalesJson.cartSumUp.tax).toFixed(2)}
                          </td>
                          <td className="text-end">
                            {roundoff && Number(roundoff) !== 0 && (
                              <bold>
                                <span style={{ paddingRight: "3px" }}>
                                  &#8377;
                                </span>
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
                                  {parsedSalesJson.cartSumUp.payDetails
                                    ? parsedSalesJson.cartSumUp.payDetails.map(
                                        (p) => {
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
                                        }
                                      )
                                    : null}
                                </CCol>
                                <CCol className="text-end" style={{}}>
                                  {parsedSalesJson.cartSumUp.grandTotal &&
                                    Number(
                                      parsedSalesJson.cartSumUp.grandTotal
                                    ) !== 0 && (
                                      <bold>
                                        <span style={{ paddingRight: "3px" }}>
                                          &#8377;
                                        </span>
                                      </bold>
                                    )}
                                  {parsedSalesJson.cartSumUp.grandTotal &&
                                  Number(
                                    parsedSalesJson.cartSumUp.grandTotal
                                  ) !== 0
                                    ? Number(
                                        parsedSalesJson.cartSumUp.grandTotal
                                      ).toFixed(2)
                                    : " "}
                                </CCol>
                              </CRow>
                            </CContainer>
                          </td>
                          <td>{parsedSalesJson.cartSumUp.note}</td>
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
                      return null;

                      // console.log("false condition 121234234"); // Return null for rows that don't match the condition
                    }
                  } catch (error) {
                    console.error("Error parsing sales_json:", error);
                    return null;
                  }
                })
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default Zometo;
