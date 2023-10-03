import React from "react";
import {
  CLink,
} from "@coreui/react";
import { useState, useEffect } from "react";
import { fetch } from "../../../../utils";
const OnGoingKotModel = () => {
  const [returnModel, setReturnModel] = useState(false);
  const [openTable, setOpenTable] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [pendingKotData, setpendingKotData] = useState([]);


  const getPendingKOT = async () => {
    try {
      const token = localStorage.getItem("pos_token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch(
        "/api/sales/getPendingKOT",
        "post",
        null,
        headers
      );
      // console.log('kot data', response.data.KOT_data.map(item => item.table_no));


      // console.log('kot data 3', response.data.KOT_data.map(item2 => item2.sales_json));
      // console.log('kot data 2', response.data.KOT_data);
      console.log('daat:', response.data.KOT_data);

      console.log('kot data 3', response.data.KOT_data.map(item2 => {
        if (Array.isArray(item2.sales_json.productsInCart)) {
          return item2.sales_json.productsInCart;
        } else {
          return [];
        }
      }));
      setpendingKotData(response.data.KOT_data);
      console.log('new data', response.data.KOT_data.map(item => item.dkot_no))


    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPendingKOT();
  }, []);




  return (
    <>


      <table className="table table-bordered collection-table-style">
        <thead className="thead-light">
          <tr>
            <th width="20%" className="bg-light table-titlse-style">On Table</th>
            <th width="20%" className="bg-light table-titlse-style">Pending Bills </th>
            <th width="60%" className="bg-light table-titlse-style">Bills Details</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="p-0">

              <table border="0" cellspacing="4" cellpadding="4" width="100%">
                <tbody>

                  {[...new Set(pendingKotData.map((kot) => kot.table_no))].map((tableNo) => (
                    <tr key={tableNo} style={{ background: "#fcf8e3" }} className="kot-table-t-lable">
                      <td>Table No. <b>{tableNo}</b> <button className="btn btn-xs btn-danger pull-right"></button></td>
                    </tr>
                  ))}



                </tbody>
              </table>
            </td>

            <td className="p-0">
              <table border="0" cellspacing="4" cellpadding="4" width="100%">
                <tbody>
                  {pendingKotData.map(item => (
                    <>
                      <tr style={{ background: "#8a6d3b" }} className="text-white">
                        <td colspan="2" align="center">
                          <b>{item.selectedCustomerJson.customer_name}</b>

                        </td>
                      </tr>
                      <tr style={{ background: "#fcf8e3" }} className="kot-table-t-lable">
                        <td>
                          <label>
                            <CLink onClick={() => setOpenTable(!openTable)}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => setIsChecked(!isChecked)}
                              /> {""}
                            </CLink>
                            <b>{item.dkot_no}</b>
                            <br />
                            <i className="ml-3 font-size-3 " style={{ marginLeft: '13px' }}>{item.eat}</i>
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
                  ))}


                </tbody>
              </table>


            </td>


            {isChecked && openTable && (
              <table className="table table-bordered collection-table-style">
                <thead>
                  <tr>
                    <th width="60%" className="table-titlse-style text-white" style={{ background: "#909090" }} >Product Details</th>
                    <th width="5%" style={{ background: "#909090" }} className="table-titlse-style text-white">Qty</th>
                    <th width="15%" style={{ background: "#909090" }} className="table-titlse-style text-white">Rate</th>
                    <th width="15%" style={{ background: "#909090" }} className="table-titlse-style text-white">Amount</th>
                    <th width="2%" style={{ background: "#909090" }} className="table-titlse-style text-white"> </th>
                  </tr>
                </thead>
                <tbody>


                  <tr>
                    <td colspan="4" style={{ background: "#efefef" }}>
                      KOT#: BNS/K2/2324/1383
                    </td>
                    <td style={{ background: "#efefef" }}>
                      <i className="fa fa-print" style={{ color: "#5A738E" }}></i>
                    </td>
                  </tr>
                  <tr>
                    <td>MUSHROOM STUFFED BUN</td>
                    <td>1</td>
                    <td>&#8377; 180.00</td>
                    <td>&#8377; 180.00</td>
                    <td>&#x2713;</td>
                  </tr>
                  <tr>
                    <td>PANEER ROLL</td>
                    <td>1</td>
                    <td>&#8377; 140.00</td>
                    <td>&#8377; 140.00</td>
                    <td>&#x2713;</td>
                  </tr>


                  <tr>
                    <td colspan="4" style={{ background: "#efefef" }}>
                      KOT#: BNS/K2/2324/1383
                    </td>
                    <td style={{ background: "#efefef" }}>
                      <i className="fa fa-print" style={{ color: "#5A738E" }}></i>
                    </td>
                  </tr>
                  <tr>
                    <td>MUSHROOM STUFFED BUN</td>
                    <td>1</td>
                    <td>&#8377; 180.00</td>
                    <td>&#8377; 180.00</td>
                    <td>&#x2713;</td>
                  </tr>
                  <tr>
                    <td>PANEER ROLL</td>
                    <td>1</td>
                    <td>&#8377; 140.00</td>
                    <td>&#8377; 140.00</td>
                    <td>&#x2713;</td>
                  </tr>







                  <tr>
                    <td
                      colspan="2"
                      align="end"
                      style={{ background: "#efefef" }}
                    >
                      Sub-Total
                    </td>
                    <td style={{ background: "#efefef" }}> 2 Item</td>
                    <td style={{ background: "#efefef" }}>&#8377; 320</td>
                    <td style={{ background: "#efefef" }}></td>
                  </tr>
                  <tr>
                    <td
                      colspan="3"
                      align="end"
                      style={{ background: "#efefef" }}
                    >
                      Tax GST (2.5% SGST)
                    </td>
                    <td style={{ background: "#efefef" }}>&#8377; 8.00</td>
                    <td style={{ background: "#efefef" }}></td>
                  </tr>
                  <tr>
                    <td
                      colspan="3"
                      align="end"
                      style={{ background: "#efefef" }}
                    >
                      Tax GST (2.5% CGST)
                    </td>
                    <td style={{ background: "#efefef" }}>&#8377; 8.00</td>
                    <td style={{ background: "#efefef" }}></td>
                  </tr>
                  <tr>
                    <td
                      colspan="3"
                      align="end"
                      style={{ background: "#efefef" }}
                    >
                      Grand-Total
                    </td>
                    <td style={{ background: "#efefef" }}>&#8377; 336.00</td>
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








          </tr>
        </tbody>
      </table>
    </>
  );
};
export default OnGoingKotModel;
