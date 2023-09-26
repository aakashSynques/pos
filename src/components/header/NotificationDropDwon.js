import React, { useState, useEffect } from "react";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { cilBell } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const NotificationDropDwon = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {/* <CIcon icon={cilBell} size="lg" /> */}
        <i className="fa fa-cloud-upload" style={{ fontSize: "18px" }}></i>
        <span className="badge bg-red blink_me">1</span>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0 mt-3 rounded-0" placement="bottom-end">
        <CDropdownItem className="noti-bg">
          <ul>
          <li>
            <span>
              <b className="text-success" style={{ fontSize: "13px" }}>
                BNS Customer Registration{" "}
              </b>
            </span>
            <br />
            <p style={{ fontSize: "12px" }}>
              BNS Address &amp; Pincode is Mandatory when GSTN <br /> Entered /
              B2b Sales
            </p>
          </li>
          <li style={{ background: "#ffffff" }}>
            <div
              className="text-right text-danger pt-2"
              style={{ fontSize: "12px" }}
            >
              <strong>Version 6.2</strong>
            </div>
            </li>
            </ul>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default NotificationDropDwon;
