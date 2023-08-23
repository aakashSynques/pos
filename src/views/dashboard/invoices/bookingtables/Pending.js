import {
  CContainer,
  CRow,
  CCol,
  CCardHeader,
  CLink,
  CCardBody,
  CCard,
} from "@coreui/react";
import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { Link } from "react-router-dom";
import PendingPrintModal from "../pendingComponent/PendingPrintModal";

const Pending = ({ pendingBooking }) => {
  const [printBooking, setPrintBooking] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState();

  const clickInvoiceLink = (booking_no, booking_json) => {
    setPrintBooking(!printBooking);
    setInvoiceDetails({ [booking_no]: booking_json });
  };
  return (
    <>
      <table className="table table-bordered booking-or-table">
        <thead className="thead-light">
          <tr style={{ background: "#909090", color: "#ffffff" }}>
            <th width="12%">Book#</th>
            <th width="14%">Delivery Mode</th>
            <th width="15%">Customer Name</th>
            <th width="20%">Receiver Name</th>
            <th width="10%">Items</th>
            <th width="10%">Order Amount</th>
            <th width="12%">Advance</th>
            <th width="6%">Due Balance</th>
            <th width="10%" colSpan="4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {pendingBooking &&
            pendingBooking.map(({ booking_no, booking_json }) => {
              return (
                <tr>
                  <td>
                    <Link
                      href=""
                      className="text-primary text-link"
                      onClick={() => clickInvoiceLink(booking_no, booking_json)}
                    >
                      {booking_no}
                    </Link>
                    <br />
                    <small>
                      {booking_json.cartSumUp.eat}
                      <br />
                      Booked By : {booking_json.cartSumUp.salesUser.user_name}
                    </small>
                  </td>
                  <td>
                    <CRow>
                      <CCol xs={5} className="text-end p-0 ">
                        {booking_json.cartSumUp.deliveryDate}
                        <br />
                        <strong>{booking_json.cartSumUp.deliveryTime}</strong>
                      </CCol>
                      <CCol xs={6} className="text-center p-0">
                        {booking_json.cartSumUp.deliveryMode == "1" ? (
                          <label className="label label-primary p-0 pull-right">
                            Counter Sale
                          </label>
                        ) : booking_json.cartSumUp.deliveryMode == "2" ? (
                          <label className="label label-primary p-0 pull-right">
                            On Table
                          </label>
                        ) : booking_json.cartSumUp.deliveryMode == "3" ? (
                          <label className="label label-primary  p-[2px] pull-right">
                            PickUP
                          </label>
                        ) : booking_json.cartSumUp.deliveryMode == "4" ? (
                          <label className="label label-danger ml-1 p-[1px] pull-right">
                            Home Delivery
                          </label>
                        ) : null}
                      </CCol>
                    </CRow>
                  </td>
                  <td>
                    {booking_json.selectedCustomerJson.customer_name}
                    <small style={{ color: "gray" }}>
                      {" "}
                      {booking_json.selectedCustomerJson.mobile}
                    </small>
                    <br />
                    <small>
                      {booking_json.selectedCustomerJson.address ==
                      "" ? null : (
                        <div>
                          <i className="fa fa-map-marker"></i>{" "}
                          {booking_json.selectedCustomerJson.address}
                        </div>
                      )}
                    </small>
                  </td>
                  <td>
                    {booking_json.cartSumUp.receiverName}
                    <small style={{ color: "gray;" }}>
                      {" "}
                      {booking_json.cartSumUp.receiverMobileNo}
                    </small>
                    <br />
                    {booking_json.selectedCustomerJson.address == "" ? (
                      "-"
                    ) : (
                      <div>
                        <i className="fa fa-map-marker"></i>{" "}
                        {booking_json.selectedCustomerJson.address}
                      </div>
                    )}
                  </td>
                  <td className="text-center">
                    <h6>{booking_json.cartSumUp.items}</h6>

                    {booking_json.productsInCart &&
                      booking_json.productsInCart.map((item) => {
                        return (
                          <React.Fragment key={item.id}>
                            {item.customized === undefined ? (
                              <></>
                            ) : (
                              <>
                                {item.customized.photo_path ? (
                                  <p>
                                    <img
                                      src={
                                        "http://pos.q4hosting.com" +
                                        item.customized.photo_path[0]?.slice(14)
                                      }
                                      alt="Customized Cake"
                                      style={{
                                        width: "50%",
                                      }}
                                    />
                                  </p>
                                ) : null}
                              </>
                            )}
                          </React.Fragment>
                        );
                      })}
                  </td>
                  <td align="right" style={{ backgroundColor: "#efefef" }}>
                    <i className="fa fa-inr"></i>{" "}
                    {Number(booking_json.cartSumUp.grandTotal).toFixed(2)}
                  </td>

                  <td align="right">
                    {booking_json.cartSumUp.payDetails === undefined ? (
                      <></>
                    ) : booking_json.cartSumUp &&
                      booking_json.cartSumUp.payDetails ? (
                      booking_json.cartSumUp.payDetails.map((p) => (
                        <CRow key={p.payMode}>
                          <CCol xs={7} className="text-start pl-4 m-0">
                            <span className="text-start">
                              {p.payMode === "1" ? (
                                <strong
                                  className="status-btn"
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "1.1em",
                                    backgroundColor: "#777777",
                                    color: "white",
                                    padding: "2px",
                                  }}
                                >
                                  C
                                  <br />
                                </strong>
                              ) : p.payMode === "4" ? (
                                <strong
                                  className="status-btn"
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "1em",
                                    backgroundColor: "#777777",
                                    padding: "2px",
                                    color: "white",
                                  }}
                                >
                                  PTm
                                  <br />
                                </strong>
                              ) : p.payMode === "6" ? (
                                <strong
                                  className="status-btn"
                                  style={{
                                    fontWeight: "bold",
                                    backgroundColor: "#777777",
                                    fontSize: "1em",
                                    padding: "2px",
                                    color: "white",
                                  }}
                                >
                                  W
                                  <br />
                                </strong>
                              ) : p.payMode === "24" ? (
                                <strong
                                  className="status-btn"
                                  style={{
                                    fontWeight: "bold",
                                    backgroundColor: "#777777",
                                    fontSize: "1em",
                                    padding: "2px",
                                    color: "white",
                                  }}
                                >
                                  Rzp
                                  <br />
                                </strong>
                              ) : p.payMode === "25" ? (
                                <strong
                                  className="status-btn"
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "1em",
                                    backgroundColor: "#1a82c3",
                                    padding: "2px",
                                    color: "white",
                                  }}
                                >
                                  HDFC 2
                                  <br />
                                </strong>
                              ) : p.payMode === "26" ? (
                                <strong
                                  className="status-btn"
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "1em",
                                    backgroundColor: "#1a82c3",
                                    padding: "2px",
                                    color: "white",
                                  }}
                                >
                                  HDFC QR
                                </strong>
                              ) : null}
                            </span>
                          </CCol>
                          <CCol xs={4} className="text-end p-0">
                            <i className="fa fa-inr"></i>{" "}
                            {Number(p.payAmount).toFixed(2)}
                          </CCol>
                        </CRow>
                      ))
                    ) : null}
                    <br />
                    <label className="label label-info">
                      <i className="fa fa-plus"></i> Add
                    </label>
                  </td>
                  <td align="right" className="text-danger">
                    {booking_json.cartSumUp.payDetails ? (
                      booking_json.cartSumUp.payDetails.map((p) => (
                        <React.Fragment key={p.payMode}>
                          {p.payAmount === undefined ? (
                            <span>-</span>
                          ) : (
                            <span>
                              <i className="fa fa-inr"></i>
                              {(
                                Number(booking_json.cartSumUp.grandTotal) -
                                Number(p.payAmount)
                              ).toFixed(2)}
                            </span>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <span>
                        <i className="fa fa-inr"></i>
                        {Number(booking_json.cartSumUp.grandTotal).toFixed(2)}
                      </span>
                    )}
                  </td>

                  <td align="center">
                    <button
                      className="btn  btn-success btn-margin"
                      onClick={() => clickInvoiceLink(booking_no, booking_json)}
                    >
                      <i className="fa fa-print"></i>
                    </button>
                  </td>
                  <td align="center">
                    <button className="btn  btn-warning  btn-margin">
                      <i className="fa fa-reply-all">Process</i>
                    </button>
                  </td>
                  <td align="center">
                    <button className="btn btn-secondary btn-margin">
                      <i className="fa fa-edit"></i>
                    </button>
                  </td>
                  <td align="center">
                    <button className="btn btn-danger btn-margin">
                      <i className="fa fa-times"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <PendingPrintModal
        printBooking={printBooking}
        setPrintBooking={setPrintBooking}
        invoiceDetails={invoiceDetails}
      />
    </>
  );
};
export default Pending;
