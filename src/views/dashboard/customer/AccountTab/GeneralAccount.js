import React, { useState, useEffect } from "react";
import { CCol, CContainer, CRow } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";

const GeneralAccount = () => {
  const [balance, setBalance] = useState(0);
  const customerAccount = useSelector(
    (state) => state.customerAccount.customerAcc
  );

  const selectedOutletObj = useSelector(
    (state) => state.selectedOutlet.selectedOutlet
  );
  const balances = [];
  let runningBalance = 0;

  if (customerAccount) {
    for (const custData of customerAccount) {
      // Calculate the balance for this row
      const rowBalance = runningBalance + custData.debit - custData.credit;
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
  const totalDueBalance = totalDebit - totalCredit;
  console.log('total due', totalDueBalance)  


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
              return (
                <tr key={custData}>
                  <td className="text-center">
                    {" "}
                    {custData.ah_id == 17 ? (
                      <strong></strong>
                    ) : custData.ah_id == 4 ? (
                      <strong></strong>
                    ) : custData.ah_id == 11 ? (
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
                  </td>
                  <td>{custData.narration}</td>

                  <td className="text-center">
                    <span>
                      {custData.mode == 1 ? (
                        <strong>Cash</strong>
                      ) : custData.mode == 0 ? (
                        <strong>-</strong>
                      ) : custData.mode == 4 ? (
                        <strong>PayTm</strong>
                      ) : custData.mode == 6 ? (
                        <strong>W</strong>
                      ) : custData.mode == 7 ? (
                        <strong>Acc. Dept.</strong>
                      ) : custData.mode == 25 ? (
                        <strong>HDFC CC</strong>
                      ) : custData.mode == 26 ? (
                        <strong>HDFC QR</strong>
                      ) : null}
                    </span>
                  </td>
                  <td>{custData.bank}</td>

                  <td className="text-end">
                    {custData.debit == 0 ? (
                      <span>-</span>
                    ) : (
                      <span>{custData.debit.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="text-end">
                    {custData.credit == 0 ? (
                      <span>-</span>
                    ) : (
                      <span>{custData.credit.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="text-end" style={{ background: "#efefef" }}>
                    {balances[index].toFixed(2)}
                  </td>
                  <td>
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

                  <td>
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
