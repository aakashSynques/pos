import React, { useState, useEffect } from "react";

const LoginMiddleware = ({ children }) => {
  localStorage.removeItem("pos_token");
  return <React.Fragment>{children}</React.Fragment>;
};

export default LoginMiddleware;
