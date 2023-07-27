// import React, { Component, Suspense } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './scss/style.scss';

// const loading = (
//   <div className="pt-3 text-center">
//     <div className="sk-spinner sk-spinner-pulse"></div>
//   </div>
// );

// // Containers
// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// // Pages
// const Login = React.lazy(() => import('./views/login/Login'));

// class App extends Component {
//   // Implement your authentication logic here
//   // For example, you can use a state to track whether the user is authenticated or not
//   state = {
//     isAuthenticated: false, // Replace with your actual authentication check
//   };

//   render() {
//     const { isAuthenticated } = this.state;

//     return (
//       <BrowserRouter>
//         <Suspense fallback={loading}>
//           <Routes>
//             <Route
//               exact
//               path="/"
//               name="Login Page"
//               element={<Login />}
//             />
//             {/* Use DefaultLayout as the home page route */}
//             <Route
//               path="/*"
//               name="Home"
//               element={isAuthenticated ? <DefaultLayout /> : <Login />}
//             />
//           </Routes>
//         </Suspense>
//       </BrowserRouter>
//     );
//   }
// }

// export default App;

import React, { Component, Suspense } from "react";
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
// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
// Pages
const Login = React.lazy(() => import("./views/login/Login"));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route
              exact
              path="/"
              name="Login Page"
              element={
                <LoginMiddleware>
                  <Login />
                </LoginMiddleware>
              }
            />
            <Route
              path="*"
              name="Home"
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
}

export default App;
