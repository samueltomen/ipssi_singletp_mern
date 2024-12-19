import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext.jsx";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isLogged, setIsLogged } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8081/login", {
        email,
        password,
      });
      navigate("/");
      localStorage.setItem("token", response.data.token);
      console.log("Utilisateur connecté", response.data);
      toast.success(`Bienvenue ${response.data.user.name}`);
      setIsLogged(true);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(isLogged);

  return (
    <div className="w-50">
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Adresse email</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          value={email}
          aria-describedby="emailHelp"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Mot de passe</label>
        <input
          type="password"
          className="form-control"
          value={password}
          id="exampleInputPassword1"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin} type="submit" className="btn btn-primary">
        Connexion
      </button>
    </div>
  );
}
