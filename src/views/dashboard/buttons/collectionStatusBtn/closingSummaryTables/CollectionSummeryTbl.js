import { CCol } from "@coreui/react";
import React from "react";
import { useSelector } from "react-redux";
import ChequeSummeryTbl from "./ChequeSummeryTbl";

const CollectionSummeryTbl = () => {
  // const currentDate = new Date();
  // const options = {
  //   // weekday: 'short',
  //   // year: 'numeric',
  //   // month: 'short',
  //   // day: 'numeric',
  //   year: 'numeric',
  //   weekday: 'short',
  //   day: 'numeric',
  //   month: 'short',
  // };
  // const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
  // console.log(formattedDate); // Output: "22 Sep, 2023 Fri"

  const totalCash = useSelector((state) => state.totalCash.totalCash); // Access the 'totalCash' property
  const payModeTotals = useSelector((state) => state.totalCash.payModeTotals);

  const cashTotal = payModeTotals["1"] || 0;
  // paytm 4
  const payMode4Total = payModeTotals["4"] || 0;
  // NEFT 5
  const payMode5Total = payModeTotals["5"] || 0;
  //wallet 6
  const payMode6Total = payModeTotals["6"] || 0;
  //Platus 13
  const payMode13Total = payModeTotals["13"] || 0;
  // cheque 16
  const payMode16Total = payModeTotals["16"] || 0;
  //phone pay 18
  const payMode18Total = payModeTotals["18"] || 0;
  // HDFC cc 25
  const payMode25Total = payModeTotals["25"] || 0;
  // hdfc qr id 26
  const payMode26Total = payModeTotals["26"] || 0;
  //Swiggy
  const payMode27Total = payModeTotals["27"] || 0;

  const sumOfPayModeTotals = Object.values(payModeTotals).reduce(
    (acc, currentValue) => acc + currentValue,
    0
  );
  const finalWithdrowAmount = totalCash + sumOfPayModeTotals;

  return (
    <>
      <CCol sm={4}>
        <h6>
          <b>Collection Summary</b>
        </h6>

        <table className="table table-bordered collection-table-style table-hover mode-2">
          <thead>
            <tr>
              <th width="40%" className="bg-light table-titlse-style">
                Pay Mode
              </th>
              <th width="20%" className="bg-light table-titlse-style">
                Slip(s)
              </th>
              <th width="40%" className="bg-light table-titlse-style">
                Amount(s)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>Cash</b> <small>(Manual)</small>
              </td>
              <td
                style={{ textAlign: "center" }}
                id="tcCS1Slip"
                data-valslip="0"
              >
                -
              </td>
              <td className="text-end">
                <i class="fa fa-inr"></i>
                {totalCash.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>
                <b>HDFC QR</b>
              </td>
              <td>1</td>
              <td className="text-end">
                {payMode26Total ? (
                  <>
                    <i className="fa fa-inr"></i>
                    {payMode26Total.toFixed(2)}
                  </>
                ) : null}
              </td>
            </tr>
            <tr>
              <td>
                <b>HDFC CC</b>
              </td>
              <td
                style={{ textAlign: "center" }}
                id="tcCS25Slip"
                data-valslip="0"
              >
                -
              </td>
              <td style={{ textAlign: "right" }} id="tcCS25Amt" data-valamt="0">
                -
              </td>
            </tr>
            <tr>
              <td>
                <b>Plutus CC</b>
              </td>
              <td
                style={{ textAlign: "center" }}
                id="tcCS13Slip"
                data-valslip="0"
              >
                -
              </td>
              <td style={{ textAlign: "right" }} id="tcCS13Amt" data-valamt="0">
                -
              </td>
            </tr>
            <tr>
              <td>
                <b>PayTm</b>
              </td>
              <td
                style={{ textAlign: "center" }}
                id="tcCS4Slip"
                data-valslip="0"
              >
                -
              </td>
              <td style={{ textAlign: "right" }} id="tcCS4Amt" data-valamt="0">
                -
              </td>
            </tr>
            <tr>
              <td>
                <b>PhonePe</b>
              </td>
              <td
                style={{ textAlign: "center" }}
                id="tcCS18Slip"
                data-valslip="0"
              >
                -
              </td>
              <td style={{ textAlign: "right" }} id="tcCS18Amt" data-valamt="0">
                -
              </td>
            </tr>
            <tr>
              <td>
                <b>Swiggy Dineout</b>
              </td>
              <td
                style={{ textAlign: "center" }}
                id="tcCS27Slip"
                data-valslip="0"
              >
                -
              </td>
              <td style={{ textAlign: "right" }} id="tcCS27Amt" data-valamt="0">
                -
              </td>
            </tr>
            <tr>
              <td>
                <b>NEFT</b>
              </td>
              <td
                style={{ textAlign: "center" }}
                id="tcCS5Slip"
                data-valslip="0"
              >
                -
              </td>
              <td style={{ textAlign: "right" }} id="tcCS5Amt" data-valamt="0">
                -
              </td>
            </tr>
            <tr>
              <td>
                <b>Cheque</b>
              </td>
              <td
                style={{ textAlign: "center" }}
                id="tcCS16Slip"
                data-valslip="0"
              >
                -
              </td>
              <td style={{ textAlign: "right" }} id="tcCS16Amt" data-valamt="0">
                -
              </td>
            </tr>
            <tr>
              <td>
                <b>Razorpay</b>
              </td>
              <td
                style={{ textAlign: "center" }}
                id="tcCS24Slip"
                data-valslip="0"
              >
                -
              </td>
              <td style={{ textAlign: "right" }} id="tcCS24Amt" data-valamt="0">
                -
              </td>
            </tr>
            <tr>
              <td>
                <b>Company Debit Card</b>
              </td>
              <td
                style={{ textAlign: "center" }}
                id="tcCS17Slip"
                data-valslip="0"
              >
                -
              </td>
              <td style={{ textAlign: "right" }} id="tcCS17Amt" data-valamt="0">
                -
              </td>
            </tr>


            <tr className="bg-light text-center">
              <th className="bg-light text-center py-1">Total</th>
              <th className="bg-light text-center py-1">1</th>
              <th className="bg-light text-end py-1">
                {finalWithdrowAmount.toFixed(2)}
              </th>
            </tr>
          </tbody>
       
          
        </table>

        {/* Cheque Summary  Table*/}
       <ChequeSummeryTbl />
      </CCol>
    </>
  );
};

export default CollectionSummeryTbl;
