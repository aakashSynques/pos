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

import avatar8 from "./../../assets/images/avatars/3.jpg";
import { Link, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AppHeaderDropdown = () => {
  const [user, setUser] = useState(null);
  const outletAllList = useSelector((state) => state.outlets);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signoutHandler = () => {
    localStorage.removeItem("pos_token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleButtonClick = () => {
    signoutHandler();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "l") {
        event.preventDefault();
        signoutHandler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {user ? (
          <div>
            <small style={{ fontWeight: "bold", fontSize: "15px" }}>
              {user.user_name}{" "}
              <font size="1" color="#909090">
                (Administrator)
              </font>{" "}
              <span className=" fa fa-angle-down"></span>
            </small>
          </div>
        ) : (
          <small>Please login to view the dashboard.</small>
        )}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0 mt-3 rounded-0" placement="bottom-end">
        <CDropdownItem style={{ color: "#5A738E", fontSize: "15px" }}>
          Assigned Outlets
        </CDropdownItem>
        <CDropdownItem style={{ fontSize: "13px" }}>
          {outletAllList &&
            outletAllList.map((outlet, id) => {
              return (
                <ul key={id}>
                  <li>{outlet.outlet_name}</li>
                </ul>
              );
            })}
        </CDropdownItem>

        <hr />
        <CDropdownItem href="#">
          <span style={{ fontSize: "12px" }}>Profile</span>{" "}
          <i className=" fa fa-regular fa-user pull-right pt-1"></i>
        </CDropdownItem>

        {/* <Link to="/login/changepwd">
          <CDropdownItem>
            <span style={{ fontSize: "12px" }}>Change Password</span>
            <i className="fa fa-key pull-right pt-1"></i>
          </CDropdownItem>
        </Link> */}
        <Link to="/login/changepwd">
          <CDropdownItem>
            <span style={{ fontSize: "12px" }}>Change Password</span>
            <i className="fa fa-key pull-right pt-1"></i>
          </CDropdownItem>
        </Link>

        <CDropdownItem  onClick={handleButtonClick}>
          <span style={{ fontSize: "12px" }}>
            Logout{" "}
            <small
              style={{
                background: "#f0ad4e",
                fontWeight: "bold",
                borderRadius: "5px",
                padding: "3px",
                fontSize: "10px",
                color: "white",
              }}
            >
              Ctrl + L
            </small>{" "}
          </span>
          <i className="fa fa-sign-out pull-right pt-1"></i>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
