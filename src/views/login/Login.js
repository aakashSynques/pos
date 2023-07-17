

import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import logo from "../../assets/brand/logo.png";
import { fetch } from "../../utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [user, setUser] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const response = await fetch("/api/user/login", "post", {
        email,
        password,
      });

      if (response.status === 200) {
        const responseData = await response.data;

        if (responseData && responseData.token) {
          const token = responseData.token;
          localStorage.setItem("pos_token", token);

          // Verify and get information from the token
          await verifyToken(token);

          // navigate("/dashboard");
          // return <Navigate to="/dashboard" state={{ user }} />;
          // navigate("/dashboard", { state: { user } }); // Pass user data as a state
          // navigate("/dashboard", { replace: true, state: { user } }); // Pass user data as a state
          navigate("/dashboard"); // Navigate to the dashboard
        } else {
          console.log("Invalid response format");
        }
      } else {
        console.log("Login failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // verify token
 const verifyToken = async (token) => {
  try {
    const response = await fetch("api/user/token-info", "post", null, {
      Authorization: `Bearer ${token}`,
    });

    if (response.status === 200) {
      const { tokenData } = response.data;
      const userInfo = tokenData[0];

      // Store the user information in local storage
      localStorage.setItem("user", JSON.stringify(userInfo)); // pass the user data on dashboard

      // Example: Display the user's name
      console.log(`Welcome, ${userInfo.user_name}!`);

      // Example: Redirect to a specific page based on user role
      if (userInfo.role === "user_name") {
        navigate("");
      } else {
        navigate("");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="min-vh-100 align-items-center login-bg mt-5">
      <div className="container-fluid">
        <CRow className="justify-content-center">
          <CCol md={3}>
            <CCardGroup>
              <CCard className="p-4">
                
                   <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <img src={logo} alt="logo" />
                    <p className="text-medium-emphasis pt-2">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12}>
                        <CButton
                          className="px-4 login-btn"
                          onClick={handleSubmit}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={12} className="text-right">
                        <CButton color="link" className="forgot-btn">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                  <p
                    className="text-medium-emphasis"
                    style={{ fontSize: "13px", paddingTop: "20px" }}
                  >
                    All rights reserved © Q4 Retail by SynQues.
                  </p>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </div>
    </div>
  );
};

export default Login;
