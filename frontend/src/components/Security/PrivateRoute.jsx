import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthContext.jsx";

export default function PrivateRoute({ children }) {
  const { isLogged } = useContext(AuthContext);

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return children;
}
