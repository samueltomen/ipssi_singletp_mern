import Login from "./Login.jsx";
import Register from "./Register.jsx";
import "./Authentification.css";

export default function Authentification({ type_auth }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {type_auth === "login" && <Login />}
      {type_auth === "register" && <Register />}
    </div>
  );
}
