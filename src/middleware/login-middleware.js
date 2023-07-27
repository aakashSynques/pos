import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

// import { setUser } from "../redux/features/userSlice";

const LoginMiddleware = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(true);

  // const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("pos_token");

    console.log("func triggered", token);

    if (!token) {
      setIsLoading(false);
      setIsTokenValid(false);
    } else {
      fetch("http://posapi.q4hosting.com/api/user/token-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (!data.ok) {
            setIsLoading(false);
            setIsTokenValid(false);
          } else {
            setIsLoading(false);
            setIsTokenValid(true);
            // dispatch(
            //   setUser({
            //     user_id: data.tokenData.m_user_id,
            //     role_id: data.tokenData.role_id,
            //     name: data.tokenData.user_name,
            //     email: data.tokenData.user_email,
            //     mobile: data.tokenData.user_mobile,
            //     address: data.tokenData.user_address,
            //   })
            // );
          }
        })
        .catch((error) => {
          console.error("Error validating token:", error);
          setIsLoading(false);
          setIsTokenValid(false);
        });
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!isTokenValid) {
    return <React.Fragment>{children}</React.Fragment>;
  } else {
    return <Navigate to="/dashboard" />;
  }
};

export default LoginMiddleware;
