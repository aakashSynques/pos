import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TokenMiddleware from "./middleware/middleware";
import LoginMiddleware from "./middleware/login-middleware";


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
const Login = React.lazy(() => import("./views/login/Login"));


function App() {
  return (
   
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route
            path="/"
            element={
              <LoginMiddleware>
                <Login />
              </LoginMiddleware>
            }
          />

          <Route
            path="*"
            element={
              <TokenMiddleware>
                <DefaultLayout />
              </TokenMiddleware>
            }
          />
        </Routes>
        <ToastContainer />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
