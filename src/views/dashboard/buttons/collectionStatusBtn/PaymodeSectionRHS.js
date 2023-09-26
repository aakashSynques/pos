import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePayModeTotalsAction } from "../../../../action/actions";

function PaymodeSectionRHS() {
  const dispatch = useDispatch();

  const recentBooking = useSelector(
    (state) => state.recentBooking.recentBookings
  );

  // const selectedCustomerJson = recentBooking[0].sales_json.selectedCustomerJson;
  // const userName = selectedCustomerJson.user_name;

  const selectedCustomerJson =
    recentBooking?.[0]?.sales_json?.selectedCustomerJson || {};
  const userName = selectedCustomerJson.user_name || "";

  const relevantCartSumUpData = recentBooking.map((booking) => {
    if (booking.sales_json && booking.sales_json.cartSumUp) {
      const cartSumUp = booking.sales_json.cartSumUp;
      const payDetails = cartSumUp.payDetails || [];

      // Check if payDetails array is empty or null, if so, return null
      if (payDetails.length === 0) {
        return null;
      }

      // Calculate subtotal, grandTotal, and tax
      const subtotal = parseFloat(cartSumUp.subTotal) || 0;
      const grandTotal = parseFloat(cartSumUp.grandTotal) || 0;
      const tax = parseFloat(cartSumUp.tax) || 0;

      return {
        subtotal,
        grandTotal,
        payDetails,
        tax,
      };
    }
    return null;
  });

  const payModeTotals = {};
  relevantCartSumUpData.forEach((data) => {
    if (data && data.payDetails) {
      const payDetails = data.payDetails;
      payDetails.forEach((detail) => {
        const payMode = detail.payMode;
        const payAmount = parseFloat(detail.payAmount) || 0;
        if (!payModeTotals.hasOwnProperty(payMode)) {
          payModeTotals[payMode] = 0;
        }
        payModeTotals[payMode] += payAmount;
      });
    }
  });

  dispatch(updatePayModeTotalsAction(payModeTotals));
  // useEffect(() => {
  //   dispatch(updatePayModeTotalsAction(payModeTotals));

  // }, [dispatch, payModeTotals]);
  // console.log('oo', dispatch(updatePayModeTotalsAction(payModeTotals)))

  const cashTotal = payModeTotals["1"] ?? 0;
  // paytm 4
  const payMode4Total = payModeTotals["4"] ?? 0;
  // NEFT 5
  const payMode5Total = payModeTotals["5"] ?? 0;
  // wallet 6
  const payMode6Total = payModeTotals["6"] ?? 0;
  // Platus 13
  const payMode13Total = payModeTotals["13"] ?? 0;
  // cheque 16
  const payMode16Total = payModeTotals["16"] ?? 0;
  // phone pay 18
  const payMode18Total = payModeTotals["18"] ?? 0;
  // HDFC cc 25
  const payMode25Total = payModeTotals["25"] ?? 0;
  // hdfc qr id 26
  const payMode26Total = payModeTotals["26"] ?? 0;
  // Swiggy
  const payMode27Total = payModeTotals["27"] ?? 0;



  return (
    <>
      <table className="table table-bordered collection-table-style mode-2">
        <tbody>
          <tr>
            <th rowSpan="2" width="15%" className="bg-light">
              Pay Mode
            </th>
            <th width="15%" colSpan="2" className="bg-light py-1">
              {userName}
            </th>
            <th width="1%" className="bg-secondary p-0"></th>
            <th width="15%" rowSpan="2" className="bg-light">
              Total
            </th>
          </tr>
          <tr>
            <th width="7%" className="bg-light py-1">
              Dr
            </th>
            <th width="7%" className="bg-light py-1">
              Cr
            </th>
            <th className="bg-secondary p-0" width="1%"></th>
          </tr>

          <tr>
            <td className="bg-light">
              <b>HDFC QR</b>
            </td>
            <td>..</td>
            <td align="right">
              {payMode26Total ? (
                <>
                  <i className="fa fa-inr"></i>
                  {payMode26Total.toFixed(2)}
                </>
              ) : null}
            </td>
            <th width="1%" className="bg-secondary newth"></th>
            <th className="bg-light newth text-end">
              {payMode26Total ? (
                <>
                  <i className="fa fa-inr"></i>
                  {payMode26Total.toFixed(2)}
                </>
              ) : null}
            </th>
          </tr>

          <tr>
            <td className="bg-light">
              <b>HDFC CC</b>
            </td>
            <td>..</td>
            <td align="right">
              {payMode25Total ? (
                <>
                  <i className="fa fa-inr"></i>
                  {payMode25Total.toFixed(2)}
                </>
              ) : null}
            </td>
            <th width="1%" className="bg-secondary newth"></th>
            <th className="bg-light newth text-end">
              {payMode25Total ? (
                <>
                  <i className="fa fa-inr"></i>
                  {payMode25Total.toFixed(2)}
                </>
              ) : null}
            </th>
          </tr>

          <tr>
            <td className="bg-light">
              <b>Plutus CC</b>
            </td>
            <td>..</td>
            <td align="right">
              {payMode13Total ? (
                <>
                  <i className="fa fa-inr"></i>
                  {payMode13Total.toFixed(2)}
                </>
              ) : null}
            </td>
            <th width="1%" className="bg-secondary newth"></th>
            <th className="bg-light newth text-end" align="right">
              {payMode13Total ? (
                <>
                  <i className="fa fa-inr"></i>
                  {payMode13Total.toFixed(2)}
                </>
              ) : null}
            </th>
          </tr>

          <tr>
            <td className="bg-light">
              <b>PayTm</b>
            </td>
            <td>..</td>
            <td align="right">
              {payMode4Total ? (
                <>
                  <i className="fa fa-inr"></i>
                  {payMode4Total.toFixed(2)}
                </>
              ) : null}
            </td>
            <th width="1%" className="bg-secondary newth"></th>
            <th className="bg-light newth text-end" align="right">
              {payMode4Total ? (
                <>
                  <i className="fa fa-inr"></i>
                  {payMode4Total.toFixed(2)}
                </>
              ) : null}
            </th>
          </tr>

          <tr>
            <td className="bg-light">
              <b>PhonePe</b>
            </td>
            <td>..</td>
            <td align="right">
              {payMode18Total ? (
                <>
                  <i className="fa fa-inr"></i>
                  {payMode18Total.toFixed(2)}
                </>
              ) : null}
            </td>
            <th width="1%" className="bg-secondary newth"></th>
            <th className="bg-light newth text-end" align="right">
              {payMode18Total ? (
                <>
                  <i className="fa fa-inr"></i>
                  {payMode18Total.toFixed(2)}
                </>
              ) : null}
            </th>
          </tr>

          <tr>
            <td className="bg-light">
              <b>Swiggy Dineout</b>
            </td>
            <td>..</td>
            <td align="right">
              {payMode27Total ? (
                <>
                  <i className="fa fa-inr"></i>
                  {payMode27Total.toFixed(2)}
                </>
              ) : null}
            </td>
            <th width="1%" className="bg-secondary newth"></th>
            <th className="bg-light newth" align="right">
              {payMode27Total ? (
                <>
                  <i className="fa fa-inr"></i>
                  {payMode27Total.toFixed(2)}
                </>
              ) : null}
            </th>
          </tr>

          <tr>
            <td className="bg-light">
              <b>NEFT</b>
            </td>
            <td>..</td>
            <td align="right">
              {payMode5Total ? (
                <>
                  <i className="fa fa-inr"></i>
                  {payMode5Total.toFixed(2)}
                </>
              ) : null}
            </td>
            <th width="1%" className="bg-secondary newth"></th>
            <th className="bg-light newth text-end" align="right">
              {payMode5Total ? (
                <>
                  <i className="fa fa-inr"></i>
                  {payMode5Total.toFixed(2)}
                </>
              ) : null}
            </th>
          </tr>

          <tr>
            <td className="bg-light">
              <b>Cheque</b>
            </td>
            <td>..</td>
            <td align="right">
              {payMode16Total ? (
                <>
                  <i className="fa fa-inr"></i>
                  {payMode16Total.toFixed(2)}
                </>
              ) : null}
            </td>
            <th width="1%" className="bg-secondary newth"></th>
            <th className="bg-light newth text-end">
              {payMode16Total ? (
                <>
                  <i className="fa fa-inr"></i>
                  {payMode16Total.toFixed(2)}
                </>
              ) : null}
            </th>
          </tr>

          <tr>
            <td className="bg-light">
              <b>Razorpay</b>
            </td>
            <td>..</td>
            <td align="right">..</td>
            <th width="1%" className="bg-secondary newth"></th>
            <th className="bg-light newth" align="right">
              {" "}
              ..
            </th>
          </tr>

          <tr>
            <td className="bg-light">
              <b>Company Debit Card</b>
            </td>
            <td>..</td>
            <td align="right">..</td>
            <th width="1%" className="bg-secondary newth"></th>
            <th className="bg-light newth" align="right">
              {" "}
              ..
            </th>
          </tr>

          <tr>
            <td colSpan="5" className="bg-secondary"></td>
            {/* <td className="bg-secondary"></td>
            <td className="bg-secondary">..</td>
            <td align="right" className="bg-secondary"></td>
            <th width="1%" className="bg-secondary"></th>
            <th className="bg-secondary"></th> */}
          </tr>

          <tr>
            <td className="bg-light">
              <b>Wallet </b>
            </td>
            <td style={{ background: "#ffffc0" }}></td>
            <td align="right" style={{ background: "#ffffc0" }}>
              {payMode6Total ? (
                <>
                  <i className="fa fa-inr"></i>
                  {payMode6Total.toFixed(2)}
                </>
              ) : null}
            </td>
            <th width="1%" className="bg-secondary newth"></th>
            <th className="bg-light newth text-end" align="right">
              {payMode6Total ? (
                <>
                  <i className="fa fa-inr"></i>
                  {payMode6Total.toFixed(2)}
                </>
              ) : null}
            </th>
          </tr>

          <tr>
            <td className="bg-light">
              <b>Paid Bill </b>
            </td>
            <td style={{ background: "#ffffc0" }}></td>
            <td align="right" style={{ background: "#ffffc0" }}></td>
            <th width="1%" className="bg-secondary newth"></th>
            <th className="bg-light newth" align="right"></th>
          </tr>

          <tr>
            <td className="bg-light">
              <b>Credit Bill </b>
            </td>
            <td style={{ background: "#ffffc0" }}></td>
            <td align="right" style={{ background: "#ffffc0" }}></td>
            <th width="1%" className="bg-secondary newth"></th>
            <th className="bg-light newth" align="right"></th>
          </tr>
        </tbody>
      </table>

      <div className="pb-2 ml-2">
        <i className="text-primary">
          Above value includes Invoice Collection, Booking Advance Collection,
          And Manual Entries.
        </i>
      </div>
    </>
  );
}

export default PaymodeSectionRHS;
