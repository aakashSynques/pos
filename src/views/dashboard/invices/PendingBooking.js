import { CCardHeader, CLink, CCardBody, CCard } from "@coreui/react";
import React from "react";
const PendingBooking = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          Pending Booking(s)
          <CLink className="text-primary pull-right">
            <i className="fa fa-external-link fa-xs"></i>
          </CLink>
        </CCardHeader>
        {/* <div>
            <small className="text-danger">No, Invoices Punched..</small>
          </div> */}
        <div className="pending-booking">
          <table width="100%" class="table table-bordered ongoing">
            <tbody>
              <tr>
                <td>
                  <a href="" class="text-primary text-link">
                    BNS/B2/2324/1351
                  </a>
                  <br />
                  MANISH BAGGA<small> (9425600163)</small>
                </td>
                <td>
                  <label
                    className="status-btn text-white"
                    style={{ backgroundColor: "#1A82C3" }}
                  >
                    PickUp
                  </label>
                  <br />
                  2023-06-07
                  <br />
                  11:00 AM
                </td>
              </tr>

              <tr>
                <td>
                  <a href="" class="text-primary text-link">
                    BNS/B2/2324/1351
                  </a>
                  <br />
                  ANGC GRP INDIA PRIVATE LIMITED<small> (9425600163)</small>
                </td>
                <td>
                  <label
                    className="status-btn text-white"
                    style={{ backgroundColor: "red" }}
                  >
                 Delivery
                  </label>
                  <br />
                  2023-06-07
                  <br />
                  11:00 AM
                </td>
              </tr>

              <tr>
                <td>
                  <a href="" class="text-primary text-link">
                    BNS/B2/2324/1351
                  </a>
                  <br />
                  SANSKAR VALLEY<small> (9425600163)</small>
                </td>
                <td>
                  <label
                    className="status-btn text-white"
                    style={{ backgroundColor: "#1A82C3" }}
                  >
                    PickUp
                  </label>
                  <br />
                  2023-06-07
                  <br />
                  11:00 AM
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CCard>
    </>
  );
};
export default PendingBooking;
