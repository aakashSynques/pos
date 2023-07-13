import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
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
import { logInResponse, verifiedTokenData } from "../../db/login.constant";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [loggedIn, setLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   const user = logInResponse.find(
  //     (userData) =>
  //       userData.userdetails.user_email === email &&
  //       userData.userdetails.user_password === password
  //   );
  //   if (user) {
  //     setLoggedIn(true);
  //     localStorage.setItem("token", user.token); // Save the token in localStorage
  //   } else {
  //     console.log("Invalid email or password");
  //     setLoggedIn(false);
  //   }
  // };

  // if (loggedIn) {
  //   return <Navigate to="/dashboard" />;
  // }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform login validation
    if (username === "naveen@synques.in" && password === "nashubha1") {
      // Successful login
      setLoggedIn(true);
    } else {
      // Invalid credentials
      setError('Invalid username or password');
    }
  };

  if (loggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    // <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
    //   <CContainer>
    //     <CRow className="justify-content-center">
    //       <CCol md={4}>
    //         <CCardGroup>
    //           <CCard className="p-4">
    //             <CCardBody>
    //               <CForm>
    //                 <img src={logo} alt="logo" />
    //                 <p className="text-medium-emphasis pt-2">
    //                   Sign In to your account
    //                 </p>
    //                 <CInputGroup className="mb-3">
    //                   <CInputGroupText>
    //                     <CIcon icon={cilUser} />
    //                   </CInputGroupText>
    //                   {/* <CFormInput
    //                     placeholder="User ID"
    //                     autoComplete="User ID"
    //                   /> */}
    //                   <CFormInput
    //                     type="text"
    //                     placeholder="Username"
    //                     value={email}
    //                     onChange={(e) => setEmail(e.target.value)}
    //                   />
    //                 </CInputGroup>
    //                 <CInputGroup className="mb-4">
    //                   <CInputGroupText>
    //                     <CIcon icon={cilLockLocked} />
    //                   </CInputGroupText>
    //                   <CFormInput
    //                     type="password"
    //                     placeholder="Password"
    //                     value={password}
    //                     onChange={(e) => setPassword(e.target.value)}
    //                   />
    //                 </CInputGroup>
    //                 <CRow>
    //                   <CCol xs={6}>
    //                     <CButton
    //                       className="px-4 login-btn"
    //                       onClick={handleLogin}
    //                     >
    //                       Login
    //                     </CButton>
    //                   </CCol>
    //                   <CCol xs={6} className="text-right">
    //                     <CButton color="link" className="px-0">
    //                       Forgot password?
    //                     </CButton>
    //                   </CCol>
    //                 </CRow>
    //               </CForm>
    //               <p
    //                 className="text-medium-emphasis"
    //                 style={{ fontSize: "13px", paddingTop: "20px" }}
    //               >
    //                 All rights reserved © Q4 Retail by SynQues.
    //               </p>
    //             </CCardBody>
    //           </CCard>
    //         </CCardGroup>
    //       </CCol>
    //     </CRow>
    //   </CContainer>
    // </div>

    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {/* <form onSubmit={handleSubmit}>
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
                       value={username} onChange={handleUsernameChange}
                      />
                      <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" />

                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        value={password} onChange={handlePasswordChange}
                      />
                      <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />

                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          className="px-4 login-btn"
                         
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </form> */}

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
                        value={username}
                        onChange={handleUsernameChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </CInputGroup>
                    {error && <div className="error text-danger" >{error}</div>}
                    <CRow>
                      <CCol xs={6}>
                        <CButton className="px-4 login-btn" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
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
      </CContainer>
    </div>
  );
};

export default Login;
