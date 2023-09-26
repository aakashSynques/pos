import { CForm, CFormTextarea } from "@coreui/react";
import React from "react";

const ExtraDiscription = () => {
  return (
    <>
      <h6 className="mt-3">
        <b>Extra Description/Note</b>
      </h6>
      {/* <CForm>
        <CFormTextarea
                  placeholder="Special Note For Accounts Department."
                  style={{    fontSize: "11px"}}
          rows={3}
          className="rounded-0"
        ></CFormTextarea>
      </CForm> */}
      <table className="table table-bordered collection-table-style table-hover mode-2">
        <tbody>
          <tr>
            <td>
              <CFormTextarea
                placeholder="Special Note For Accounts Department."
                style={{ fontSize: "11px" }}
                rows={3}
                className="rounded-0"
              ></CFormTextarea>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ExtraDiscription;
