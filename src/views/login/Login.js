import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error messages
  const dispatch = useDispatch(); // Use the useDispatch hook from React-Redux
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email and password fields are not empty
    if (!email || !password) {
      setError("Please fill in all the required fields.");
      return;
    }
    setLoading(true); // Set loading to true while the login request is being processed
    setError(null); // Clear any previous error messages

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
          // await verifyToken(token);
          navigate("/dashboard");
          // Show success notification using react-toastify
          toast.success("Login successful!", {
            position: "top-right",
            autoClose: 1000, // Auto close the notification after 1 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          setError("Invalid response format");
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred. Please try again later.");
      toast.error("Login Failed!", {
        position: "top-right",
        autoClose: 1000, // Auto close the notification after 1 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false); // Set loading to false after the login request is completed
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
        localStorage.setItem("user", JSON.stringify(userInfo));
        // Set the user information in Redux store using the setUser action
        dispatch(setUser(userInfo));
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
    <div className="align-items-center login-bg" style={{ marginTop: "10%" }}>
      <ToastContainer /> {/* Keep only one ToastContainer at the root */}
      <div className="container-fluid">
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard
                className="p-4"
                style={{ background: "rgb(133 133 133 / 3%)" }}
              >
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <div className="text-center">
                    <img src={logo} alt="logo" />
                    <p className="text-medium-emphasis pt-2">
                      Sign In to your account
                    </p>
                   </div>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        required // Add the required attribute here
                      />
                    </CInputGroup>
                    {error &&
                      error === "Please fill in all the required fields." && ( // Display error message for empty fields
                        <p className="text-danger">Enter valid email</p>
                      )}

                    <CInputGroup className="mt-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        required // Add the required attribute here
                      />
                    </CInputGroup>
                    {error &&
                      error === "Please fill in all the required fields." && ( // Display error message for empty fields
                        <p className="text-danger">enter valid Password</p>
                      )}
                    <CRow className="mt-4">
                      <CCol xs={6}>
                        <CButton
                          className="px-4 login-btn"
                          onClick={handleSubmit}
                        >
                          {loading ? "Logging in..." : "Login"}{" "}
                          {/* Show "Logging in..." when loading */}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="forgot-btn text-secondary ">
                        Lost your password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>

                  {error && ( // Show error message if present
                    <p className="text-danger">{error}</p>
                  )}
                  <p
                    className="text-medium-emphasis text-center"
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
