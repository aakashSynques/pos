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
import SearchBar from "./SearchBar";
const ProductList = () => {
  return (
    <>
      <div className="product-search-section">
        <SearchBar />
        <CContainer className="category-list-box">
          <CRow>
            <CCol md="6" sm="6" xs="12" className="p-10">
              <CCard>
                <CCardHeader>
                  Recent Invoice(s)
                  <CLink className="text-primary pull-right">
                    <i className="fa fa-external-link fa-xs"></i>
                  </CLink>
                </CCardHeader>
                <CCardBody>
                  <div id="DB_RecentPunchedInvoice">
                    <small className="text-danger">
                      No, Invoices Punched..
                    </small>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>

            <CCol md="6" sm="6" xs="12" className="p-10">
              <CCard>
                <CCardHeader>
                  OnGoing KOT(s)
                  <CLink className="text-primary pull-right">
                    <i className="fa fa-external-link fa-xs"></i>
                  </CLink>
                </CCardHeader>
                <CCardBody>
                  <div id="DB_RecentPunchedInvoice">
                    {/* <small className="text-danger">
                      No, Invoices Punched..
                    </small> */}
                    <table width="100%" className="table table-bordered" style={{    "fontSize": "11px"}}>
                      <tbody>
                        <tr style={{"background" : "#efefef"}}>
                          <th>Table No</th>
                          <th>KOTs</th>
                          <th>Amount</th>
                        </tr>
                        <tr>
                          <td>
                            <b>
                              <a
                                href=''
                                class="text-primary text-link"
                              >
                                9
                              </a>
                            </b>
                          </td>
                          <td align="center">1</td>
                          <td align="right">
                            <i class="fa fa-inr"></i> 336.00
                          </td>
                        </tr>
                        <tr style={{"background" : "#efefef"}}>
                          <th colspan="2" style={{"text-align ": "right"}}>
                            Total Amount&nbsp;
                          </th>
                          <th style={{"text-align ": "right"}}>
                            <i class="fa fa-inr"></i> 336.00
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>

            <CCol md="6" sm="6" xs="12" className="p-10">
              <CCard>
                <CCardHeader>
                  Recent Return Invoice(s)
                  <CLink className="text-primary pull-right">
                    <i className="fa fa-external-link fa-xs"></i>
                  </CLink>
                </CCardHeader>
                <CCardBody>
                  <div id="DB_RecentPunchedInvoice">
                    <small className="text-danger">
                      No, Invoices Punched..
                    </small>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>

            <CCol md="6" sm="6" xs="12" className="p-10">
              <CCard>
                <CCardHeader>
                  Upcomming Booking
                  <CLink className="text-primary pull-right">
                    <i className="fa fa-external-link fa-xs"></i>
                  </CLink>
                </CCardHeader>
                <CCardBody>
                  <div id="DB_RecentPunchedInvoice">
                    <small className="text-danger">
                      No, Invoices Punched..
                    </small>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>

            <CCol md="6" sm="6" xs="12" className="p-10">
              <CCard>
                <CCardHeader>
                  Total Punched Invoice(s)
                  <CLink className="text-primary pull-right">
                    <i className="fa fa-external-link fa-xs"></i>
                  </CLink>
                </CCardHeader>
                <CCardBody>
                  <div id="DB_RecentPunchedInvoice">
                    <small className="text-danger">
                      No, Invoices Punched..
                    </small>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>

            <CCol md="6" sm="6" xs="12" className="p-10">
              <CCard>
                <CCardHeader>
                  Pending Booking(s)
                  <CLink className="text-primary pull-right">
                    <i className="fa fa-external-link fa-xs"></i>
                  </CLink>
                </CCardHeader>
                <CCardBody>
                  <div id="DB_RecentPunchedInvoice">
                    <small className="text-danger">
                      No, Invoices Punched..
                    </small>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

export default ProductList;
