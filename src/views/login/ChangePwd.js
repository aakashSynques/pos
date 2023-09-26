
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  CCard,
  CCardBody,
  CContainer,
  CFormInput,
  CForm,
  CRow,
  CCol,
  CButton,
} from "@coreui/react";
import { fetch } from "../../utils";

function ChangePwd() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  useEffect(() => {
    // Retrieve user data from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // const submitHandler = async (e) => {
  //   e.preventDefault();

  //   if (!oldPassword || !newPassword || !reNewPassword) {
  //     setError("Please fill in all the required fields.");
  //     return;
  //   }

  //   setLoading(true);
  //   setError("Matching Your Password...");

  //   try {
  //     const token = localStorage.getItem("pos_token");
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     };
  //     const body = {
  //       user_id: user ? user.user_id : "", 
  //       oldpwd: oldPassword,
  //       newpwd: newPassword,
  //       renewpwd: reNewPassword,
  //     };
  //     const response = await fetch(
  //       "/api/user/change-pwd",
  //       "POST",
  //       JSON.stringify(body),
  //       headers
  //     );
    
  //     if (response.status === 200) {
  //       const responseData = await response.json();
  //       if (responseData && responseData.token) {
  //         // navigate("/dashboard");
  //         toast.success("Password Change successful!", {
  //           position: "top-right",
  //           autoClose: 1000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //       } else {
  //         setError("Invalid response format");
  //       }
  //     } else {
  //       setError("Password Change failed. Please check your credentials.");
  //     }
  //   } catch (err) {
  //     if (err) {
  //       setError(err.response.data.message);
  //     } else {
  //       setError("Please try again later.");
  //     }
  //     toast.error("Change Password Failed!", {
  //       position: "top-right",
  //       autoClose: 1000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  
  
  const submitHandler = async (e) => {
    e.preventDefault();
  
    if (!oldPassword || !newPassword || !reNewPassword) {
      setError("Please fill in all the required fields.");
      return;
    }
  
    setLoading(true);
    setError("Matching Your Password...");
  
    try {
      const token = localStorage.getItem("pos_token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const body = {
        user_id: user ? user.user_id : "", 
        oldpwd: oldPassword,
        newpwd: newPassword,
        renewpwd: reNewPassword,
      };
      const response = await fetch(
        "/api/user/change-pwd",
        "POST",
        JSON.stringify(body),
        headers
      );
  
      if (response && response.status === 200) {
        const responseData = await response.json();
        if (responseData && responseData.token) {
          navigate("/dashboard");
          toast.success("Password Change successful!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // Clear any previous error message when the password change is successful
          setError(null);
        } else {
          setError("Invalid response format");
        }
      } else {
        // Handle different error codes appropriately
        if (response && response.status === 401) {
          setError("Unauthorized. Please check your credentials.");
        } else {
          setError("Password Change failed. Please try again later.");
        }
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Password Change failed. Please try again later.");
      }
      toast.error("Change Password Failed!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <CContainer>
      <CCardBody>
      
       <div className="align-items-center login-bg" style={{ marginTop: "4%" }}>
          <h3 className="text-center">Change Password</h3>
          <ToastContainer />
          <div className="container-fluid">
            <CRow className="justify-content-center">
              <CCol md={4}>
                <CCard className="p-4" style={{ background: "rgb(133 133 133 / 3%)" }}>
                  <CCardBody>
                    <CForm onSubmit={submitHandler}>
                      <CCol md={12} className="mb-2">
                        <CFormInput
                          className="font-size-2"
                          type="password"
                          onChange={(e) => setOldPassword(e.target.value)}
                          id="oldPassword"
                          label={
                            <span
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              Old Password :
                            </span>
                          }
                          placeholder="Enter Your Old Password"
                        />
                      </CCol>
                      {error &&
                        error === "Please fill in all the required fields." && (
                          <p className="text-danger">
                            Enter valid Old Password
                          </p>
                        )}
                      <CCol md={12} className="mb-2">
                        <CFormInput
                          className="font-size-2"
                          type="password"
                          onChange={(e) => setNewPassword(e.target.value)}
                          id="newPassword"
                          label={
                            <span
                              style={{
                                fontWeight: "bold",
                                paddingBottom: "0px",
                              }}
                            >
                              New Password :
                            </span>
                          }
                          placeholder="Enter New Your Password"
                        />
                      </CCol>
                      {error &&
                        error === "Please fill in all the required fields." && (
                          <p className="text-danger">
                            Enter valid New Password
                          </p>
                        )}
                      <CCol md={12} className="m-1">
                        <CFormInput
                          className="font-size-2"
                          type="password"
                          onChange={(e) => setReNewPassword(e.target.value)}
                          id="reNewPassword"
                          label={
                            <span style={{ fontWeight: "bold" }}>
                              Re-type Password :
                            </span>
                          }
                          placeholder="Re-Enter New Your Password"
                        />
                      </CCol>
                      {error &&
                        error === "Please fill in all the required fields." && (
                          <p className="text-danger">
                            Enter valid Confirm Password
                          </p>
                        )}
                      <CRow className="mt-3">
                        <CCol xs={2} className="text-center">
                          <CButton className="btn-danger btn-sm" type="reset">
                            Reset
                          </CButton>
                        </CCol>
                        <CCol xs={2} className="text-center">
                          <CButton className="btn-primary btn-sm" type="submit">
                            Update
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                    {error && <p className="text-danger">{error}</p>}
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </div>
        </div>
      </CCardBody>
    </CContainer>
  );
}

export default ChangePwd;
