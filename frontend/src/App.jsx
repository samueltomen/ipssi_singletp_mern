import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Authentification from "./components/Authentification/Authentification.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Wrapper from "./components/Wrapper/Wrapper.jsx";
import Admin from "./components/Admin/Admin.jsx";
import { AuthProvider } from "./Context/AuthContext/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/Security/PrivateRoute.jsx";
import PublicRoute from "./components/Security/PublicRoute.jsx";

function App() {
  return (
    <div>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Wrapper>
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Authentification type_auth={"login"} />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Authentification type_auth={"register"} />
                  </PublicRoute>
                }
              />

              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <Admin />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Wrapper>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
