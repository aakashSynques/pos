import React from "react";
import { useSelector } from "react-redux";

function CollectionStatusTableLHS() {
  const recentBooking = useSelector(
    (state) => state.recentBooking.recentBookings
  );
  const relevantCartSumUpData = recentBooking.map((booking) => {
    if (booking.sales_json && booking.sales_json.cartSumUp) {
      const cartSumUp = booking.sales_json.cartSumUp;
      return {
        subtotal: parseFloat(cartSumUp.subTotal) || 0,
        grandTotal: parseFloat(cartSumUp.grandTotal) || 0,
        payDetails: cartSumUp.payDetails || [],
        tax: parseFloat(cartSumUp.tax) || 0,
      };
    }
    return null;
  });

  // Calculate the total 'subtotal' amount
  // const totalSubtotal = relevantCartSumUpData.reduce(
  //   (accumulator, cartData) => accumulator + cartData.subtotal,
  //   0
  // );

  const totalSubtotal = relevantCartSumUpData.reduce(
    (accumulator, cartData) => {
      if (
        cartData &&
        cartData.subtotal !== null &&
        cartData.subtotal !== undefined
      ) {
        return accumulator + parseFloat(cartData.subtotal);
      }
      return accumulator;
    },
    0
  );

  // const totalTax = relevantCartSumUpData.reduce(
  //   (accumulator, cartData) => accumulator + cartData.tax,
  //   0
  // );

  const totalTax = relevantCartSumUpData.reduce((accumulator, cartData) => {
    if (cartData && cartData.tax !== null && cartData.tax !== undefined) {
      return accumulator + parseFloat(cartData.tax);
    }
    return accumulator;
  }, 0);

  // const grandTotal = relevantCartSumUpData.reduce(
  //   (accumulator, cartData) => accumulator + cartData.grandTotal,
  //   0
  // );

  const grandTotal = relevantCartSumUpData.reduce((accumulator, cartData) => {
    if (
      cartData &&
      cartData.grandTotal !== null &&
      cartData.grandTotal !== undefined
    ) {
      return accumulator + parseFloat(cartData.grandTotal);
    }
    return accumulator;
  }, 0);

  // const totalPayAmount = relevantCartSumUpData.reduce(
  //   (accumulator, cartData) => {
  //     if (cartData.payDetails.length > 0) {
  //       return accumulator + parseFloat(cartData.payDetails[0].payAmount) || 0;
  //     }
  //     return accumulator;
  //   },
  //   0
  // );

  const totalPayAmount = relevantCartSumUpData.reduce(
    (accumulator, cartData) => {
      if (
        cartData &&
        cartData.payDetails !== null &&
        cartData.payDetails !== undefined &&
        cartData.payDetails.length > 0
      ) {
        return accumulator + parseFloat(cartData.payDetails[0].payAmount) || 0;
      }
      return accumulator;
    },
    0
  );

  const creditedAmountRemaingBal = grandTotal - totalPayAmount;
  const extraPayAmount = totalPayAmount - grandTotal;

  return (
    <table
      className="table table-bordered collection-table-style table-hover mode-2"
      width="50%"
    >
      <tbody>
        <tr>
          <th width="50%" style={{ background: "#efefef" }}>
            Heads
          </th>
          <th width="25%" style={{ background: "#efefef" }}>
            Booking(s)
          </th>
          <th width="25%" style={{ background: "#efefef" }}>
            Invoice(s)
          </th>
          <th width="25%" style={{ background: "#efefef" }}>
            Return Invoice(s)
          </th>
        </tr>
        <tr>
          <td>
            <b>Invoice(s) Created</b>
          </td>
          <td align="right">
            <b>&nbsp;</b>
          </td>
          <td align="right">
            <b>{recentBooking.length}</b>
          </td>
          <td align="right">
            <b>&nbsp;</b>
          </td>
        </tr>
        <tr>
          <td>
            <b>Invoice(s) Amount</b>
          </td>
          <td align="right">&nbsp;</td>
          <td align="right">
            <i className="fa fa-inr"></i> {totalSubtotal.toFixed(2)}
          </td>
          <td align="right">&nbsp;</td>
        </tr>
        <tr>
          <td>
            <b>Discount Offered</b>
          </td>
          <td align="right" className="text-danger">
            &nbsp;
          </td>
          <td align="right" className="text-danger">
            &nbsp;
          </td>
          <td align="right" className="text-danger">
            &nbsp;
          </td>
        </tr>
        <tr>
          <td>
            <b>Delivery Charges</b>
          </td>
          <td align="right">&nbsp;</td>
          <td align="right">&nbsp;</td>
          <td align="right">&nbsp;</td>
        </tr>
        <tr>
          <td>
            <b>Tax Collected</b>
          </td>
          <td align="right">&nbsp;</td>
          <td align="right">
            <i className="fa fa-inr"></i> {totalTax.toFixed(2)}
          </td>
          <td align="right">&nbsp;</td>
        </tr>
        <tr>
          <td>
            <b>RoundOff</b>
          </td>
          <td align="right">&nbsp;</td>
          <td align="right">&nbsp;</td>
          <td align="right">&nbsp;</td>
        </tr>
        <tr>
          <td style={{ background: "#efefef" }}>
            <b>Sales Grand Total</b>
          </td>
          <td align="right" style={{ background: "#efefef" }}>
            <b>&nbsp;</b>
          </td>
          <td align="right" style={{ background: "#efefef" }}>
            <b>
              <i className="fa fa-inr"></i> {grandTotal.toFixed(2)}
            </b>
          </td>
          <td align="right" style={{ background: "#efefef" }}>
            <b>&nbsp;</b>
          </td>
        </tr>
        <tr>
          <td>
            <b>Credit Recovery</b>
            <br />
            <small>
              <i>(In Invoice)</i>
            </small>
          </td>
          <td align="right" className="text-success">
            &nbsp;
          </td>
          <td align="right" className="text-success">
            &nbsp;
          </td>
          <td align="right" className="text-success">
            &nbsp;
          </td>
        </tr>
        <tr>
          <td>
            <b>Extra Amount Received</b>
            <br />
            <small>
              <i>(In Invoice)</i>
            </small>
          </td>
          <td align="right" className="text-success">
            &nbsp;
          </td>
          <td align="right" className="text-success">
            <i className="fa fa-inr"></i>{" "}
            {extraPayAmount >= 0 ? extraPayAmount.toFixed(2) : "0.00"}
          </td>
          <td align="right" className="text-success">
            &nbsp;
          </td>
        </tr>
        <tr>
          <td>
            <b>Credited Amount</b>
            <br />
            <small>
              <i>(Against Invoice)</i>
            </small>
          </td>
          <td align="right" className="text-danger">
            &nbsp;
          </td>
          <td align="right" className="text-danger">
            <i className="fa fa-inr"></i> {creditedAmountRemaingBal.toFixed(2)}
          </td>
          <td align="right" className="text-success">
            &nbsp;
          </td>
        </tr>
        <tr>
          <td style={{ background: "#efefef" }}>
            <b>Total</b>
          </td>
          <td align="right" style={{ background: "#efefef" }}>
            <b>&nbsp;</b>
          </td>
          <td align="right" style={{ background: "#efefef" }}>
            <b>
              <i className="fa fa-inr"></i> {totalPayAmount.toFixed(2)}
            </b>
          </td>
          <td align="right" style={{ background: "#efefef" }}>
            <b>&nbsp;</b>
          </td>
        </tr>
        <tr>
          <td style={{ background: "#efefef" }}>
            <b>Collection</b>
          </td>
          <td align="center" colSpan="3" style={{ background: "#efefef" }}>
            <b>
              <i className="fa fa-inr"></i> {totalPayAmount.toFixed(2)}
            </b>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default CollectionStatusTableLHS;
