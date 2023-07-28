import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { setUser } from "../action/actions";

// import { setUser } from "../redux/features/userSlice";

const TokenMiddleware = ({ children }) => {
  //   return (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("pos_token");

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
          // console.log(data);
          if (!data.ok) {
            setIsLoading(false);
            setIsTokenValid(false);
          } else {
            setIsLoading(false);
            setIsTokenValid(true);
            const { tokenData } = data;
            // console.log(tokenData);
            const userInfo = tokenData[0];
            // // Store the user information in local storage
            localStorage.setItem("user", JSON.stringify(userInfo));
            // // Set the user information in Redux store using the setUser action
            dispatch(setUser(userInfo));
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
    return <Navigate to="/" />;
  } else {
    return <React.Fragment>{children}</React.Fragment>;
  }
  //   };
};

export default TokenMiddleware;
