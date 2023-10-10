import React, { useState, useEffect } from "react";
import { CLink } from "@coreui/react";
import { fetch } from "../../../../utils";
import { setPendingKotData } from "../../../../action/actions";
import { useDispatch, useSelector } from "react-redux";

const OnGoingKotModel = () => {
  const dispatch = useDispatch();
  const [returnModel, setReturnModel] = useState(false);
  const [openTable, setOpenTable] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [checkedItems, setCheckedItems] = useState({});



  const pendingKotData = useSelector((state) => state.table.pendingKotData);

  const [selectedTable, setSelectedTable] = useState(null);
  useEffect(() => {
    const firstTableNo = pendingKotData.length > 0 ? pendingKotData[0].table_no : null;
    setSelectedTable(firstTableNo);
  }, [pendingKotData]);

  const handleTableClick = (tableNo) => {
    setSelectedTable(tableNo);
  };

  useEffect(() => {
    const initialCheckedItems = {};
    pendingKotData.forEach((item) => {
      initialCheckedItems[item.dkot_no] = true;
    });
    setCheckedItems(initialCheckedItems);
  }, [pendingKotData]);

  const [subTotal, setSubTotal] = useState(0);
  const [sgstAmount, setSgstAmount] = useState(0);
  const [cgstAmount, setCgstAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const calculateTotals = () => {
      const tableData = pendingKotData.filter((item) => item.table_no === selectedTable);
      let totalSubTotal = 0;
      let totalItemsCount = 0;

      tableData.forEach((item) => {
        const productsInCart = item.sales_json?.productsInCart || [];
        productsInCart.forEach((product) => {
          totalSubTotal += parseFloat(product.total_amount);
          totalItemsCount++;
        });
      });
      const sgstRate = 2.5;
      const cgstRate = 2.5;
      const sgst = (totalSubTotal * sgstRate) / 100;
      const cgst = (totalSubTotal * cgstRate) / 100;
      const finalAmt = totalSubTotal + sgst + cgst;
      setSubTotal(totalSubTotal);
      setSgstAmount(sgst);
      setCgstAmount(cgst);
      setFinalAmount(finalAmt);
      setTotalItems(totalItemsCount);
    };

    calculateTotals();
  }, [pendingKotData, selectedTable]);


  const handleCheckboxChange = (dkotNo) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = {
        ...prevCheckedItems,
        [dkotNo]: !prevCheckedItems[dkotNo],
      };
      return updatedCheckedItems;
    });
  };


  return (
    <>
      <table className="table table-bordered collection-table-style new-kot">
        <thead className="thead-light">
          <tr>
            <th width="20%" className="bg-light table-titlse-style">
              On Table
            </th>
            <th width="20%" className="bg-light table-titlse-style">
              Pending Bills
            </th>
            <th width="60%" className="bg-light table-titlse-style">
              Bills Details
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="p-0">
              <table border="0" cellSpacing="4" cellPadding="4" width="100%">
                <tbody>
                  {[...new Set(pendingKotData.map((kot) => kot.table_no))].map((tableNo) => (
                    <tr
                      key={tableNo}
                      style={{
                        background: selectedTable === tableNo ? "#fcf8e3" : "white",
                        cursor: "pointer",
                        color: selectedTable === tableNo ? "#000000" : "#000000",
                      }}
                      className="kot-table-t-lable"
                      onClick={() => handleTableClick(tableNo)}
                    >
                      <td>
                        Table No. <b>{tableNo}</b>{" "}
                        <button className="btn btn-xs btn-danger pull-right"></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>

            <td className="p-0">
              <table border="0" cellSpacing="4" cellPadding="4" width="100%">
                <tbody>
                  {pendingKotData.map((item) => {
                    if (item.table_no === selectedTable) {
                      return (
                        <>
                          <tr style={{ background: "#8a6d3b" }} className="text-white">
                            <td colSpan="2" align="center">
                              <b>{item.selectedCustomerJson.customer_name}</b>
                            </td>
                          </tr>
                          <tr style={{ background: "#fcf8e3" }} className="kot-table-t-lable">
                            <td>
                              <label>
                                <CLink onClick={() => handleCheckboxChange(item.dkot_no)}>
                                  <input
                                    type="checkbox"
                                    checked={checkedItems[item.dkot_no]}
                                    onChange={() => { }}
                                  />
                                </CLink>{" "}
                                <b>{item.dkot_no}</b>
                                <br />
                                <i className="ml-3 font-size-3 " style={{ marginLeft: "13px" }}>
                                  {item.eat}
                                </i>
                              </label>
                            </td>
                            <td align="center" title="Change Table No.">
                              <CLink
                                className="text-black pull-right"
                                onClick={() => setReturnModel(!returnModel)}
                              >
                                <i className="fa fa-retweet"></i>
                              </CLink>
                            </td>
                          </tr>
                        </>
                      );
                    } else {
                      return null;
                    }
                  })}
                </tbody>
              </table>
            </td>

            <td className="p-0">
              {isChecked && openTable && (
                <table className="table table-bordered collection-table-style">
                  <thead>
                    <tr>
                      <th width="60%" className="table-titlse-style text-white" style={{ background: "#909090" }}>
                        Product Details
                      </th>
                      <th width="5%" style={{ background: "#909090" }} className="table-titlse-style text-white">
                        Qty
                      </th>
                      <th width="15%" style={{ background: "#909090" }} className="table-titlse-style text-white">
                        Rate
                      </th>
                      <th width="15%" style={{ background: "#909090" }} className="table-titlse-style text-white">
                        Amount
                      </th>
                      <th width="2%" style={{ background: "#909090" }} className="table-titlse-style text-white">
                        {" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingKotData.map((item) => {
                      if (item.table_no === selectedTable && checkedItems[item.dkot_no]) {
                        const productsInCart = item.sales_json?.productsInCart || [];
                        let totalAmount = 0;
                        productsInCart.forEach((product) => {
                          totalAmount += parseFloat(product.total_amount);
                        });
                        return (
                          <>
                            <tr>
                              <td colSpan="4" style={{ background: "#efefef" }}>
                                <b> {item.dkot_no}</b>
                              </td>
                              <td style={{ background: "#efefef" }}>
                                <i className="fa fa-print" style={{ color: "#5A738E" }}></i>
                              </td>
                            </tr>

                            {productsInCart.map((product, index) => (
                              <tr key={index}>
                                <td>{product.prod_name}</td>
                                <td>{product.prod_qty}</td>
                                <td className="text-end">&#8377; {product.prod_rate}</td>
                                <td className="text-end">&#8377; {product.total_amount}</td>
                                <td>&#x2713;</td>
                              </tr>
                            ))}
                          </>
                        );
                      } else {
                        return null;
                      }
                    })}

                    <tr>
                      <td colSpan="2" align="end" style={{ background: "#efefef" }} className="text-end">
                        <b className="font-w-5 text-end">Total Sub-Total</b>
                      </td>
                      <td style={{ background: "#efefef" }}>
                        <b className="font-w-5 text-end">{totalItems} Item's</b>
                      </td>
                      <td style={{ background: "#efefef" }} className="text-end">
                        <b className="font-w-5 text-end">&#8377; {subTotal.toFixed(2)}</b>
                      </td>
                      <td style={{ background: "#efefef" }}></td>
                    </tr>

                    <tr>
                      <td colspan="3" align="end" style={{ background: "#efefef" }} className="text-end">
                        <b className="font-w-5 text-end">Tax GST (2.5% SGST)</b>
                      </td>
                      <td style={{ background: "#efefef" }} className="text-end">
                        <b className="font-w-5 text-end">&#8377; {sgstAmount.toFixed(2)}</b>
                      </td>
                      <td style={{ background: "#efefef" }}></td>
                    </tr>

                    <tr>
                      <td colspan="3" align="end" style={{ background: "#efefef" }} className="text-end">
                        <b className="font-w-5 text-end">Tax GST (2.5% CGST)</b>
                      </td>
                      <td style={{ background: "#efefef" }} className="text-end">
                        <b className="font-w-5 text-end"> &#8377; {cgstAmount.toFixed(2)}</b>
                      </td>
                      <td style={{ background: "#efefef" }}></td>
                    </tr>

                    <tr>
                      <td colspan="3" align="end" style={{ background: "#efefef" }}>
                        <b className="font-w-5 text-end">Grand-Total</b>
                      </td>
                      <td style={{ background: "#efefef" }} className="text-end">
                        <b className="font-w-5 text-end">&#8377; {finalAmount.toFixed(2)}</b>
                      </td>
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
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OnGoingKotModel;
