import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext.jsx";
import { toast } from "react-toastify";

export default function Navbar() {
  const { isLogged, setIsLogged } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function userLogged() {
    if (token) {
      setIsLogged(true);
    }
  }

  const handleLogout = () => {
    toast.error("Vous êtes déconnecté");
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate("/login");
  };

  useEffect(() => {
    userLogged();
  }, [token, isLogged]);

  return (
    <nav className="navbar navbar-expand-lg bg-secondary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          LE BON TUYAUX
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              {isLogged && (
                <Link className="nav-link active" aria-current="page" to="/">
                  Tous les produits
                </Link>
              )}
            </li>
            <li className="nav-item">
              {isLogged && (
                <Link className="nav-link" to="/admin">
                  Gestion des utilisateurs
                </Link>
              )}
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {isLogged ? "Mon compte" : "Connexion / Inscription"}
              </a>
              {!isLogged ? (
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Se connecter
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/register">
                      S'inscrire
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" onClick={handleLogout}>
                      Se déconnecter
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
