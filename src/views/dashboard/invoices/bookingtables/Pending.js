import {
  CContainer,
  CRow,
  CCol,
  CCardHeader,
  CLink,
  CCardBody,
  CCard,
} from "@coreui/react";
import React from "react";

const Pending = () => {
  return (
    <>
      <table className="table table-bordered booking-or-table">
        <thead className="thead-light">
          <tr style={{ background: "#909090", color: "#ffffff" }}>
            <th width="12%">Book#</th>
            <th width="12%">Delivery Mode</th>
            <th width="15%">Customer Name</th>
            <th width="20%">Receiver Name</th>
            <th width="10%">Items</th>
            <th width="10%">Order Amount</th>
            <th width="12%">Advance</th>
            <th width="8%">Due Balance</th>
            <th width="10%" colSpan="4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="" className="text-primary text-link">
                BNS/B2/2324/1351
              </a>
              <br />
              <small>
                2023-06-07 00:39:48
                <br />
                Booked By : Tayyub ansari
              </small>
            </td>
            <td>
              <label className="label label-primary pull-right">PickUp</label>
              07-06-2023
              <br />
              <small>11:00 AM</small>
            </td>
            <td>
              MANISH BAGGA
              <small style={{ color: "gray" }}> (9425600163)</small>
              <br />
              <small>
                <i className="fa fa-map-marker"></i> E-7HIG.496 ARERA COLONY
              </small>
            </td>
            <td>
              Irene Francis
              <small style={{ color: "gray;" }}> (9975102225)</small>
              <br />
              <i className="fa fa-map-marker"></i> IRENE FRANCIS, FLAT NO. 9,
              BUILDING NO. 4, SUKHWANI PARK, PIMPRI PUNE (MAHARASHTRA) - 411018.
            </td>
            <td>5</td>
            <td align="right" style={{ backgroundColor: "#efefef" }}>
              <i className="fa fa-inr"></i> 650.00
            </td>
            <td align="right">
              -<br />
              <label className="label label-info">
                <i className="fa fa-plus"></i> Add
              </label>
            </td>
            <td align="right" className="text-danger">
              <i className="fa fa-inr"></i> 650.00
            </td>
            <td align="center">
              <button className="btn  btn-success btn-margin">
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

          <tr>
            <td>
              <a href="" className="text-primary text-link">
                BNS/B2/2324/1351
              </a>
              <br />
              <small>
                2023-06-07 00:39:48
                <br />
                Booked By : Tayyub ansari
              </small>
            </td>
            <td>
              <label className="label label-primary pull-right">PickUp</label>
              07-06-2023
              <br />
              <small>11:00 AM</small>
            </td>
            <td>
              MANISH BAGGA
              <small style={{ color: "gray" }}> (9425600163)</small>
              <br />
              <small>
                <i className="fa fa-map-marker"></i> E-7HIG.496 ARERA COLONY
              </small>
            </td>
            <td>_</td>
            <td>5</td>
            <td align="right" style={{ backgroundColor: "#efefef" }}>
              <i className="fa fa-inr"></i> 650.00
            </td>
            <td align="right">
              -<br />
              <label className="label label-info">
                <i className="fa fa-plus"></i> Add
              </label>
            </td>
            <td align="right" className="text-danger">
              <i className="fa fa-inr"></i> 650.00
            </td>
            <td align="center">
              <button className="btn  btn-success btn-margin">
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

          <tr>
            <td>
              <a href="" className="text-primary text-link">
                BNS/B2/2324/1351
              </a>
              <br />
              <small>
                2023-06-07 00:39:48
                <br />
                Booked By : Tayyub ansari
              </small>
            </td>
            <td>
              <label className="label label-primary pull-right">PickUp</label>
              07-06-2023
              <br />
              <small>11:00 AM</small>
            </td>
            <td>
              MANISH BAGGA
              <small style={{ color: "gray" }}> (9425600163)</small>
              <br />
              <small>
                <i className="fa fa-map-marker"></i> E-7HIG.496 ARERA COLONY
              </small>
            </td>
            <td>_</td>
            <td>5</td>
            <td align="right" style={{ backgroundColor: "#efefef" }}>
              <i className="fa fa-inr"></i> 650.00
            </td>
            <td align="right">
              -<br />
              <label className="label label-info">
                <i className="fa fa-plus"></i> Add
              </label>
            </td>
            <td align="right" className="text-danger">
              <i className="fa fa-inr"></i> 650.00
            </td>
            <td align="center">
              <button className="btn  btn-success btn-margin">
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
        </tbody>
      </table>
    </>
  );
};
export default Pending;
