import React, { useState, useEffect } from "react";
import { CCol, CContainer, CRow } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";

const GeneralAccount = () => {
  const [balance, setBalance] = useState(0);
  const customerAccount = useSelector(
    (state) => state.customerAccount.customerAcc
  );

  console.log('customerAccount', customerAccount)

  const selectedOutletObj = useSelector(
    (state) => state.selectedOutlet.selectedOutlet
  );
  const balances = [];
  let runningBalance = 0;

  if (customerAccount) {
    for (const custData of customerAccount) {
      // Calculate the balance for this row
      const rowBalance = runningBalance +  custData.credit - custData.debit;
      balances.push(rowBalance);
      runningBalance = rowBalance;
    }
  }

  // Calculate total debit and credit
  let totalDebit = 0;
  let totalCredit = 0;

  if (customerAccount) {
    for (const custData of customerAccount) {
      totalDebit += custData.debit;
      totalCredit += custData.credit;
    }
  }
  // Calculate total balance
  const totalDueBalance = totalCredit - totalDebit;

  return (
    <>
      <table className="table table-bordered border booking-or-table">
        <thead className="thead-light" style={{ lineHeight: "1" }}>
          <tr style={{ background: "#909090", color: "#ffffff" }}>
            <th width="4%"></th>
            <th width="22%">Narration</th>
            <th width="7%">Mode</th>
            <th width="10%">Bank Ref</th>
            <th width="8%">Debit</th>
            <th width="8%">Credit</th>
            <th width="8%">Balance</th>
            <th width="8%">Outlet</th>
            <th width="10%">Entry</th>
            <th width="18%">DateTime</th>
            {/* <th width="12%" colSpan="4">
              Action
              <tr>
                <th>Print|</th>
                <th>Edit|</th>
                <th>Return</th>
              </tr>
            </th> */}
          </tr>
        </thead>
        <tbody>
          {customerAccount &&
            customerAccount.map((custData, index) => {
              const rowClassName = custData.confirm_p === 0 ? "red-row" : "";
              return (
                <tr key={custData}>
                  <td className="text-center text-white" >
                    {" "}
                    {custData.ah_id == 17 ? (
                      <strong></strong>
                    ) :

                      custData.ah_id == 11 ? (
                        <strong className="status-btn bg-info">View</strong>
                      ) : custData.ah_id == 3 ? (
                        <strong
                          className="status-btn"
                          style={{
                            background: "#5bc0de",
                          }}
                        >
                          View
                        </strong>
                      ) : custData.ah_id == 5 ? (
                        <strong
                          className="status-btn"
                          style={{
                            background: "#5bc0de",
                          }}
                        >
                          View
                        </strong>
                      ) : custData.ah_id == 14 ? (
                        <strong
                          className="status-btn"
                          style={{
                            background: "#ec971f",
                          }}
                        >
                          Receipt
                        </strong>
                      )
                        : custData.ah_id == 9 ||
                          custData.ah_id == 10 ||
                          (custData.ah_id == 15 && custData.inw_id == 0) ? (
                          <strong
                            className="status-btn"
                            style={{
                              background: "#26b99a",
                            }}
                          >
                            Voucher
                          </strong>
                        ) : null}

                    {custData.confirm_p === 0 && custData.ah_id === 4 ? (
                      <strong className="status-btn bg-danger">Pending</strong>
                    ) : null}
                  </td>
                  <td id={rowClassName}>{custData.narration}</td>

                  <td className="text-center" id={rowClassName}>
                    <span>
                      {custData.mode == 1 ? (
                        <font>Cash</font>
                      ) : custData.mode == 0 ? (
                        <font>-</font>
                      ) : custData.mode == 4 ? (
                        <font>PayTm</font>
                      ) : custData.mode == 6 ? (
                        <font>W</font>
                      ) : custData.mode == 7 ? (
                        <font>Acc. Dept.</font>
                      ) : custData.mode == 25 ? (
                        <font>HDFC CC</font>
                      ) : custData.mode == 27 ? (
                        <font>Swiggy Dineout</font>
                      ) : custData.mode == 13 ? (
                        <font>Plutus CC</font>
                      ) : custData.mode == 26 ? (
                        <font>HDFC QR</font>
                      ) : custData.mode == 16 ? (
                        <font>Cheque</font>
                      ) : custData.mode == 5 ? (
                        <font>NEFT</font>
                      ) : null}
                    </span>
                  </td>
                  <td id={rowClassName}>{custData.bank}</td>

                  <td className="text-end" id={rowClassName}>
                    {custData.debit == 0 ? (
                      <span>-</span>
                    ) : (
                      <span>{custData.debit.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="text-end" id={rowClassName}>
                    {custData.credit == 0 ? (
                      <span>-</span>
                    ) : (
                      <span>{custData.credit.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="text-end" style={{ background: "#efefef" }} id={rowClassName}>
                    {balances[index].toFixed(2)}
                  </td>
                  <td id={rowClassName}>
                    {/* {selectedOutletObj.outlet_name} */}
                    {custData.outlet_id === 0 ? (
                      <span>-</span>
                    ) : custData.outlet_id === 1 ? (
                      <span>10 No. Market</span>
                    ) : custData.outlet_id === 2 ? (
                      <span>M.P. Nagar</span>
                    ) : custData.outlet_id === 3 ? (
                      <span>New Market</span>
                    ) : custData.outlet_id === 4 ? (
                      <span>Indore - Vijay Nagar</span>
                    ) : custData.outlet_id === 5 ? (
                      <span>Gwalior - DB City Mall</span>
                    ) : custData.outlet_id === 6 ? (
                      <span>Lalghati</span>
                    ) : null}
                  </td>

                  <td></td>

                  <td id={rowClassName}>
                    {" "}
                    {new Date(custData.eat)
                      .toISOString()
                      .replace(/T/, " ")
                      .replace(/\.\d+Z$/, "")}
                  </td>
                </tr>
              );
            })}

          <tr>
            <td colSpan="4" align="right">
              <b>Total</b>
            </td>
            <td align="right">
              <b>{totalDebit.toFixed(2)}</b>
            </td>
            <td align="right">
              <b>{totalCredit.toFixed(2)}</b>
            </td>
            <td
              width="10%"
              align="right"
              className="text-white"
              style={{ background: "#676666" }}
            >
              <b> {totalDueBalance.toFixed(2)}</b>
            </td>
            <td colSpan="3" align="center">
              &nbsp;
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default GeneralAccount;
