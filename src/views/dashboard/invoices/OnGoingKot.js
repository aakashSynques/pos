import React, { useState, useEffect } from "react";
import OnGoingKotModel from "./OnGoingKotModel/OnGoingKotModel";
import { setPendingKotData } from "../../../action/actions";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";

import { fetch } from "../../../utils";
import {
  CCard,
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
  CTabContent,
  CTabPane,
  CModalFooter,
  CButton,
} from "@coreui/react";

const OnGoingKot = () => {
  const dispatch = useDispatch();
  const [returns, setReturns] = useState(false);
  const [pendingKotDeta, setPendingKotDeta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  const outlet_id = useSelector(
    (state) => state.selectedOutletId.selectedOutletId
  );

  const getPendingKOT = async () => {
    try {
      setLoading(true);
      setNetworkError(false);
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const body = {
        outlet_id,
      };
      const response = await fetch("/api/sales/getPendingKOT", "POST", body, headers);

      if (response.status === 200) {
        const responseData = await response.json();
        setPendingKotDeta(responseData.data.KOT_data);
        setLoading(false);
        setNetworkError(false);
        dispatch(setPendingKotData(responseData.data.KOT_data)); 
      } else {
        setLoading(false);
        setNetworkError(true);
        dispatch(setPendingKotData([])); 
      }
    } catch (err) {
      setLoading(false);
      setNetworkError(true);
      dispatch(setPendingKotData([])); 
    }
  };

  useEffect(() => {
    getPendingKOT();
  }, [outlet_id]);



  const uniqueTableNumbers = new Set();
  const filteredPendingKotDeta = pendingKotDeta.filter((item) => {
    if (!uniqueTableNumbers.has(item.table_no)) {
      uniqueTableNumbers.add(item.table_no);
      return true;
    }
    return false;
  });

  // Function to calculate the total amount, SGST, CGST, and grand total for a given table number
  const calculateTotalAmountForTable = (tableNo) => {
    let totalAmount = 0;
    let sgstAmount = 0;
    let cgstAmount = 0;
    pendingKotDeta.forEach((item) => {
      if (item.table_no === tableNo) {
        const productsInCart = item.sales_json?.productsInCart || [];
        productsInCart.forEach((product) => {
          totalAmount += parseFloat(product.total_amount);
        });
      }
    });
    // Calculate SGST and CGST (2.5% each)
    sgstAmount = (totalAmount * 0.025).toFixed(2);
    cgstAmount = (totalAmount * 0.025).toFixed(2);
    // Calculate grand total
    const grandTotal = (totalAmount + parseFloat(sgstAmount) + parseFloat(cgstAmount)).toFixed(2);
    return {
      totalAmount: totalAmount.toFixed(2),
      sgstAmount,
      cgstAmount,
      grandTotal,
    };
  };

  const calculateFinalGrandTotal = () => {
    let finalGrandTotal = 0;
    const uniqueTableNumbers = new Set();

    pendingKotDeta.forEach((item) => {
      const tableNo = item.table_no;
      if (!uniqueTableNumbers.has(tableNo)) {
        const tableTotal = calculateTotalAmountForTable(tableNo).grandTotal;
        finalGrandTotal += parseFloat(tableTotal);
        uniqueTableNumbers.add(tableNo);
      }
    });

    return finalGrandTotal.toFixed(2);
  };

  return (
    <>
      <CCard className="invoice-card">
        <CCardHeader className="invoice-card">
          OnGoing KOT(s)
          <CLink
            className="text-primary pull-right"
            onClick={() => setReturns(!returns)}
          >
            <i className="fa fa-external-link fa-xs"></i>
          </CLink>
        </CCardHeader>

        {networkError === true && (
          <CCardBody style={{ display: "flex" }}>
            <div className="text-danger medium-text font-size-2">No, KOT(s) Pending..</div>
          </CCardBody>
        )}
        {loading === true && (
          <CCardBody style={{ display: "flex" }}>
            <BeatLoader
              color="red"
              loading={true}
              size={8}
              style={{ marginTop: "1%", marginRight: "2%" }}
            />
            <div className="text-danger medium-text font-size-2">
              Loading Pending KOT(s) ..
            </div>
          </CCardBody>
        )}

        {loading === false && networkError === false && (
          <div>
            <table
              width="100%"
              className="table table-bordered ongoing mb-0"
              style={{ fontSize: "11px" }}
            >
              <tbody>
                <tr style={{ background: "#efefef" }}>
                  <th>Table No</th>
                  <th>KOTs</th>
                  <th>Amount</th>
                </tr>
                {filteredPendingKotDeta.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>
                        <b>
                          <a href="" className="text-primary text-link">
                            {item.table_no}
                          </a>
                        </b>
                      </td>
                      <td align="center">1</td>
                      <td align="right"><i className="fa fa-inr"></i> {calculateTotalAmountForTable(item.table_no).grandTotal}</td>
                    </tr>
                  </React.Fragment>
                ))}
                <tr style={{ background: "#efefef" }}>
                  <th colSpan="2" style={{ textAlign: "right" }}>
                    Total Amount &nbsp;
                  </th>
                  <th style={{ textAlign: "right" }}>
                    <i className="fa fa-inr"></i> {calculateFinalGrandTotal()}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </CCard>
      {/* ==============================Model start here================================== */}
      <CModal size="lg" visible={returns} onClose={() => setReturns(false)} className="closing-table">
        <CModalHeader onClose={() => setReturns(false)}>
          <CModalTitle>
            Pending KOTs To Bill<span className="badge"> 0</span>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTabContent>
            <OnGoingKotModel />
          </CTabContent>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setReturns(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};
export default OnGoingKot;
